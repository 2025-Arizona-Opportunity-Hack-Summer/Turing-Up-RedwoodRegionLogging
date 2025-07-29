import { Router } from 'express';
import Scan from '../models/Scan.js';
import Class from '../models/Class.js';
import { WILDLIFE_CODES } from '../constants/codes.js';

const r = Router();

/*
 * body: { token: "9X3L2ABP", codeId: "owl" }
 */
r.post('/', async (req, res) => {
  try {
    const { token, codeId } = req.body;
    if (!token || !codeId) {
      return res.status(400).json({ error: 'token & codeId required' });
    }
    if (!WILDLIFE_CODES.includes(codeId)) {
      return res.status(400).json({ error: 'invalid codeId' });
    }

    // lookup class
    const cls = await Class.findOne({ token });
    if (!cls) return res.status(404).json({ error: 'class not found' });

    // create scan (unique index in model prevents duplicates)
    await Scan.create({ classId: cls._id, codeId });

    // check completion
    const uniqueCount = await Scan.countDocuments({ classId: cls._id });
    if (
      uniqueCount === WILDLIFE_CODES.length &&
      !cls.completedAt
    ) {
      cls.completedAt = new Date();
      await cls.save();
    }

    res.json({ ok: true, completed: !!cls.completedAt });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ ok: true, dup: true }); // already scanned
    }
    console.error('scan error', err);
    res.status(500).json({ error: 'server error' });
  }
});

export default r;
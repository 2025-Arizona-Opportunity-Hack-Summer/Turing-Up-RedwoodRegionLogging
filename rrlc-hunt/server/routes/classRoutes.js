import { Router } from 'express';
import Class from '../models/Class.js';

const r = Router();

/**
 * Register a class
 * body: { teacher, school?, size? }
 * returns: { classId, token }
 */
r.post('/register', async (req, res) => {
  try {
    const { teacher, school, size } = req.body;
    if (!teacher) return res.status(400).json({ error: 'teacher required' });

    const doc = await Class.create({ teacher, school, size });
    res.json({ classId: doc._id, token: doc.token });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ error: 'server error' });
  }
});

export default r;
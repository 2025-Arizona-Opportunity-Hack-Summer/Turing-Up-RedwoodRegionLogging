import { Schema, model, Types } from 'mongoose';

const scanSchema = new Schema({
  classId: { type: Types.ObjectId, ref: 'Class', index: true, required: true },
  codeId:  { type: String, required: true },  // e.g. "owl"
  ts:      { type: Date, default: Date.now }
});

scanSchema.index({ classId: 1, codeId: 1 }, { unique: true }); // prevent dup scans per class/code

export default model('Scan', scanSchema);
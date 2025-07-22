import { Schema, model } from 'mongoose';
import { customAlphabet } from 'nanoid';

// short readable class token teachers can copy
const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);

const classSchema = new Schema({
  teacher:    { type: String, required: true },
  school:     String,
  size:       Number,
  token:      { type: String, unique: true, default: () => nanoid() },
  completedAt: Date
}, { timestamps: true });

export default model('Class', classSchema);
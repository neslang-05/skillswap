import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '/placeholder.svg?height=100&width=100' },
  bio: { type: String, default: '' },
  university: { type: String, default: '' },
  year: { type: String, default: '' },
  website: { type: String, default: '' },
  twitter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  skillsOffered: [{ type: String }],
  skillsWanted: [{ type: String }],
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema); 
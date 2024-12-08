import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  avatar: {
    type: String,
    default: '/placeholder.svg?height=100&width=100',
  },
  bio: {
    type: String,
    default: '',
  },
  university: {
    type: String,
    default: '',
  },
  year: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  twitter: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  github: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  skills: {
    type: [String],
    default: [],
  },
  interests: {
    type: [String],
    default: [],
  },
  skillsOffered: {
    type: [String],
    default: [],
  },
  skillsWanted: {
    type: [String],
    default: [],
  },
  exchanges: [{
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    skillOffered: String,
    skillRequested: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed'],
      default: 'pending'
    }
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: validator.isEmail
  
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    accountType: {
      type: String,
      enum: ['primary consultant', 'secondary consultant', 'client'],
      required: true
    }
  }, {
    timestamps: true // adds createdAt and updatedAt
  });

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    hash: String,
    email: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const SignupModel = mongoose.model('user', signupSchema);

export default SignupModel;

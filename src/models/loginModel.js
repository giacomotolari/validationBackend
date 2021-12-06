import mongoose from 'mongoose';

const loginschema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    accessGroups: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LoginModel = mongoose.model('Login_users', loginschema);

export default LoginModel;

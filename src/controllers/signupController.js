import SignupModel from "../models/signupModel.js";

export const createUser = async (userObj) => {
  return await SignupModel.create(userObj);
};

export const readAllUsers = async () => {
  return await SignupModel.find({});
};

export const readOneUser = async (id) => {
  return await SignupModel.findById(id);
};

export const updateUser = async (id, updateFields) => {
  return await SignupModel.findByIdAndUpdate(id, updateFields, {
    new: true,
  });
};

export const deleteUser = async (id) => {
  return await SignupModel.findByIdAndRemove(id);
};
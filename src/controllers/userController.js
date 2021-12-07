import UserModel from "../models/userModel.js";

// SIGNUP

export const createUser = async (userObj) => {
  return await UserModel.create(userObj);
};

export const readAllUsers = async () => {
  return await UserModel.find({});
};

export const readOneUser = async (id) => {
  return await UserModel.findById(id);
};

export const updateUser = async (id, updateFields) => {
  return await UserModel.findByIdAndUpdate(id, updateFields, {
    new: true,
  });
};

export const deleteUser = async (id) => {
  return await UserModel.findByIdAndRemove(id);
};

// LOGIN


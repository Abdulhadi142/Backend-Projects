import prisma from "../DB/db.config.js";
import bcrypt from "bcryptjs";

// create user
export const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  const finduser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (finduser) {
    return res.status(400).json({ message: "email allready exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newuser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });

  return res
    .status(200)
    .json({ message: "user created successfully", data: newuser });
};

// get all users
export const getUser = async (req, res) => {
  const getAllUsers = await prisma.user.findMany();

  return res
    .status(200)
    .json({ message: "all user fetched successfully", data: getAllUsers });
};

// get user by Id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const getUser = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res
    .status(200)
    .json({ message: "user fetched successfully ", data: getUser });
};

// update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, password } = req.body;

  const updateUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email: email,
      name: name,
      password: password,
    },
  });

  return res
    .status(200)
    .json({ message: "user updated successfully", data: updateUser });
};




//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
   const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({ message: "User delete successfuly ", data: null });
  } catch (error) {
    return res.status(200).json({ message: " this user is not excist" });
  }
};

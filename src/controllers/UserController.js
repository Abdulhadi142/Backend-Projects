// import prisma from "./src/config/db.js";
import prisma from "../config/db.js";
import bcrypt from "bcrypt";

// create user
// export const CreateUser = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     const FindEmail = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//       // include:{posts:true},       // include post ka data lane k liye
//     });
//     if (FindEmail) {
//       return res.status(400).json({ message: "email already exist" });
//     }

//     const hasdpassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {                                                              // cretae user kuch kam ka nhi h kyu ki user create to 
//         name,                                                              // SIGNUP se hi hota h ye user folder sirf delete read 
//         email,                                                             // update ke kam aata h create to SIGNUP se hi hota h  
//         password: hasdpassword,                                            // ise liye isse create nhi krte 
//       },
//       // include:{posts:true},
//     });
//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     next(error);
//   }
// };

// getallUser
export const getallUser = async (req, res, next) => {
  try {
    const alluser = await prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, data: alluser });
  } catch (error) {
    console.log("error :", error);
    next(error);
  }
};

//getUser by Id
export const getsingleUser = async (req, res, next) => {
  const UserId = Number(req.params.id);
  try {
    const findId = await prisma.user.findUnique({
      where: { id: UserId },
      include: { posts: true },
    });
    if (!findId) {
      throw new Error("User not found");
    }

    const singleuser = await prisma.user.findUnique({
      where: {
        id: UserId,
      },
      include: {
        posts: {
          select: {
            title: true,
          },
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Successfully Fetch single user ", data: singleuser });
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  const userId = Number(req.params.id);

  try {
    const finduser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!finduser) {
      return res.status(400).json({ message: "User not found" });
    }

    const deluser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return res
      .status(200)
      .json({ message: "Successfully delete user ", data: null });
  } catch (error) {
    next(error);
  }
};

//update user
export const updateUser = async (req, res, next) => {
  const userId = Number(req.params.id);
  const { name, email, password } = req.body;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const hasdpassword = await bcrypt.hash(password, 10);

    const upuser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: hasdpassword,
      },
    });
    return res
      .status(200)
      .json({ message: "User Update Successfully", data: upuser });
  } catch (error) {
    next(error);
  }
};

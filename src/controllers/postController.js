import prisma from "../config/db.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    const authorIdInt = Number(authorId);

    const author = await prisma.user.findUnique({
      where: {
        id: authorIdInt,
      },
    });

    if (!author) {
      return res.json({
        message: " Can not find author with this id Try another ",
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: authorIdInt,
      },
    });
    return res
      .status(200)
      .json({ message: "successfully create Post", data: post });
  } catch (error) {
    console.log("error :", error);
    return res.status(400).json({ message: "internal server error" });
  }
};

//get all post

export const getAllpost = async (req, res, next) => {
  try {
    const getall = await prisma.post.findMany({});
    return res
      .status(200)
      .json({ message: "Successfully fetch  allpost ", data: getall });
  } catch (error) {
    next(error);
  }
};

// get by id

export const getbyid = async (req, res, next) => {
  // const {id} = req.params
  const userid = Number(req.params.id);

  try {
    if (isNaN(userid)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const byid = await prisma.post.findUnique({
      where: {
        // id: Number(id)
        id: userid,
      },
    });
    return res
      .status(200)
      .json({ message: "Post fetch successfully", data: byid });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);

   const findpostId = await prisma.post.findUnique({
    where:{
      id:postId,
    },
   })

   if (!findpostId) {
      return res.status(400).json({message:"Can not find post Id"})
   }

    const depost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return res
      .status(200)
      .json({ message: "post delete successfully", data: null });
  } catch (error) {
    next(error);
  }
};

export const Updatepost = async (req, res, next) => {
  const { title, content, authorId } = req.body;
  const postId = Number(req.params.id);
  try {
    const updpost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        // authorId:Number(authorId)
      },
    });
    return res
      .status(200)
      .json({ message: "post update successfully", data: updpost });
  } catch (error) {
    next(error);
  }
};

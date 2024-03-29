const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User } = require("../db");


const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });

const router = Router();

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const userExists = await User.findOne({
    username:req.body.username,
  });
  if (userExists) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });
  const user_id = user._id;

  const token = jwt.sign({ user_id }, JWT_SECRET);
  return res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin",async (req,res)=>{
    const {success}=signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while logging in"
        });
      }
    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
    const userId=user._id
    const token=jwt.sign({userId},JWT_SECRET);
    return res.status(200).json({
        token: token,
      });
    }
    return res.status(411).json({
        message: "Error while logging in"
    });
} )

module.exports = router;

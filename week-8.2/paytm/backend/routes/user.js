const { Router } = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

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
const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

const router = Router();

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const userExists = await User.findOne({
    username: req.body.username,
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
  console.log(user)
  const userId = user._id;
  await Account.create({
    userId:userId,
    balance:1+Math.random()*10000
  })

  const token = jwt.sign({ userId }, JWT_SECRET);
  return res.status(200).json({
    message: "User created successfully",
    token: token,
    userInfo:{
      firstName:req.body.firstName,
      lastName: req.body.lastName,
    }
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.status(200).json({
      token: token,
      userInfo:{
        firstName:user.firstName,
        lastName: user.lastName,
      }
    });
  }
  return res.status(411).json({
    message: "Error while logging in",
  });
});


router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Error while updating information"
      });
    }
  const userId = req.userId;
  await User.updateOne(
    {
      _id: userId,
    },
    req.body
  );
  res.status(200).json({
    message: "Updated successfully"

  })
});

router.get("/bulk",authMiddleware,async (req,res)=>{
    const name=req.query.filter|| ""

    const users=await User.find({
      $or: [
        { firstName: { "$regex": name, "$options": "i" } },
        { lastName: { "$regex": name, "$options": "i" } },
    ]
    })
    
    res.status(200).json({
       user: users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;

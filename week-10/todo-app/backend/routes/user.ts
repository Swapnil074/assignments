const { Router } = require("express");
import zod from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  name: zod.string(),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const router = Router();

router.post("/signup", async (req: any, res: any) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const userExists = await prisma.user.findFirst({
    where: {
      username: req.body.username,
    },
  });
  if (userExists) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
      name: req.body.password,
    },
  });
  const userId = user.id;
  return res.status(200).json({
    userId,
  });
});

router.post('/signin', async (req:any,res:any)=>{
    const {success} = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
          message: "Incorrect inputs",
        });
}

const user = await prisma.user.findFirst({
    where:{
        username:req.body.username,
        password:req.body.password
    }
})  
console.log(user)
if(user)
return res.status(200).json({user})
return res.status(411).json({
    message: 'Error while logging in'
})

})

module.exports = router;

const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db");
const jwt=require('jsonwebtoken')
const JWT_SECRET=require('../config')

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
  
    await User.create({
      username: username,
      password: password,
    });
    res.json({
      msg: "user created succesfully",
    });
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user=await User.find({
        username,
        password
    })
    if(user){
    const token=jwt.sign({
        username:username
    },JWT_SECRET)
    res.json({token:token})
}
else{
    res.json({
        message:'user not found'
    })
}

});

router.get("/courses", async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
      courses: response,
    });
  });
  
  router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
  
    await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
  
    res.json({
      message: "Course purchased successfully",
    });
  });
  
  router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const user = await User.findOne({
      username: username,
    });
    const courses = await Course.find({
      _id:{
          "$in":user.purchasedCourses
      }
    })
    res.json({purchasedCourses: courses})
  });

module.exports = router
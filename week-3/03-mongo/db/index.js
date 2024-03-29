const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://swapnil:esXpcdLC9eIcQ5fa@cluster0.nkdjgy8.mongodb.net/course-selling_app');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password:String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here.
    username:String,
    password:String,
    purchasedCourses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'  
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    descrition:String,
    price: Number,
    imageLink:String,

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
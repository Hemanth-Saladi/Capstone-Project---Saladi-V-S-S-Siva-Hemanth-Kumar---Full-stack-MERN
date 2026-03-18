require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const enrollmentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    courseName: String
});

const User = mongoose.model("User", userSchema);
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

async function fetchData() {
    try {
        const users = await User.find();
        const enrollments = await Enrollment.find();

        console.log("Users:");
        console.log(users);

        console.log("Enrollments:");
        console.log(enrollments);
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.connection.close();
    }
}

fetchData();
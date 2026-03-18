const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "skillsphere.sqlite"
});

const Instructor = sequelize.define("Instructor", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Course = sequelize.define("Course", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Instructor.hasMany(Course, { foreignKey: "instructorId" });
Course.belongsTo(Instructor, { foreignKey: "instructorId" });

async function runDemo() {
    try {
        await sequelize.sync({ force: true });

        const instructor = await Instructor.create({ name: "John Smith" });

        await Course.create({ title: "Node.js Mastery", instructorId: instructor.id });
        await Course.create({ title: "Advanced Express", instructorId: instructor.id });

        const courses = await Course.findAll({
            where: { instructorId: instructor.id }
        });

        console.log(`Courses by ${instructor.name}:`);
        console.log(courses.map(course => course.title));
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
}

runDemo();
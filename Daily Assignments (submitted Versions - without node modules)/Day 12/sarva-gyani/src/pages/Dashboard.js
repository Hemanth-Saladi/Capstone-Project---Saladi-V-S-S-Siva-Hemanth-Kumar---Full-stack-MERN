import React from "react";
import CourseCard from "../components/CourseCard";
import TaskList from "../components/TaskList";

function Dashboard({ openCourse }) {

    const recentCourses = [
        {
            id: 1,
            title: "MERN Stack Mastery",
            progress: "60%",
            instructor: "Rahul Sharma"
        },
        {
            id: 2,
            title: "Advanced React Patterns",
            progress: "30%",
            instructor: "Anita Verma"
        }
    ];

    return (
        <div className="container mt-4">

            <h3 className="section-title">Recent Courses</h3>

            <div className="row">

                {recentCourses.map(course => (
                    <div className="col-md-6" key={course.id}>
                        <CourseCard course={course} openCourse={openCourse} />
                    </div>
                ))}

            </div>

            <TaskList />

        </div>
    );
}

export default Dashboard;
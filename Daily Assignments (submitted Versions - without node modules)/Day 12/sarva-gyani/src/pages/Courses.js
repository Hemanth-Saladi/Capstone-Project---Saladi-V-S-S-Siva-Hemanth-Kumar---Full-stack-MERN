import React from "react";
import CourseCard from "../components/CourseCard";

function Courses({ openCourse }) {

    const courses = [
        { id: 1, title: "MERN Stack Mastery", progress: "60%", instructor: "Rahul Sharma" },
        { id: 2, title: "React Performance Optimization", progress: "10%", instructor: "Neha Gupta" },
        { id: 3, title: "Node.js Backend Engineering", progress: "25%", instructor: "Amit Joshi" }
    ];

    return (

        <div className="container mt-4">

            <h3 className="section-title">All Courses</h3>

            <div className="row">

                {courses.map(c => (
                    <div className="col-md-4" key={c.id}>
                        <CourseCard course={c} openCourse={openCourse} />
                    </div>
                ))}

            </div>

        </div>

    );
}

export default Courses;
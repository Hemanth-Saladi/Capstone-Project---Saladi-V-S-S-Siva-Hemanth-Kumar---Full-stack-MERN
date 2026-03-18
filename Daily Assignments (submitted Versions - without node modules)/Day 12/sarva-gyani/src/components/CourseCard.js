import React from "react";

function CourseCard({ course, openCourse }) {

    return (
        <div className="card course-card shadow-sm">

            <div className="card-body">

                <h5>{course.title}</h5>

                <p>Instructor: {course.instructor}</p>

                <p>Progress: {course.progress}</p>

                <button className="btn btn-primary" onClick={() => openCourse(course)}>
                    View Modules
                </button>

            </div>

        </div>
    );
}

export default CourseCard;
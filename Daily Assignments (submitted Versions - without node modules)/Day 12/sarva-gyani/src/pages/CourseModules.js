import React from "react";

function CourseModules({ course }) {

    const modules = [
        "HTML & CSS Fundamentals",
        "JavaScript ES6",
        "React Basics",
        "Node.js APIs",
        "MongoDB Integration"
    ];

    return (

        <div className="container mt-4">

            <h3>{course.title}</h3>

            <ul className="list-group mt-3">

                {modules.map((m, i) => (
                    <li key={i} className="list-group-item">{m}</li>
                ))}

            </ul>

        </div>

    );
}

export default CourseModules;
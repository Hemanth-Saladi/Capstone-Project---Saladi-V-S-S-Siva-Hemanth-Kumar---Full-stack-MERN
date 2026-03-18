import React from "react";

function TaskList() {

    const tasks = [
        { task: "Complete React Hooks module", deadline: "Tomorrow" },
        { task: "Submit MongoDB assignment", deadline: "2 days" },
        { task: "Finish Node.js API project", deadline: "5 days" }
    ];

    return (

        <div className="mt-5">

            <h3 className="section-title">To-Do Tasks</h3>

            <ul className="list-group">

                {tasks.map((t, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between">
                        <span>{t.task}</span>
                        <span className="badge bg-danger">{t.deadline}</span>
                    </li>
                ))}

            </ul>

        </div>

    );
}

export default TaskList;
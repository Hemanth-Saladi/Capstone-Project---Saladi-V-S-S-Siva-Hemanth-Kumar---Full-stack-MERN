import React from "react";

function Navbar({ navigate, notify }) {

    return (
        <nav className="navbar navbar-dark bg-dark px-4">

            <span className="navbar-brand">Sarva-Gyani</span>

            <div>

                <button className="btn btn-outline-light me-2" onClick={() => navigate("dashboard")}>
                    Dashboard
                </button>

                <button className="btn btn-outline-light me-2" onClick={() => navigate("courses")}>
                    Courses
                </button>

                <button className="btn btn-warning" onClick={notify}>
                    Notification
                </button>

            </div>

        </nav>
    );
}

export default Navbar;
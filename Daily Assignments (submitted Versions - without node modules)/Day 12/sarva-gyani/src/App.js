import React, { Suspense, lazy, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import PortalModal from "./components/PortalModal";

const CourseModules = lazy(() => import("./pages/CourseModules"));

function App() {

  const [page, setPage] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function openCourse(course) {
    setSelectedCourse(course);
    setPage("modules");
  }

  return (
    <div>

      <Navbar navigate={setPage} notify={() => setShowModal(true)} />

      {page === "dashboard" && <Dashboard openCourse={openCourse} />}

      {page === "courses" && <Courses openCourse={openCourse} />}

      <Suspense fallback={<div className="loader">Loading Module...</div>}>

        {page === "modules" && <CourseModules course={selectedCourse} />}

      </Suspense>

      {showModal && <PortalModal close={() => setShowModal(false)} />}

    </div>
  );
}

export default App;
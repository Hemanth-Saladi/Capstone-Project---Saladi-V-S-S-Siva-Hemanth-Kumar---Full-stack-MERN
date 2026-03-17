import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Admin/AdminNavbar";
import ActivitySidebar from "../components/Admin/ActivitySidebar";
import Queue from "../components/Queue/Queue";
import Player from "../components/Player/Player";

const AdminLayout = () => {
  return (
    <div className="app-shell">
      <AdminNavbar />
      <div className="app-main">
        <ActivitySidebar />
        <main className="page-content admin-page">
          <Outlet />
        </main>
        <Queue />
      </div>
      <Player />
    </div>
  );
};

export default AdminLayout;
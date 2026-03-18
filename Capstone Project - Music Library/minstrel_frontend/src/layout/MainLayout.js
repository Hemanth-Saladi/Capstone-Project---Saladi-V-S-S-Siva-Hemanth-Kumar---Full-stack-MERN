import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Player from "../components/Player/Player";
import Queue from "../components/Queue/Queue";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-main">
        <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
        <Queue />
      </div>
      <Player />
    </div>
  );
};

export default MainLayout;
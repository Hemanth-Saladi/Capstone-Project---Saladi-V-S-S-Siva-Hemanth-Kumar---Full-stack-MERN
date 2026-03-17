import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import LikedSongs from "./pages/likedSongs/LikedSongs";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import ArtistPage from "./pages/ArtistPage/ArtistPage";

import StartPage from "./pages/Auth/StartPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import AdminLogin from "./pages/Auth/AdminLogin";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/AdminHome";
import UploadSong from "./pages/Admin/UploadSong";
import UploadArtist from "./pages/Admin/UploadArtist";
import ManageSongs from "./pages/Admin/ManageSongs";
import ManageArtists from "./pages/Admin/ManageArtists";
import AdminAnalytics from "./pages/Admin/AdminAnalytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="upload-song" element={<UploadSong />} />
          <Route path="upload-artist" element={<UploadArtist />} />
          <Route path="songs" element={<ManageSongs />} />
          <Route path="artists" element={<ManageArtists />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
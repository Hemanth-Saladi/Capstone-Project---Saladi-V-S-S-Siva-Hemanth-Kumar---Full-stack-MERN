import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    api.get(`/albums/${id}`)
      .then((res) => {
        setAlbum(res.data.album);
        setSongs(res.data.songs || []);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div className="panel">
      <h2>{album?.title || "Album"}</h2>
      <MediaGrid title="Songs" items={songs} />
    </div>
  );
};

export default AlbumPage;
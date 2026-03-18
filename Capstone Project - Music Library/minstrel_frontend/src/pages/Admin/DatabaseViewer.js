import { useEffect, useState } from "react";
import API from "../../services/api";

const DatabaseViewer = () => {

  const [tab, setTab] = useState("songs");
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {

    const res = await API.get(`/admin/${tab}`);
    setData(res.data);

  };

  return (

    <div className="database-page">

      <h2>Database Manager</h2>

      <div className="db-tabs">

        <button onClick={() => setTab("songs")}>Songs</button>
        <button onClick={() => setTab("artists")}>Artists</button>
        <button onClick={() => setTab("albums")}>Albums</button>
        <button onClick={() => setTab("users")}>Users</button>

      </div>

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr key={item._id}>

              <td>{item.name || item.title}</td>
              <td>{item.artist?.name || "-"}</td>
              <td>{item.album?.title || "-"}</td>

              <td>
                <button>Edit</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default DatabaseViewer;
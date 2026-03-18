import SongCard from "../SongCard/SongCard";

const MediaGrid = ({ title, items = [] }) => (
  <section className="section">
    <h2>{title}</h2>
    <div className="grid">
      {items.map((item) => (
        <SongCard key={item._id} song={item} />
      ))}
    </div>
  </section>
);

export default MediaGrid;
const AlbumCard = ({ album }) => {

    return (

        <div className="album-card">

            <img src={album.cover} alt="album" />

            <h4>{album.title}</h4>

        </div>

    );

};

export default AlbumCard;
const ArtistCard = ({ artist }) => {

    return (

        <div className="artist-card">

            <img src={artist.image} alt="artist" />

            <h4>{artist.name}</h4>

        </div>

    );

};

export default ArtistCard;
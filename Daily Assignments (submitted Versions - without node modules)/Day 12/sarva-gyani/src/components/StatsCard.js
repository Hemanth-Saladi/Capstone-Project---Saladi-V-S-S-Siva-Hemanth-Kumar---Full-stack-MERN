import React from "react";

const StatsCard = React.memo(function StatsCard({ title, value }) {

    console.log(title + " rendered");

    return (
        <div className="card stats-card">
            <div className="card-body text-center">
                <h5>{title}</h5>
                <h3>{value}</h3>
            </div>
        </div>
    );
});

export default StatsCard;
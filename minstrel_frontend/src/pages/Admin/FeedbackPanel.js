import { useEffect, useState } from "react";
import API from "../../services/api";

const FeedbackPanel = () => {

    const [feedback, setFeedback] = useState([]);

    useEffect(() => {

        loadFeedback();

    }, [])

    const loadFeedback = async () => {

        const res = await API.get("/feedback");

        setFeedback(res.data);

    }

    return (

        <div>

            <h2>User Feedback</h2>

            {feedback.map(f => (
                <div key={f._id} className="feedback-card">

                    <p>{f.message}</p>

                    <span>{f.user?.email}</span>

                </div>
            ))}

        </div>

    )

}

export default FeedbackPanel;
import React from "react";
import ReactDOM from "react-dom";

function PortalModal({ close }) {

    return ReactDOM.createPortal(

        <div className="portal-overlay">

            <div className="portal-box">

                <h4>Reminder</h4>

                <p>Complete today's MERN learning tasks.</p>

                <button className="btn btn-danger" onClick={close}>
                    Close
                </button>

            </div>

        </div>,

        document.body

    );

}

export default PortalModal;
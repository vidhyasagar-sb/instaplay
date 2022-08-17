import React, { useEffect } from "react";
import "./modal.scss";

const Modal = ({ closeModal, videoKey }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeModal(false);
      }
    };
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [closeModal]);

  return (
    <div className="modalBackground " onClick={() => closeModal(false)}>
      <div className="modalContainer">
        <div className="closeBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <iframe
          width="800"
          height="450"
          src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;

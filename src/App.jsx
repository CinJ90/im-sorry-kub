import React, { useState } from "react";
import "./App.css";
import sorry1 from "/src/assets/sorry1.webp";
import sorry2 from "/src/assets/sorry2.jpeg";
import sorry3 from "/src/assets/sorry3.jpg";
import besitoGif from "/src/assets/besito-catlove.gif";

const App = () => {
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: "auto", left: "auto" });
  const [noClickCount, setNoClickCount] = useState(0);
  const [isYesClicked, setIsYesClicked] = useState(false);

  // Function to handle "Yes" button click
  const handleYesClick = () => {
    setIsYesClicked(true);
  };

  // Function to handle "No" button hover
  const handleNoHover = () => {
    const randomTop = Math.random() * 80 + 10;
    const randomLeft = Math.random() * 80 + 10;
    setNoButtonPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  // Function to handle "No" button click (also make Yes bigger)
  const handleNoClick = (e) => {
    e.preventDefault();
    handleNoHover();
    setYesButtonSize((prevSize) => prevSize + 0.2);
    setNoClickCount((prevCount) => prevCount + 1);
  };

  // Determine which image to display
  const getImageSrc = () => {
    const imageSequence = [sorry1, sorry2, sorry3];
    return imageSequence[noClickCount % 3];
  };

  // Success screen
  if (isYesClicked) {
    return (
      <div className="app success-screen">
        <h1>Yay! 🎉❤️</h1>
        <img src={besitoGif} alt="Celebration" className="besito-gif" />
        <p>You made me the happiest! 💕</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Will you forgive me? ❤️</h1>
      <div></div>
      <img src={getImageSrc()} alt="Valentine" className="sorry-image" />
      <div className="buttons">
        <button
          className="yes-button"
          style={{ transform: `scale(${yesButtonSize})` }}
          onClick={handleYesClick}
        >
          Yes
        </button>
        <button
          className="no-button"
          style={
            noButtonPosition.top !== "auto"
              ? {
                  position: "fixed",
                  top: noButtonPosition.top,
                  left: noButtonPosition.left,
                  transform: "translate(-50%, -50%)",
                }
              : {}
          }
          onMouseEnter={handleNoHover}
          onMouseMove={handleNoHover}
          onClick={handleNoClick}
          onTouchStart={handleNoHover}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default App;
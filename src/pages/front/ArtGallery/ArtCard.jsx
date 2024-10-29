// ArtCard.jsx
import React from "react";
//import "./ArtCard.css";

const ArtCard = ({ art }) => (
  <div className="art-card">
    <img src={art.image} alt={art.title} className="art-image" />
    <h3 className="art-title">{art.title}</h3>
    <p className="artist-name">By {art.artist}</p>
    <div className="compliment-section">
      <button className="compliment-button">💖 Compliment</button>
      <span>{art.compliments} Compliments</span>
    </div>
  </div>
);

export default ArtCard;

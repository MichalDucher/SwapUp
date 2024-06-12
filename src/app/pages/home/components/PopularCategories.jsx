import React from 'react';
import './styles/PopularCategories.css'; // Importa il file CSS

const PopularCategories = () => (
  <div className="popular-categories-section">
    <h2>Popular Categories:</h2>
    <div className="popular-categories-grid">
      <div className="popular-category-item">
        <img src="../../../../../src/assets/Libri.png" alt="Libri" />
        <span>Books</span>
      </div>
      <div className="popular-category-item">
        <img src="../../../../../src/assets/Film.png" alt="Film" />
        <span>Movies</span>
      </div>
      <div className="popular-category-item">
        <img src="../../../../../src/assets/Musica.png" alt="Musica" />
        <span>Music</span>
      </div>
      <div className="popular-category-item">
        <img src="../../../../../src/assets/cassette.jpg" alt="Cassette" />
        <span>Cassetes</span>
      </div>
      {/* Aggiungi altre categorie qui */}
    </div>
  </div>
);

export default PopularCategories;


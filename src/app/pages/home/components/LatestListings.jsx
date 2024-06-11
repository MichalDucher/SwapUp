import React from 'react';
import './styles/LatestListings.css'; // Importujemy plik CSS

const LatestListings = () => (
  <div className="latest-listings">
    <h2 className="mb-4">Latest Listings</h2> {/* Dodajemy klasę "mb-4" dla marginesu na dole */}
    <ul className="list-group">
      <li className="list-group-item">Peter Pan</li> {/* Używamy klasy "list-group-item" dla każdego elementu listy */}
      <li className="list-group-item">Peter Pan 2</li>
      <li className="list-group-item">Peter Pan 3</li>
      {/* Możesz dynamicznie renderować elementy na podstawie danych */}
    </ul>
  </div>
);

export default LatestListings;

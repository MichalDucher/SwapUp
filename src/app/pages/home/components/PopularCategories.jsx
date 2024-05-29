import React from 'react';
import './styles/PopularCategories.css'; // Importujemy plik CSS

const PopularCategories = () => (
  <div className="popular-categories">
    <h2 className="mb-4">Popular Categories</h2> {/* Dodajemy klasę "mb-4" dla marginesu na dole */}
    <ul className="list-group">
      <li className="list-group-item">Books</li> {/* Używamy klasy "list-group-item" dla każdego elementu listy */}
      <li className="list-group-item">Music</li>
      <li className="list-group-item">Art</li>
      {/* Możesz dynamicznie renderować elementy na podstawie danych */}
    </ul>
  </div>
);

export default PopularCategories;

import React from 'react';
import './styles/Banner.css'; // Importujemy plik CSS

const Banner = () => (
  <div className="jumbotron banner"> {/* Dodajemy klasę "jumbotron" dla ładnego wyglądu */}
    <div className="container"> {/* Dodajemy klasę "container" dla responsywnego wyświetlania */}
      <h1 className="display-4">Welcome to Swap-Up</h1> {/* Używamy klasy "display-4" dla większego nagłówka */}
      <p className="lead">Discover and exchange cultural goods with others!</p> {/* Używamy klasy "lead" dla większego tekstu */}
    </div>
  </div>
);

export default Banner;

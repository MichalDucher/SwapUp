import React, { useEffect, useState } from 'react';
import './styles/LatestListings.css'; // Importujemy plik CSS
import { ITEMS_URL } from '../../../data/api'; // Importujemy URL API

const LatestListings = () => {
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(ITEMS_URL);
        const data = await response.json();
        const randomItems = selectRandomItems(data, 3); // Wybieramy trzy losowe oferty
        setLatestItems(randomItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const selectRandomItems = (items, count) => {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div className="latest-listings">
      <h2 className="mb-4">Latest Listings</h2> {/* Dodajemy klasę "mb-4" dla marginesu na dole */}
      <ul className="list-group">
        {latestItems.map(item => (
          <li key={item.id} className="list-group-item">
            {item.name} - ${item.price} {/* Wyświetlamy nazwę i cenę produktu */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestListings;

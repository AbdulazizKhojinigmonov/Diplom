import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardPage.css';

const CardPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=tuned-ranking&rentFrequency=monthly&categoryExternalID=4',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
              'x-rapidapi-host': 'bayut.p.rapidapi.com',
            },
          }
        );
        const data = await res.json();
        setProperties(data?.hits || []);
      } catch (error) {
        console.error('Ошибка загрузки свойств:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="card-page">
      <h1 className="card-title">Доступная недвижимость</h1>
      <div className="card-grid">
        {properties.map((property) => (
          <div
            key={property.id}
            className="property-card"
            onClick={() => handleCardClick(property.externalID)}
          >
            <img
              src={property.coverPhoto?.url}
              alt={property.title}
              className="property-image"
            />
            <div className="property-info">
              <h3>{property.title || 'Без названия'}</h3>
              <p>{property.price}$ / {property.rentFrequency}</p>
              <p>{property.rooms} комн. · {property.baths} ванн. · {property.area.toFixed(0)} м²</p>
              <p>{property.location?.[0]?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPage;

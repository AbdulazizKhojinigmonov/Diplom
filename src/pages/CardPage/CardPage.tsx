import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardPage.css';

const CardPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null); // Сброс ошибки перед каждым новым запросом

      try {
        const res = await fetch(
          `https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=tuned-ranking&rentFrequency=monthly&categoryExternalID=4&query=${searchQuery}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
              'x-rapidapi-host': 'bayut.p.rapidapi.com',
            },
          }
        );
        
        // Проверка ответа на успешность
        if (!res.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        const data = await res.json();
        if (data?.hits?.length === 0) {
          setError('Нет доступных свойств для вашего запроса');
        } else {
          setProperties(data.hits || []);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Ошибка загрузки свойств');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchQuery]); // Перезапускаем запрос при изменении searchQuery

  const handleCardClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(e.currentTarget.querySelector('input')?.value || '');
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="card-page">
      <h1 className="card-title">Доступная недвижимость</h1>

      {/* Форма поиска */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Поиск недвижимости"
          className="search-input"
        />
        <button type="submit">Поиск</button>
      </form>

      <div className="card-grid">
        {properties.length === 0 ? (
          <div>Нет доступных свойств.</div>
        ) : (
          properties.map((property) => (
            <div
              key={property.id}
              className="property-card"
              onClick={() => handleCardClick(property.externalID)}
            >
              <img
                src={property.coverPhoto?.url || 'fallback-image-url'}
                alt={property.title || 'Без названия'}
                className="property-image"
              />
              <div className="property-info">
                <h3>{property.title || 'Без названия'}</h3>
                <p>{property.price}$ / {property.rentFrequency}</p>
                <p>
                  {property.rooms} комн. · {property.baths} ванн. · {property.area ? property.area.toFixed(0) : 'N/A'} м²
                </p>
                <p>{property.location?.[0]?.name || 'Неизвестное местоположение'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardPage;

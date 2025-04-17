import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyDetails, fetchAgenciesByQuery } from "../../services/api";
import "./PropertyDetailsPage.css";

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const propertyData = await fetchPropertyDetails(id || "");
        setProperty(propertyData);

        const agencyName = propertyData?.agency?.name;
        if (agencyName) {
          const agencyData = await fetchAgenciesByQuery(agencyName);
          setAgencies(agencyData || []);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div className="loader">Загрузка...</div>;
  if (!property) return <div>Данные не найдены</div>;

  return (
    <div className="page-container">
      <div className="property-details-box">
        <div className="property-slider">
          {property.photos?.slice(0, 10).map((photo: any, index: number) => (
            <img
              key={index}
              src={photo.url}
              alt={`Photo ${index}`}
              onClick={() => setSelectedImage(photo.url)}
              className="slider-thumbnail"
            />
          ))}
        </div>

        <div className="property-info">
          <h2>{property.title}</h2>
          <p className="price">${property.price} / {property.rentFrequency}</p>
          <p className="details">
            Комнат: {property.rooms} | Ванных: {property.baths} | Площадь: {Math.round(property.area)} m²
          </p>
          <p className="description">
            {readMore ? property.description : `${property.description.slice(0, 200)}... `}
            {property.description.length > 200 && (
              <button className="read-more" onClick={() => setReadMore(!readMore)}>
                {readMore ? "Скрыть" : "Читать далее"}
              </button>
            )}
          </p>
        </div>

        <div className="agency-section">
          <h3>Агентства:</h3>
          {agencies.length > 0 ? (
            agencies.map((agency) => (
              <div key={agency.id} className="agency-card">
                <img src={agency.logo?.url} alt={agency.name} className="agency-logo" />
                <p>{agency.name}</p>
                <p>{agency.phoneNumber?.mobile}</p>
              </div>
            ))
          ) : (
            <p>Агентства не найдены</p>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full View" />
            <button className="close-btn" onClick={() => setSelectedImage(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;

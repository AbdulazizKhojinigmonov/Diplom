import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestions = async (search: string) => {
    if (!search) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://bayut.p.rapidapi.com/auto-complete?query=${search}&hitsPerPage=5&page=0&lang=en`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": "bayut.p.rapidapi.com",
          },
        }
      );

      const data = await res.json();
      setResults(data.hits || []);
    } catch (err) {
      console.error("Ошибка получения данных:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (item: any) => {
    navigate("/card", { state: { item } });
  };

  return (
    <div className="searchbox-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Поиск недвижимости..."
        className="input-field"
      />
      {loading && <div className="loading">Загрузка...</div>}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((item, index) => (
            <li
              key={index}
              className="search-item"
              onClick={() => handleSelect(item)}
            >
              {item.name || item.slug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;

// services/api.ts

export const fetchSuggestions = async (query: string) => {
  const url = `https://bayut.p.rapidapi.com/auto-complete?query=${encodeURIComponent(query)}&hitsPerPage=25&page=0&lang=en`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "bayut.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Ошибка получения данных");
  const data = await res.json();
  return data.hits;
};

// Получение деталей недвижимости 
export const fetchPropertyDetails = async (externalID: string) => {
  const url = `https://bayut.p.rapidapi.com/properties/detail?externalID=${externalID}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': 'bayut.p.rapidapi.com'
    }
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Ошибка при получении деталей недвижимости');
  return await res.json();
};

// Поиск агентств по ключевому слову (например "patriot")
export const fetchAgenciesByQuery = async (query: string) => {
  const url = `https://bayut.p.rapidapi.com/agencies/list?query=${encodeURIComponent(query)}&hitsPerPage=25&page=0&lang=en`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': 'bayut.p.rapidapi.com'
    }
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Ошибка при получении агентств');
  const data = await res.json();
  return data.hits;
};
//Он возвращает список объектов недвижимости, опубликованных конкретным агентством.
export const fetchListingsByAgency = async (agencySlug: string) => {
  const url = `https://bayut.p.rapidapi.com/agencies/get-listings?hitsPerPage=4&page=0&lang=en&agencySlug=${encodeURIComponent(agencySlug)}&sort=price-asc`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": "bayut.p.rapidapi.com",
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Ошибка получения объектов агентства");
  const data = await res.json();
  return data.hits;
};

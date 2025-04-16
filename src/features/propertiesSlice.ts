import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный запрос к API
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (searchQuery: string = ""): Promise<any[]> => {
    const options = {
      method: "GET",
      url: "https://bayut.p.rapidapi.com/properties/list",
      params: {
        locationExternalIDs: "5002,6020", // Дубай
        purpose: "for-sale",
        hitsPerPage: "10",
        page: "1",
        lang: "en",
        sort: "city-level-score",
        rentFrequency: "monthly",
        categoryExternalID: "4",
        query: searchQuery, // Фильтр по поисковому запросу
      },
      headers: {
        "X-RapidAPI-Key": "ТВОЙ_API_KEY", // Вставь свой ключ!
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    };

    const response = await axios.request<{ hits: any[] }>(options);
    return response.data.hits;
  }
);

interface PropertiesState {
  list: any[];
  status: string;
  error: string | null;
}

const initialState: PropertiesState = {
  list: [],
  status: "idle",
  error: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default propertiesSlice.reducer;

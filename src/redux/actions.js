import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BaseURL = "http://localhost:7000";

export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await axios.get(`${BaseURL}/cards`);
  return response.data;
});

export const createCards = createAsyncThunk(
  "cards/createCards",
  async (formData) => {
    const response = await axios.post(`${BaseURL}/cards`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async ({ _id, formData }) => {
    const response = await axios.put(`${BaseURL}/cards/${_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const deleteCard = createAsyncThunk("cards/deleteCard", async (id) => {
  await axios.delete(`${BaseURL}/cards/${id}`);
  return id;
});

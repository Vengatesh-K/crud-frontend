import { createAsyncThunk } from "@reduxjs/toolkit/dist";
import axios from "axios";


export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const createCards = createAsyncThunk("cards/createCards", async (data) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    data

  );
  return response.data;
});
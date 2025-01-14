import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.UNSPLASH_API_URL,
});

export const API_KEY = process.env.API_KEY;
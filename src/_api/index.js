// src/_services/API.js
import axios from "axios";

// Ganti sesuai alamat backend kamu
const url = "http://127.0.0.1:8000";

// Buat instance axios untuk komunikasi dengan backend Laravel
export const API = axios.create({
  baseURL: `${url}/api`,
});

// Jika kamu menyimpan file gambar buku di storage Laravel
export const bookImageStorage = `${url}/storage/books`;

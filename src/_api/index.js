import axios from "axios";

// const url = "http://akmal-bc.karyakreasi.id/api";
const url = "http://127.0.0.1:8000";

export const API = axios.create({
  // baseURL: "https://akmal-bc.karyakreasi.id/api",
  baseURL: `${url}/api`,
});

export const bookImageStorage = `${url}/storage/books`;

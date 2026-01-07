import axios from "axios";
import { baseUrl } from "../constant/baseUrl";


const getAuthConfig = (token) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
});


export const loginUser = async (email, password) => {
    const { data } = await axios.post(`${baseUrl}api/auth/login`, { email, password });
    return data;
}

export const registerUser = async (email, password) => {
    const { data } = await axios.post(`${baseUrl}api/auth/register`, { email, password });
    return data;
};


export const fetchUrls = async (token) => {
  const { data } = await axios.get(`${baseUrl}api/url`, getAuthConfig(token));
  return data;
};


export const shortenUrl = async (originalUrl, token) => {
  const { data } = await axios.post(
    `${baseUrl}api/url/shorten`,
    { originalUrl },
    getAuthConfig(token)
  );
  return data;
};

export const deleteUrl = async (id, token) => {
  await axios.delete(`${baseUrl}api/url/${id}`, getAuthConfig(token));
};

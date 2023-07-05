import axios from "./axios.js";

export const getBitesRequest = async (page = 1, limit = 10) => {
  const { data } = await axios.get(`/bites?page=${page}&limit=${limit}`);
  return data;
};

export const getBiteRequest = async (id) => {
  const { data } = await axios.get(`/bites/${id}`);
  return data;
};

export const addBiteRequest = async (bite) => {
  const { data } = await axios.post("/bites", bite);
  return data;
};

export const updateBiteRequest = async (bite) => {
  const { data } = await axios.put(`/bites/${bite._id}`, bite);
  return data;
};

export const deleteBiteRequest = async (id) => {
  const { data } = await axios.delete(`/bites/${id}`);
  return data;
};

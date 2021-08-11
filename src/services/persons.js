import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw error.request
    } else {
      throw error;
    }
  }
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id, newObject) => {
  const response = await axios.delete(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default { getAll, create, update, remove };

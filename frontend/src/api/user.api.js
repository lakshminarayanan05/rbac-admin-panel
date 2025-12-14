import axios from 'axios';
import { getToken } from '../utils/auth';

const baseURL = 'http://localhost:3000';

export const fetchUsers = async () => {
  const res = await axios.get(`${baseURL}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const createUser = async (values) => {
  const res = await axios.post(`${baseURL}/users`, values, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${baseURL}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};


export const deleteUser = async (id) => {
  const res = await axios.delete(`${baseURL}/users/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const assignRole = async (userId, roleId) => {
  const res = await axios.post(`${baseURL}/users/assign-role`, { userId, roleId }, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const removeRole = async (userId, roleId) => {
  const res = await axios.post('http://localhost:3000/users/remove-role', { userId, roleId }, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};
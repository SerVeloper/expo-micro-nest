// src/api/events.js
import axios from 'axios'

const API_URL = 'http://localhost:3001/events'

export const getAllEvents = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

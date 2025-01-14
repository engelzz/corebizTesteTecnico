import axios from 'axios';

const API_KEY = '0gREHHpKtS4RX00cFzeeAtq5UrhL5uTVTMBLOaKi4MA';
const BASE_URL = 'https://api.unsplash.com';

export const getImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/photos/random`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
      params: {
        count: 20
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    return [];
  }
};
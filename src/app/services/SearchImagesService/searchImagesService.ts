import axios from 'axios';

const API_KEY = '0gREHHpKtS4RX00cFzeeAtq5UrhL5uTVTMBLOaKi4MA';
const BASE_URL = 'https://api.unsplash.com';

export const searchImages = async (query: string, page: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
      params: {
        query,
        page,
        per_page: 20,
      },
    });
    console.log(
      JSON.stringify(response.data.results, null, 2)
  );
      return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    return [];
  }
};
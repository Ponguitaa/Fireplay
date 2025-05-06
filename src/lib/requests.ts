import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

interface GameQueryParams {
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  dates?: string;
  platforms?: string;
  rating_min?: number;
  rating_max?: number;
}

export async function getGames(params: GameQueryParams = {}) {
  try {
    const queryParams = new URLSearchParams({
      key: API_KEY || '',
      ...params,
      page_size: params.page_size?.toString() || '20'
    });
    
    // Convertir parámetros numéricos a string
    if (params.page) queryParams.set('page', params.page.toString());
    if (params.rating_min) queryParams.set('rating_min', params.rating_min.toString());
    if (params.rating_max) queryParams.set('rating_max', params.rating_max.toString());
    
    const url = `${API_URL}/games?${queryParams.toString()}`;
    const { data } = await axios.get(url);
    
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous
    };
  } catch (error) {
    console.error('Error fetching games:', error);
    return { results: [], count: 0, next: null, previous: null };
  }
}

export async function getSearchedGames(query: string, page: number = 1) {
  return getGames({ 
    search: query,
    page 
  });
}

export async function getGameDetails(slug: string) {
  try {
    const url = `${API_URL}/games/${slug}?key=${API_KEY}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
}

export async function getGameScreenshots(id: number) {
  try {
    const url = `${API_URL}/games/${id}/screenshots?key=${API_KEY}`;
    const { data } = await axios.get(url);
    return data.results;
  } catch (error) {
    console.error('Error fetching game screenshots:', error);
    return [];
  }
}
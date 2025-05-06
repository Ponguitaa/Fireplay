export interface Game {
    id: number;
    slug: string;
    name: string;
    background_image: string;
    rating: number;
    metacritic?: number;
    released?: string;
    genres?: { id: number; name: string; }[];
}

export interface GameDetails {
    id: number;
    name: string;
    slug: string;
    description: string;
    description_raw?: string;
    rating: number;
    background_image: string;
    background_image_additional?: string;
    website: string;
    platforms: { 
      platform: { name: string };
      requirements_en?: { minimum?: string; recommended?: string; } | string;
      requirements_ru?: { minimum?: string; recommended?: string; } | string;
    }[];
    released: string;
    developers: { name: string }[];
    genres: { name: string }[];
    metacritic: number;
    tags: { name: string }[];
    publishers: { name: string }[];
}
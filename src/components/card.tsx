'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Game } from "../types/games.types";

export default function GameCard({ game }: { game: Game }) {
  const [isImageError, setIsImageError] = useState(false);
  
  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    setIsImageError(true);
  };

  // Determinar el color de fondo del rating basado en la puntuación
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <Link href={`/game/${game.slug}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Imagen de juego con fallback */}
        <div className="relative w-full h-48 overflow-hidden">
          {isImageError ? (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                No imagen disponible
              </span>
            </div>
          ) : (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              className="object-cover"
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          )}
          
          {/* Indicador de rating */}
          <div className="absolute bottom-2 right-2">
            <div className={`${getRatingColor(game.rating)} text-white px-2 py-1 rounded-md text-sm font-bold flex items-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {game.rating}
            </div>
          </div>
        </div>
        
        {/* Información del juego */}
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {game.name}
          </h3>
          
          {/* Metascore si existe */}
          {game.metacritic && (
            <div className="mt-2 inline-block px-2 py-1 text-xs font-semibold rounded border border-yellow-500 text-yellow-700">
              Metacritic: {game.metacritic}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
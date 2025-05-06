'use client';

import { GameDetails } from '@/types/games.types';
import Rating from './rating';
import Link from 'next/link';

interface GameMainInfoProps {
  game: GameDetails;
}

export default function GameMainInfo({ game }: GameMainInfoProps) {
  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex flex-wrap justify-between mb-6">
        <div>
          {/* Rating y Metacritic */}
          <div className="flex flex-wrap items-center gap-6 mb-2">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Puntuación</h3>
              <Rating rating={game.rating} size="lg" />
            </div>
            
            {game.metacritic && (
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Metacritic</h3>
                <span className={`font-bold px-2 py-1 rounded ${
                  game.metacritic >= 75 ? 'bg-green-100 text-green-800' : 
                  game.metacritic >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {game.metacritic}
                </span>
              </div>
            )}
          </div>
          
          {/* Fecha de lanzamiento */}
          <div className="mt-4">
            <h3 className="text-sm text-gray-500">Fecha de lanzamiento</h3>
            <p className="font-medium">{new Date(game.released).toLocaleDateString()}</p>
          </div>
        </div>
        
        {/* Enlace a la ficha de compra */}
        <div className="mt-4 sm:mt-0">
          <Link
            href={`/product-sheet/${game.slug}`}
            className="inline-block bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Ver ficha de compra
          </Link>
          
          {/* Botón para visitar sitio web si existe */}
          {game.website && (
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block ml-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition"
            >
              Sitio oficial
            </a>
          )}
        </div>
      </div>
      
      {/* Información de desarrolladores, plataformas, géneros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Desarrolladores */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Desarrolladores</h3>
          <div className="flex flex-wrap gap-2">
            {game.developers?.map((developer) => (
              <span 
                key={developer.name}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
              >
                {developer.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Plataformas */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Plataformas</h3>
          <div className="flex flex-wrap gap-2">
            {game.platforms?.map((platform, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
              >
                {platform.platform.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Géneros */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Géneros</h3>
          <div className="flex flex-wrap gap-2">
            {game.genres?.map((genre) => (
              <span 
                key={genre.name}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Etiquetas */}
      {game.tags && game.tags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm text-gray-500 mb-2">Etiquetas</h3>
          <div className="flex flex-wrap gap-2">
            {game.tags.slice(0, 15).map((tag) => (
              <span 
                key={tag.name}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
              >
                {tag.name}
              </span>
            ))}
            {game.tags.length > 15 && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                +{game.tags.length - 15} más
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
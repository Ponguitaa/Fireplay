'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Game } from "../types/games.types";

export default function GameCard({ game }: { game: Game }) {
  const [isImageError, setIsImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  // Configurar la carga por intersección (cuando el elemento entra en el viewport)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Cargar un poco antes de que el elemento sea visible
        threshold: 0.1
      }
    );
    
    const currentElement = document.getElementById(`game-card-${game.id}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [game.id]);
  
  // Función para manejar errores de carga de imagen
  const handleImageError = () => {
    setIsImageError(true);
  };
  
  // Función para cuando la imagen ha cargado completamente
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Determinar el color de fondo del rating basado en la puntuación
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <Link href={`/game/${game.slug}`} className="block group" id={`game-card-${game.id}`}>
      <div className={`animate-fade-in bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all duration-300 
        transform hover:shadow-xl hover:scale-[1.02]
        relative
        before:absolute before:inset-0 before:bg-black before:opacity-0 before:transition-opacity before:duration-300 before:z-10 
        hover:before:opacity-10 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}>
        {/* Imagen de juego con fallback */}
        <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden">
          {isImageError ? (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                No imagen disponible
              </span>
            </div>
          ) : (
            <>
              {/* Skeleton loader */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              )}
              
              {/* Cargar imagen solo cuando esté en el viewport */}
              {isInView && (
                <Image
                  src={game.background_image}
                  alt={game.name}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
                />
              )}
            </>
          )}
          
          {/* Indicador de rating */}
          <div className="absolute bottom-2 right-2 z-20">
            <div className={`${getRatingColor(game.rating)} text-white px-2 py-1 rounded-md text-sm font-bold flex items-center shadow-md`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {game.rating}
            </div>
          </div>
        </div>
        
        {/* Información del juego */}
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate group-hover:text-[var(--color-primary)] transition-colors duration-300">
            {game.name}
          </h3>
          
          {/* Plataformas disponibles */}
          {game.parent_platforms && (
            <div className="flex flex-wrap gap-2 mt-2">
              {game.parent_platforms.map((platform) => (
                <span key={platform.platform.id} className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
                  {getPlatformIcon(platform.platform.name)}
                  <span className="ml-1 hidden sm:inline">{platform.platform.name}</span>
                </span>
              ))}
            </div>
          )}
          
          {/* Metascore si existe */}
          {game.metacritic && (
            <div className="mt-3 inline-block px-2 py-1 text-xs font-semibold rounded border border-yellow-500 text-yellow-700">
              Metacritic: {game.metacritic}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Función auxiliar para renderizar iconos de plataformas
function getPlatformIcon(platformName: string) {
  // Retornar el icono SVG correspondiente según la plataforma
  const name = platformName.toLowerCase();
  
  if (name.includes('pc')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    );
  } else if (name.includes('playstation')) {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.5 6.5v-6s-9 1.27-9 7.57c0 5.49 3.52 5.01 5.5 4.73v-5.25c0-.46.52-.36.52-.36l2.98 1.04v-1.73M11 9.5v7.03c.58-.05 1.37-.15 2.53-.34l.47-5.8-3-1.39v.5M20 12.81v-8.31l-6.34 2.25v.89l4.51 1.56v5.84l1.83-1.23" />
      </svg>
    );
  } else if (name.includes('xbox')) {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-4.336
        15.863c-.987-.422-1.854-1.041-2.536-1.803 1.033-1.858 3.734-3.906 5.484-4.701-2.123 1.447-3.527 4.879-2.948 6.504zm9.457-1.734c-.661
         .756-1.488 1.395-2.413 1.844.524-2.202-1.028-4.489-2.359-6.396 2.418 1.836 3.871 3.932 4.772 4.552zm-2.325-8.135c-1.057 1.297-3.57
          3.594-5.632 3.344 2.214.666 4.132 2.929 4.849 4.229-.221-2.716-.138-5.544.783-7.573zm-2.657-4.201c1.288.515 2.487 1.301 3.52
           2.299-.97 1.594-2.49 2.724-4.965 3.175 1.336-2 1.555-3.879 1.445-5.474z" />
      </svg>
    );
  } else if (name.includes('nintendo') || name.includes('switch')) {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.714 0h-9.429c-1.026 0-1.714.733-1.714 1.857v20.286c0 1.023.796 1.857 1.714 1.857h9.429c.918 0 1.714-.834 1.714-1.857v-20.286c0-1.124-.688-1.857-1.714-1.857zm-4.714
         1.143c.643 0 1.143.491 1.143 1.143 0 .643-.5 1.143-1.143 1.143-.643 0-1.143-.5-1.143-1.143 0-.652.5-1.143 1.143-1.143zm0
          20.571c-1.105 0-2-.796-2-1.857 0-1.051.895-1.857 2-1.857 1.105 0 2 .806 2 1.857 0 1.061-.895 1.857-2 1.857zm4-10.286c0
           .296-.143.571-.286.857v-11.143h-7.429v11.143c-.143-.286-.286-.561-.286-.857v-9.429c0-.477.143-.857.571-.857h6.857c.429 0 .571.38.571.857v9.429z" />
      </svg>
    );
  } else {
    // Icono genérico para otras plataformas
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    );
  }
}
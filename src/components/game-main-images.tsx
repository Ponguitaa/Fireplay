'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGameScreenshots } from '@/lib/requests';
import { GameDetails } from '@/types/games.types';

interface GameMainImagesProps {
  game: GameDetails;
}

export default function GameMainImages({ game }: GameMainImagesProps) {
  const [screenshots, setScreenshots] = useState<{ id: number; image: string; }[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchScreenshots = async () => {
      setIsLoading(true);
      try {
        const screenshotData = await getGameScreenshots(game.id);
        setScreenshots(screenshotData);
      } catch (error) {
        console.error('Error fetching screenshots:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchScreenshots();
  }, [game.id]);

  // Combinar la imagen principal con las capturas de pantalla
  const allImages = [
    { id: 0, image: game.background_image },
    ...(screenshots || []),
  ];
  
  // Si hay imagen adicional, agregarla también
  if (game.background_image_additional) {
    allImages.push({ id: -1, image: game.background_image_additional });
  }

  return (
    <div className="mb-8">
      {/* Imagen principal */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg mb-4 bg-gray-200">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : (
          <Image
            src={allImages[activeIndex]?.image || '/placeholder-image.jpg'}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            priority
            className="object-cover"
          />
        )}
      </div>
      
      {/* Miniaturas */}
      {allImages.length > 1 && (
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={`relative w-20 h-20 rounded-md overflow-hidden transition ${activeIndex === index ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
            >
              <Image
                src={image.image}
                alt={`${game.name} screenshot ${index}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
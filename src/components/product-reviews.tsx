'use client';

import { useState } from 'react';
import Rating from './rating';

interface ProductReviewsProps {
  gameId: number;
  gameName: string;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  unhelpful: number;
}

export default function ProductReviews({ gameId, gameName }: ProductReviewsProps) {
  const [helpful, setHelpful] = useState<Record<number, boolean>>({});

  // Generar opiniones simuladas basadas en el ID del juego para que sean consistentes
  const generateSimulatedReviews = (): Review[] => {
    const seed = gameId; // Usar el ID del juego como semilla para las reseñas
    const reviewCount = 3 + (seed % 4); // Entre 3 y 6 reseñas
    
    const nameOptions = [
      'Ana G.', 'Carlos M.', 'Elena R.', 'Pablo L.', 'Lucía S.',
      'Miguel F.', 'Julia B.', 'David H.', 'Laura T.', 'Roberto N.'
    ];
    
    const titleOptions = [
      'Un juego increíble', 'Vale la pena cada euro', 'Me sorprendió', 
      'Mejor de lo esperado', 'Adictivo', 'Excelente experiencia',
      'No me decepcionó', 'Recomendado 100%', 'Una obra maestra',
      'Podría ser mejor', 'Algunas decepciones', 'Sobrevalorado'
    ];
    
    const contentParts = [
      `${gameName} es uno de esos juegos que no te puedes perder. `,
      `La jugabilidad de ${gameName} es muy fluida y satisfactoria. `,
      `Los gráficos son impresionantes, especialmente para ser un juego de su época. `,
      `La historia te atrapa desde el principio y no te suelta. `,
      `El diseño de sonido y la música contribuyen enormemente a la inmersión. `,
      `El juego ofrece muchas horas de contenido y alta rejugabilidad. `,
      `Algunos controles podrían ser más intuitivos, pero se le coge el truco rápido. `,
      `El multijugador es divertido, aunque a veces hay problemas de conexión. `,
      `Hay algunos bugs menores, pero nada que arruine la experiencia general. `,
      `La inteligencia artificial de los enemigos es impresionante y desafiante. `
    ];
    
    const reviews: Review[] = [];
    
    for (let i = 0; i < reviewCount; i++) {
      const nameIndex = (seed + i) % nameOptions.length;
      const titleIndex = (seed + i * 3) % titleOptions.length;
      
      // Generar un rating que varía pero tiende a ser alto
      const rating = Math.min(5, Math.max(2.5, 3.5 + (((seed * (i + 1)) % 100) / 100) * 2));
      
      // Generar contenido concatenando algunas partes aleatorias
      let content = '';
      const partCount = 2 + (i % 3); // Entre 2 y 4 partes
      const usedParts = new Set<number>();
      
      for (let j = 0; j < partCount; j++) {
        let partIndex;
        do {
          partIndex = (seed + i + j * 7) % contentParts.length;
        } while (usedParts.has(partIndex));
        
        usedParts.add(partIndex);
        content += contentParts[partIndex];
      }
      
      // Generar fecha en los últimos 3 meses
      const daysAgo = (i * 13 + seed) % 90;
      const reviewDate = new Date();
      reviewDate.setDate(reviewDate.getDate() - daysAgo);
      
      reviews.push({
        id: i + 1,
        author: nameOptions[nameIndex],
        avatar: `https://i.pravatar.cc/40?img=${(seed + i) % 70}`, // Avatar aleatorio pero consistente
        date: reviewDate.toLocaleDateString(),
        rating: rating,
        title: titleOptions[titleIndex],
        content: content,
        helpful: 5 + (i * seed) % 20,
        unhelpful: (i * seed) % 5
      });
    }
    
    // Ordenar por fecha, más recientes primero
    return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  const reviews = generateSimulatedReviews();
  
  // Calcular promedio de calificaciones
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  // Función para marcar una reseña como útil
  const handleHelpfulClick = (reviewId: number) => {
    setHelpful(prev => {
      const currentValue = prev[reviewId];
      return { ...prev, [reviewId]: !currentValue };
    });
  };

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Opiniones de los usuarios</h2>
      
      {/* Resumen de opiniones */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 border-b pb-6">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-[var(--color-primary)] mb-1">{averageRating.toFixed(1)}</div>
          <Rating rating={averageRating} size="lg" />
          <div className="text-sm text-gray-500 mt-2">{reviews.length} opiniones</div>
        </div>
        
        <div className="w-full sm:pl-6 sm:border-l">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(stars => {
              const count = reviews.filter(r => Math.floor(r.rating) === stars).length;
              const percentage = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
              
              return (
                <div key={stars} className="flex items-center">
                  <div className="w-16 text-sm text-gray-600">
                    {stars} estrellas
                  </div>
                  <div className="flex-1 mx-3 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--color-primary)]" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-8 text-sm text-gray-600 text-right">
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Lista de opiniones */}
      <div className="space-y-8">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start mb-3">
              <img 
                src={review.avatar}
                alt={review.author}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-medium">{review.author}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{review.date}</span>
                  <span className="mx-2">•</span>
                  <Rating rating={review.rating} size="sm" />
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.content}</p>
            
            <div className="flex items-center text-sm text-gray-500">
              <button 
                onClick={() => handleHelpfulClick(review.id)}
                className={`flex items-center px-3 py-1 rounded-full border ${helpful[review.id] ? 'border-green-500 text-green-500' : 'border-gray-300'}`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                Útil ({helpful[review.id] ? review.helpful + 1 : review.helpful})
              </button>
              <span className="mx-2">•</span>
              <span className="text-sm text-gray-500">
                {review.unhelpful} personas marcaron como no útil
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
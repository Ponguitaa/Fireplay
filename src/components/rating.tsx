'use client';

interface RatingProps {
  rating: number;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Rating({ rating, showText = true, size = 'md' }: RatingProps) {
  // Determinar el color basado en la puntuación
  const getColor = () => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Determinar el tamaño de las estrellas
  const getSize = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  };

  // Crear array de 5 estrellas
  const stars = Array(5).fill(0);
  
  // Calcular estrellas llenas
  const fullStars = Math.floor(rating);
  
  // Verificar si hay media estrella
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center">
      <div className="flex">
        {stars.map((_, index) => (
          <span key={index}>
            {/* Estrella completa */}
            {index < fullStars && (
              <svg xmlns="http://www.w3.org/2000/svg" className={`${getSize()} ${getColor()}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
            
            {/* Media estrella */}
            {index === fullStars && hasHalfStar && (
              <svg xmlns="http://www.w3.org/2000/svg" className={`${getSize()} ${getColor()}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
            
            {/* Estrella vacía */}
            {((index >= fullStars && !hasHalfStar) || (index > fullStars)) && (
              <svg xmlns="http://www.w3.org/2000/svg" className={`${getSize()} text-gray-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 
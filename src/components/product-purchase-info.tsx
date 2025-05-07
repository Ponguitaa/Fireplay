'use client';

import { GameDetails } from '@/types/games.types';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Rating from './rating';

interface ProductPurchaseInfoProps {
  game: GameDetails;
}

export default function ProductPurchaseInfo({ game }: ProductPurchaseInfoProps) {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<string>("0.00");
  const [isInCart, setIsInCart] = useState(false);
  const { user } = useAuth();
  const { addToCart, removeFromCart, isInCart: checkIsInCart } = useCart();
  const router = useRouter();
  
  // Generar un precio ficticio basado en aspectos del juego
  const generateFictitiousPrice = () => {
    let basePrice = 59.99; // Precio base estándar para juegos AAA
    
    // Ajustar por antigüedad (juegos más nuevos son más caros)
    const releaseDate = new Date(game.released);
    const ageInYears = (new Date().getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    if (ageInYears < 1) {
      // Juego nuevo, mantener precio completo o aumentarlo para ediciones especiales
      basePrice = Math.min(69.99, basePrice + 10);
    } else if (ageInYears < 2) {
      // Juego relativamente nuevo, pequeño descuento
      basePrice *= 0.9;
    } else if (ageInYears < 3) {
      // Descuento moderado
      basePrice *= 0.75;
    } else if (ageInYears < 5) {
      // Descuento mayor
      basePrice *= 0.5;
    } else {
      // Juego antiguo
      basePrice *= 0.3;
    }
    
    // Ajustar por calificación (mejores juegos pueden mantener mejor su precio)
    if (game.rating > 4.5) {
      basePrice *= 1.1; // Premio por calidad excepcional
    } else if (game.rating < 3) {
      basePrice *= 0.8; // Descuento por calidad baja
    }
    
    // Ajustar por popularidad (usando metacritic como aproximación)
    if (game.metacritic > 85) {
      basePrice *= 1.05;
    } else if (game.metacritic < 50) {
      basePrice *= 0.9;
    }
    
    // Redondear a .99
    basePrice = Math.floor(basePrice) - 0.01;
    
    // Establecer precio mínimo
    return Math.max(4.99, basePrice).toFixed(2);
  };
  
  useEffect(() => {
    const calculatedPrice = generateFictitiousPrice();
    setPrice(calculatedPrice);
    
    // Comprobar si el juego ya está en el carrito
    setIsInCart(checkIsInCart(game.id));
  }, [game, checkIsInCart]);
  
  const hasDiscount = parseFloat(price) < 59.99;
  const originalPrice = hasDiscount ? (parseFloat(price) * 1.25).toFixed(2) : null;
  
  // Función para manejar la adición/eliminación del carrito
  const handleCartAction = () => {
    setLoading(true);
    
    // Si el usuario no está autenticado, redirigir a la página de login
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Añadir o quitar del carrito según corresponda
    setTimeout(() => {
      if (isInCart) {
        removeFromCart(game.id);
        setIsInCart(false);
      } else {
        addToCart(game, parseFloat(price));
        setIsInCart(true);
      }
      setLoading(false);
    }, 500);
  };
  
  const handleGoToCart = () => {
    router.push('/cart');
  };
  
  const getStockStatus = () => {
    // Generar un estado aleatorio para stock basado en el id del juego
    const stockOptions = ['En stock', 'Pocas unidades', 'Último disponible'];
    const index = game.id % stockOptions.length;
    return stockOptions[index];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Información de compra</h2>
      
      {/* Precio y descuento */}
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-[var(--color-primary)]">
            {price}€
          </span>
          
          {originalPrice && (
            <span className="text-gray-500 line-through text-lg">
              {originalPrice}€
            </span>
          )}
        </div>
        
        {hasDiscount && (
          <p className="text-green-600 font-medium mt-1">
            Ahorras {(parseFloat(originalPrice!) - parseFloat(price)).toFixed(2)}€
          </p>
        )}
      </div>
      
      {/* Stock */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-green-700 font-medium">{getStockStatus()}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Entrega digital inmediata tras la compra
        </p>
      </div>
      
      {/* Plataformas disponibles */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Plataformas disponibles
        </h3>
        <div className="flex flex-wrap gap-2">
          {game.platforms?.slice(0, 5).map((platform, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
            >
              {platform.platform.name}
            </span>
          ))}
        </div>
      </div>
      
      {/* Botones de compra */}
      <div className="space-y-3">
        {/* Botón de añadir/quitar del carrito */}
        <button
          onClick={handleCartAction}
          disabled={loading}
          className={`w-full py-3 rounded-md font-medium transition-colors flex items-center justify-center disabled:opacity-75
            ${isInCart 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : isInCart ? (
            <>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Quitar del carrito
            </>
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Añadir al carrito
            </>
          )}
        </button>
        
        {/* Botón ir al carrito (solo visible si hay productos en el carrito) */}
        {isInCart && (
          <button
            onClick={handleGoToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Ir al carrito
          </button>
        )}
      </div>
      
      {/* Información adicional */}
      <div className="mt-4 text-xs text-gray-500 space-y-2">
        <p className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Código digital - Sin gastos de envío
        </p>
        <p className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Transacción 100% segura
        </p>
      </div>
    </div>
  );
}
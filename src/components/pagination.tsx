'use client';

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  getPageUrl: (page: number) => string;
}

export default function Pagination({ currentPage, totalPages, getPageUrl }: PaginationProps) {
  // Generar arreglo de páginas a mostrar
  const generatePaginationItems = () => {
    const items = [];
    
    // Siempre mostrar primera página
    items.push(1);
    
    // Mostrar puntos suspensivos si es necesario
    if (currentPage > 3) {
      items.push('...');
    }
    
    // Mostrar páginas alrededor de la actual
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!items.includes(i)) {
        items.push(i);
      }
    }
    
    // Mostrar puntos suspensivos si es necesario
    if (currentPage < totalPages - 2) {
      items.push('...');
    }
    
    // Siempre mostrar última página
    if (totalPages > 1) {
      items.push(totalPages);
    }
    
    return items;
  };
  
  const paginationItems = generatePaginationItems();
  
  return (
    <nav className="flex justify-center items-center space-x-2 my-8">
      {/* Botón Anterior */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Anterior
        </Link>
      ) : (
        <button
          disabled
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed"
        >
          Anterior
        </button>
      )}
      
      {/* Números de página */}
      {paginationItems.map((item, index) => (
        <div key={index}>
          {item === '...' ? (
            <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
          ) : (
            <Link
              href={getPageUrl(item as number)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === item
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700'
              }`}
            >
              {item}
            </Link>
          )}
        </div>
      ))}
      
      {/* Botón Siguiente */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Siguiente
        </Link>
      ) : (
        <button
          disabled
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-400 dark:text-gray-500 cursor-not-allowed"
        >
          Siguiente
        </button>
      )}
    </nav>
  );
}
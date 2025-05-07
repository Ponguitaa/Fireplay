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
    
    // Mostrar páginas alrededor de la página actual
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      if (i <= totalPages && !items.includes(i)) {
        items.push(i);
      }
    }
    
    // Mostrar puntos suspensivos al final si es necesario
    if (currentPage < totalPages - 2) {
      items.push('...');
    }
    
    // Siempre mostrar la última página si hay más de una página
    if (totalPages > 1 && !items.includes(totalPages)) {
      items.push(totalPages);
    }
    
    return items;
  };

  const paginationItems = generatePaginationItems();

  return (
    <div className="flex justify-center my-6">
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-100"
            aria-label="Previous page"
          >
            &lt;
          </Link>
        )}
        
        {paginationItems.map((item, index) => (
          item === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
          ) : (
            <Link
              key={`page-${item}`}
              href={getPageUrl(Number(item))}
              className={`px-3 py-1 border rounded-md ${
                currentPage === item 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-100'
              }`}
              aria-current={currentPage === item ? 'page' : undefined}
            >
              {item}
            </Link>
          )
        ))}
        
        {currentPage < totalPages && (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-100"
            aria-label="Next page"
          >
            &gt;
          </Link>
        )}
      </div>
    </div>
  );
}
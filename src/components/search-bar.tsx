'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);

  // Manejar clic fuera para cerrar la búsqueda en móviles
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar envío del formulario de búsqueda
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/games?query=${encodeURIComponent(query.trim())}`);
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative">
      {/* Versión móvil (icono que expande) */}
      <div className="md:hidden">
        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            aria-label="Buscar"
            className="p-2 text-white hover:bg-white/10 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : (
          <form 
            ref={searchRef}
            onSubmit={handleSubmit}
            className="absolute right-0 top-0 w-screen p-2 bg-[var(--color-primary)] flex items-center z-50 animate-fadeIn"
          >
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 text-black bg-white rounded-l-md focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="bg-white text-[var(--color-primary)] p-2 rounded-r-md hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        )}
      </div>

      {/* Versión desktop (siempre visible) */}
      <form 
        onSubmit={handleSubmit}
        className="hidden md:flex items-center"
      >
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 text-black bg-white rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="bg-white text-[var(--color-primary)] p-2 rounded-r-md hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
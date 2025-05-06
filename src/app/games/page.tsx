import { getGames } from "../../lib/requests";
import GameCard from "../../components/card";
import Link from "next/link";
import Pagination from "@/components/pagination";

interface GamesPageProps {
  searchParams: { 
    query?: string;
    ordering?: string;
    page?: string;
    rating_min?: string;
    rating_max?: string;
    dates?: string;
  };
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const page = parseInt(searchParams.page || "1");
  const ordering = searchParams.ordering || "-added";
  const query = searchParams.query || "";
  const rating_min = searchParams.rating_min ? parseFloat(searchParams.rating_min) : undefined;
  const rating_max = searchParams.rating_max ? parseFloat(searchParams.rating_max) : undefined;
  const dates = searchParams.dates || undefined;
  
  const { results: games, count, next, previous } = await getGames({
    search: query,
    page,
    ordering,
    rating_min,
    rating_max,
    dates
  });
  
  const totalPages = Math.ceil(count / 20); // Asumiendo 20 juegos por página
  
  // Array de opciones de orden disponibles
  const orderingOptions = [
    { value: "name", label: "Nombre (A-Z)" },
    { value: "-name", label: "Nombre (Z-A)" },
    { value: "-rating", label: "Mayor puntuación" },
    { value: "rating", label: "Menor puntuación" },
    { value: "-released", label: "Más recientes" },
    { value: "released", label: "Más antiguos" },
    { value: "-added", label: "Recién añadidos" },
    { value: "added", label: "Añadidos hace tiempo" },
  ];
  
  // Array de opciones de filtro por fechas
  const dateOptions = [
    { value: "", label: "Todos los tiempos" },
    { value: "2023-01-01,2025-12-31", label: "Últimos 2 años" },
    { value: "2020-01-01,2022-12-31", label: "2020 - 2022" },
    { value: "2010-01-01,2019-12-31", label: "2010 - 2019" },
    { value: "2000-01-01,2009-12-31", label: "2000 - 2009" },
    { value: "1990-01-01,1999-12-31", label: "1990 - 1999" },
  ];
  
  // Array de opciones de filtro por puntuación
  const ratingOptions = [
    { min: "", max: "", label: "Todas las puntuaciones" },
    { min: "4", max: "5", label: "Excelente (4-5)" },
    { min: "3", max: "4", label: "Bueno (3-4)" },
    { min: "2", max: "3", label: "Regular (2-3)" },
    { min: "0", max: "2", label: "Malo (0-2)" },
  ];
  
  // Función para mantener los filtros actuales al cambiar la paginación
  const getFilteredUrl = (newPage: number, overrides: any = {}) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (ordering) params.set('ordering', ordering);
    if (rating_min) params.set('rating_min', rating_min.toString());
    if (rating_max) params.set('rating_max', rating_max.toString());
    if (dates) params.set('dates', dates);
    
    // Aplicar nuevos valores
    for (const [key, value] of Object.entries(overrides)) {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    }
    
    // Siempre incluir el número de página si es distinto a 1
    if (newPage > 1) {
      params.set('page', newPage.toString());
    }
    
    return `/games?${params.toString()}`;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Juegos</h1>
      
      {/* Información de búsqueda */}
      <div className="mb-8">
        {query ? (
          <p className="text-lg">
            Resultados para: <span className="font-semibold">{query}</span>
          </p>
        ) : (
          <p className="text-lg">Explorando el catálogo</p>
        )}
      </div>
      
      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8">
        <h2 className="font-semibold mb-4 text-lg">Filtros y ordenación</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ordenar por */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ordenar por
            </label>
            <select 
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={ordering}
              onChange={(e) => {
                const url = getFilteredUrl(1, { ordering: e.target.value });
                window.location.href = url;
              }}
            >
              {orderingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Filtro por fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de lanzamiento
            </label>
            <select 
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={dates || ""}
              onChange={(e) => {
                const url = getFilteredUrl(1, { dates: e.target.value });
                window.location.href = url;
              }}
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Filtro por puntuación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Puntuación
            </label>
            <select 
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue={`${rating_min || ""}-${rating_max || ""}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-');
                const url = getFilteredUrl(1, { rating_min: min, rating_max: max });
                window.location.href = url;
              }}
            >
              {ratingOptions.map((option) => (
                <option key={`${option.min}-${option.max}`} value={`${option.min}-${option.max}`}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Grid de juegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {/* Mostrar mensaje si no hay resultados */}
      {games.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No se encontraron juegos
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Prueba con otros filtros o términos de búsqueda
          </p>
          <Link 
            href="/games"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Ver todos los juegos
          </Link>
        </div>
      )}
      
      {/* Paginación */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={totalPages}
          getPageUrl={(pageNum) => getFilteredUrl(pageNum)}
        />
      )}
    </div>
  );
}
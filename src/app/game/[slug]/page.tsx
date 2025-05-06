import { getGameDetails } from "../../../lib/requests";
import { GameDetails as GameDetailsType } from "../../../types/games.types";
import GameMainInfo from "../../../components/game-main-info";
import GameMainImages from "../../../components/game-main-images";
import Rating from "../../../components/rating";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function GameDetailPage({ params }: { params: { slug: string } }) {
  const game: GameDetailsType = await getGameDetails(params.slug);
  
  // Si no se encuentra el juego, redirigir a la página de no encontrado
  if (!game) {
    notFound();
  }
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Migas de pan / Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[var(--color-primary)]">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link href="/games" className="hover:text-[var(--color-primary)]">
          Juegos
        </Link>
        <span className="mx-2">/</span>
        <span>{game.name}</span>
      </div>

      {/* Cabecera del juego */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{game.name}</h1>
        <div className="flex items-center text-gray-500">
          <Rating rating={game.rating} size="sm" />
          <span className="mx-2">•</span>
          <span>{game.released && new Date(game.released).getFullYear()}</span>
          {game.developers && game.developers[0] && (
            <>
              <span className="mx-2">•</span>
              <span>{game.developers[0].name}</span>
            </>
          )}
        </div>
      </div>

      {/* Galería de imágenes */}
      <GameMainImages game={game} />
      
      {/* Información principal del juego */}
      <GameMainInfo game={game} />
      
      {/* Descripción del juego */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Descripción</h2>
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />
      </div>

      {/* Requisitos del sistema para PC (si están disponibles) */}
      {game.platforms && game.platforms.some(p => 
        p.platform.name.includes('PC') && 
        (p.requirements_en || p.requirements_ru)
      ) && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Requisitos del sistema (PC)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Intentamos encontrar los requisitos mínimos y recomendados */}
            {game.platforms
              .filter(p => p.platform.name.includes('PC'))
              .map((platform, index) => {
                const requirements = platform.requirements_en || platform.requirements_ru;
                return requirements ? (
                  <div key={index}>
                    <h3 className="font-semibold mb-2">{platform.platform.name}</h3>
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: 
                      typeof requirements === 'string' ? requirements : 
                      `${requirements.minimum ? `<p><strong>Mínimos:</strong> ${requirements.minimum}</p>` : ''}
                       ${requirements.recommended ? `<p><strong>Recomendados:</strong> ${requirements.recommended}</p>` : ''}`
                    }} />
                  </div>
                ) : null;
              })
            }
          </div>
        </div>
      )}
    </div>
  );
}
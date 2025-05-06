import { getGameDetails } from "@/lib/requests";
import { GameDetails } from "@/types/games.types";
import { notFound } from "next/navigation";
import GameMainImages from "@/components/game-main-images";
import Rating from "@/components/rating";
import Link from "next/link";
import ProductPurchaseInfo from "@/components/product-purchase-info";
import ProductReviews from "@/components/product-reviews";

export default async function ProductSheetPage({ params }: { params: { slug: string } }) {
  const game: GameDetails = await getGameDetails(params.slug);
  
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
        <Link href={`/game/${game.slug}`} className="hover:text-[var(--color-primary)]">
          {game.name}
        </Link>
        <span className="mx-2">/</span>
        <span>Ficha de compra</span>
      </div>
      
      {/* Cabecera del juego */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{game.name}</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600">
          <Rating rating={game.rating} size="sm" />
          
          {game.developers && game.developers[0] && (
            <span className="text-sm">
              Desarrollado por <span className="font-semibold">{game.developers[0].name}</span>
            </span>
          )}
          
          {game.released && (
            <span className="text-sm">
              Lanzado el <span className="font-semibold">{new Date(game.released).toLocaleDateString()}</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Galería de imágenes */}
          <GameMainImages game={game} />
          
          {/* Descripción del juego */}
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Descripción</h2>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: game.description }}
            />
          </div>
          
          {/* Requisitos del sistema */}
          {game.platforms && game.platforms.some(p => 
            p.platform.name.includes('PC') && 
            (p.requirements_en || p.requirements_ru)
          ) && (
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Requisitos del sistema</h2>
              <div className="grid md:grid-cols-2 gap-6">
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
          
          {/* Reseñas y opiniones simuladas */}
          <ProductReviews gameId={game.id} gameName={game.name} />
        </div>
        
        {/* Panel lateral con información de compra */}
        <div className="lg:col-span-1">
          <ProductPurchaseInfo game={game} />
        </div>
      </div>
    </div>
  );
}
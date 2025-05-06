import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      {/* Sección Hero con imagen y título llamativo */}
      <section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Tu portal a los mejores <span className="text-yellow-300">videojuegos</span> al mejor precio
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-lg">
                Descubre ofertas exclusivas, novedades y clásicos para todas las plataformas. ¡Juega sin límites con Fireplay!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/games" 
                  className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Ver catálogo
                </Link>
                <Link 
                  href="/register" 
                  className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300"
                >
                  Crear cuenta
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-80 w-full">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-white/10 rounded-lg transform rotate-3 backdrop-blur-sm"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-white/10 rounded-lg transform -rotate-3 backdrop-blur-sm"></div>
                <div className="absolute inset-4 bg-white/20 rounded-lg overflow-hidden backdrop-blur-md">
                  <div className="w-full h-full bg-[url('/game-showcase.jpg')] bg-cover bg-center">
                    {/* Placeholder for an actual game cover image */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "¿Qué es Fireplay?" */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Qué es Fireplay?</h2>
            <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Fireplay es tu destino definitivo para comprar videojuegos digitales con los mejores descuentos. Nuestra plataforma conecta a los jugadores con ofertas imbatibles en títulos para PC, PlayStation, Xbox y Nintendo.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Con más de 10,000 títulos disponibles y actualizaciones diarias, garantizamos la mejor experiencia de compra con precios competitivos y entregas instantáneas de códigos digitales.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/about" className="text-[var(--color-primary)] font-semibold hover:underline">
                  Más sobre nosotros →
                </Link>
                <Link href="/games" className="text-[var(--color-primary)] font-semibold hover:underline">
                  Explorar juegos →
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-5 rounded-lg text-center">
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">+10.000 Juegos</h3>
                <p className="text-gray-600 text-sm">Amplio catálogo para todas las plataformas</p>
              </div>
              
              <div className="bg-gray-100 p-5 rounded-lg text-center">
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Mejores Precios</h3>
                <p className="text-gray-600 text-sm">Descuentos exclusivos todos los días</p>
              </div>
              
              <div className="bg-gray-100 p-5 rounded-lg text-center">
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Entrega Inmediata</h3>
                <p className="text-gray-600 text-sm">Recibe tu código al instante</p>
              </div>
              
              <div className="bg-gray-100 p-5 rounded-lg text-center">
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">100% Seguro</h3>
                <p className="text-gray-600 text-sm">Transacciones protegidas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Cómo funciona" en pasos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprar en Fireplay es fácil, seguro y rápido. Solo sigue estos sencillos pasos:
            </p>
            <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Paso 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="w-12 h-12 bg-[var(--color-primary)] text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto absolute -top-6 left-1/2 transform -translate-x-1/2">
                1
              </div>
              <div className="mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Busca</h3>
                <p className="text-gray-600">
                  Explora nuestro amplio catálogo o utiliza el buscador para encontrar tu juego favorito.
                </p>
              </div>
            </div>
            
            {/* Paso 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="w-12 h-12 bg-[var(--color-primary)] text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto absolute -top-6 left-1/2 transform -translate-x-1/2">
                2
              </div>
              <div className="mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Añade al Carrito</h3>
                <p className="text-gray-600">
                  Selecciona los juegos que desees y añádelos a tu carrito de compra.
                </p>
              </div>
            </div>
            
            {/* Paso 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="w-12 h-12 bg-[var(--color-primary)] text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto absolute -top-6 left-1/2 transform -translate-x-1/2">
                3
              </div>
              <div className="mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Paga Seguro</h3>
                <p className="text-gray-600">
                  Realiza el pago con tu método preferido a través de nuestra pasarela segura.
                </p>
              </div>
            </div>
            
            {/* Paso 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
              <div className="w-12 h-12 bg-[var(--color-primary)] text-white text-xl font-bold rounded-full flex items-center justify-center mx-auto absolute -top-6 left-1/2 transform -translate-x-1/2">
                4
              </div>
              <div className="mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Descarga</h3>
                <p className="text-gray-600">
                  Recibe tu código al instante y disfruta de tu juego inmediatamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para descubrir los mejores juegos al mejor precio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de jugadores que confían en Fireplay para sus compras de videojuegos digitales.
          </p>
          <Link 
            href="/games" 
            className="inline-block bg-white text-[var(--color-primary)] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            Explorar Catálogo
          </Link>
        </div>
      </section>
    </>
  );
}
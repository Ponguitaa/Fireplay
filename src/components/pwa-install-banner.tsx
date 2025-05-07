'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PWAInstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Capturar el evento beforeinstallprompt que se dispara cuando la PWA es instalable
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Verificar si la app ya está instalada
  useEffect(() => {
    // Si está en modo standalone o es una PWA instalada, no mostrar el banner
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsVisible(false);
    }
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Mostrar el prompt de instalación
    await installPrompt.prompt();

    // Esperar por la elección del usuario
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }

    // Limpiar el prompt para que solo se muestre una vez
    setInstallPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 animate-slide-up">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <div className="bg-[var(--color-primary)] p-2 rounded-lg text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">Instala Fireplay</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Instala nuestra app para una mejor experiencia</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleDismiss} 
            className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Más tarde
          </button>
          <button 
            onClick={handleInstallClick} 
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm hover:bg-[var(--color-primary-dark)] transition-colors shadow-md"
          >
            Instalar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
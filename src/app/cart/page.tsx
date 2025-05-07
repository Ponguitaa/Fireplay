'use client';

import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  
  // Función para finalizar la compra (simulación)
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulación de procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      alert("¡Gracias por tu compra! Este es un proceso simulado.");
      clearCart();
    }, 1500);
  };
  
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mi Carrito de Compra</h1>
        
        {cartItems.length === 0 ? (
          // Carrito vacío
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl font-medium mb-2">Tu carrito está vacío</p>
              <p className="text-gray-500 mb-6">
                ¡Añade algunos juegos increíbles a tu carrito!
              </p>
              <Link 
                href="/games" 
                className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Encabezado de la tabla */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
                  <div className="md:col-span-6">Producto</div>
                  <div className="md:col-span-2 text-center">Precio</div>
                  <div className="md:col-span-2 text-center">Cantidad</div>
                  <div className="md:col-span-2 text-center">Total</div>
                </div>
                
                {/* Listado de productos */}
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 p-4">
                    <div className="md:grid md:grid-cols-12 gap-4 items-center">
                      {/* Producto (imagen + nombre) */}
                      <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          {item.image ? (
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="bg-gray-200 dark:bg-gray-700 w-full h-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <Link href={`/game/${item.slug}`} className="font-medium hover:text-[var(--color-primary)]">
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-500 hover:text-red-700 mt-1 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      </div>
                      
                      {/* Precio */}
                      <div className="md:col-span-2 text-center flex md:block justify-between mb-2 md:mb-0">
                        <span className="md:hidden font-medium">Precio:</span>
                        <span className="font-medium text-[var(--color-primary)]">{item.price.toFixed(2)}€</span>
                      </div>
                      
                      {/* Cantidad */}
                      <div className="md:col-span-2 text-center flex md:block justify-between mb-2 md:mb-0">
                        <span className="md:hidden font-medium">Cantidad:</span>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-l flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className="w-10 h-8 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-r flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 text-center flex md:block justify-between">
                        <span className="md:hidden font-medium">Total:</span>
                        <span className="font-bold">{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Botones de acción */}
                <div className="p-4 flex flex-wrap gap-4">
                  <Link
                    href="/games"
                    className="text-[var(--color-primary)] hover:underline flex items-center"
                  >
                    <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Continuar comprando
                  </Link>
                  
                  <button
                    onClick={() => clearCart()}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </div>
            
            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Productos ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                    <span>{getCartTotal().toFixed(2)}€</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Impuestos</span>
                    <span>0.00€</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Envío</span>
                    <span>Gratis</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg text-[var(--color-primary)]">{getCartTotal().toFixed(2)}€</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-medium transition-colors mt-4 flex items-center justify-center disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Finalizar compra
                    </>
                  )}
                </button>
                
                <div className="mt-4 text-xs text-gray-500 space-y-2">
                  <p className="flex items-center">
                    <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Pago seguro
                  </p>
                  <p className="flex items-center">
                    <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Devolución garantizada
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
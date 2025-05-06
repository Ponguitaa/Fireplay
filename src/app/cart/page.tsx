'use client';

import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function CartPage() {
  const { user } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mi Carrito de Compra</h1>
        
        {/* Esta sección será reemplazada por la funcionalidad real del carrito más adelante */}
        <div className="bg-white rounded-lg shadow-md p-8">
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
        
        {/* Resumen del pedido (visible cuando haya productos) */}
        <div className="mt-8 hidden">
          <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>€0.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Descuento</span>
              <span>-€0.00</span>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>€0.00</span>
            </div>
            <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
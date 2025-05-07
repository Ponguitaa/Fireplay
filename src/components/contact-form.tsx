'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/auth-context';

export default function ContactForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Prellenar el email si el usuario está autenticado
  useState(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        name: user.displayName || ''
      }));
    }
  }, [user]);

  // Función para validar el formulario
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      valid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un email válido';
      valid = false;
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Guardar el mensaje en Firestore
        await addDoc(collection(db, "contactMessages"), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: serverTimestamp(),
          status: 'pending', // Estado inicial: pendiente
          userId: user?.uid || null,
          userAgent: navigator.userAgent,
          source: window.location.pathname
        });
        
        // Limpiar el formulario
        setFormData({
          name: user?.displayName || '',
          email: user?.email || '',
          message: ''
        });
        
        // Mostrar modal de éxito
        setShowModal(true);
      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-8 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-white">Envíanos un mensaje</h2>
        
        {/* Campo de nombre */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-300`}
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-1 animate-slide-down">{errors.name}</p>}
        </div>
        
        {/* Campo de email */}
        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-300`}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1 animate-slide-down">{errors.email}</p>}
        </div>
        
        {/* Campo de mensaje */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
            Mensaje
          </label>
          <textarea
            className={`shadow appearance-none border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-300 h-32 resize-none`}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs italic mt-1 animate-slide-down">{errors.message}</p>}
        </div>
        
        {/* Botón de envío */}
        <div className="flex items-center justify-center">
          <button
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full sm:w-auto transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg relative overflow-hidden group"
            type="submit"
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje
                </>
              )}
            </span>
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
        </div>
      </form>

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full mx-4 animate-slide-up">
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">¡Mensaje enviado!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium py-2 px-6 rounded-lg focus:outline-none transition-colors duration-300 shadow-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
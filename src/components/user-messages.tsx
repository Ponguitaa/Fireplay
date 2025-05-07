'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { collection, query, where, getDocs, orderBy, Timestamp, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  status?: string;
}

export default function UserMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?.email) return;
      
      try {
        setIsLoading(true);
        
        // Consultar mensajes de contacto enviados por el usuario actual
        const messagesQuery = query(
          collection(db, 'contactMessages'),
          where('email', '==', user.email),
          orderBy('timestamp', 'desc')
        );
        
        const messagesSnapshot = await getDocs(messagesQuery);
        
        const messagesList: Message[] = [];
        messagesSnapshot.forEach((doc) => {
          const data = doc.data();
          messagesList.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            message: data.message,
            timestamp: data.timestamp?.toDate() || new Date(),
            status: data.status || 'pending'
          });
        });
        
        setMessages(messagesList);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchMessages();
    }
  }, [user]);
  
  // Helper para formatear fecha
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Helper para mostrar un color según el estado del mensaje
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (messages.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center py-12">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">No hay mensajes</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Todavía no has enviado ningún mensaje a nuestro equipo de soporte.
          </p>
          <a href="/contact" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors">
            Contactar con soporte
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Mis Mensajes</h2>
      
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-800 dark:text-white truncate mr-2">
                {msg.message.substring(0, 50)}...
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(msg.status || 'pending')}`}>
                {msg.status === 'answered' 
                  ? 'Respondido' 
                  : msg.status === 'processing' 
                    ? 'En proceso'
                    : 'Pendiente'}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {msg.message}
            </p>
            
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Enviado por: {msg.name}</span>
              <span>{formatDate(msg.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
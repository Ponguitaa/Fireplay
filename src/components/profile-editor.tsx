'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { 
  updateUserProfile, 
  UpdateProfileData, 
  changeUserPassword, 
  ChangePasswordData 
} from '@/firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileEditor() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Password change fields
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    currentPassword: '',
    newPassword: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  // Actualizar displayName cuando el usuario cambie
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [user]);

  // Manejar cambios en los campos de contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const profileData: UpdateProfileData = {
        displayName: displayName.trim() || user.displayName,
      };
      
      await updateUserProfile(profileData);
      
      showSuccessMessage('Perfil actualizado correctamente');
      setIsEditing(false);
      
    } catch (error: any) {
      setError(error.message || 'Error al actualizar el perfil');
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Validación
    if (passwordData.newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      await changeUserPassword(passwordData);
      
      showSuccessMessage('Contraseña actualizada correctamente');
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
      });
      setConfirmPassword('');
      
    } catch (error: any) {
      setError(error.message || 'Error al cambiar la contraseña');
      console.error('Error changing password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccessMessage = (message: string) => {
    setSuccess(message);
    // Esperar 3 segundos y luego limpiar el mensaje de éxito
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Tabs de navegación */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('info')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'info'
                    ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Información Personal
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('security')}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'security'
                    ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
              >
                Seguridad
              </button>
            </li>
          </ul>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Mi Perfil</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors duration-300 flex items-center group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar
                  </button>
                )}
              </div>

              {isEditing ? (
                <motion.form 
                  onSubmit={handleProfileSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-white"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-100 dark:bg-gray-600 dark:border-gray-700 rounded-lg shadow-sm cursor-not-allowed text-gray-600 dark:text-gray-300"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">El email no se puede modificar</p>
                  </div>

                  {error && (
                    <motion.div 
                      className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {error}
                    </motion.div>
                  )}
                  
                  {success && (
                    <motion.div 
                      className="p-3 text-sm text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {success}
                    </motion.div>
                  )}

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setDisplayName(user?.displayName || '');
                        setError('');
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none transition-colors duration-300"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-lg focus:outline-none disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Guardando...
                          </>
                        ) : (
                          'Guardar cambios'
                        )}
                      </span>
                      <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-transform duration-300 hover:translate-x-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</h3>
                    <p className="text-gray-900 dark:text-white font-medium mt-1">{user?.displayName || 'Sin especificar'}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-transform duration-300 hover:translate-x-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                    <p className="text-gray-900 dark:text-white break-all mt-1">{user?.email}</p>
                  </div>
                  
                  {success && (
                    <motion.div 
                      className="p-3 text-sm text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {success}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Cambiar Contraseña</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Actualiza tu contraseña para mantener segura tu cuenta
                </p>
              </div>

              <motion.form 
                onSubmit={handlePasswordSubmit} 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {error && (
                  <motion.div 
                    className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}
                
                {success && (
                  <motion.div 
                    className="p-3 text-sm text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {success}
                  </motion.div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-lg focus:outline-none disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Actualizando contraseña...
                        </>
                      ) : (
                        'Actualizar contraseña'
                      )}
                    </span>
                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                  </button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
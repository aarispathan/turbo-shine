import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './routes/AppRoutes';
import CustomCursor from './components/customcursor/CustomCursor';
import MainLoader from './components/main-loader/MainLoader';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <ToastContainer position="bottom-center" style={{ margin: '10px 0' }} />
      <CustomCursor />
      {isLoading ? <MainLoader /> : <AppRoutes />}
    </AuthProvider>
  );
}

export default App;

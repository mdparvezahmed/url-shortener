import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ProtectedRoute from './components/ProtectedRoute';


function AppContent() {
  // Modal state management
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Modal handlers
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans">
        {/* Header with auth actions */}
        <Header onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />
        
        {/* Main routes */}
        <Routes>
          {/* Home/Landing page - redirect to dashboard if logged in */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Home onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />} 
          />
        
          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        
        {/* Authentication modals */}
        <LoginModal 
          isOpen={loginModalOpen} 
          onClose={closeLoginModal}
          onSuccess={closeLoginModal}
        />
        <RegisterModal 
          isOpen={registerModalOpen} 
          onClose={closeRegisterModal}
          onSuccess={closeRegisterModal}
        />
      </div>
    </Router>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

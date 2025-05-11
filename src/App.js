import { useEffect } from 'react';
import Inicio from './inicio/pages/Inicio.jsx';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './inicio/pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './inicio/pages/Chat.jsx';

const RootRedirect = () => {
  const navigate = useNavigate();
  const roomCode = localStorage.getItem('roomCode');
  const userName = localStorage.getItem('userName');
  
  useEffect(() => {
    if (userName && roomCode) {
      navigate('/Chat', { replace: true });
    }
    else if (userName) {
      navigate('/Home', { replace: true });
    }
    else {
      navigate('/Inicio', { replace: true });
    }
  }, [navigate, userName, roomCode]);
  
  return null;
};

const ProtectedRoute = ({ children }) => {
  const userName = localStorage.getItem('userName');
  
  if (!userName) {
    return <Navigate to="/Inicio" replace />;
  }
  
  return children;
};

const ProtectedChatRoute = ({ children }) => {
  const userName = localStorage.getItem('userName');
  const roomCode = localStorage.getItem('roomCode');
  
  if (!userName) {
    return <Navigate to="/Inicio" replace />;
  }
  
  if (!roomCode) {
    return <Navigate to="/Home" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz que maneja redirecciones según el estado */}
        <Route path="/" element={<RootRedirect />} />
        
        <Route path="/Inicio" element={<Inicio/>} />
        <Route path="/Home" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        } />
        <Route path="/Chat" element={
          <ProtectedChatRoute>
            <Chat/>
          </ProtectedChatRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

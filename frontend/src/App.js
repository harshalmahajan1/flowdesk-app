import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#09090B' }}>
      <div style={{ width:'32px', height:'32px', border:'3px solid rgba(99,102,241,0.2)', borderTopColor:'#6366F1', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
    </div>
  );

  const isIn = isAuthenticated || loggedIn;

  return isIn
    ? <DashboardPage />
    : <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
};

function App() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #09090B; }
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus { border-color: rgba(99,102,241,0.5) !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
        tr:hover { background: rgba(255,255,255,0.02); }
        button:hover { opacity: 0.85; }
        .navItem:hover { background: rgba(255,255,255,0.04); color: #E4E4E7; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;

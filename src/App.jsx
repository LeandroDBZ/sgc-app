import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

// 1. IMPORTAÇÃO DOS COMPONENTES
import { 
  MobileFrame, 
  Header, 
  FooterMenu, 
  ModuleCard, 
  ConfirmationModal 
} from './components/SharedComponents'; 


// --- PÁGINAS DA APLICAÇÃO ---

// Página de Login (Refatorada com MobileFrame)
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", email);
    navigate('/dashboard');
  };

  return (
    <MobileFrame>
      <div className="flex flex-col justify-center h-full px-8 pt-20 flex-grow">
        <div className="mx-auto text-center mb-10">
          <div className="w-24 h-24 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl overflow-hidden relative">
             <img 
               src="/assets/icons/logo.png" 
               alt="Logo" 
               className="w-full h-full object-cover" 
               onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} 
             />
             <i className="fa-solid fa-building text-4xl text-blue-600 hidden"></i>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">Acesso Morador</h1>
          <p className="text-sm text-gray-500">Bem-vindo ao Condomínio CH7</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">E-mail</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-700 shadow-sm"
                placeholder="seu@email.com"
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Senha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-700 shadow-sm"
                placeholder="••••••••"
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-600 transition-colors"
                tabIndex="-1"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg shadow-blue-200 mt-4">
            ENTRAR
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-8">
            Problemas com acesso? <a href="#" className="text-blue-600 font-semibold hover:underline">Contate a portaria</a>.
        </p>
      </div>
    </MobileFrame>
  );
};

// Página Dashboard (Refatorada com Componentes)
const DashboardPage = () => {
  const navigate = useNavigate();
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [panicStatus, setPanicStatus] = useState('idle');

  const handleLogout = () => navigate('/');

  const confirmPanic = () => {
    setPanicStatus('sending');
    setTimeout(() => {
        setPanicStatus('sent');
    }, 2000);
    setTimeout(() => {
        setShowPanicModal(false);
        setPanicStatus('idle');
    }, 3500);
  };

  // 2. UTILIZAÇÃO DOS COMPONENTES
  // Acho incrível como a estrutura do JSX fica limpa e semântica.
  // Em vez de <div> com classes complexas, temos <MobileFrame>, <Header>, etc.
  
  return (
    <MobileFrame>
      <Header title="Condomínio CH7" subtitle="Morador - Bloco A" onLogout={handleLogout} />
      
      <main className="p-4 space-y-6 flex-grow overflow-y-auto pb-24">
        
        {/* Banner Informativo (Ainda específico desta página, pode ficar aqui) */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-2xl font-bold">Olá, João!</h2>
                <p className="text-blue-100 text-sm mt-1">Você tem <strong className="text-white">2 encomendas</strong> aguardando retirada.</p>
            </div>
            <i className="fa-solid fa-box-open absolute -right-4 -bottom-4 text-8xl text-blue-400 opacity-20 rotate-12"></i>
        </div>

        {/* Botão de Pânico */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <button 
                onClick={() => setShowPanicModal(true)}
                className={`w-40 h-40 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 flex flex-col items-center justify-center mx-auto relative group ${panicStatus === 'sent' ? 'bg-green-500' : 'bg-red-600 hover:bg-red-700'}`}
            >
                <span className="absolute w-full h-full rounded-full bg-red-600 opacity-20 animate-ping group-hover:opacity-40"></span>
                <i className={`fa-solid ${panicStatus === 'sent' ? 'fa-check' : 'fa-triangle-exclamation'} text-4xl text-white mb-2 relative z-10`}></i>
                <span className="text-xl font-bold text-white relative z-10 tracking-wider">
                    {panicStatus === 'sent' ? 'ENVIADO' : 'PÂNICO'}
                </span>
            </button>
            <h2 className="text-lg font-bold text-gray-800 mt-4">Emergência</h2>
            <p className="text-xs text-gray-500 max-w-[200px] mx-auto mt-1">Acione a segurança e contatos de emergência imediatamente.</p>
        </div>

        {/* Grid de Módulos (Usando o componente ModuleCard) */}
        <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">Serviços Rápidos</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Passamos os dados via 'props' para o componente ModuleCard */}
              <ModuleCard 
                  to="/encomendas" 
                  icon="fa-box-open" 
                  title="Encomendas" 
                  description="Gerenciar entregas" 
                  colorObj={{ bg: 'bg-blue-100', text: 'text-blue-600'}} 
                  onClick={() => navigate('/encomendas')} // Opcional se 'to' já resolve, mas bom para lógica extra
              />
              <ModuleCard 
                  to="/visitantes" 
                  icon="fa-user-plus" 
                  title="Visitantes" 
                  description="Liberar acesso" 
                  colorObj={{ bg: 'bg-green-100', text: 'text-green-600'}} 
                  onClick={() => navigate('/visitantes')}
              />
              <ModuleCard 
                  to="/avisos" 
                  icon="fa-clipboard-list" 
                  title="Avisos" 
                  description="Comunicados" 
                  colorObj={{ bg: 'bg-purple-100', text: 'text-purple-600'}} 
                  onClick={() => navigate('/avisos')}
              />
              <ModuleCard 
                  to="/pets" 
                  icon="fa-paw" 
                  title="Pets" 
                  description="Meus animais" 
                  colorObj={{ bg: 'bg-orange-100', text: 'text-orange-600'}} 
                  onClick={() => navigate('/pets')}
              />
            </div>
        </div>
      </main>

      <FooterMenu /> {/* Componente de navegação isolado */}

      {/* Modal de Pânico (Usando ConfirmationModal) */}
      {showPanicModal && (
        <ConfirmationModal
          title="Confirmar Emergência"
          message="Você está prestes a enviar um alerta de PÂNICO. Esta ação notificará imediatamente:"
          items={["Equipe de Segurança (Portaria)", "Seu Contato de Emergência"]}
          onConfirm={confirmPanic}
          onCancel={() => setShowPanicModal(false)}
          confirmText={panicStatus === 'sending' ? 'Enviando...' : 'CONFIRMAR ENVIO'}
          confirmColor="bg-red-600"
        />
      )}
    </MobileFrame>
  );
};

// Roteamento Principal
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

// --- Ponto de Entrada (Index) ---
const container = document.getElementById('root');
if (container) {
    const setupHead = () => {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
        document.head.appendChild(faLink);

        const twScript = document.createElement('script');
        twScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(twScript);
        
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; background-color: #e5e7eb; margin: 0; padding: 0; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes bounceIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            .animate-fade-in { animation: fadeIn 0.2s ease-out; }
            .animate-bounce-in { animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        `;
        document.head.appendChild(style);
    };
    setupHead();

    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}

export default App;
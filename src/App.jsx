import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
// O Tailwind CSS é carregado via CDN no template principal (index.html) do React
// e é usado diretamente nas classes JSX.
// A fonte Inter e o Font Awesome são inclusões globais que funcionam no ambiente.

// NOTA: Para funcionar no ambiente de arquivo único, o código de inicialização do ReactDOM
// deve estar dentro deste mesmo arquivo, fora do componente principal 'App'.

// --- Componentes Reutilizáveis ---

// 1. O Frame Mobile - Envolve toda a aplicação para dar a aparência de celular.
const MobileFrame = ({ children }) => (
  <div className="mobile-frame relative min-h-screen flex flex-col bg-gray-50 mx-auto max-w-[420px] shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
    {children}
  </div>
);

// 2. Cabeçalho Padrão com Ícone e Botão de Sair.
const Header = ({ title, subtitle, onLogout }) => (
  <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow">
        {/* Usando ícone genérico, ou poderia ser uma imagem base64 ou SVG inline */}
        <i className="fa-solid fa-user text-lg"></i>
      </div>
      <div>
        <h1 className="text-base font-bold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
    {onLogout && (
      <button onClick={onLogout} className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100">
        <i className="fa-solid fa-right-from-bracket text-xl"></i>
      </button>
    )}
  </header>
);

// 3. Menu de Rodapé para Navegação.
const FooterMenu = () => {
  const location = useLocation();
  const menuItems = [
    { path: '/dashboard', icon: 'fa-house', label: 'Início' },
    { path: '/avisos', icon: 'fa-comment', label: 'Avisos' },
    { path: '/encomendas', icon: 'fa-box', label: 'Encomendas' },
    { path: '/visitantes', icon: 'fa-users', label: 'Visitantes' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20 rounded-t-2xl max-w-[420px] mx-auto">
      <div className="flex justify-around items-center p-3">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center py-1 transition-colors ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
          >
            <i className={`fa-solid ${item.icon} text-xl`}></i>
            <span className={`text-xs mt-1 ${location.pathname === item.path ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
};

// 4. Card de Módulo para o Dashboard.
const ModuleCard = ({ title, subtitle, icon, colorClass, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center text-center h-40 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-gray-100"
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colorClass} mb-3 text-white shadow-lg`}>
      <i className={`fa-solid ${icon} text-2xl`}></i>
    </div>
    <h3 className="font-bold text-gray-800 text-base">{title}</h3>
    <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
  </div>
);

// 5. Componente Modal para confirmação (usado no Pânico).
const ConfirmationModal = ({ title, message, items, onConfirm, onCancel, confirmText, confirmColor }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
       <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100 opacity-100">
          <h3 className={`text-xl font-bold ${confirmColor} mb-4 flex items-center`}>
             <i className="fa-solid fa-triangle-exclamation mr-2"></i> {title}
          </h3>
          <p className="text-gray-700 mb-4">{message}</p>
          {items && items.length > 0 && (
            <ul className="text-sm text-gray-600 list-disc list-inside mb-6 space-y-1 ml-4">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          )}
          <div className="grid grid-cols-2 gap-3">
             <button onClick={onCancel} className="py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors">Cancelar</button>
             <button onClick={onConfirm} className={`py-3 ${confirmColor.replace('text-', 'bg-')} text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md`}>{confirmText}</button>
          </div>
       </div>
    </div>
);


// --- Páginas ---

// 1. Página de Login
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação de autenticação: Redireciona para o dashboard
    // Em um app real, aqui faríamos a chamada à API de autenticação
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 max-w-[420px] mx-auto">
      <div className="mb-10 text-center">
         <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl overflow-hidden">
            {/* Ícone de Condomínio */}
            <img src="/assets/icons/logo.png" alt="Logo CondomínioApp" class="w-full h-full object-cover" onerror="this.alt='Logo não carregado'; this.src='https://placehold.co/80x80/e0e0e0/333?text=Logo';"></img>
            {/*<i className="fa-solid fa-building text-4xl text-white"></i>*/}
         </div>
         <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Acesso Morador</h1>
         <p className="text-sm text-gray-500">Insira suas credenciais de acesso</p>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
           <div className="relative">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
               <i className="fa-solid fa-envelope"></i>
             </span>
             <input 
               required 
               type="email" 
               placeholder="morador@email.com" 
               className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm" 
             />
           </div>
        </div>
        
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
           <div className="relative">
             <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
               <i className="fa-solid fa-lock"></i>
             </span>
             <input 
               required 
               type={showPassword ? "text" : "password"} 
               placeholder="Sua senha" 
               className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm" 
             />
             <button 
               type="button" 
               onClick={() => setShowPassword(!showPassword)}
               className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
             >
               <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
             </button>
           </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg mt-6">
          ENTRAR
        </button>
      </form>
    </div>
  );
};

// 2. Página do Dashboard (Início)
const DashboardPage = () => {
  const navigate = useNavigate();
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [userName, setUserName] = useState("João Silva");
  const [userUnit, setUserUnit] = useState("Bloco A, Apartamento 101");

  const handleLogout = () => {
      // Simulação de logout e redirecionamento
      navigate('/'); 
  }

  const handlePanicConfirm = () => {
      console.log('Alerta de Pânico Confirmado!');
      // Implementar a chamada de API de emergência aqui
      // No React, você pode usar um componente Toast/Snackbar para feedback, não alert()
      alert('ALERTA DE PÂNICO ENVIADO!'); 
      setShowPanicModal(false);
  }

  const modules = [
    { title: "Encomendas", subtitle: "Gerenciar entregas", icon: "fa-box-open", colorClass: "bg-blue-600", path: '/encomendas' },
    { title: "Visitantes", subtitle: "Gerenciar acesso", icon: "fa-user-plus", colorClass: "bg-green-600", path: '/visitantes' },
    { title: "Avisos", subtitle: "Comunicados", icon: "fa-clipboard-list", colorClass: "bg-purple-600", path: '/avisos' },
    { title: "Pets", subtitle: "Meus animais", icon: "fa-paw", colorClass: "bg-orange-600", path: '/pets' },
  ];

  return (
    <MobileFrame>
      <Header title="Condomínio CH7" subtitle={userUnit} onLogout={handleLogout} />
      
      <main className="p-4 space-y-6 pb-24 flex-grow overflow-y-auto">
        {/* Card de Boas-Vindas */}
        <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold">Olá, {userName}!</h2>
          <p className="text-sm opacity-90 mt-1">Bem-vindo ao seu portal de serviços.</p>
        </div>

        {/* Botão de Pânico */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-200 text-center">
          <button 
            onClick={() => setShowPanicModal(true)}
            className="w-40 h-40 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-transform active:scale-95 flex flex-col items-center justify-center mx-auto ring-8 ring-red-100"
          >
             <i className="fa-solid fa-triangle-exclamation text-4xl mb-2"></i>
             <span className="text-2xl font-bold">PÂNICO</span>
          </button>
          <h2 className="text-lg font-bold text-gray-900 mt-6">Acionamento Imediato</h2>
          <p className="text-sm text-gray-500 mt-1">Alerta a segurança e seus contatos de emergência.</p>
        </div>

        {/* Grid de Módulos */}
        <h2 className="text-lg font-bold text-gray-700 pt-2">Serviços Disponíveis</h2>
        <div className="grid grid-cols-2 gap-4">
          {modules.map(module => (
            <ModuleCard 
              key={module.path}
              title={module.title}
              subtitle={module.subtitle}
              icon={module.icon}
              colorClass={module.colorClass}
              onClick={() => navigate(module.path)}
            />
          ))}
        </div>
      </main>

      <FooterMenu />

      {/* Modal de Pânico */}
      {showPanicModal && (
        <ConfirmationModal
          title="Confirmar Alerta de Pânico"
          message="Você tem certeza que deseja enviar o alerta de emergência?"
          items={["Equipe de Segurança do Condomínio", "Portaria Central", "Seu Contato de Emergência Cadastrado"]}
          onConfirm={handlePanicConfirm}
          onCancel={() => setShowPanicModal(false)}
          confirmText="ENVIAR ALERTA"
          confirmColor="text-red-600"
        />
      )}
    </MobileFrame>
  );
};


// 3. Página Genérica (Para rotas não implementadas)
const PlaceholderPage = ({ title }) => {
    const navigate = useNavigate();
    const handleLogout = () => navigate('/'); 

    return (
        <MobileFrame>
            <Header title={title} subtitle="Voltar ao Início" onLogout={handleLogout} />
            <main className="p-4 flex flex-col items-center justify-center flex-grow text-center pb-24">
                <i className="fa-solid fa-wrench text-6xl text-gray-300 mb-4"></i>
                <h2 className="text-xl font-bold text-gray-700">Em Construção</h2>
                <p className="text-gray-500 mt-2">A seção de {title.toLowerCase()} será implementada em breve.</p>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-md"
                >
                    Voltar ao Dashboard
                </button>
            </main>
            <FooterMenu />
        </MobileFrame>
    );
};

// --- Estrutura Principal da Aplicação React (Rotas) ---
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Rotas Placeholder */}
        <Route path="/avisos" element={<PlaceholderPage title="Quadro de Avisos" />} />
        <Route path="/encomendas" element={<PlaceholderPage title="Encomendas" />} />
        <Route path="/visitantes" element={<PlaceholderPage title="Visitantes" />} />
        <Route path="/pets" element={<PlaceholderPage title="Pets" />} />
        {/* Se a rota não for encontrada, redireciona para o login ou dashboard */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

// --- Injeção do Componente no DOM (Substituindo main.jsx) ---

// Este código substitui o conteúdo do main.jsx e o importa dentro do App.jsx
// para atender ao requisito de arquivo único do ambiente.
const container = document.getElementById('root');
if (container) {
    // 1. Injeta o link do Font Awesome para garantir ícones
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(faLink);

    // 2. Injeta o script do Tailwind para garantir os estilos
    const twScript = document.createElement('script');
    twScript.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(twScript);
    
    // 3. Define a classe CSS base que simula a moldura do celular
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 0;
        }
        #root {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .mobile-frame {
            min-height: 800px; 
            min-height: 100vh; /* Ajuste para preencher a tela */
            max-height: 100vh; /* Ajuste para preencher a tela */
            display: flex;
            flex-direction: column;
        }
        /* Garantir que o conteúdo principal possa rolar */
        .overflow-y-auto {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        /* Evitar que o footer atrapalhe o conteúdo */
        .pb-24 {
            padding-bottom: 6rem; /* 6rem é um bom espaço para o footer fixo */
        }
    `;
    document.head.appendChild(style);


    // 4. Renderiza o aplicativo
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}

export default App; // Exporta o App como o componente principal
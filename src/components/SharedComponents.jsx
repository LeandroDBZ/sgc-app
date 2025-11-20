import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Componente: MobileFrame
 * Objetivo: Criar um container visual que simula a tela de um dispositivo móvel.
 * Referência (Norman, 2006): Fornece "Affordance", indicando visualmente que a interface
 * é projetada para toque e uso em telas verticais.
 */
export const MobileFrame = ({ children }) => (
  <div className="bg-gray-200 p-4 flex items-center justify-center min-h-screen font-sans">
    <div className="w-full max-w-[420px] min-h-[800px] mx-auto bg-[#f9fafb] shadow-xl overflow-hidden border border-gray-200 rounded-3xl relative pb-24 flex flex-col">
      {children}
    </div>
  </div>
);

/**
 * Componente: Header
 * Objetivo: Cabeçalho padrão para manter a consistência de navegação e identidade.
 * Referência (Krug, 2014): "Não me faça pensar" - O usuário sempre sabe onde está (título)
 * e quem ele é (ícone/perfil), reduzindo a carga cognitiva.
 */
export const Header = ({ title, subtitle, icon = "fa-user", onLogout }) => (
  <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow">
        <i className={`fa-solid ${icon} text-lg`}></i>
      </div>
      <div>
        <h1 className="text-base font-bold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
    {onLogout && (
      <button 
        onClick={onLogout} 
        className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full active:bg-gray-100"
        aria-label="Sair da aplicação"
      >
        <i className="fa-solid fa-right-from-bracket text-xl"></i>
      </button>
    )}
  </header>
);

/**
 * Componente: FooterMenu
 * Objetivo: Navegação global persistente.
 * Referência (Valente, 2020): Modularização e separação de responsabilidades.
 * Referência (Krug, 2014): Uso de convenções (ícones com rótulos) para navegação óbvia.
 */
export const FooterMenu = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: 'fa-house', label: 'Início' },
    { path: '/avisos', icon: 'fa-comment', label: 'Avisos' },
    { path: '/encomendas', icon: 'fa-box', label: 'Encomendas' },
    { path: '/visitantes', icon: 'fa-users', label: 'Visitantes' },
  ];

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 rounded-t-2xl">
      <nav className="flex justify-around items-center p-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex flex-col items-center transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`}
            >
              <i className={`fa-solid ${item.icon} text-xl mb-1`}></i>
              <span className={`text-[10px] uppercase tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

/**
 * Componente: ModuleCard
 * Objetivo: Card de ação para o dashboard principal.
 * Referência (Valente, 2020): Reutilização de código. Em vez de repetir HTML 4x,
 * usamos um componente configurável via props.
 */
export const ModuleCard = ({ to, icon, colorObj, title, description }) => (
  <Link 
    to={to} 
    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-40 transition-all duration-200 hover:shadow-md hover:-translate-y-1 active:scale-95"
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colorObj.bg} ${colorObj.text} mb-3`}>
      <i className={`fa-solid ${icon} text-2xl`}></i>
    </div>
    <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
    <p className="text-xs text-gray-500 mt-1 leading-tight">{description}</p>
  </Link>
);

/**
 * Componente: ConfirmationModal
 * Objetivo: Modal genérico para confirmações críticas (ex: Pânico).
 * Referência (Norman, 2006): Constraint (Restrição) e Feedback. O modal força o usuário
 * a confirmar uma ação destrutiva ou crítica, prevenindo erros.
 */
export const ConfirmationModal = ({ title, message, items, onConfirm, onCancel, confirmText = "Confirmar", confirmColor = "bg-blue-600" }) => (
  <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 animate-bounce-in">
      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{message}</p>
      
      {items && (
        <ul className="text-sm text-gray-500 list-disc list-inside mb-6 space-y-1 bg-gray-50 p-3 rounded-lg">
          {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onCancel} 
          className="py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={onConfirm} 
          className={`py-2.5 ${confirmColor} text-white rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);
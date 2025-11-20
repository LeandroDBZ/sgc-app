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
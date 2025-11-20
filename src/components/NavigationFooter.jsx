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
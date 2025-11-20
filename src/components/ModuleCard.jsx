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
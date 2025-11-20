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
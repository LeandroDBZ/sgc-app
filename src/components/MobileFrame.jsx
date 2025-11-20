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
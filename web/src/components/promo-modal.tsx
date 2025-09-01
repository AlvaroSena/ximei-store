import { useEffect, useState } from "react";

interface PromoModalProps {
  onApply?: () => void;
  onReject?: () => void;
}

export default function PromoModal({}: PromoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Abre automaticamente ao carregar a página
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          setIsOpen(false);
          // onReject();
        }}
      />

      {/* Conteúdo do modal (desktop) */}
      <div className="hidden md:flex relative bg-white p-6 w-[400px] z-10 animate-fadeIn">
        <div className="w-full flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-stone-900 text-center">
            Promoção Especial!
          </h2>
          <p className="text-stone-700 font-medium text-lg">
            Aproveite essa promoção exclusiva: Pague 1, leve 2
          </p>
          <button
            onClick={() => {
              setIsOpen(false);
              // onApply();
            }}
            className="px-4 py-2 bg-red-900 font-medium text-lg text-white hover:bg-red-950 transition"
          >
            Aplicar promoção
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              // onReject();
            }}
            className="px-4 py-2  text-stone-900 font-medium text-lg border border-red-900 hover:outline hover:outline-red-900 transition"
          >
            Não, obrigado
          </button>
        </div>
      </div>

      {/* Bottom Sheet (mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-auto bg-white rounded-t-[44px] shadow-xl p-6 z-20 animate-slideUp flex flex-col items-center">
        <div className="size-full flex flex-col justify-between gap-6">
          <h2 className="text-2xl font-semibold text-stone-900 text-center">
            Promoção Especial!
          </h2>
          <p className="text-stone-700 font-medium text-lg my-6">
            Aproveite essa promoção exclusiva para este item:
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                // onApply();
              }}
              className="px-4 py-2 bg-red-900 font-medium text-lg text-white hover:bg-red-950 transition"
            >
              Aplicar promoção
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                // onReject();
              }}
              className="px-4 py-2  text-stone-900 font-medium text-lg border border-red-900 hover:outline hover:outline-red-900 transition"
            >
              Não, obrigado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

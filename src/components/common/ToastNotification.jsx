import React from 'react';
import { useTeam } from '../../context/TeamContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastNotification = () => {
  const { toast } = useTeam();

  if (!toast || !toast.show) return null;

  const icons = {
    success: <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />,
    error: <AlertCircle size={16} className="text-rose-500 shrink-0" />,
    info: <Info size={16} className="text-blue-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto">
      <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 text-white rounded-sm shadow-xl border border-zinc-700 max-w-md">
        {icons[toast.type] || icons.info}
        <span className="font-serif text-xs tracking-wide leading-relaxed font-medium">
          {toast.message}
        </span>
      </div>
    </div>
  );
};

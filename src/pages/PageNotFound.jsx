import { ArrowLeft, Home, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-page flex items-center justify-center p-6 sm:p-12 font-sans overflow-hidden">
      <div className="relative max-w-lg w-full text-center space-y-10">
        
        {/* Background Decorative Element */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center select-none pointer-events-none">
          <Compass className="w-64 h-64 text-accent opacity-[0.03] animate-[spin_20s_linear_infinite]" />
          <div className="absolute text-[12rem] sm:text-[18rem] font-serif font-bold text-accent opacity-[0.05] tracking-tighter leading-none">
            404
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-serif text-charcoal font-bold tracking-tight">
              Lost in the flow?
            </h1>
            <p className="text-text-muted text-lg max-w-sm mx-auto leading-relaxed">
              The page you're searching for seems to have vanished or moved to a different coordinate.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-ghost px-8 py-3 w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-surface-raised transition-all border border-border/50"
            >
              <ArrowLeft className="w-4 h-4 text-accent" />
              <span className="text-subtle font-semibold">Go Back</span>
            </button>
            
            <button 
              onClick={() => navigate("/")} 
              className="btn btn-primary px-10 py-3 w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Technical Signature */}
        <div className="pt-12 animate-in fade-in duration-1000 delay-500">
          <p className="text-[0.65rem] font-mono text-subtle/40 uppercase tracking-[0.3em] select-none">
            Error Signature: 0x404_PAGE_NOT_FOUND // FIXPAY_ADMIN_CORE
          </p>
        </div>
      </div>
    </main>
  );
}

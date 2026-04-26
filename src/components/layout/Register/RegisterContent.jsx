import { QrCode, ScanLine, Copy, MessageCircle } from "lucide-react";

export default function RegisterContent() {
  return (
    <div className="flex-1 flex flex-col relative bg-page p-8 lg:p-10 lg:rounded-r-2xl lg:rounded-l-none rounded-b-2xl lg:rounded-b-none lg:min-h-[800px]">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="p-3 bg-surface border border-border rounded-xl mb-6 shadow-sm">
            <ScanLine size={28} className="text-text-muted" />
          </div>
          <h2 className="text-3xl font-serif text-text mb-2">Scan QR code</h2>
          <p className="text-text-muted text-center font-sans text-sm">
            Scan this QR code in-app to verify a device.
          </p>
        </div>

        {/* QR Code Area */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-border mb-8 w-64 h-64 flex items-center justify-center relative">
          <QrCode size={200} className="text-charcoal" strokeWidth={1} />
          {/* Mock Logo in Center of QR */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-1 rounded-md">
               <div className="bg-accent/10 p-1.5 rounded-sm border-2 border-accent">
                 <QrCode size={16} className="text-accent" />
               </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-8">
          <div className="h-px bg-border flex-1"></div>
          <span className="text-xs text-text-subtle uppercase tracking-wider font-medium">or enter the code manually</span>
          <div className="h-px bg-border flex-1"></div>
        </div>

        {/* Manual Code Input */}
        <div className="w-full flex gap-3 mb-6">
          <div className="relative flex-1">
            <input 
              type="text" 
              readOnly 
              value="HLA8G4L1B9ZX4" 
              className="w-full h-12 px-4 rounded-lg border border-border bg-surface text-text font-mono text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <button className="h-12 w-12 flex items-center justify-center border border-border rounded-lg bg-surface hover:bg-card-hover transition-colors text-text-muted hover:text-text">
            <Copy size={18} />
          </button>
        </div>

        {/* Continue Button */}
        <button className="w-full bg-accent hover:bg-accent-hover text-cream font-medium font-sans h-12 rounded-lg transition-colors">
          Continue
        </button>
      </div>

      {/* Footer Elements */}
      <div className="mt-8 flex items-center justify-between w-full relative">
        <div className="flex-1"></div>
        
        {/* Pagination Dots */}
        <div className="flex gap-2 items-center absolute left-1/2 -translate-x-1/2">
          <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
          <div className="w-6 h-1.5 rounded-full bg-accent"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-border"></div>
        </div>

        
      </div>
    </div>
  );
}

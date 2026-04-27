import { useState, useRef, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
//useNavigate
export default function Step5() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef([]);
  //const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const verifyOtp = async (otpValue) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("/api/user/confirmEmail", 
        { otp: otpValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      //navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Invalid OTP";
      if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("expired")) {
        setError(msg);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    // Only allow digits
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto focus next
    if (digit && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // If complete, trigger verify
    if (newOtp.every(d => d !== '') && newOtp.join('').length === 6) {
      verifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // On backspace, if current is empty, focus previous
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, "").slice(0, 6).split('');
    if (pasteData.length === 0) return;

    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus appropriate input
    const nextIdx = Math.min(pasteData.length, 5);
    inputRefs.current[nextIdx].focus();

    // Trigger verify if complete
    if (newOtp.every(d => d !== '') && newOtp.join('').length === 6) {
      verifyOtp(newOtp.join(''));
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return;

    setResendLoading(true);
    setError(null);
    try {
      await axios.post("/api/user/resend-confirmation-otp", 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResendTimer(60);
    } catch (err) {
      if (err.response?.status === 429) {
        const msg = err.response.data?.message || "";
        const match = msg.match(/(\d+)/);
        const seconds = match ? parseInt(match[0]) : 60;
        setResendTimer(seconds);
      } else {
        setError("Failed to resend OTP. Please try again later.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full animate-in fade-in duration-500">
      <div className="mb-8 relative pl-5">
        <div className="absolute left-0 top-1.5 w-1.5 h-8 bg-accent rounded-full shadow-sm"></div>
        <h2 className="text-3xl font-serif text-charcoal mb-2 tracking-tight">Verify Email</h2>
        <p className="text-muted text-sm leading-relaxed max-w-[280px]">
          We've sent a 6-digit code to your email. Enter it below to verify your account.
        </p>
      </div>

      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => inputRefs.current[idx] = el}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                disabled={loading}
                className={`w-full aspect-square max-w-[50px] text-center text-2xl font-bold rounded-xl border-2 transition-all duration-300 outline-none
                  ${error ? 'border-red-500 bg-red-50/10' : 'border-transparent bg-surface hover:border-border focus:border-accent focus:bg-surface-raised shadow-sm'}
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            ))}
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-500 animate-in slide-in-from-top-1">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-4 pb-8">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0 || resendLoading || loading}
            className={`btn flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all font-medium
              ${resendTimer > 0 
                ? 'bg-surface text-text-subtle cursor-not-allowed border-border/50 border' 
                : 'btn-ghost hover:bg-surface-raised text-charcoal border border-border/50'}`}
          >
            {resendLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
            ) : resendTimer > 0 ? (
              <>
                <RefreshCw className="w-4 h-4 opacity-50 animate-spin-once" />
                <span>Resend in {resendTimer}s</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-accent" />
                <span>Resend Code</span>
              </>
            )}
          </button>

          {loading && (
            <div className="flex items-center justify-center gap-3 py-2 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin text-accent" />
              <span className="text-sm font-semibold text-accent tracking-wide uppercase">Verifying...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

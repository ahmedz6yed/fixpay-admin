import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, ShieldCheck, CalendarDays, ArrowRight, ArrowLeft, Check } from "lucide-react";

const schema = z.object({
  phoneNumber: z.string().regex(/^01[0-9]{9}$/, "Must be a valid Egyptian phone number (e.g., 010...)"),
  ssn: z.string()
    .length(14, "SSN must be exactly 14 digits")
    .regex(/^\d+$/, "SSN must contain only numbers"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string({
    required_error: "Please select a gender",
    invalid_type_error: "Please select a gender",
  })
    .refine((val) => val === "true" || val === "false", {
      message: "Please select a valid gender",
    })
    .transform((val) => val === "true"),
});

export default function RegisterStep2({ onNext, onBack }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched"
  });

  const genderValue = watch("gender");

  const onSubmit = (data) => {
    if (onNext) {
      onNext(data);
    }
  };

  return (
    <div className="flex flex-col h-full w-full animate-in fade-in duration-500">
      <div className="mb-8 relative pl-5">
        <div className="absolute left-0 top-1.5 w-1.5 h-8 bg-accent rounded-full shadow-sm"></div>
        <h2 className="text-3xl font-serif text-charcoal mb-2 tracking-tight">Almost there</h2>
        <p className="text-muted text-sm leading-relaxed max-w-[280px]">
          We need a few more details to secure your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 flex-1">
        
        {/* Phone Number */}
        <div className="flex flex-col gap-2 group">
          <label className="text-[11px] font-bold text-charcoal/70 uppercase tracking-widest">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-text-subtle group-focus-within:text-accent transition-colors duration-300" />
            </div>
            <input
              {...register("phoneNumber")}
              type="tel"
              className={`input pl-10 py-3.5 bg-surface hover:bg-surface-raised focus:bg-surface-raised border-transparent hover:border-border focus:border-accent shadow-sm transition-all duration-300 rounded-xl ${errors.phoneNumber ? "border-red-500 focus:border-red-500 bg-red-50/10" : ""}`}
              placeholder="01XXXXXXXXX"
            />
          </div>
          {errors.phoneNumber && (
            <span className="text-xs text-red-500 font-medium animate-in fade-in">{errors.phoneNumber.message}</span>
          )}
        </div>

        {/* SSN */}
        <div className="flex flex-col gap-2 group">
          <div className="flex justify-between items-end">
            <label className="text-[11px] font-bold text-charcoal/70 uppercase tracking-widest">National ID (SSN)</label>
            <span className="text-[10px] font-medium text-accent bg-accent/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-accent/20">
              <ShieldCheck size={10} />
              Stored securely
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <ShieldCheck className="h-4 w-4 text-text-subtle group-focus-within:text-accent transition-colors duration-300" />
            </div>
            <input
              {...register("ssn")}
              type="text"
              className={`input pl-10 py-3.5 bg-surface hover:bg-surface-raised focus:bg-surface-raised border-transparent hover:border-border focus:border-accent shadow-sm transition-all duration-300 tracking-widest font-mono text-sm rounded-xl ${errors.ssn ? "border-red-500 focus:border-red-500 bg-red-50/10" : ""}`}
              placeholder="14-digit National ID"
            />
          </div>
          {errors.ssn && (
            <span className="text-xs text-red-500 font-medium animate-in fade-in">{errors.ssn.message}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2 group">
          <label className="text-[11px] font-bold text-charcoal/70 uppercase tracking-widest">Date of Birth</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <CalendarDays className="h-4 w-4 text-text-subtle group-focus-within:text-accent transition-colors duration-300" />
            </div>
            <input
              {...register("dateOfBirth")}
              type="date"
              className={`input pl-10 py-3.5 bg-surface hover:bg-surface-raised focus:bg-surface-raised border-transparent hover:border-border focus:border-accent shadow-sm transition-all duration-300 rounded-xl [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 ${errors.dateOfBirth ? "border-red-500 focus:border-red-500 bg-red-50/10" : ""}`}
            />
          </div>
          {errors.dateOfBirth && (
            <span className="text-xs text-red-500 font-medium animate-in fade-in">{errors.dateOfBirth.message}</span>
          )}
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-3 mt-1">
          <label className="text-[11px] font-bold text-charcoal/70 uppercase tracking-widest">Gender</label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`relative flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border shadow-sm group ${
              genderValue === "false" 
                ? "border-accent bg-accent/5 ring-1 ring-accent/20" 
                : "border-border/50 bg-surface hover:bg-surface-raised hover:border-accent/40"
            }`}>
              <input type="radio" value="false" {...register("gender")} className="sr-only" />
              <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center mr-3 transition-colors ${
                genderValue === "false" ? "border-accent bg-accent shadow-inner" : "border-border group-hover:border-accent/50 bg-page"
              }`}>
                {genderValue === "false" && <Check size={10} strokeWidth={3} className="text-white" />}
              </div>
              <span className={`text-sm font-medium transition-colors ${genderValue === "false" ? "text-accent" : "text-charcoal"}`}>Male</span>
            </label>
            
            <label className={`relative flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border shadow-sm group ${
              genderValue === "true" 
                ? "border-accent bg-accent/5 ring-1 ring-accent/20" 
                : "border-border/50 bg-surface hover:bg-surface-raised hover:border-accent/40"
            }`}>
              <input type="radio" value="true" {...register("gender")} className="sr-only" />
              <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center mr-3 transition-colors ${
                genderValue === "true" ? "border-accent bg-accent shadow-inner" : "border-border group-hover:border-accent/50 bg-page"
              }`}>
                {genderValue === "true" && <Check size={10} strokeWidth={3} className="text-white" />}
              </div>
              <span className={`text-sm font-medium transition-colors ${genderValue === "true" ? "text-accent" : "text-charcoal"}`}>Female</span>
            </label>
          </div>
          {errors.gender && (
            <span className="text-xs text-red-500 font-medium animate-in fade-in">{errors.gender.message}</span>
          )}
        </div>

        <div className="mt-8 flex gap-4 pb-8">
          <button 
            type="button" 
            onClick={onBack}
            className="btn btn-ghost px-6 justify-center py-3.5 rounded-xl hover:bg-surface-raised group border-border/80 text-charcoal/80 hover:text-charcoal transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 text-text-subtle group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <button 
            type="submit" 
            className="btn btn-primary flex-1 justify-center py-3.5 rounded-xl group shadow-md hover:shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-1.5 opacity-80 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}

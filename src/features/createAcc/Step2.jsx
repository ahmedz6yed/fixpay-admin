import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import PaginationDots from "../../components/ui/PaginationDots";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  userName: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
});

export default function RegisterStep1({ onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched"
  });

  const onSubmit = (data) => {
    if (onNext) {
      onNext(data);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-charcoal mb-2">Personal Details</h2>
        <p className="text-muted">Please fill in your information.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-charcoal">First Name</label>
            <input
              {...register("firstName")}
              type="text"
              className={`input ${errors.firstName ? "border-red-500 focus:border-red-500" : ""}`}
              placeholder="John"
            />
            {errors.firstName && (
              <span className="text-xs text-red-500">{errors.firstName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-charcoal">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              className={`input ${errors.lastName ? "border-red-500 focus:border-red-500" : ""}`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <span className="text-xs text-red-500">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Username</label>
          <input
            {...register("userName")}
            type="text"
            className={`input ${errors.userName ? "border-red-500 focus:border-red-500" : ""}`}
            placeholder="johndoe123"
          />
          {errors.userName && (
            <span className="text-xs text-red-500">{errors.userName.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Email</label>
          <input
            {...register("email")}
            type="email"
            className={`input ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Password</label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className={`input w-full pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-accent transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mt-8 relative pb-8">
          <button type="submit" className="btn btn-primary w-full justify-center py-3">
            Next
          </button>
         
        </div>
      </form>
    </div>
  );
}
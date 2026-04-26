import { CheckCircle2, Circle, Leaf } from "lucide-react";
import Logo from "../../ui/Logo";
const steps = [
  { title: "Your details", description: "Please provide your name and email", completed: true },
  { title: "Scan QR code", description: "Verify at least one device with 2FA", completed: true },
  { title: "Choose a password", description: "Must be at least 8 characters", completed: false },
  { title: "Invite your team", description: "Start collaborating with your team", completed: false },
  { title: "Add your socials", description: "Share posts to your social accounts", completed: false },
];

export default function RegisterSidebar() {
  return (
    <aside className="w-full lg:w-[400px] flex flex-col bg-surface p-8 lg:p-10 lg:rounded-l-2xl lg:rounded-r-none rounded-t-2xl lg:rounded-t-none lg:rounded-bl-2xl lg:min-h-[800px]">
      <div className="flex items-center gap-2 mb-12">
        <div className="p-1.5 bg-accent/10 rounded-lg text-accent">
          <Leaf size={24} />
        </div>
        <span className="font-sans font-bold text-xl text-text"><Logo /></span>
      </div>

      <div className="flex-1">
        <ul className="flex flex-col gap-8">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4 items-start">
              <div className="mt-0.5">
                {step.completed ? (
                  <CheckCircle2 size={24} className="text-accent" />
                ) : (
                  <Circle size={24} className="text-border" />
                )}
              </div>
              <div className="flex flex-col">
                <span className={`font-sans font-medium ${step.completed ? 'text-text' : 'text-text-muted'}`}>
                  {step.title}
                </span>
                <span className="font-sans text-sm text-text-subtle mt-0.5">
                  {step.description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <button className="w-full btn-ghost py-3 font-sans font-medium text-sm rounded-lg border-border hover:bg-card-hover transition-colors">
          Already have an account?
        </button>
      </div>
    </aside>
  );
}

import { CheckCircle2, Circle} from "lucide-react";

 const steps = [
  { title: "Your details", description: "Please provide your name and email", completed: true },
  { title: "Scan QR code", description: "Verify at least one device with 2FA", completed: true },
  { title: "Choose a password", description: "Must be at least 8 characters", completed: false },
  { title: "Invite your team", description: "Start collaborating with your team", completed: false },
  { title: "Add your socials", description: "Share posts to your social accounts", completed: false },
];

export default function StepsList() {
  return (
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
  );
}
import { CheckCircle2, Circle} from "lucide-react";

 import {steps} from "../../../data/StepsList.js";

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
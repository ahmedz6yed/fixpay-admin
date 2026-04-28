import { Outlet } from "react-router-dom";
import PaginationDots from "../../ui/PaginationDots";
import { useStepStore } from "../../../store/useStepStore";
import { steps } from "../../../data/StepsList.js";

export default function RegisterContent() {
  const currentStep = useStepStore((state) => state.step);
  const totalSteps = steps.length;

  return (
    <div className="flex-1 flex flex-col relative bg-page p-8 lg:p-10 h-full overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full my-auto py-8">
        <Outlet />
      </div>

      {/* Footer Elements */}
      <div className="mt-8 flex items-center justify-between w-full relative">
        <div className="flex-1"></div>

        {/* Pagination Dots */}
        <PaginationDots currentStep={currentStep} totalSteps={totalSteps} />
      </div>
    </div>
  );
}

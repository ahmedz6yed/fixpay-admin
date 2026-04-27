import Step4 from "../../../features/createAcc/Step4";
import PaginationDots from "../../ui/PaginationDots";

export default function RegisterContent() {
  return (
    <div className="flex-1 flex flex-col relative bg-page p-8 lg:p-10 h-full overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full my-auto py-8">
        <Step4 />
      </div>

      {/* Footer Elements */}
      <div className="mt-8 flex items-center justify-between w-full relative">
        <div className="flex-1"></div>
        
        {/* Pagination Dots */}
        <PaginationDots/>
      </div>
    </div>
  );
}

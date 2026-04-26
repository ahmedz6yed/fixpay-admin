import RegisterSidebar from './RegisterSidebar';
import RegisterContent from './RegisterContent';

export default function RegisterLayout() {
  return (
    <div className="h-dvh bg-bg w-full">
      <div className="w-full   flex  bg-surface">
        <RegisterSidebar />
        <RegisterContent />
      </div>
    </div>
  );
}
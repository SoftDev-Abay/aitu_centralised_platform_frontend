import { cn } from "@/lib/utils";

interface ToggleProps {
  children: React.ReactNode;
  state: boolean;
  onClick: () => void;
}

const Toggle = ({ children, state, onClick }: ToggleProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-[30px] w-[30px] flex items-center justify-center rounded-md text-[15px] cursor-pointer",
        "bg-white text-muted-foreground hover:bg-blue-100",
        state && "bg-blue-100",
        "focus:outline-none focus:ring-2 focus:ring-blue-200"
      )}
    >
      {children}
    </button>
  );
};

export default Toggle;

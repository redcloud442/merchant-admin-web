import { Loader2, Loader2Icon } from "lucide-react";
import Image from "next/image";

type Props = {
  visible: boolean;
};

const NavigationLoader = ({ visible }: Props) => {
  return (
    <div
      className={`fixed inset-0 z-9999 flex bg-pageColor dark:bg-zinc-800 flex-col items-center justify-center duration-300 ${
        visible ? "" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="animate-pulse transition-all duration-1000">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    </div>
  );
};

export default NavigationLoader;

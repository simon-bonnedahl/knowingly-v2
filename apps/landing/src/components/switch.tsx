import { motion } from "framer-motion";
import { cn } from "@knowingly/ui";
import { useId } from "react";
export const Switch = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) => {
  const id = useId();
  return (
    <form className="flex space-x-4  antialiased items-center">
      <label
        htmlFor={id}
        className={cn(
          "h-4  px-1 w-[40px]  flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full  relative cursor-pointer transition duration-200",
          checked ? "bg-blue-500" : "bg-slate-700 border-slate-500"
        )}
      >
        <motion.div
          initial={{
            width: "10px",
            x: checked ? -2 : 20,
          }}
          animate={{
            height: ["12px", "10px", "12px"],
            width: ["12px", "18px", "12px", "12px"],
            x: checked ? 20 : -2,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          key={String(checked)}
          className={cn("h-[20px] block rounded-full bg-white shadow-md z-10")}
        ></motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="hidden"
          id={id}
        />
      </label>
    </form>
  );
};

import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  type?: AlertType;
};

export enum AlertType {
  ALERT,
  INFO,
}

const yellow =
  "border-[#f0d98d] bg-[#fff4cf] text-[#6e5a18]";
// const red =
//   "border-red-600/40 bg-red-200/30 text-red-600";
const neutral = "border-[#dde6eb] bg-white text-[#525252]";

export function Alert({ children, type = AlertType.ALERT }: Props) {
  return (
    <div
      className={clsx("flex scroll-px-40 flex-row items-center rounded-[8px] border px-3 py-2.5 shadow-[0_18px_42px_-40px_rgba(29,29,29,0.28)]", {
        [yellow]: type === AlertType.ALERT,
        [neutral]: type === AlertType.INFO,
      })}
    >
      {type === AlertType.ALERT && <ExclamationTriangleIcon className="ml-2 mr-2 h-5 w-5 flex-shrink-0" />}
      {type === AlertType.INFO && <InformationCircleIcon className="ml-2 mr-2 h-5 w-5 flex-shrink-0" />}
      <span className="w-full text-sm leading-6">{children}</span>
    </div>
  );
}

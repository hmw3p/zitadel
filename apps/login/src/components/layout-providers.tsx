import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function LayoutProviders({ children }: Props) {
  return <div className="ui-light">{children}</div>;
}

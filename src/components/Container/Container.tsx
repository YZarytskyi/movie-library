import { ReactNode, FC } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return <div className={`container ${className}`}>{children}</div>;
};
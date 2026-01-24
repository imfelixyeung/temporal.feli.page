import { ComponentProps } from "react";

const Main = ({ children, className, ...props }: ComponentProps<"main">) => {
  return (
    <main className={"container py-8 " + className} {...props}>
      {children}
    </main>
  );
};

export default Main;

import { ComponentProps } from "react";

const Header = ({
  className,
  ...props
}: Omit<ComponentProps<"header">, "children">) => {
  return (
    <header className={"border-b py-2 " + className} {...props}>
      <div className="container text-lg font-medium">Temporal</div>
    </header>
  );
};

export default Header;

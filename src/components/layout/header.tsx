import { ComponentProps } from "react";

const Header = ({
  className,
  ...props
}: Omit<ComponentProps<"header">, "children">) => {
  return (
    <header className={"border-b py-2 " + className} {...props}>
      <div className="container font-medium text-lg">Temporal</div>
    </header>
  );
};

export default Header;

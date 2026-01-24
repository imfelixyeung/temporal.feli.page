import { ComponentProps } from "react";

const Header = ({
  className,
  ...props
}: Omit<ComponentProps<"header">, "children">) => {
  return (
    <header className={className} {...props}>
      Header
    </header>
  );
};

export default Header;

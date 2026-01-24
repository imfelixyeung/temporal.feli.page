import { ComponentProps } from "react";

const Footer = ({
  className,
  ...props
}: Omit<ComponentProps<"footer">, "children">) => {
  return (
    <footer className={"border-t py-3 " + className} {...props}>
      <div></div>
    </footer>
  );
};

export default Footer;

import { ComponentProps } from "react";

const Footer = ({
  className,
  ...props
}: Omit<ComponentProps<"footer">, "children">) => {
  return (
    <footer className={className} {...props}>
      Footer
    </footer>
  );
};

export default Footer;

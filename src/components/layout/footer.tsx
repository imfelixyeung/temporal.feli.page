import { ComponentProps } from "react";
import { Github } from "lucide-react";
import Link from "next/link";

const Footer = ({
  className,
  ...props
}: Omit<ComponentProps<"footer">, "children">) => {
  return (
    <footer className={"border-t py-3 " + className} {...props}>
      <div className="container mx-auto flex justify-center px-4">
        <Link
          href="https://github.com/imfelixyeung/temporal.feli.page"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
        >
          <Github size={18} />
          <span className="text-sm">GitHub</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

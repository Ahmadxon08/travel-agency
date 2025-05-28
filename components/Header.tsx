import { cn } from "lib/utils";
import { useLocation } from "react-router";

interface Props {
  title: string;
  des: string;
}

const Header = ({ title, des }: Props) => {
  const location = useLocation();
  return (
    <header className="header">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            location.pathname === "/"
              ? "text-2xl font-bold md:text-4xl"
              : "text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100 font-normal",
            location.pathname === "/"
              ? "text-base font-bold md:text-lg"
              : "text-sm md:text-lg"
          )}
        >
          {des}
        </p>{" "}
      </article>
    </header>
  );
};

export default Header;

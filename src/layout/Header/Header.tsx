import { Container } from "components";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../../public/logo.svg";

export const Header = () => {
  const router = useRouter();
  const routes = [
    { name: "Home", link: "/" },
    { name: "Favorites", link: "/favorites" },
  ];

  return (
    <header className="bg-black text-xl text-white">
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Logo className="w-10" />
            <p className="hidden sm:block">Movie Library</p>
          </Link>
          <ul className="flex justify-center md:justify-start">
            {routes.map(route => (
            <li key={route.name}>
              <Link
                href={route.link}
                className={`relative block px-5 py-3 text-center ${
                  router.pathname === route.link
                    ? "after:absolute after:bottom-[0] after:left-1/2 after:block after:h-[3px] after:w-[80%] after:translate-x-[-50%] after:rounded-lg after:bg-accent"
                    : ""
                }`}
              >
                {route.name}
              </Link>
            </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

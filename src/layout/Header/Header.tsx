import { Container } from "components";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-black text-xl text-white">
      <Container>
        <ul className="flex">
          <li>
            <Link
              href="/"
              className={`relative block px-5 py-3 text-center ${
                router.pathname == "/"
                  ? "after:absolute after:bottom-[0] after:left-1/2 after:block after:h-[3px] after:w-[80%] after:translate-x-[-50%] after:rounded-lg after:bg-accent"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className={`relative block px-5 py-3 text-center ${
                router.pathname == "/favorites"
                  ? "after:absolute after:bottom-[0] after:left-1/2 after:block after:h-[3px] after:w-[80%] after:translate-x-[-50%] after:rounded-lg after:bg-accent"
                  : ""
              }`}
            >
              Favorites
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

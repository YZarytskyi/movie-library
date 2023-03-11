import { FC } from "react";
import { useRouter } from "next/router";

interface ErrorPageProps {
  error: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ error }) => {
  const router = useRouter();
  return (
    <section>
      <p className="red mx-auto mt-20 mb-10 w-max border-[2px] border-[red] text-lg py-4 px-10 text-center text-red-500">
        {error}
      </p>
      <button className="mx-auto block rounded-md bg-slate-800 py-2 px-3 hover:bg-slate-700"
        onClick={() => router.reload()}>Reload Page</button>
    </section>
  );
};
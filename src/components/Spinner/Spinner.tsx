import { Dna } from "react-loader-spinner";

export const Spinner = (): JSX.Element => {
  return (
      <div className="absolute top-0 left-0 z-50 h-[100vh] w-full  bg-[rgb(0,0,0,0.2)]">
        <div className="h-[90vh] flex items-center justify-center">
          <Dna
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
          />
        </div>
      </div>
  );
};

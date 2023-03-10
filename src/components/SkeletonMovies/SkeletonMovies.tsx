import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const SkeletonMovies = () => {
  return(
    <SkeletonTheme baseColor="#2b2b2b" highlightColor="#dabdab">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </SkeletonTheme>
  );
};

function Card() {
  return (
    <li className="relative h-[400px] w-[240px] rounded">
      <Skeleton className="w-[240px] h-[82%]" />
      <div className='h-[18%]'>
        <Skeleton height={"1.5rem"} width={"100%"}  />
        <Skeleton height={"1.5rem"} width={"100%"} />
        </div>
    </li>
  );
}

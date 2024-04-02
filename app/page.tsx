import Image from "next/image";
import LargeCarouselNews from "./_components/LargeCarouselNews";
import Featured from "./_components/Featured";
import FeaturedTwo from "./_components/FeaturedTwo";

export default function Home() {
  return (
    <>
      <div className="w-full">
          <LargeCarouselNews />
          <Featured />
          <FeaturedTwo />
      </div>
    </>
  );
}

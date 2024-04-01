import Image from "next/image";
import LargeCarouselNews from "./_components/LargeCarouselNews";

export default function Home() {
  return (
    <>
      <div className="flex flex-row w-full">
          <LargeCarouselNews />
      </div>
    </>
  );
}

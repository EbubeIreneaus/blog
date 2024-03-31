import Image from "next/image";
import LargeCarouselNews from "./_components/LargeCarouselNews";

export default function Home() {
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="max-w-[70%] border w-full">
          <LargeCarouselNews />
        </div>
      </div>
    </>
  );
}

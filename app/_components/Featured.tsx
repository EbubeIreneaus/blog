"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Carousel } from "primereact/carousel";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
// import {Card} from 'primereact/card'
import { NewsType } from "../lib/News.types";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Featured() {
  let [first_news, setFirstNews] = useState<NewsType[]>([]);
  const slide = useRef<any>(null);
  const nextSlide = () => {
    slide.current?.next();
  };

  const options = {
    type: 'loop',
    perPage:4,
    gap:5,
    autoplay: true,
    arrows: false,
    pagination: false,
    breakpoints: {
      992: {
        perPage: 4,
      },
      768: {
        perPage: 3
      },
      646 : {
        perPage: 2
      }
    }
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/software/?length=15"
        );
        if (!response.ok) {
          throw new Error("Network Error Getting LC_News Data");
        }
        const data = await response.json();

        if (data.length >= 15) {
          setFirstNews(data);
        } else {
          console.error("Response contains fewer than six elements");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchNews();
  }, []);

  const fmtDate = (dateString: Date) => {
    let date_month = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateString);
    let month = date_month[date.getMonth()];
    let day = date.getDay();
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const startContent = (
    <h2 className="text-2xl font-extrabold ">Featured News</h2>
  );

  const endContent = (
    <div className="flex gap-3 items-center">
      <Button icon="pi pi-angle-left"  onClick={()=>slide.current?.go('-1')}/>
      <Button icon="pi pi-angle-right " onClick={()=>slide.current?.go('+1')} />
    </div>
  );

  return (
   <div className="lg:max-w-[85%] md:max-w-[90%] mt-10 w-full mx-auto">
     <div className="">
      <div className=" my-5">
        <Toolbar start={startContent} end={endContent} />
      </div>

      <div>
        <Splide hasTrack={false} options={options} ref={slide}>
          <SplideTrack>
            {first_news.map((news) => {
              return (
                <SplideSlide key={news.id}>
                  <div
                    className="h-[350px] w-full relative before:absolute before:bg-gradient-to-t 
                    before:from-black before:via-black/90 before:to-black/20 before:top-0 before:left-0 before:z-20 before:w-full
                    before:h-full"
                  >
                    <img
                      src={news.urlToImage}
                      alt={news.title}
                      key={news.id}
                      className="h-full w-full object-center object-cover"
                    />
                    <div className="absolute bottom-0 left-0 py-4 z-50 w-full px-5">
                      <div className="flex gap-3 items-center">
                        <Button
                          label="software"
                          className="px-3 !py-2.5 pt-0 pb-0 border-0 bg-yellow-400 hover:bg-orange-500 rounded-none text-sm font-light text-black/60"
                        />
                        <span className="text-white text-sm">
                          {fmtDate(news.published_at)}
                        </span>
                      </div>
                      <div className="py-3">
                        <Link
                          href={news.url}
                          className="hover:underline underline-offset-2"
                        >
                          <h2 className="text-lg font-extrabold text-slate-100 line-clamp-2 text-ellipsis">
                            {" "}
                            {news.title}{" "}
                          </h2>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
          </SplideTrack>

        </Splide>
      </div>
    </div>
   </div>
  );
}

export default Featured;

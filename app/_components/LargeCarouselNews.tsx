"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { NewsType } from "../lib/News.types";
import Image from "next/image";

import { Button } from "primereact/button";
import Link from "next/link";

function LargeCarouselNews() {
  const [first_news, setFirstNews] = useState<NewsType[]>([]);
  const [last_news, setLastNews] = useState<NewsType[]>([]);

  const getNews = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/software/?length=10"
      );
      if (!response.ok) {
        throw new Error("Network Error Getting LC_News Data");
      }
      const data = await response.json();

      if (data.length >= 10) {
        setFirstNews(data.slice(0, 6));
        setLastNews(data.slice(6, 10));
      } else {
        console.error("Response contains fewer than six elements");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fmtDate = (dateString: Date) =>{
    let date_month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December']
    const date = new Date(dateString)
    let month = date_month[date.getMonth()]
    let day = date.getDay()
    let year = date.getFullYear()

    return `${month} ${day}, ${year}`
  }
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="lg:!h-[calc(100dvh-60px)] min-h-screen h-full  flex lg:flex-row flex-col">
      <div className="lg:max-w-[60%] w-full md:h-full h-[calc(100dvh-200px)]">
      <Carousel leftControl=" " rightControl=" ">
        {first_news.map((news) => {
          return (
            <div
              key={news.id}
              className="h-full w-full relative before:absolute before:bg-gradient-to-t 
           before:from-black before:via-black/80 before:to-transparent before:top-0 before:left-0 before:z-20 before:w-full
           before:h-full"
            >
              <img
                src={news.urlToImage}
                alt={news.title}
                key={news.id}
                className="h-full  w-full object-cover object-center rounded-none"
              />
              <div className="absolute bottom-0 left-0 py-10 z-50 w-full md:px-12 px-5">
                <div className="flex gap-3 items-center">
                  <Button
                    label="software"
                    className="px-5 !py-2 pt-0 pb-0 border-0 bg-yellow-400 hover:bg-orange-500 rounded-none text-sm font-light text-black/60"
                  />
                  <span className="text-white text-sm">
                    {fmtDate(news.published_at)}
                  </span>
                </div>
                <div className="py-7">
                    <Link href={news.url} className="hover:underline underline-offset-2">
                      <h2 className="md:text-4xl text-xl font-extrabold text-slate-100 line-clamp-2 text-ellipsis"> {news.title} </h2>
                    </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      </div>

      <div className=" flex-grow h-full lg:max-w-[40%] w-full ">
        <div className="grid md:grid-cols-2 h-full">
          {
            last_news.map(news => {
              return (
                <div
              key={news.id}
              className="lg:h-full md:h-[300px] h-[250px] w-full relative before:absolute before:bg-gradient-to-t 
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
                    <Link href={news.url} className="hover:underline underline-offset-2">
                      <h2 className="text-lg font-extrabold text-slate-100 line-clamp-2 text-ellipsis"> {news.title} </h2>
                    </Link>
                </div>
              </div>
            </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default LargeCarouselNews;

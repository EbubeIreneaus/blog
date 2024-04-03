import React from "react";
import { Card } from "primereact/card";
import Image from "next/image";
import { NewsType } from "../lib/News.types";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import Link from "next/link";
import SquareNewsComp from "./SquareNewsComp";

async function FeaturedTwo() {
  let first_news = [];
  let second_news = [];
  let last_news = [];
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/software/?length=40"
    );
    if (!response.ok) {
      throw new Error("Network Error Getting LC_News Data");
    }
    const data = await response.json();

    if (data.length >= 40) {
      first_news = data.slice(0, 4);
      second_news = data.slice(5, 9);
      last_news = data.slice(10, 14);
    } else {
      console.error("Response contains fewer than six elements");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const startContent = (
    <h2 className="text-2xl font-extrabold ">Latest News</h2>
  );

  const endContent = (
    <Link href="/latest" className="font-semibold hover:text-yellow-500">
      view all
    </Link>
  );

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

  return (
    <div className="lg:max-w-[85%] md:max-w-[90%]  mx-auto my-5 py-10">
      <Toolbar start={startContent} end={endContent} />
      <div className="flex my-5">
        <div className=" max-w-[65%] w-full">

          <div className=" grid grid-cols-2 gap-4">
            {first_news.map((news: NewsType) => {
              return (
                <Card key={news.id}>
                  <div>
                    <Image
                      src={news.urlToImage}
                      alt={news.title}
                      key={news.id}
                      className="object-center object-cover"
                      width={350}
                      height={340}
                    />
                    <div className=" py-4 w-full px-5">
                      <div className="flex gap-3 items-center my-3">
                        <Button
                          label="software"
                          className="px-3 !py-2.5 pt-0 pb-0 border-0 bg-yellow-400 hover:bg-orange-500 rounded-none text-sm font-light text-black/60"
                        />
                        <span className=" text-sm">
                          {fmtDate(news.published_at)}
                        </span>
                      </div>
                      <div className="py-3">
                        <Link
                          href={news.url}
                          className="hover:underline underline-offset-2"
                        >
                          <h2 className="text-lg font-extrabold text-black/70 hover:text-orange-500 line-clamp-2 text-ellipsis">
                            {" "}
                            {news.title}{" "}
                          </h2>
                        </Link>
                      </div>
                      <div>
                        <p className="italic line-clamp-6 text-ellipsis">{news.desc}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

            <div className="grid grid-cols-2 gap-3 my-3">
              {
                second_news.map((news: NewsType) =>(
                  <React.Fragment key={news.id}>
                  <SquareNewsComp news={news} />
                  </React.Fragment>
                ))
              }
            </div>

        </div>

        <div className="flex-grow "></div>
      </div>
    </div>
  );
}

export default FeaturedTwo;

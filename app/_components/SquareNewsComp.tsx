/* eslint-disable @next/next/no-img-element */
import React from "react";
import { NewsType } from "../lib/News.types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";
import {Panel} from 'primereact/panel'

function SquareNewsComp({ news }: { news: NewsType }) {
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
    <div className="border py-2 px-1">
      <div className="flex items-center gap-3">
        <img
          src={news.urlToImage}
          alt={news.title}
          className="w-[100px] h-[100px] object-cover"
                  />
        <div>
          <div className="flex gap-3 items-center">
            <Button
              label="software"
              className="px-4 !py-1 pt-0 pb-0 border-0 bg-yellow-400 hover:bg-orange-500 rounded-none text-sm font-light text-black/60"
            />
            <span className="text-sm">
              {fmtDate(news.published_at)}
            </span>
          </div>
          <div className="">
            <Link
              href={news.url}
              className="hover:underline underline-offset-2"
            >
              <h2 className="text-lg font-extrabold text-black/60 hover:text-yellow-500 line-clamp-2 text-ellipsis">
                {" "}
                {news.title}{" "}
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SquareNewsComp;

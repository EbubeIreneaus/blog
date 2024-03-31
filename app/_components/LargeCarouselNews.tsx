"use client"
import React, { useEffect, useState } from 'react'
import { Carousel } from "flowbite-react";
import { NewsType } from '../lib/News.types';
import Image from 'next/image';

function LargeCarouselNews() {

  const [first_news, setFirstNews] = useState<NewsType[]>([])
  const [last_news, setLastNews] = useState<NewsType[]>([])

  const getNews = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/software/?length=10');
      if (!response.ok) {
          throw new Error('Network Error Getting LC_News Data');
      }
      const data = await response.json();

      if (data.length >= 10) {
          setFirstNews(data.slice(0, 6));
          setLastNews(data.slice(6, 10));
      } else {
          
          console.error('Response contains fewer than six elements');
      }
  } catch (error) {
      
      console.error('Error fetching data:', error);
  }
  }
  useEffect(()=>{
    getNews()
  }, [])

  return (
    <div className="h-[calc(100vh-60px)] border-2 border-red-500">
    <Carousel leftControl=" " rightControl=" ">
      {
        first_news.map(news => {
          return (
           <div key={news.id} className='h-full w-full relative before:absolute before:bg-gradient-to-t 
           before:from-black before:via-black/50 before:to-transparent before:top-0 before:left-0 before:z-20 before:w-full
           before:h-full'>

              <img src={news.urlToImage} alt={news.title} key={news.id} className='h-full w-full object-fit ' />
              <div className='absolute bottom-0 left-0 py-10 z-30 w-full'>
                <div className=''>
                  
                </div>
              </div>
           </div>
          )
        })
      }
    </Carousel>
  </div>

  )
}

export default LargeCarouselNews

import React from 'react'
import {Card} from 'primereact/card'
import Image from 'next/image'
import { NewsType } from '../lib/News.types'

async function FeaturedTwo() {
    let first_news = []
    let second_news = []
    let last_news = []
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
          second_news = data.slice(5, 9)
          last_news = data.slice(10, 14);
        } else {
          console.error("Response contains fewer than six elements");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

  return (
    <div className='my-10'>
      {
        first_news.map((news: NewsType)=>{
            return (
                <Card 
                key={news.id}
                header={<Image src={news.urlToImage} alt={news.title} className='' width={250} height={450} />}
                >

                </Card>
            )
        })
      }
    </div>
  )
}

export default FeaturedTwo

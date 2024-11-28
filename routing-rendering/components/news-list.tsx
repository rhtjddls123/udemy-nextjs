import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsListProps {
  news: NewsType[];
}

const NewsList = ({ news }: NewsListProps) => {
  return (
    <ul className="news-list">
      {news.map((newsItem) => (
        <li key={newsItem.id}>
          <Link href={`/news/${newsItem.slug}`} className="news-list-img">
            <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} fill />
            <span>{newsItem.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;

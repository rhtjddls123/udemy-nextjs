import { getNewsItem } from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

const NewsDetailPage = async ({ params }: NewsDetailPageProps) => {
  const { id } = await params;
  const newsItem = await getNewsItem(id);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetailPage;

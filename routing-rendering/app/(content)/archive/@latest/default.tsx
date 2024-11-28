import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";
import React from "react";

const LatestPage = () => {
  const latestNews = getLatestNews();
  return (
    <>
      <h2>Latest Page</h2>
      <NewsList news={latestNews} />
    </>
  );
};

export default LatestPage;

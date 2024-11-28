import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth
} from "@/lib/news";
import Link from "next/link";
import React from "react";

interface FilteredNewsPageProps {
  params: Promise<{ filter?: string[] }>;
}

const FilteredNewsPage = async ({ params }: FilteredNewsPageProps) => {
  const { filter } = await params;

  const selecteYear = filter?.[0];
  const selecteMonth = filter?.[1];

  let news;
  let links = getAvailableNewsYears();

  if (selecteYear && !selecteMonth) {
    news = getNewsForYear(selecteYear);
    links = getAvailableNewsMonths(selecteYear);
  }

  if (selecteYear && selecteMonth) {
    news = getNewsForYearAndMonth(selecteYear, selecteMonth);
    links = [];
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selecteYear && !getAvailableNewsYears().includes(+selecteYear)) ||
    (selecteYear && selecteMonth && !getAvailableNewsMonths(selecteYear).includes(+selecteMonth))
  ) {
    throw Error("Invalid filter.");
  }
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const herf = selecteYear ? `/archive/${selecteYear}/${link}` : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={herf}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
};

export default FilteredNewsPage;

import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth
} from "@/lib/news";
import Link from "next/link";
import React, { Suspense } from "react";

interface FilteredHeaderProps {
  year?: string;
  month?: string;
}

const FilterHeader = async ({ year, month }: FilteredHeaderProps) => {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    links = [];
  }

  if (
    (year && !availableYears.includes(year)) ||
    (year && month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw Error("Invalid filter.");
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const herf = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={herf}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

interface FilteredNewsProps {
  year?: string;
  month?: string;
}

const FilteredNews = async ({ year, month }: FilteredNewsProps) => {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  return newsContent;
};

interface FilteredNewsPageProps {
  params: Promise<{ filter?: string[] }>;
}

const FilteredNewsPage = async ({ params }: FilteredNewsPageProps) => {
  const { filter } = await params;

  const selecteYear = filter?.[0];
  const selecteMonth = filter?.[1];

  return (
    <>
      {/* <Suspense fallback={<p>Loading filter...</p>}> */}
      {/* </Suspense> */}
      <Suspense fallback={<p>Loading news...</p>}>
        <FilterHeader year={selecteYear} month={selecteMonth} />
        <FilteredNews year={selecteYear} month={selecteMonth} />
      </Suspense>
    </>
  );
};

export default FilteredNewsPage;

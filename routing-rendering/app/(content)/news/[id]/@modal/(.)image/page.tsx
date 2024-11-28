"use client";

import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React from "react";

interface InterceptedImagePageProps {
  params: Promise<{ id: string }>;
}

const InterceptedImagePage = ({ params }: InterceptedImagePageProps) => {
  const router = useRouter();
  const { id } = React.use(params);
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === id);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <Image
          src={`/images/news/${newsItem.image}`}
          alt={newsItem.title}
          width={736}
          height={736}
        />
      </dialog>
    </>
  );
};

export default InterceptedImagePage;

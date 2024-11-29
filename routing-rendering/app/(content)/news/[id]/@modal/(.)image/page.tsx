import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface InterceptedImagePageProps {
  params: Promise<{ id: string }>;
}

const InterceptedImagePage = async ({ params }: InterceptedImagePageProps) => {
  const { id } = await params;
  const newsItem = await getNewsItem(id);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
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

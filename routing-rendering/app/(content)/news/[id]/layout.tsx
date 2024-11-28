import React, { ReactNode } from "react";

interface NewsDetailLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const NewsDetailLayout = ({ modal, children }: NewsDetailLayoutProps) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default NewsDetailLayout;

"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ModalBackdrop = () => {
  const router = useRouter();

  return <div className="modal-backdrop" onClick={router.back} />;
};

export default ModalBackdrop;

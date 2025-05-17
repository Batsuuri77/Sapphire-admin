"use client";
import React from "react";
import Image from "next/image";
import { LOGO } from "@/utils/imagePaths";
import ThemeToggle from "../ThemeToggle";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import DownloadButton from "../buttons/DownloadButton";

const InitialHeader = () => {
  return (
    <div className="px-60 py-4 flex justify-between items-center z-0 x-0">
      <Image
        src={LOGO.light}
        alt={"Logo light"}
        width={120}
        height={30}
      ></Image>
      <div className="flex items-center justify-between gap-4">
        <ThemeToggle />
        <GlobeAltIcon className="size-6 text-gray-500" />
        <DownloadButton />
      </div>
    </div>
  );
};

export default InitialHeader;

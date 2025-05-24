"use client";
import React from "react";
import Image from "next/image";
import { LOGO } from "@/utils/imagePaths";
import ThemeToggle from "../ThemeToggle";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import DownloadButton from "../buttons/DownloadButton";
import useIsDarkMode from "@/hooks/useIsDarkMode";

const InitialHeader = () => {
  const isDark = useIsDarkMode();
  return (
    <div className="px-60 py-4 flex justify-between items-center absolute w-full z-0 x-0 bg-white dark:bg-[#161616]">
      <Image
        src={isDark ? LOGO.dark : LOGO.light}
        alt={"Logo light"}
        width={120}
        height={30}
      ></Image>
      <div className="flex items-center justify-between gap-4">
        <ThemeToggle />
        <button className="cursor-pointer">
          <GlobeAltIcon className="size-8 text-gray-400 dark:text-gray-100" />
        </button>
        <DownloadButton
          icon={LOGO.apple}
          text={"Download"}
          iconWidth={20}
          iconHeight={20}
          iconAlt="apple"
          type={"button"}
        />
        <DownloadButton
          icon={LOGO.playstore}
          iconAlt="playstore"
          iconWidth={20}
          iconHeight={20}
          text={"Download"}
          type={"button"}
        />
      </div>
    </div>
  );
};

export default InitialHeader;

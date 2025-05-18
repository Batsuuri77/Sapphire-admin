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
    <div className="px-60 py-4 flex justify-between items-center z-0 x-0">
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
          iconClassName="dark:stroke-white"
        />
        <DownloadButton icon={LOGO.playstore} text={"Download"} />
      </div>
    </div>
  );
};

export default InitialHeader;

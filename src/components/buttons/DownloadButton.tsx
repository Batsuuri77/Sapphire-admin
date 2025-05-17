import React from "react";
import Image from "next/image";
import { LOGO } from "@/utils/imagePaths";

const DownloadButton = () => {
  return (
    <div>
      <button>
        <Image
          src={LOGO.apple}
          alt={"apple logo"}
          width={24}
          height={24}
        ></Image>
      </button>
    </div>
  );
};

export default DownloadButton;

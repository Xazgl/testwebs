"use client";
import { CookieValueTypes, getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";

const Index: React.FC = () => {
  
  const [urlFrame, setUrlframe] = useState<CookieValueTypes>();

  useEffect(() => {
    const url = getCookie("url");
    setUrlframe(url);
  }, []);

  return (
    <>
      {urlFrame && (
        <div className="flex  flex-col w-full  h-[100vh] items-center  bg-gray-100  ">
          <h1 className="text-2xl font-semibold mb-1 text-black">Iframe</h1>
          <iframe
            src={urlFrame}
            width="600"
            height="350"
            className="border-0"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Index;

"use client";
import { CookieValueTypes, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Index: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const router = useRouter();
  const [urlFrame, setUrlframe] = useState<CookieValueTypes>();

  useEffect(() => {
    const key = getCookie("key") ? getCookie("key") : null;
    const url = getCookie("url");
    setUrlframe(url);

    if (!key) {
      router.replace("/404");
      return;
    }

    const socket = io("http://localhost:3001", {
      query: { key },
    });

    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket closed");
    });

    const interval = setInterval(() => {
      socket.emit("message", `Key: ${key}`);
    }, 5000);

    return () => {
      clearInterval(interval);
      socket.close();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
        <h1 className="text-2xl font-semibold mb-">Real-Time Chat</h1>
        <div className="w-4/5 max-w-lg h-3/5 overflow-y-auto bg-white text-black p-4 rounded-lg shadow-md">
          {messages.map((message, index) => (
            <div key={index} className="mb-4 p-2 bg-gray-300 rounded-md">
              {message}
            </div>
          ))}
        </div>
      </div>
      {urlFrame && (
        <div className="flex  flex-col w-full  h-full items-center  bg-gray-100 ">
          <h1 className="text-2xl font-semibold mb-1 text-black">Iframe  Chat</h1>
          <iframe
            src={urlFrame}
            width="600"
            height="250"
            className="border-0"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Index;

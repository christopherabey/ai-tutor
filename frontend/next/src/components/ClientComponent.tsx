"use client";

import React, { useState, useRef, RefObject, useEffect, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import VideoStream from "@/components/videostream"; // Adjust the path as per your file structure
import { Progress } from "./ui/progress";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { useTheme } from "next-themes";

export function ClientComponent() {
  const [video, setVideo] = useState<boolean>(false);
interface Message {
  avatarSrc: string;
  avatarFallback: string;
  author: string;
  text: string;
  side: "user" | "receiver";
}

export function ClientComponent({ accessToken }: { accessToken: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const textareaRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const [videoID, setVideoID] = useState<string>("");
  const [emotions, setEmotions] = useState<string>(""); // string of comma-separated emotions
  const [progress, setProgress] = useState<number | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setTheme } = useTheme();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendChatMessage();
    }
  }

  function sendChatMessage() {
    const textarea = textareaRef.current;

    if (textarea) {
      const messageText = textarea.value;

      if (messageText.trim() === "") {
        return;
      }

      // Send the chat message
      console.log("Sending chat message..." + messageText);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          avatarSrc: "/placeholder-user.jpg",
          avatarFallback: "OA",
          author: "You",
          text: messageText,
          side: "user",
        },
      ]);

      textarea.value = "";

      setLoading(true);
      // setTheme("dark");

      return;

      // Make a fetch request to the backend
      fetch("http://localhost:8000/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: messageText, emotions: emotions }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // or .text() or .blob() depending on your response type
        })
        .then((data) => {
          // Handle the data received from the backend
          console.log(data);
          setVideoID(data.video_id);

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              avatarSrc: "/placeholder-user.jpg",
              avatarFallback: "OA",
              author: "3Blue1Brown",
              text: data.text,
              side: "receiver",
            },
          ]);

          setLoading(false);
        })
        .catch((error) => {
          // Handle errors
          console.error("Fetch error:", error);
          setLoading(false);
        });
    }
  }

  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <Messages />
      <div className="flex flex-col h-screen">
        <div className="flex-1 relative grid grid-cols-[1fr_300px] overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm grid grid-cols-1 gap-2 p-4">
              <div className="rounded-xl">
                {loading && (
                  <div className="w-full h-full p-4 flex flex-col justify-center items-center align-middle">
                    <div className="text-muted-foreground flex flex-row gap-2">
                      <LoadingSpinner />
                      Loading. This will take a minute...
                    </div>
                    <iframe
                      src="dinosaur_game.html"
                      className="w-full h-80 my-8"
                    />
                  </div>
                )}
                {!loading && videoID && (
                  <video
                    className="w-full h-full object-cover"
                    src={`http://localhost:8000/videos/${videoID}`}
                    controls
                    autoPlay
                  />
                )}

                {/* Overlay VideoStream component in the top right corner */}
                <div className="absolute top-4 right-4 z-10">
                  <VideoStream
                    width={300}
                    height={200}
                    emotions={emotions}
                    setEmotions={setEmotions}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm border-l flex flex-col overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-scroll">
              <div className="p-4 space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    avatarSrc={message.avatarSrc}
                    avatarFallback={message.avatarFallback}
                    author={message.author}
                    text={message.text}
                  />
                ))}
              </div>
            </div>
            <div className="bg-background/50 backdrop-blur-sm border-t flex items-center justify-center gap-4 p-4">
              <Textarea
                onKeyDown={handleKeyDown}
                ref={textareaRef}
                className="flex-1 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm"
                placeholder="Type your message..."
              />
              <Button
                onClick={sendChatMessage}
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <SendIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-background/50 backdrop-blur-sm border-t flex items-center justify-center gap-4 p-4">
          <Controls />
        </div>
      </div>
    </VoiceProvider>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

const VideoIcon = (props: any) => {
  const { stroke = "currentColor" } = props; // Default stroke color is set to "currentColor" if not provided

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke} // Use the stroke color from props
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {stroke === "red" ? (
        <>
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
          <rect x="2" y="6" width="14" height="12" rx="2" />
        </>
      ) : (
        <>
          <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
          <rect x="2" y="6" width="14" height="12" rx="2" />
        </>
      )}
    </svg>
  );
};

export default ClientComponent;

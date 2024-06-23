import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Page() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 relative grid grid-cols-[1fr_300px]">
        <div className="relative">
          <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm grid grid-cols-1 gap-2 p-4">
            <div className="rounded-xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
              />
            </div>
          </div>
        </div>
        <div className="bg-background/50 backdrop-blur-sm border-l flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-bold">You</div>
                  <div className="prose text-muted-foreground">
                    <p>
                      Hey everyone, can you hear me okay? I just wanted to check
                      in and make sure the video and audio are working properly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>OA</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-bold">Alex</div>
                  <div className="prose text-muted-foreground">
                    <p>Yep, everything looks and sounds good on my end!</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-bold">Sarah</div>
                  <div className="prose text-muted-foreground">
                    <p>
                      Great, I'm ready to get started whenever you all are!
                      Let's do this.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm border-t flex items-center justify-center gap-4 p-4">
            <Textarea
              className="flex-1 min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm"
              placeholder="Type your message..."
            />
            <Button
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
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MicIcon className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <VideoIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}

function MicIcon(props: any) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
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

function VideoIcon(props: any) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
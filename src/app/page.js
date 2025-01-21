import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange-100">
      <div className="bg-black flex items-center justify-center rounded-lg w-1/2 h-16">
        <h1 className="text-lime-500 text-3xl"> Chatroom.js</h1>
      </div>

      <div className="bg-black flex justify-center rounded-lg w-1/2 h-40 m-4">
        <img src="banner.gif" className="w-full rounded-lg p-2"></img>
      </div>

      <div className="bg-black rounded-lg w-1/2 h-1/2 p-4 flex flex-col">
        <div class="flex-1 overflow-y-auto text-lime-500 text-sm">
          <div className="space-y-2">
            <p>[Today @ 10:52pm] eth9n: HELLO WORLD.</p>
            <p>[Today @ 10:52pm] BoogieDan: I love Bastille - Pompeii.</p>
            <p>[Today @ 10:53pm] The Butcher: LET ME DRIVE DA SUB.</p>
          </div>
        </div>
      </div>

      <div className="mt-2 flex space-x-2 w-1/2">
        <Input type="text" placeholder="Type a message..." />
        <Button variant="default">Send</Button>
      </div>
    </div>
  );
}

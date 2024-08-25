import { Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Suspense } from "react";
import amaLogo from "../assets/ama-logo.svg";
import { CreateMessageForm } from "../components/create-message-form";
import { Messages } from "../components/messages";

export function Room() {
  const { roomId } = useParams();

  function handleShareRoom() {
    const url = window.location.href.toString();

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);

      toast.info("URL copiada!");
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <header className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="Ama logo" className="h-5" />

        <span className="text-sm text-zinc-500 truncate">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button
          type="submit"
          onClick={handleShareRoom}
          className="ml-auto bg-zinc-800 text-zinc-950 rounded-lg gap-1.5 px-3 py-1.5 flex items-center font-medium text-sm transition-colors hover:bg-zinc-700"
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </header>

      <div className="h-px w-full bg-zinc-900"></div>

      <CreateMessageForm />

      <Suspense fallback={<p>Loading...</p>}>
        <Messages />
      </Suspense>
    </div>
  );
}

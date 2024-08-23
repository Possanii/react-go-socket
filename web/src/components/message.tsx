import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface IMessageProps {
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  text,
  amountOfReactions,
  answered = false,
}: IMessageProps) {
  const [hasReacted, setHasReacted] = useState(false);

  function handleReactToMessage() {
    setHasReacted((state) => !state);
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          type="button"
          onClick={handleReactToMessage}
          className="flex items-center justify-center gap-2 mt-3 text-orange-400 text-sm font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          type="button"
          onClick={handleReactToMessage}
          className="flex items-center justify-center gap-2 mt-3 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  );
}

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getRoomMessages,
  type GetRoomMessagesResponse,
} from "../http/get-room-messages";
import { Message } from "./message";

export function Messages() {
  const queryClient = useQueryClient();
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages component must be used within room page");
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  console.log(data.messages);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`);

    ws.onopen = () => {
      console.log("WebSocket connected!");
    };

    ws.onmessage = (event) => {
      const data: {
        kind:
          | "message_create"
          | "message_answered"
          | "message_reaction_increased"
          | "message_reaction_decreased";
        value: any;
      } = JSON.parse(event.data);

      console.log(data);

      switch (data.kind) {
        case "message_create":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              return {
                messages: [
                  ...(state?.messages ?? []),
                  {
                    id: data.value.id,
                    text: data.value.message,
                    amountOfReactions: 0,
                    answered: false,
                  },
                ],
              };
            }
          );
          break;
        case "message_answered":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              if (!state) {
                return undefined;
              }

              return {
                messages: state.messages.map((message) => {
                  if (message.id === data.value.id) {
                    return { ...message, answered: true };
                  }

                  return message;
                }),
              };
            }
          );
          break;
        case "message_reaction_increased":
        case "message_reaction_decreased":
          queryClient.setQueryData<GetRoomMessagesResponse>(
            ["messages", roomId],
            (state) => {
              if (!state) {
                return undefined;
              }

              return {
                messages: state.messages.map((message) => {
                  if (message.id === data.value.id) {
                    return { ...message, amountOfReactions: data.value.count };
                  }

                  return message;
                }),
              };
            }
          );
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId, queryClient]);

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {data.messages.map((message) => {
        return (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        );
      })}
    </ol>
  );
}

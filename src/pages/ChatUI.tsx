// Initilaize react coponent

// Import react
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, sendOpenAIRequest } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { notifications } from "@mantine/notifications";

export default function ChatUI() {
  // Get the chatbot name from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chatbotName = searchParams.get("chatbot");

  // Chats array
  const [chats, setChats] = React.useState([
    {
      role: "system",
      content:
        'You are a helpful assistant called Llama that has access to a search engine. Your knowledge is strictly restricted to a search engine which you can call through "SEARCH: <prompt>" STOP.\n\nFor example: \n\nUser: What is the definition of demand?\nBill: SEARCH: "definition demand" STOP\nEngine: the quantity of a good or service consumers are willing and able to purchase at a particular price and time.\nBill: demand refers to the quantity of a good or service that consumers are willing and able to purchase at a particular price and time. \n\nDo NOT use your prior knowledge at all, only use the search engine!\nYou may search again and ask follow up questions if the answer is not ideal!\n\nStop writing when you say STOP!\nDo NOT assume the role of Engine!\n Don\' say stuff like "According to the search engine,"',
    },
  ]);

  const [allowResponse, setAllowResponse] = React.useState(true);
  // Upon awaiting the message being sent, wait for the cloud function to return the response
  // React.useEffect(() => {
  //   const lastChat = chats[chats.length - 1];
  //   if (lastChat?.role === "user") {
  //     getResponse()
  //   }
  // }, [chats]);

  // If not logged in, redirect to login page

  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/")
        notifications.show(
          {
            title: "Oops, you are not logged in!",
            message: "Please log in to continue",
            color: "red",
          },
        )
      }
      else {
        setLoggedIn(true)
      }
    });
  }, []);

  const [loggedIn, setLoggedIn] = React.useState(false);

  async function getResponse(chats2: any[]) {
    if (chats.length === 0) {
      chats2 = chats;
    }
    // Append the question to the conversation history

    // Get a response solely from the text)
    const completion = await sendOpenAIRequest(chats2);

    // Send a post request to the cloud function

    console.log(completion);

    // Send the completion to the history
    // setChats([
    //   ...chats,
    //   {
    //     role: "assistant",
    //     content: completion,
    //   },
    // ]);
    // if the completion starts with search and ends in STOP, strip everything that isn't between that
    // if (completion.startsWith("SEARCH:")) {
    //   const followUpQuestion = completion
    //     .replace("SEARCH:", "")
    //     .replace("STOP", "")

    // Create a variable followUpQuestion is a regex match of everything in between SEARCH: and STOP

    // If completion contains SEARCH: and STOP, then get the text between them inclusive
    const followUpQuestion = completion.match(/(SEARCH:.*?STOP)/g);
    // Else just set it to the completion
    if (completion.startsWith("SEARCH:")) {
      chats2.push({
        role: "assistant",
        content: followUpQuestion?.[0],
      });
    } else {
      chats2.push({
        role: "assistant",
        content: completion,
      });
    }

    // Check if the model has a search engine prompt
    if (completion.startsWith("SEARCH:")) {
      handleFollowUp(completion, chats2);
    } else {
      // Ask a follow up question
      // const followUpQuestion = await getInput("Please ask a follow up question!\n");
      setAllowResponse(true);

      setChats(chats2);
    }
  }

  async function handleFollowUp(response: string, chats2: any[]) {
    // If the model asks a follow up question, get a response solely from the text about that question and feed it back into the model
    const followUpQuestion = response
      .replace("SEARCH:", "")
      .replace("STOP", "")
      .trim();

    // Set response to the response from the search engine
    // const searchResponse = await axios.post("https://botgptserver-2pzthp6v5a-uc.a.run.app", {
    //   messages: followUpQuestion,
    // });
    // Use fetch instead of axios

    // uc.a.run.app/' from origin 'http://localhost:50767' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    const searchResponse = await fetch(
      "https://botgptserver-2pzthp6v5a-uc.a.run.app",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: followUpQuestion,
        }),
      }
    );

    // Console.log the response
    // console.log(await searchResponse.text());

    chats2.push({
      role: "user",
      content: "Engine:" + (await searchResponse.text()),
    });

    // Send an authed request to the cloud function https://us-central1-doc-gpt.cloudfunctions.net/gptSearch
    const completion = await sendOpenAIRequest(chats2);

    // Send the completion to the history
    chats2.push({
      role: "assistant",
      content: completion,
    });

    if (completion.startsWith("SEARCH:")) {
      handleFollowUp(completion, chats2);
    } else {
      setChats(chats2);
      setAllowResponse(true);
    }
  }

  const [message, setMessage] = React.useState("");
  // Use tailwind

  return (

    <div className="flex flex-col h-screen">
      {loggedIn && (
        <>
      <div className="flex-1 overflow-y-scroll">
        {/* Have a default .chat message. Wiht the text "Ask any questions you have!" */}
        <div
          // key={chat.id}
          className={`flex ${"justify-start"}`}
        >
          <div className={`flex flex-col ${"items-start"}`}>
            <div className={`${"bg-blue-300"} rounded-lg p-2 m-1`}>
              Hello, how can I help you?
            </div>
          </div>
        </div>
        {chats.map(
          (chat) =>
            chat.role !== "system" &&
            !chat.content.startsWith("Engine:") && (
              <div
                // key={chat.id}
                className={`flex ${
                  chat.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    chat.role === "assistant" ? "items-start" : "items-end"
                  }`}
                >
                   {/* Conditionally render chat content or a custom message */}
            {chat.content.startsWith("SEARCH:") ? (
              <div className="p-2 m-1 font-bold italic">Searching textbook for {chat.content.match(/(?<=SEARCH:)(.*)(?=STOP)/g)}...</div>
            ) : <div
                  // Set max width to 80% of the screen
                    className={`${
                      chat.role === "assistant" ? "bg-blue-300" : "bg-green-300"
                    } rounded-lg p-2 m-1 max-w-[80%]`}
                  >
                    {chat.content}
                  </div>}
                </div>
              </div>
            )
        )}
      </div>
      <div className="flex flex-col justify-end">
        <form className="flex p-2">
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 flex-1"
            value={message}
            onChange={
              (e) => {
                if (allowResponse) {
                  setMessage(e.target.value);
                }}}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={(e) => {
              setMessage("");
              getResponse([...chats, { content: message, role: "user" }]);
              // sendOpenAIRequest(chats);
              e.preventDefault();
              setChats([
                ...chats,
                {
                  content: message,
                  role: "user",
                },
              ]);
            }}
          >
            Send
          </button>
        </form>
      </div>
      </>
      )}
    </div>
  );
}

import { Icons } from "@knowingly/icons";
import { Step } from "./types";

export const steps = (hubName: string, profileId: string): Step[] => {
  return [
    {
      icon: <>👋</>,
      title: "Welcome to " + hubName + "!",
      content: (
        <>
          We are happy to have you onboard, we will start to show you around.{" "}
        </>
      ),
      selector: "#hub-icon",
      side: "right",
      showControls: true,
      pointerPadding: 5,
      pointerRadius: 50,
    },
    {
      icon: <>🪄</>,
      title: "Rich text editor with custom content",
      content: <>Some info about the rich text editor and how to use it.</>,
      selector: "#editor",
      side: "top",
      showControls: true,
      pointerPadding: 0,
      pointerRadius: 10,
    },
    {
      icon: <>🧠</>,
      title: "AI chat",
      content: <>Some info about the AI chat and how to use it.</>,
      selector: "#ai-chat",
      side: "top",
      showControls: true,
      offset: {
        x: -170,
        y: 0,
      },
      pointerPadding: 5,
      pointerRadius: 50,
    },
    {
        icon: <>🔍</>,
        title: "Search enhanced with AI",
        content: <>Some info about the search and how to use it</>,
        selector: "#search",
        side: "right",
        showControls: true,
        offset: {
            x: 0,
            y: 50},
       
        pointerPadding: 5,
        pointerRadius: 10,
        nextRoute: "/" + profileId
      },
      {
        icon: <>👤</>,
        title: "Your profile",
        content: <>Some info </>,
        selector: "#profile",
        side: "right",
        showControls: true,
        pointerPadding: 5,
        pointerRadius: 10,
        prevRoute: "/",

      },
      {
        icon: <>📝</>,
        title: "Edit mode",
        content: <>Some info </>,
        selector: "#edit-mode",
        side: "left",
        showControls: true,
        pointerPadding: 5,
        pointerRadius: 10,

      },
     
  ];
};

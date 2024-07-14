import { ReactNode } from "react";
import { Metadata } from "next";
import StreamClientProvider from "./stream-client-provider";
import '@stream-io/video-react-sdk/dist/css/styles.css';
export const metadata: Metadata = {
  title: "Meetings",
};
const MeetingLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default MeetingLayout;

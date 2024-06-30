import { ReactNode, Suspense } from "react";


export default async function SharedLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <>
     
        {children}
    </>
  );
}

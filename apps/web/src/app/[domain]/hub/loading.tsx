import { KnowinglySpinner } from "~/components/loaders";

export default function Loading() {
  return (
    <div className=" flex h-screen w-full items-center justify-center ">
      <KnowinglySpinner />
    </div>
  );
}

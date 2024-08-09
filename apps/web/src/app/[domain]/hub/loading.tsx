

export default function Loading() {

  return (
    <div className=" flex h-screen w-full items-center justify-center ">
      <div className="w-36 h-36">
        <div className="animate-spin rounded-full h-36 w-36 border-t-2 border-b-4 border-primary"></div>
      </div>
    </div>
  );
}

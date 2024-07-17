import { api } from "@knowingly/backend/convex/_generated/api";
import { uploadFiles } from "@xixixao/uploadstuff";
import { preloadQuery } from "convex/nextjs";
import { useMutation } from "convex/react";
import { env } from "~/env";

export const uploadFile = async (file : File, url: string) => {


    const uploaded = await uploadFiles({
        files: [file],
        url,
        onUploadProgress: ({ file, progress }) => {
          // file is the file name string
          // progress is a multiple of 10 between 10 and 100
        },
        onUploadBegin: ({ file }) => {
          // ...
        },
      });
      const storageId = uploaded[0]!.response!.storageId!;
    return (env.NEXT_PUBLIC_CONVEX_API_ENDPOINT + "/api/image/"  + storageId) as string;

}
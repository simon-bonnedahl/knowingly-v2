"use client";
import { api } from "@knowingly/backend/convex/_generated/api"
import { Ent } from "@knowingly/backend/convex/types"
import { Switch } from "@knowingly/ui/switch"
import { useMutation, useQuery } from "convex/react"
import { toast } from "sonner"

export default function KnowinglyAdminFlagsPage() {
    const flags = useQuery(api.flags.list)
    const updateFlag = useMutation(api.flags.update)

    const onUpdate = (flag: Ent<"flags">, checked:boolean) => {
        toast.promise(
            updateFlag({
                id: flag._id,
                value: checked
            }),
            {
                loading: "Updating flag",
                success: "Success: Updated flag",
                error: (error) => `Error: ${error.data ?? "Something went wrong"}`
            }
        )
    }
    return(
        <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold text-foreground">
            Flags
          </h1>
          
        </div>
         <div className="flex flex-col gap-2 w-full">
            {flags?.map((flag) => (
                <div className="rounded-lg border bg-background">
                <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
                  <h2 className="font-cal text-xl text-foreground">{flag.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {flag.description}
                  </p>
                  <Switch checked={flag.value} onCheckedChange={(checked) => onUpdate(flag, checked)} />
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t bg-card p-3 text-muted-foreground sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                  <p className="text-sm ">
                    {flag.value ? "Flag is enabled" : "Flag is disabled"}
                  </p>
                </div>
              </div>
            ))}

         </div>
  
      
      
      </div>
    </div>
    )
}
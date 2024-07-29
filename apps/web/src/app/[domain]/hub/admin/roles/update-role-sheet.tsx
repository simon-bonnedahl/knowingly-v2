"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@knowingly/ui/sheet"
import type { Ent } from "@knowingly/backend/convex/types"
import { Switch } from "@knowingly/ui/switch"
import { useMutation } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import { Input } from "@knowingly/ui/input"
import { Label } from "@knowingly/ui/label"
import { IconPicker } from "~/components/custom-field/icon-picker"
import type { IconKey } from "@knowingly/icons"


interface UpdateRoleSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  role: Ent<"roles">
}

export function UpdateRoleSheet({ role, ...props }: UpdateRoleSheetProps) {

  const update = useMutation(api.roles.update)
  const [permissions, setPermissions] = React.useState(role.permissions)
  const [name, setName] = React.useState(role.name)
  const [icon, setIcon] = React.useState(role.icon)

  React.useEffect(() => {
    void update({
      roleId: role._id,
      field: "permissions",
      value: permissions,
    })
  }
  , [permissions])

  React.useEffect(() => {
    void update({
      roleId: role._id,
      field: "name",
      value: name,
    })
  }
  , [name])

  React.useEffect(() => {
    void update({
      roleId: role._id,
      field: "icon",
      value: icon,
    })
  }
  , [icon])

 

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update role</SheetTitle>
          <SheetDescription>
            Update the role name and permissions
          </SheetDescription>
        </SheetHeader>
        <div>
        <Label className="text-lg font-medium">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="flex flex-col">
        <Label className="text-lg font-medium">Icon</Label>
        <IconPicker
          icon={icon as IconKey}
          setIcon={setIcon}
        />
        </div>

        <div className="flex flex-col gap-4">
        <Label className="text-lg font-medium">Permissions</Label>
        {Object.keys(permissions).map((key) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm">{key}</span>
            <Switch
              checked={permissions[key]}
              onCheckedChange={(checked) => {
                setPermissions((prev) => ({ ...prev, [key]: checked }))
              }}
            />
          </div>
        ))}
        </div>


        
      </SheetContent>
    </Sheet>
  )
}

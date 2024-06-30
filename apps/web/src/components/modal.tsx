import * as React from "react"


import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@knowingly/ui/drawer"
import { useMediaQuery } from "~/lib/hooks/useMediaQuery"
import { Dialog, DialogContent, DialogTrigger } from "@knowingly/ui/dialog"

interface ModalProps {
    trigger : React.ReactNode
    children: React.ReactNode
    open: boolean
    setOpen: (open: boolean) => void
    }
export function Modal({trigger, children, open, setOpen} : ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
      {children}
        </DrawerContent>
    </Drawer>
  )
}

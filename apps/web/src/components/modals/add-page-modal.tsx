"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Ent, PageType } from "@knowingly/backend/convex/types";
import { cn } from "@knowingly/ui";
import { Avatar } from "@knowingly/ui/avatar";
import { Button, buttonVariants } from "@knowingly/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@knowingly/ui/command";
import { Input } from "@knowingly/ui/input";
import { Label } from "@knowingly/ui/label";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@knowingly/ui/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@knowingly/ui/tabs";
import { capitalizeFirstLetter } from "@knowingly/utils";

import { useSingleQuery } from "~/lib/hooks/useSingleQuery";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { RenderIcon } from "../icon-picker/render-icon";

interface AddPageModalProps {
  children: React.ReactNode;
  collectionId?: Id<"collections">;
}

export const AddPageModal = ({ children, collectionId }: AddPageModalProps) => {
  const subdomain = useSubdomain();
  const createPage = useMutation(api.pages.create);
  const addPage = useMutation(api.collections.addPage);
  const [name, setName] = useState("");
  const [type, setType] = useState<PageType>("PROFILE");
  const [selectedPage, setSelectedPage] = useState<Ent<"pages"> | null>(null);

  const pages = useSingleQuery(api.pages.getPagesByHub, { subdomain });

  const onCreate = () => {
    toast.promise(createPage({ name, subdomain, collectionId, type }), {
      loading: "Creating page...",
      success: (page) => {
        return `Page "${page.name}" created`;
      },
      error: (error) => `Error: ${error.message}`,
    });
  };
  const onAdd = () => {
    if (!selectedPage) return;

    toast.promise(addPage({ collectionId, pageId: selectedPage._id }), {
      loading: "Adding page...",
      success: () => {
        return `Page "${selectedPage.name}" added`;
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const groupPagesByType = (pages: Ent<"pages">[] | undefined) => {
    if (!pages) return {};

    return pages.reduce(
      (acc, page) => {
        const type = page.type || "Unknown"; // Default to "Unknown" if no type
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(page);
        return acc;
      },
      {} as Record<string, Ent<"pages">[]>,
    );
  };

  return (
    <Modal>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent className="min-w-fit">
        <ModalHeader>
          <ModalTitle>Add New Page</ModalTitle>
          <ModalDescription>
            Create new page or link to an existing one
          </ModalDescription>
        </ModalHeader>

        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create</TabsTrigger>
            {collectionId && <TabsTrigger value="link">Link</TabsTrigger>}
          </TabsList>

          <TabsContent value="create">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <ModalFooter>
              <Button variant="ringHover" onClick={onCreate}>
                Create
              </Button>
            </ModalFooter>
          </TabsContent>
          <TabsContent value="link">
            <Label>Page</Label>
            <Popover>
              <PopoverTrigger
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                {selectedPage ? (
                  <>
                    <Avatar className="mr-2 flex h-8  w-8 items-center justify-center border">
                      <RenderIcon
                        icon={selectedPage.icon}
                        size={2.2}
                        className="object-cover"
                      />
                    </Avatar>
                    {selectedPage.name}
                  </>
                ) : (
                  "Select a Page"
                )}
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Type a command or search..."
                    className="border-none focus:ring-0"
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {Object.entries(groupPagesByType(pages)).map(
                      ([type, pages]) => (
                        <CommandGroup
                          key={type}
                          heading={capitalizeFirstLetter(type)}
                        >
                          {pages.map((page) => (
                            <CommandItem
                              className="flex items-center gap-1 hover:cursor-pointer"
                              key={page._id}
                              value={page._id}
                              onSelect={() => {
                                setSelectedPage(page);
                              }}
                            >
                              <Avatar className="mr-2 flex h-8  w-8 items-center justify-center border">
                                <RenderIcon
                                  icon={page.icon}
                                  size={2.2}
                                  className="object-cover"
                                />
                              </Avatar>
                              {page.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ),
                    )}
                    <CommandSeparator />
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <ModalFooter>
              <Button variant="ringHover" onClick={onAdd}>
                Add
              </Button>
            </ModalFooter>
          </TabsContent>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createReactBlockSpec } from "@blocknote/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Ent } from "@knowingly/backend/convex/types";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown-menu";
import { Input } from "@knowingly/ui/input";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
} from "@knowingly/ui/minimal-card";
import { Separator } from "@knowingly/ui/separator";
import { capitalizeFirstLetter, truncate } from "@knowingly/utils";

import { RenderIcon } from "~/components/icon-picker/render-icon";
import { AddPageModal } from "~/components/modals/add-page-modal";
import { useEdit } from "~/lib/hooks/useEdit";

export const BlocknoteGallery = createReactBlockSpec(
  {
    type: "gallery",
    propSchema: {
      collectionId: {
        default: "" as Id<"collections">,
        values: [],
      },
      columns: {
        default: 2,
        values: [2, 3, 4, 5],
      },
      type: {
        default: "PROFILE",
        values: ["PROFILE", "EVENT"],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const Gallery = () => {
        const router = useRouter();
        const { edit } = useEdit();
        const [columns, setColumns] = useState(props.block.props.columns);
        const [type, setType] = useState(props.block.props.type);
        const [name, setName] = useState<string>("");
        const [search, setSearch] = useState<string>("");
        const collection = useQuery(api.collections.get, {
          id: props.block.props.collectionId,
        });
        const updateCollection = useMutation(api.collections.update);

        useEffect(() => {
          if (collection) setName(collection.name);
        }, [collection]);

        const [filteredPages, setFilteredPages] = useState<Ent<"pages">[]>();

        const onChangeName = () => {
          if (!collection || name === collection.name) return;

          toast.promise(
            updateCollection({
              id: collection._id,
              field: "name",
              value: name,
            }),
            {
              loading: "Updating collection name...",
              success: () => "Collection name updated",
              error: (error) => `Error: ${error.message}`,
            },
          );
        };

        useEffect(() => {
          void props.editor.updateBlock(props.block, {
            type: "gallery",
            props: { columns },
          });
        }, [columns]);

        useEffect(() => {
          void props.editor.updateBlock(props.block, {
            type: "gallery",
            props: { type },
          });
        }, [type]);

        useEffect(() => {
          if (collection && collection._id !== props.block.props.collectionId) {
            void props.editor.updateBlock(props.block, {
              type: "gallery",
              props: { collectionId: collection._id },
            });
          }
          if (collection) setFilteredPages(collection.pages);
        }, [collection]);

        useEffect(() => {
          if (search) {
            setFilteredPages(
              collection.pages?.filter((page) =>
                page.name.toLowerCase().includes(search.toLowerCase()),
              ),
            );
          } else {
            setFilteredPages(collection?.pages ?? []);
          }
        }, [search]);

        if (!collection) return null;

        return (
          <NodeViewWrapper className="z-10 flex w-full select-none  flex-col gap-2 rounded-lg hover:cursor-default ">
            <div className="flex  w-full items-center gap-2  ">
              <Input
                minimal
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Untitled..."
                disabled={!edit}
                className=" w-full  bg-transparent  text-2xl  font-bold"
              />

              <Button
                variant={"ghost"}
                className="p-2"
                size="sm"
                onClick={() => router.push("/c/" + collection._id)}
              >
                View More
                <Icons.arrowUpRight className="h-5 w-5" />
              </Button>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onBlur={onChangeName}
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
              {edit && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="p-2" size="sm">
                      <Icons.settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          value={columns}
                          onValueChange={setColumns}
                        >
                          {[2, 3, 4, 5].map((columns) => (
                            <DropdownMenuRadioItem
                              key={columns}
                              value={columns}
                            >
                              {columns}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Type</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          value={type}
                          onValueChange={setType}
                        >
                          {["PROFILE", "EVENT", "CUSTOM"].map((columns) => (
                            <DropdownMenuRadioItem
                              key={columns}
                              value={columns}
                            >
                              {capitalizeFirstLetter(columns)}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Delete
                      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <Separator />
            <div
              className={`grid w-full gap-4`}
              style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridAutoRows: "1fr", // Ensures all rows have equal height
              }}
            >
              {filteredPages?.map((page) => (
                <Link
                  key={page._id}
                  href={`/${page._id}`}
                  className=" group relative hover:cursor-pointer"
                >
                  <MinimalCard>
                    <MinimalCardImage src={page.banner.value} alt={page.name} />

                    <MinimalCardTitle className="flex w-full items-center gap-2  truncate">
                      <RenderIcon icon={page.icon} size={1.5} />
                      {page.name}
                    </MinimalCardTitle>
                  </MinimalCard>
                </Link>
              ))}
              {collection && edit && (
                <AddPageModal collectionId={collection._id}>
                  <MinimalCard className="flex h-full select-none items-center justify-center hover:cursor-pointer">
                    <Icons.plus className="h-5 w-5" />
                    <span>Add</span>
                  </MinimalCard>
                </AddPageModal>
              )}
            </div>
          </NodeViewWrapper>
        );
      };

      return <Gallery />;
    },
  },
);

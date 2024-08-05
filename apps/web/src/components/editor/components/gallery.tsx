"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createReactBlockSpec } from "@blocknote/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useAction, useMutation, useQuery } from "convex/react";
import { FunctionReturnType } from "convex/server";

import { api } from "@knowingly/backend/convex/_generated/api";
import { getOrCreate } from "@knowingly/backend/convex/collections";
import { Ent, PageType } from "@knowingly/backend/convex/types";
import { Icon, Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
import { Input } from "@knowingly/ui/input";
import { Label } from "@knowingly/ui/label";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
} from "@knowingly/ui/minimal-card";
import { Modal, ModalContent, ModalTrigger } from "@knowingly/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@knowingly/ui/select";
import { Separator } from "@knowingly/ui/separator";
import { capitalizeFirstLetter } from "@knowingly/utils";

import { useDebounce } from "~/lib/hooks/useDebounce";
import { useEdit } from "~/lib/hooks/useEdit";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import Image from "next/image";

export const BlocknoteGallery = createReactBlockSpec(
  {
    type: "gallery",
    propSchema: {
      collectionId: {
        default: "",
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
        const subdomain = useSubdomain();
        const { edit } = useEdit();
        const [columns, setColumns] = useState(props.block.props.columns);
        const [type, setType] = useState(props.block.props.type);
        const [name, setName] = useState<string>("");
        const debouncedName = useDebounce(name, 1000);
        const [search, setSearch] = useState<string>("");
        const getOrCreateCollection = useAction(api.collections.getOrCreate);
        const updateCollection = useMutation(api.collections.update);
        const [collection, setCollection] =
          useState<FunctionReturnType<typeof api.collections.get>>();
        const [isFetching, setIsFetching] = useState(false);

        useEffect(() => {
          async function getOrCreate() {
            setIsFetching(true);
            const collection = await getOrCreateCollection({
              subdomain,
              id: props.block.props.collectionId,
            });
            setCollection(collection);
            setName(collection.name);
          }
          if (!isFetching) {
            void getOrCreate();
          }
        }, []);

        const [filteredPages, setFilteredPages] = useState<Ent<"pages">[]>();

        useEffect(() => {
          if (!collection || debouncedName === collection.name) return;
          void updateCollection({
            id: collection._id,
            field: "name",
            value: name,
          });
        }, [debouncedName]);

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

        return (
          <NodeViewWrapper className="z-10 flex w-full select-none flex-col  gap-2">
            <div className="flex  w-full items-center   ">
              <div className="flex flex-row items-center gap-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  type="text"
                  placeholder="Untitled..."
                  disabled={!edit}
                  className="w-full  bg-transparent text-2xl  font-bold leading-none text-foreground  focus:outline-none"
                />
                {edit && (
                  <>
                    <Label>Columns:</Label>
                    <Select
                      defaultValue={columns.toString()}
                      onValueChange={setColumns}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select columns" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2, 3, 4, 5].map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Label>Type:</Label>
                    <Select defaultValue={type} onValueChange={setType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["PROFILE", "EVENT"].map((value) => (
                          <SelectItem key={value} value={value}>
                            {capitalizeFirstLetter(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
              <Icons.dots className="ml-2 h-5 w-5" />
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
                  className="z-50 hover:cursor-pointer"
                >
                  <MinimalCard>
                    <div className="relative">

                    <MinimalCardImage src={page.banner.value} alt={page.name} />
                      <div className="absolute -bottom-6 left-4 size-[3.5rem] ">
                        {page.icon.type === "URL" && (
                          <Image
                            src={page.icon.value}
                            width={50}
                            height={50}
                            alt="icon"
                            className="size-full rounded-full object-cover"
                          />
                        )}
                        {page.icon.type === "EMOJI" && (
                          <span className=" select-none text-[3.5rem] leading-[3.5rem]">
                            {page.icon.value}
                          </span>
                        )}
                        {page.icon.type === "ICON" && (
                          <Icon name={page.icon.value} className="size-full" />
                        )}

                      </div>
                    </div>
                        <span className="text-xl font-medium px-5">
                          {page.name}
                        </span>
                    {/* <MinimalCardTitle> {page.name}</MinimalCardTitle> */}
                    {/* <MinimalCardDescription>
                  {page.description}
                </MinimalCardDescription> */}
                  </MinimalCard>
                </Link>
              ))}
              {(collection && edit) && (
              <CreateNewPageModal type={type} collectionId={collection._id} />

              )}
            </div>
          </NodeViewWrapper>
        );
      };

      return <Gallery />;
    },
  },
);

const CreateNewPageModal = ({ type, collectionId }: { type: PageType, collectionId : Id<"collections"> }) => {
  const subdomain = useSubdomain();
  const createPage = useMutation(api.pages.create);
  const router = useRouter();
  const [name, setName] = useState("");

  const onCreate = async () => {
    const newPage = await createPage({ name, subdomain, type, collectionId });
    router.push(`/${newPage._id}`);
  };
  return (
    <Modal>
      <ModalTrigger asChild>
        <button>
          <MinimalCard className="flex h-full items-center justify-center">
            <Icons.plus className="h-5 w-5" />
            <span>New</span>
          </MinimalCard>
        </button>
      </ModalTrigger>
      <ModalContent className="min-w-fit">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl font-bold">
            Create New {capitalizeFirstLetter(type)}
          </h1>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Button variant="ringHover" onClick={onCreate}>
            Create
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

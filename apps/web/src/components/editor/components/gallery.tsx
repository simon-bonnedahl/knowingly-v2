"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CustomBlockConfig,
  InlineContentSchema,
  PropSchema,
  StyleSchema,
} from "@blocknote/core";
import {
  createReactBlockSpec,
  ReactCustomBlockRenderProps,
} from "@blocknote/react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Ent } from "@knowingly/backend/convex/types";
import { Icons } from "@knowingly/icons";
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
import { Slider } from "@knowingly/ui/slider";
import { capitalizeFirstLetter } from "@knowingly/utils";

import { useSubdomain } from "~/lib/hooks/useSubdomain";

export const BlocknoteGallery = createReactBlockSpec(
  {
    type: "gallery",
    propSchema: {
      columns: {
        default: 2,
        values: [2, 3, 4, 5],
      },
      type: {
        default: "PROFILE",
        values: ["PROFILE", "EVENT"],
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      const Gallery = () => {
        const subdomain = useSubdomain();
        const [columns, setColumns] = useState(props.block.props.columns);
        const [type, setType] = useState(props.block.props.type);
        const [search, setSearch] = useState("");
        const pages = useQuery(api.pages.getPagesByHub, { subdomain, type });
        const [filteredPages, setFilteredPages] = useState<Ent<"pages">[]>();

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
          if (pages) {
            setFilteredPages(pages);
          }
        }, [pages]);

        useEffect(() => {
          if (search) {
            setFilteredPages(
              pages?.filter((page) =>
                page.name.toLowerCase().includes(search.toLowerCase()),
              ),
            );
          } else {
            setFilteredPages(pages);
          }
        }, [search]);

        return (
          <div
            className="z-10 flex w-full flex-col gap-2 p-4"
            ref={props.contentRef}
          >
            <div className="flex  w-full items-center   ">
              <div className="flex flex-row items-center gap-2">
                <Label>Columns:</Label>
                <Select defaultValue={columns} onValueChange={setColumns}>
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
                  href={`/${page.slug}`}
                  className="hover:cursor-pointer"
                >
                  <MinimalCard>
                    <MinimalCardImage
                      src={page.image ?? "/placeholder-profile.jpeg"}
                      alt={page.name}
                    />
                    <MinimalCardTitle> {page.name}</MinimalCardTitle>
                    {/* <MinimalCardDescription>
                  {page.description}
                </MinimalCardDescription> */}
                  </MinimalCard>
                </Link>
              ))}
              <CreateNewPageModal type={type} />
            </div>
          </div>
        );
      };

      return <Gallery />;
    },
  },
);

const CreateNewPageModal = ({type} : {type : string}) => {
  const subdomain = useSubdomain();
  const createPage = useMutation(api.pages.createPage);
  const router = useRouter();
  const [name, setName] = useState("");

  const onCreate = async () => {
    const newPage = await createPage({ name, subdomain, type });
    router.push(`/${newPage.slug}`);
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
          <h1 className="text-3xl font-bold">Create New {capitalizeFirstLetter(type)}</h1>
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

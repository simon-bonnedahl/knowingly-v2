"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createReactBlockSpec } from "@blocknote/react";
import { Label } from "@knowingly/ui/label";
import { Separator } from "@knowingly/ui/separator";
import { Button } from "@knowingly/ui/button";
import { Input } from "@knowingly/ui/input";
import { Slider } from "@knowingly/ui/slider";
import { Modal, ModalContent, ModalTrigger } from "@knowingly/ui/modal";
import { MinimalCard, MinimalCardImage, MinimalCardTitle } from "@knowingly/ui/minimal-card";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { Icons } from "@knowingly/icons";


export const BlocknoteProfileGallery = createReactBlockSpec(
  {
    type: "profileGallery",
    propSchema: {
      columns: {
        default: 2,
        values: [2, 3, 4, 5],
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      return <ProfileGallery props={props} />;
    },
  }
);

const ProfileGallery = ({ props }: { props: any }) => {
  const subdomain = useSubdomain();
  const pages = useQuery(api.pages.getPagesByHub, { subdomain });
  const [filteredPages, setFilteredPages] = useState(pages);
  const [columns, setColumns] = useState(props.block.props.columns);
  const [search, setSearch] = useState("");

  useEffect(() => {
    void props.editor.updateBlock(props.block, {
      type: "profileGallery",
      props: { columns: columns },
    })
  }, [columns]);

  useEffect(() => {
    if (pages) {
      setFilteredPages(pages);
    }
  }, [pages]);

  useEffect(() => {
    if (search) {
      setFilteredPages(pages?.filter((page) => page.name.includes(search)));
    } else {
      setFilteredPages(pages);
    }
  }, [search]);

  return (
    <div className="flex flex-col gap-2 w-full z-10" ref={props.contentRef}>
      <div className="w-full  items-center flex   ">
        <div className="flex flex-row gap-2">
          <Label>Columns:</Label>
          {columns}

          <Slider
            value={[columns]}
            max={5}
            min={2}
            step={1}
            onValueChange={(value) => setColumns(value[0])}
            className="w-24 hover:cursor-pointer"
          />
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
        <Icons.dots className="ml-2 w-5 h-5" />
      </div>
      <Separator />
      <div
        className={`w-full grid gap-4`}
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
              <MinimalCardImage src={page.image ?? "/placeholder-profile.jpeg"} alt={page.name} />
              <MinimalCardTitle> {page.name}</MinimalCardTitle>
              {/* <MinimalCardDescription>
                {page.description}
              </MinimalCardDescription> */}
            </MinimalCard>
          </Link>
        ))}
        <CreateNewPageModal />
      </div>
    </div>
  );
};

const CreateNewPageModal = () => {

  return (
    <Modal>
      <ModalTrigger asChild>
      <button

    >
      <MinimalCard className="h-full flex items-center justify-center">
      <Icons.plus className="w-5 h-5" />
      <span>New</span>

      </MinimalCard>
    </button>
      </ModalTrigger>
      <ModalContent className="min-w-fit">
        <CreateNewPageForm />

      </ModalContent>
    </Modal>
      
  );
};


const CreateNewPageForm = () => {
  const subdomain = useSubdomain();
  const createPage = useMutation(api.pages.createPage);
  const router = useRouter();
  const [name, setName] = useState("");

  const onCreate = async () => {
    const newPage = await createPage({ name, subdomain });
    router.push(`/${newPage.slug}`);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="text-3xl font-bold">Create New Profile</h1>
      <Input
        placeholder="Profile Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Button variant="ringHover" onClick={onCreate}>Create</Button>
    </div>
  );
};

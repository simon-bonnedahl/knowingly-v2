"use client";
import { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createReactBlockSpec } from "@blocknote/react";
import { Label } from "@knowingly/ui/label";
import { Separator } from "@knowingly/ui/separator";
import { IconDots, IconPlus, IconSearch } from "@tabler/icons-react";
import { Button } from "@knowingly/ui/button";
import { Input } from "@knowingly/ui/input";
import { Modal } from "~/components/modal";
import { Slider } from "@knowingly/ui/slider";

export const BlocknoteProfileGallery = createReactBlockSpec(
  {
    type: "profileGallery",
    propSchema: {
      columns: {
        default: 2,
        values: [2, 3, 4, 5],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      return <ProfileGallery props={props} />;
    },
  }
);

const ProfileGallery = ({ props }: { props: any }) => {
  const params = useParams();
  const subdomain = decodeURIComponent(params.domain as string).split(".")[0];
  const pages = useQuery(api.pages.getPagesByHub, { subdomain });
  const [filteredPages, setFilteredPages] = useState(pages);
  const router = useRouter();
  const [columns, setColumns] = useState(props.block.props.columns);
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.editor.updateBlock(props.block, {
      type: "profileGallery",
      props: { columns: columns },
    }),
      [columns];
  });

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
    <div className="flex flex-col gap-2 w-full">
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
            className="w-24"
          />
        </div>
        <div className="relative ml-auto flex-1 md:grow-0">
          <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <IconDots className="ml-2 w-5 h-5" />
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
            className="hover:cursor-pointer rounded-md overflow-clip duration-150 ease-in-out hover:scale-[1.01] transform-gpu shadow-md relative w-fill h-full" // Set height to full
          >
            <Image
              alt={page.name ?? "Card thumbnail"}
              width={500}
              height={400}
              className="w-full h-full object-cover" // Set height to full
              src={page.image ?? "/placeholder-banner.svg"}
            />
            <div className="flex w-full items-center justify-between bg-background px-2 py-1 absolute bottom-0">
              <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide ">
                {page.icon}
                {page.name}
              </h3>
            </div>
          </Link>
        ))}
        <CreateNewPageModal />
      </div>
    </div>
  );
};

const CreateNewPageModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      trigger={<CreateNewPageButton setOpen={setOpen} />}
    >
      <CreateNewPageForm />
    </Modal>
  );
};
const CreateNewPageButton = ({ setOpen }: { setOpen: any }) => {
  return (
    <Button
      onClick={() => setOpen(true)}
      variant="outline"
      className="h-full flex justify-center items-center gap-2 text-sm "
    >
      <IconPlus className="w-5 h-5" />
      New
    </Button>
  );
};

const CreateNewPageForm = () => {
  const params = useParams();
  const subdomain = decodeURIComponent(params.domain as string).split(".")[0];
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
      <Button onClick={onCreate}>Create</Button>
    </div>
  );
};

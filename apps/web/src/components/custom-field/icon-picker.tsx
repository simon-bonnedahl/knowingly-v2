import { Button } from "@knowingly/ui/button"
import { Input } from "@knowingly/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@knowingly/ui/popover"
import { Icon, IconKey, Icons } from "../icons"
import { useEffect, useState } from "react"

interface IconPickerProps {
    icon: IconKey
    setIcon: (icon: IconKey) => void
    }

export function IconPicker({ icon, setIcon }: IconPickerProps) {
    const [search, setSearch] = useState("");
  const [filteredIcons, setFilteredIcons] = useState<typeof Icons>(Icons);

  useEffect(() => {
    const filtered = Object.fromEntries(
      Object.entries(Icons).filter(([key]) => key.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredIcons(filtered);
  }, [search]);


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"  className="w-9 h-9 px-2" >
            <Icon name={icon} className="w-5 h-5 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit max-h-64 overflow-y-scroll">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for an icon"
        className="mb-4"
      />
      <div className="flex   overflow-y-auto  flex-wrap w-64">
        {Object.entries(filteredIcons).length === 0 && (
          <p className="text-muted-foreground text-sm font-medium">No icons found</p>
        )}
        {Object.entries(filteredIcons).map(([key, Icon]) => (
          <button
            className="flex justify-center items-center p-2 hover:scale-110 transform transition-all duration-200 "
            key={key}
            onClick={() => setIcon(key as keyof typeof Icons)}
            title={key}
          >
            <Icon className="w-5 h-5 " />
          </button>
        ))}
      </div>
        
      </PopoverContent>
    </Popover>
  )
}

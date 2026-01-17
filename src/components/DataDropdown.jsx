import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";

export function DataDropdown({ dropdownItems, setActiveId }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="pl-2.5 pr-5 py-2 bg-[#272727] text-[#FBFBFB] text-xl cursor-pointer flex items-center gap-x-1 rounded-2xl tracking-wide">
          <Plus size={32} strokeWidth={1.5} />
          <span>Add Data</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 py-4 px-2 bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg shadow-xl"
        align="center"
      >
        <DropdownMenuGroup className="flex flex-col gap-y-2">
          {dropdownItems.map((item) => {
            return (
              <DropdownMenuItem
                key={item.id}
                className="*:text-[#272727] text-lg cursor-pointer py-2 gap-2 transition-colors duration-150 ease-in-out focus:bg-[#ebebeb] rounded-lg pl-4"
                onClick={() => setActiveId(item.id)}
              >
                <item.icon className="w-5! h-5! text-[#272727]" />
                <span className="font-medium font-urbanist">{item.name}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

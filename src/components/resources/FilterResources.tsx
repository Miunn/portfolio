import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ResourceCardTag, ResourceCardType } from "../ResourcesExpandableLayout";

export interface FilterResourcesProps {
    filters: ResourceCardTag[];
    selectedFilters: ResourceCardTag[];
    onSelectedFiltersChange: (value: ResourceCardTag) => void;
    emptyLabel: string
}

export default function FilterResources({ filters, selectedFilters, onSelectedFiltersChange, emptyLabel }: FilterResourcesProps) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit justify-between"
                >Filter
                    {selectedFilters.length > 0 ? <Separator orientation="vertical" className="mx-2" /> : null}
                    <div className="space-x-2 flex gap-1">
                        {selectedFilters.length > 2
                        ? <Badge>{ selectedFilters.length } selected</Badge>
                        : selectedFilters.map((filter) => (
                            <Badge key={filter.value}>{filter.label}</Badge>
                        ))
                    }
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search tag..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>{emptyLabel}</CommandEmpty>
                        <CommandGroup>
                            {filters.map((filter) => (
                                <CommandItem
                                    key={filter.value}
                                    value={filter.value}
                                    onSelect={(currentValue) => {
                                        onSelectedFiltersChange(filter);
                                    }}
                                >
                                    {filter.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedFilters.includes(filter) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
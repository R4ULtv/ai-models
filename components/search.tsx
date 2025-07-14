"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Model } from "@/lib/schema";
import { useDebounce } from "@/hooks/use-debounce";

import ProviderLogo from "@/components/provider-logo";
import { CapabilityBadge } from "@/components/capability-badge";
import { DialogFooter } from "./ui/dialog";
import { DatabaseZapIcon } from "lucide-react";

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<Model[]>([]);

  const debouncedInputValue = useDebounce(inputValue, 300);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (!debouncedInputValue.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${debouncedInputValue}&limit=8`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  }, [debouncedInputValue]);

  const handleSelect = (model: Model) => {
    if (!model) return;
    setOpen(false);
    requestAnimationFrame(() => {
      const { id, provider_id } = model;
      const element = document.getElementById(`${provider_id}-${id}`);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  };

  return (
    <CommandDialog
      title="Search models"
      description="Search for ai models in the database..."
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "top-4 md:top-[calc(50%-250px)] w-[calc(100%-2*var(--spacing))] translate-y-0 sm:max-w-screen-sm rounded-2xl overflow-hidden",
        "bg-transparent [&_div[data-slot='command']]:bg-popover/60 backdrop-blur-xl shadow-2xl shadow-black/40",
        results.length > 0 || debouncedInputValue.length > 0
          ? "[&_div[data-slot='command-input-wrapper']]:border-b"
          : "[&_div[data-slot='command-input-wrapper']]:border-0",
      )}
    >
      <CommandInput
        aria-label="Search models"
        placeholder="Search..."
        value={inputValue}
        onValueChange={setInputValue}
        autoComplete="off"
      />
      <CommandList className="overflow-hidden h-(--cmdk-list-height) transition-[height] max-h-[460px] ease-out duration-200">
        {results.length > 0 && (
          <div className="p-1">
            {results.map((result) => (
              <CommandItem
                key={result.provider_id + result.id}
                value={result.provider_id + result.id}
                onSelect={() => handleSelect(result)}
              >
                <ProviderLogo provider_id={result.provider_id} />
                <span className="text-sm text-foreground/90">
                  {result.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {result.provider}
                </span>
                {result.capabilities && (
                  <div className="flex items-center gap-2 justify-end flex-1">
                    <div className="flex items-center gap-1">
                      {result.capabilities.map((capability) => (
                        <CapabilityBadge
                          className="[&>svg]:!size-3"
                          key={capability}
                          capability={capability}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CommandItem>
            ))}
          </div>
        )}

        {results.length === 0 && debouncedInputValue.length > 0 && !loading && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
      </CommandList>
      <DialogFooter className="sm:justify-between border-t px-3 py-2">
        <div className="flex items-center gap-1 text-muted-foreground">
          <DatabaseZapIcon className="size-3" />
          <span className="text-xs">AI DB</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">More info</span>
          <kbd className="border rounded-md size-5 inline-flex items-center justify-center">
            ↵
          </kbd>
        </div>
      </DialogFooter>
    </CommandDialog>
  );
}

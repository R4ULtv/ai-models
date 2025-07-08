"use client";

import * as React from "react";
import { useQueryState } from "nuqs";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchInput() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [inputValue, setInputValue] = React.useState(search);
  const debounceSearch = useDebounce(inputValue, 200);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    setSearch(debounceSearch);
  }, [setSearch, debounceSearch]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        className="ps-9 pe-11 h-8"
        placeholder="Search..."
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
        <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}

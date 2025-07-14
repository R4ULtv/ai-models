import { DownloadIcon, ExternalLinkIcon, SquarePenIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Model } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const ToolBar = ({
  isOpen,
  model,
}: {
  isOpen: boolean;
  model: Model;
}) => {
  const formatIdForUrl = (id: string | undefined) => {
    if (!id) return "";
    return id.replace(/:/g, "_");
  };

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "transition-discrete data-[state=closed]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "bg-background fixed bottom-3 left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] rounded-lg border shadow-lg duration-200 flex flex-col gap-0 overflow-y-visible sm:max-w-min p-1",
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="size-7">
          <a
            href={`/api/${model?.provider_id}/${formatIdForUrl(model?.id)}.json`}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <DownloadIcon />
          </a>
        </Button>
        <Button variant="ghost" size="icon" className="size-7" asChild>
          <a
            href={`https://github.com/R4ULtv/ai-models/tree/master/.cloudflare/apis/public/${model?.provider_id}/${formatIdForUrl(model?.id)}.json`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SquarePenIcon />
          </a>
        </Button>
      </div>
    </div>
  );
};

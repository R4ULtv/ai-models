import { CpuIcon, GpuIcon, SmartphoneIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const SizeBadge = ({
  className,
  size,
}: React.ComponentProps<"span"> & { size: number }) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "p-1 text-[10px] text-muted-foreground",
        size < 4 && "bg-green-400/10",
        size >= 4 && size < 40 && "bg-yellow-400/10",
        size >= 40 && "bg-red-400/10",
        className,
      )}
    >
      {size < 4 && <SmartphoneIcon />}
      {size >= 4 && size < 40 && <CpuIcon />}
      {size >= 40 && <GpuIcon />}
      {size}B
    </Badge>
  );
};

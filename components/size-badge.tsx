import { CpuIcon, GpuIcon, SmartphoneIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const SizeBadge = ({
  className,
  size,
}: React.ComponentProps<"span"> & { size: string }) => {
  const sizeFloat = parseFloat(size);
  const unitMatch = size.match(/[a-zA-Z]+/);
  const unit = unitMatch ? unitMatch[0].toUpperCase() : "";

  return (
    <Badge
      variant="outline"
      className={cn(
        "p-1 text-[10px] text-muted-foreground",
        (unit === "MB" || (unit === "GB" && sizeFloat < 4)) &&
          "bg-emerald-400/10",
        unit === "GB" && sizeFloat >= 4 && sizeFloat < 40 && "bg-amber-400/10",
        unit === "GB" && sizeFloat >= 40 && "bg-rose-400/10",
        className,
      )}
    >
      {(unit === "MB" || (unit === "GB" && sizeFloat < 4)) && (
        <SmartphoneIcon />
      )}
      {unit === "GB" && sizeFloat >= 4 && sizeFloat < 40 && <CpuIcon />}
      {unit === "GB" && sizeFloat >= 40 && <GpuIcon />}
      {size}
    </Badge>
  );
};

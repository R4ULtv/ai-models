import { Capability } from "@/lib/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  BrainIcon,
  EyeIcon,
  SquareFunctionIcon,
  WrenchIcon,
} from "lucide-react";

export const CapabilityBadge = ({
  className,
  capability,
}: React.ComponentProps<"span"> & {
  capability: Capability;
}) => {
  return (
    <Badge
      variant="outline"
      className={cn("p-1 text-muted-foreground", className)}
    >
      {capability === "tools" && <WrenchIcon />}
      {capability === "vision" && <EyeIcon />}
      {capability === "reasoning" && <BrainIcon />}
      {capability === "embedding" && <SquareFunctionIcon />}
    </Badge>
  );
};

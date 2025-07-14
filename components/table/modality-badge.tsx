import { Modality } from "@/lib/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  FileTextIcon,
  ImageIcon,
  TypeIcon,
  VideoIcon,
  Volume2Icon,
} from "lucide-react";

export const ModalityBadge = ({
  className,
  modality,
}: React.ComponentProps<"span"> & {
  modality: Modality;
}) => {
  return (
    <Badge
      variant="outline"
      className={cn("p-1 text-muted-foreground", className)}
    >
      {modality === "text" && <TypeIcon />}
      {modality === "audio" && <Volume2Icon />}
      {modality === "image" && <ImageIcon />}
      {modality === "video" && <VideoIcon />}
      {modality === "pdf" && <FileTextIcon />}
    </Badge>
  );
};

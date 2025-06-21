import numeral from "numeral";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Model } from "@/lib/schema";

import {
  BrainIcon,
  EyeIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  ShapesIcon,
  TypeIcon,
  VideoIcon,
  WrenchIcon,
} from "lucide-react";
import ProviderLogo from "@/components/provider-logo";

export default function DataTable({ data }: { data: Model[] }) {
  return (
    <Table className="table-auto">
      <TableHeader className="border-t">
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            PROVIDER ID
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            MODEL ID
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            CAPABILITIES
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            INPUT MODAL
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            OUTPUT MODAL
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            INPUT COST{" "}
            <span className="hidden md:block text-ring text-[10px]">
              PER 1M TOKENS
            </span>
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            OUTPUT COST{" "}
            <span className="hidden md:block text-ring text-[10px]">
              PER 1M TOKENS
            </span>
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            CONTEXT LIMIT{" "}
            <span className="hidden md:block text-ring text-[10px]">
              TOKENS
            </span>
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            OUTPUT LIMIT{" "}
            <span className="hidden md:block text-ring text-[10px]">
              TOKENS
            </span>
          </TableHead>
          <TableHead className="text-xs text-muted-foreground font-semibold">
            KNOWLEDGE
            <span className="hidden md:block text-ring text-[10px]">
              CUT OFF DATE
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((model) => (
          <TableRow key={`${model.provider_id}-${model.id}`}>
            <TableCell>
              <ProviderLogo provider_id={model.provider_id} />
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">
              {model.provider_id}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">
              {model.id}
            </TableCell>
            <TableCell className="space-x-1">
              {model.capabilities.map((capability) => (
                <Badge
                  key={capability}
                  variant="outline"
                  className="p-1 text-muted-foreground"
                >
                  {capability === "tools" && <WrenchIcon />}
                  {capability === "vision" && <EyeIcon />}
                  {capability === "reasoning" && <BrainIcon />}
                  {capability === "embedding" && <ShapesIcon />}
                </Badge>
              ))}
            </TableCell>
            <TableCell className="space-x-1">
              {model.input_modalities?.map((modality) => (
                <Badge
                  key={modality}
                  variant="outline"
                  className="p-1 text-muted-foreground"
                >
                  {modality === "text" && <TypeIcon />}
                  {modality === "audio" && <HeadphonesIcon />}
                  {modality === "image" && <ImageIcon />}
                  {modality === "video" && <VideoIcon />}
                  {modality === "pdf" && <FileTextIcon />}
                </Badge>
              ))}
            </TableCell>
            <TableCell className="space-x-1">
              {model.output_modalities?.map((modality) => (
                <Badge
                  key={modality}
                  variant="outline"
                  className="p-1 text-muted-foreground"
                >
                  {modality === "text" && <TypeIcon />}
                  {modality === "audio" && <HeadphonesIcon />}
                  {modality === "image" && <ImageIcon />}
                  {modality === "pdf" && <FileTextIcon />}
                </Badge>
              ))}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">
              {numeral(model.cost.input).format("$0.00")}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">
              {numeral(model.cost.output).format("$0.00")}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">
              {numeral(model.limit.context).format("0,0")}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">
              {numeral(model.limit.output).format("0,0")}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">
              {model.knowledge}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

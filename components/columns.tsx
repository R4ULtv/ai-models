"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Model } from "@/lib/schema";
import numeral from "numeral";

import ProviderLogo from "@/components/provider-logo";
import { CapabilityBadge } from "@/components/capability-badge";
import { ModalityBadge } from "@/components/modality-badge";
import { SizeBadge } from "@/components/size-badge";

export const columns: ColumnDef<Model>[] = [
  {
    id: "icon",
    accessorKey: "icon",
    header: "",
    cell: ({ row }) => (
      <ProviderLogo
        className="size-3.5"
        provider_id={row.original.provider_id}
      />
    ),
    enableGlobalFilter: false,
  },
  {
    id: "provider_id",
    accessorKey: "provider_id",
    header: "PROVIDER ID",
  },
  {
    id: "id",
    accessorKey: "id",
    header: "MODEL ID",
  },
  {
    id: "size",
    accessorKey: "size",
    header: "SIZE",
    cell: ({ row }) =>
      row.original.size && row.original.size.length > 0
        ? row.original.size.map((size) => <SizeBadge key={size} size={size} />)
        : "-",
    enableGlobalFilter: false,
  },
  {
    id: "capabilities",
    accessorKey: "capabilities",
    header: "CAPABILITIES",
    cell: ({ row }) =>
      row.original.capabilities.length > 0
        ? row.original.capabilities.map((capability) => (
            <CapabilityBadge key={capability} capability={capability} />
          ))
        : "-",
    enableGlobalFilter: false,
  },
  {
    id: "modalities.input",
    accessorKey: "modalities.input",
    header: () => (
      <>
        INPUT
        <span className="hidden md:block text-ring text-[10px]">
          MODALITIES
        </span>
      </>
    ),
    cell: ({ row }) =>
      row.original.modalities.input.map((modality) => (
        <ModalityBadge key={modality} modality={modality} />
      )),
    enableGlobalFilter: false,
  },
  {
    id: "modalities.output",
    accessorKey: "modalities.output",
    header: () => (
      <>
        OUTPUT
        <span className="hidden md:block text-ring text-[10px]">
          MODALITIES
        </span>
      </>
    ),
    cell: ({ row }) =>
      row.original.modalities.output.map((modality) => (
        <ModalityBadge key={modality} modality={modality} />
      )),
    enableGlobalFilter: false,
  },
  {
    id: "cost.input",
    accessorKey: "cost.input",
    header: () => (
      <>
        INPUT COST{" "}
        <span className="hidden md:block text-ring text-[10px]">
          PER 1M TOKENS
        </span>
      </>
    ),
    cell: ({ row }) =>
      row.original.cost.input
        ? numeral(row.original.cost.input).format("$0.00")
        : "-",
    enableGlobalFilter: false,
  },
  {
    id: "cost.output",
    accessorKey: "cost.output",
    header: () => (
      <>
        OUTPUT COST{" "}
        <span className="hidden md:block text-ring text-[10px]">
          PER 1M TOKENS
        </span>
      </>
    ),
    cell: ({ row }) =>
      row.original.cost.output
        ? numeral(row.original.cost.output).format("$0.00")
        : "-",
    enableGlobalFilter: false,
  },
  {
    id: "cost.cache_read",
    accessorKey: "cost.cache_read",
    header: () => (
      <>
        CACHE READ COST{" "}
        <span className="hidden md:block text-ring text-[10px]">
          PER 1M TOKENS
        </span>
      </>
    ),
    cell: ({ row }) =>
      row.original.cost.cache_read
        ? numeral(row.original.cost.cache_read).format("$0.00")
        : "-",
    enableGlobalFilter: false,
  },
  {
    id: "cost.cache_write",
    accessorKey: "cost.cache_write",
    header: () => (
      <>
        CACHE WRITE COST{" "}
        <span className="hidden md:block text-ring text-[10px]">
          PER 1M TOKENS
        </span>
      </>
    ),
    cell: ({ row }) =>
      row.original.cost.cache_write
        ? numeral(row.original.cost.cache_write).format("$0.00")
        : "-",
    enableGlobalFilter: false,
  },
  {
    id: "limit.context",
    accessorKey: "limit.context",
    header: () => (
      <>
        CONTEXT LIMIT{" "}
        <span className="hidden md:block text-ring text-[10px]">TOKENS</span>
      </>
    ),
    cell: ({ row }) => numeral(row.original.limit.context).format("0,0"),
    enableGlobalFilter: false,
  },
  {
    id: "limit.output",
    accessorKey: "limit.output",
    header: () => (
      <>
        OUTPUT LIMIT{" "}
        <span className="hidden md:block text-ring text-[10px]">TOKENS</span>
      </>
    ),
    cell: ({ row }) => numeral(row.original.limit.output).format("0,0"),
    enableGlobalFilter: false,
  },
  {
    id: "knowledge",
    accessorKey: "knowledge",
    header: () => (
      <>
        KNOWLEDGE
        <span className="hidden md:block text-ring text-[10px]">
          CUT OFF DATE
        </span>
      </>
    ),
    cell: ({ row }) => row.original.knowledge || "-",
    enableGlobalFilter: false,
  },
];

"use client";

import useSWRImmutable from "swr";
import { useQueryState } from "nuqs";
import { Suspense } from "react";

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { TableSkeleton } from "@/components/table/table-skeleton";

import { Model } from "@/lib/schema";
import { fetcher } from "@/lib/fetcher";

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}

function Client() {
  const [search] = useQueryState("search", { defaultValue: "" });

  const { data, isLoading, error } = useSWRImmutable<Model[]>(
    "/api/ollama/models.json",
    fetcher,
  );

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <TableSkeleton rows={30} columns={10} />;

  if (data && data.length > 0)
    return (
      <DataTable
        columns={columns}
        data={data}
        globalFilter={search}
        columnVisibility={{
          "cost.input": false,
          "cost.output": false,
          "cost.cache_read": false,
          "cost.cache_write": false,
        }}
      />
    );
}

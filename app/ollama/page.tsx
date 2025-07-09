"use client";

import useSWRImmutable, { Fetcher } from "swr";
import { useQueryState } from "nuqs";
import { Suspense } from "react";

import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { Model } from "@/lib/schema";
import { TableSkeleton } from "@/components/table-skeleton";

const fetcher: Fetcher<Model[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Home() {
  return (
    <Suspense fallback={<TableSkeleton rows={30} columns={10} />}>
      <Client />
    </Suspense>
  );
}

function Client() {
  const [search] = useQueryState("search", { defaultValue: "" });

  const { data, error } = useSWRImmutable("/api/ollama/models.json", fetcher, {
    suspense: true,
  });

  if (error) return <div>Error loading data</div>;

  if (data.length > 0) {
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
}

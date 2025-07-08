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
    <Suspense>
      <Client />
    </Suspense>
  );
}

function Client() {
  const [search] = useQueryState("search", { defaultValue: "" });

  const { data, error, isLoading } = useSWRImmutable(
    "/api/models.json",
    fetcher,
  );

  if (isLoading) return <TableSkeleton rows={22} columns={13} />;

  if (error) return <div>Error loading data</div>;

  if (data && data.length > 0)
    return <DataTable columns={columns} data={data} search={search} />;
}

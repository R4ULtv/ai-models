import { getModels } from "@/lib/models";
import DataTable from "@/components/data-table";

export default function Home() {
  const models = getModels();

  return <DataTable data={models} />;
}

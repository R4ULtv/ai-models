import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
  cellClassName?: string;
  headerClassName?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  className,
  cellClassName,
  headerClassName,
}: TableSkeletonProps) {
  return (
    <div className={cn("w-full", className)}>
      <Table className="table-auto">
        {showHeader && (
          <TableHeader className="border-t">
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index} className={cn(headerClassName, "h-10")}>
                  <Skeleton className="h-4" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={cn(cellClassName, "h-[39px]")}
                >
                  <Skeleton
                    className={cn(
                      "h-4",
                      colIndex === 0 && "w-[16px]",
                      colIndex === 1 && "w-[126px]",
                      colIndex === 2 && "w-[366px]",
                      colIndex === 3 && "w-[96px]",
                      colIndex === 4 && "w-[152px]",
                      colIndex === 5 && "w-[78px]",
                      colIndex === 6 && "w-[96px]",
                      colIndex === 7 && "w-[102px]",
                      colIndex === 8 && "w-[130px]",
                      colIndex === 9 && "w-[134px]",
                      colIndex === 10 && "w-[110px]",
                      colIndex === 11 && "w-[103px]",
                      colIndex === 12 && "w-[96px]",
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Capability } from "@/lib/schema";

const CapabilityCheckbox = ({
  capability,
  icon,
  title,
  description,
  field,
}: {
  capability: Capability;
  icon: React.ReactNode;
  title: string;
  description: string;
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
}) => {
  return (
    <FormItem className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <FormControl>
        <Checkbox
          className="order-1 after:absolute after:inset-0"
          checked={field.value?.includes(capability)}
          onCheckedChange={(checked) => {
            const currentValue = field.value || [];
            if (checked) {
              if (!currentValue.includes(capability)) {
                field.onChange([...currentValue, capability]);
              }
            } else {
              field.onChange(
                currentValue.filter((item) => item !== capability),
              );
            }
          }}
        />
      </FormControl>
      <div className="flex grow items-start gap-3">
        <div className="rounded-full p-2 bg-input">{icon}</div>
        <div className="grid gap-2">
          <FormLabel>{title}</FormLabel>
          <FormDescription className="text-muted-foreground text-xs">
            {description}
          </FormDescription>
          <FormMessage />
        </div>
      </div>
    </FormItem>
  );
};

export default CapabilityCheckbox;

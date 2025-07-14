import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const OptionsSwitch = ({
  icon,
  field,
  title,
  description,
}: {
  icon: React.ReactNode;
  field: {
    value: boolean;
    onChange: (value: boolean) => void;
  };
  title: string;
  description: string;
}) => {
  return (
    <FormItem className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={(checked) => {
            field.onChange(checked);
          }}
          className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
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

export default OptionsSwitch;

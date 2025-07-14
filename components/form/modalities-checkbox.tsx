import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem } from "@/components/ui/form";
import { Modality } from "@/lib/schema";

const ModalityCheckbox = ({
  modality,
  icon,
  field,
  disabled,
}: {
  modality: Modality;
  icon: React.ReactNode;
  field: {
    value: string[];
    onChange: (value: string[]) => void;
  };
  disabled?: boolean;
}) => {
  return (
    <FormItem>
      <FormControl>
        <label className="border-input has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex size-9 cursor-pointer flex-col items-center justify-center gap-3 rounded-full border text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
          <Checkbox
            disabled={disabled}
            checked={field.value?.includes(modality)}
            onCheckedChange={(checked) => {
              const currentValue = field.value || [];
              if (checked) {
                if (!currentValue.includes(modality)) {
                  field.onChange([...currentValue, modality]);
                }
              } else {
                field.onChange(
                  currentValue.filter((item) => item !== modality),
                );
              }
            }}
            className="sr-only after:absolute after:inset-0"
          />
          {icon}
        </label>
      </FormControl>
    </FormItem>
  );
};

export default ModalityCheckbox;

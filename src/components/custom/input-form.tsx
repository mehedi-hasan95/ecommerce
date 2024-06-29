import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  message?: string;
}
export const InputForm = ({
  form,
  name,
  placeholder,
  label,
  disabled,
  message,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} disabled={disabled} {...field} />
          </FormControl>
          <FormDescription>{message}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

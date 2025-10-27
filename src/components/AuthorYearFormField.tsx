import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props {
  form: UseFormReturn<
    {
      search: string;
      copyright: boolean | "all";
      authorYearStart?: number | undefined;
      authorYearEnd?: number | undefined;
      languages?: ("en" | "fr" | "de" | "es" | "fi")[] | undefined;
    },
    any,
    {
      search: string;
      copyright: boolean | "all";
      authorYearStart?: number | undefined;
      authorYearEnd?: number | undefined;
      languages?: ("en" | "fr" | "de" | "es" | "fi")[] | undefined;
    }
  >;
}

function AuthorYearFormField({ form }: Props) {
  return (
    <div className="space-y-4">
      <FormLabel className="font-bold text-md">Author Birth Year</FormLabel>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="authorYearStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 1800"
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? "" : Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorYearEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. 1900"
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? "" : Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
export default AuthorYearFormField;

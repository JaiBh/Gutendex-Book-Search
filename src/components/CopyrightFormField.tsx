import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Checkbox } from "./ui/checkbox";

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

function CopyrightFormField({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="languages"
      render={(_) => (
        <FormItem className="space-y-2">
          <FormLabel className="font-bold text-md">Copyright Status</FormLabel>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="copyright"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-3">
                    <FormControl>
                      <Checkbox
                        id="all"
                        checked={field.value === "all"}
                        onCheckedChange={(_) => {
                          field.onChange("all");
                        }}
                      ></Checkbox>
                    </FormControl>
                    <label htmlFor="all">All</label>
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="copyright"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-3">
                    <FormControl>
                      <Checkbox
                        id="true"
                        checked={field.value === true}
                        onCheckedChange={(_) => {
                          field.onChange(true);
                        }}
                      ></Checkbox>
                    </FormControl>
                    <label htmlFor="true">Yes</label>
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="copyright"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-3">
                    <FormControl>
                      <Checkbox
                        id="false"
                        checked={field.value === false}
                        onCheckedChange={(_) => {
                          field.onChange(false);
                        }}
                      ></Checkbox>
                    </FormControl>
                    <label htmlFor="false">No</label>
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
        </FormItem>
      )}
    />
  );
}
export default CopyrightFormField;

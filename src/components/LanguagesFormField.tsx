import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { Language } from "@/lib/types";

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

function LanguagesFormField({ form }: Props) {
  const languages: { label: string; value: Language }[] = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Finnish", value: "fi" },
  ];
  return (
    <FormField
      control={form.control}
      name="languages"
      render={(_) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-md font-bold">Languages</FormLabel>
          <div className="flex flex-col gap-3">
            {languages.map((lang) => {
              const id = `lang-${lang.value}`;
              return (
                <FormField
                  control={form.control}
                  key={lang.value}
                  name="languages"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={lang.value}
                        className="flex flex-row items-center gap-3"
                      >
                        <FormControl>
                          <Checkbox
                            id={id}
                            checked={field.value?.includes(lang.value)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              if (checked) {
                                field.onChange([...current, lang.value]);
                              } else {
                                field.onChange([
                                  ...current.filter(
                                    (item) => item !== lang.value
                                  ),
                                ]);
                              }
                            }}
                          ></Checkbox>
                        </FormControl>
                        <label htmlFor={id}>{lang.label}</label>
                      </FormItem>
                    );
                  }}
                ></FormField>
              );
            })}
          </div>
        </FormItem>
      )}
    />
  );
}
export default LanguagesFormField;

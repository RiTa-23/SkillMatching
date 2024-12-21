"use client";

import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";

import type { SkillsFormValues } from "@/app/(answerer)/[id]/edit/page";

type LanguagesFieldProps = {
  form: UseFormReturn<SkillsFormValues>;
  index: number;
  remove: (index: number) => void;
};

const languages = [
  {
    id: 1,
    name: "JavaScript",
  },
  {
    id: 2,
    name: "TypeScript",
  },
  {
    id: 3,
    name: "Python",
  },
  {
    id: 4,
    name: "Ruby",
  },
  {
    id: 5,
    name: "Java",
  },
  {
    id: 6,
    name: "Go",
  },
];

const levelLabels = ["初心者", "初級者", "中級者", "上級者", "プロ"];

const LanguagesField = ({ form, index, remove }: LanguagesFieldProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
            >
              {form.getValues(`languages.${index}.id`)
                ? languages.find(
                    (language) =>
                      language.id === form.getValues(`languages.${index}.id`)
                  )?.name
                : "言語を選択"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      key={language.id}
                      value={language.name}
                      onSelect={async () => {
                        form.setValue(`languages.${index}.id`, language.id);
                        form.setValue(`languages.${index}.level`, 1);
                        await form.trigger(`languages.${index}`);
                      }}
                    >
                      {language.name}
                      <Check
                        className={`ml-auto ${
                          form.getValues(`languages.${index}.id`) ===
                          language.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button
          type="button"
          variant="destructive"
          onClick={() => remove(index)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <FormField
        control={form.control}
        name={`languages.${index}.level`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>習熟度 (1-5)</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[field.value || 1]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) =>
                    form.setValue(`languages.${index}.level`, value[0])
                  }
                />
                <span>{levelLabels[(field.value || 1) - 1] || "初心者"}</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LanguagesField;

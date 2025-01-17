"use client";

import { useEffect, useState } from "react";

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
import { toast } from "sonner";
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";

import type { SkillsFormValues } from "@/app/answerer/edit/page";
import type { Language } from "@/types/Language";
import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";

type SkillFieldProps = {
  form: UseFormReturn<SkillsFormValues>;
  index: number;
  remove: (index: number) => void;
};

const levelLabels = ["初心者", "初級者", "中級者", "上級者", "プロ"];

const SkillField = ({ form, index, remove }: SkillFieldProps) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      const { data, error } = await fetcher<Language[]>({
        url: "language",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setLanguages(data as Language[]);
      }
      if (error) {
        toast.error("技術の取得に失敗しました", { position: "top-center" });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const deleteSkill = async (index: number) => {
    const token = Cookies.get("token");
    const skillId = form.getValues(`skills.${index}.language_id`);
    if (skillId) {
      const { data, error } = await fetcher({
        url: `skill/${skillId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        toast.success("スキルを削除しました", { position: "top-center" });
      }
      if (error) {
        toast.error("スキルの削除に失敗しました", { position: "top-center" });
      }
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
              disabled={loading}
            >
              {form.getValues(`skills.${index}.language_id`)
                ? languages.find(
                    (language) =>
                      language.language_id ===
                      form.getValues(`skills.${index}.language_id`)
                  )?.language_name
                : "技術を選択"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandList>
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      key={language.language_id}
                      value={language.language_name}
                      onSelect={async () => {
                        form.setValue(
                          `skills.${index}.language_id`,
                          language.language_id
                        );
                        form.setValue(`skills.${index}.level`, 1);
                        await form.trigger(`skills.${index}`);
                      }}
                    >
                      {language.language_name}
                      <Check
                        className={`ml-auto ${
                          form.getValues(`skills.${index}.language_id`) ===
                          language.language_id
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
          onClick={() => {
            deleteSkill(index);
            remove(index);
          }}
        >
          <Trash2 />
        </Button>
      </div>
      <FormField
        control={form.control}
        name={`skills.${index}.level`}
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
                    form.setValue(`skills.${index}.level`, value[0])
                  }
                />
                <span className="w-1/4 pl-4">
                  {levelLabels[(field.value || 1) - 1] || "初心者"}
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SkillField;

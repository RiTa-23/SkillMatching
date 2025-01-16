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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";

import type { SkillsFormValues } from "@/app/answerer/edit/page";
import type { Language } from "@/types/Language";
import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";

type HopeLanguageFieldProps = {
  form: UseFormReturn<SkillsFormValues>;
  index: number;
  remove: (index: number) => void;
};

const HopeLanguageField = ({ form, index, remove }: HopeLanguageFieldProps) => {
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
        toast.error("言語の取得に失敗しました", { position: "top-center" });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const deleteHopeLanguage = async (index: number) => {
    const token = Cookies.get("token");
    const hopeLanguageId = form.getValues(`hope_languages.${index}.language_id`);
    if (hopeLanguageId) {
      const { data, error } = await fetcher({
        url: `hope-language/${hopeLanguageId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        toast.success("希望言語を削除しました", { position: "top-center" });
      }
      if (error) {
        toast.error("希望言語の削除に失敗しました", { position: "top-center" });
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
              {loading ? (
                "Loading..."
              ) : form.getValues(`hope_languages.${index}.language_id`) ? (
                languages.find(
                  (language) =>
                    language.language_id ===
                    form.getValues(`hope_languages.${index}.language_id`)
                )?.language_name
              ) : (
                "言語を選択"
              )}
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
                          `hope_languages.${index}.language_id`,
                          language.language_id
                        );
                        await form.trigger(`hope_languages.${index}`);
                      }}
                    >
                      {language.language_name}
                      <Check
                        className={`ml-auto ${
                          form.getValues(
                            `hope_languages.${index}.language_id`
                          ) === language.language_id
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
            deleteHopeLanguage(index);
            remove(index);
          }}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default HopeLanguageField;

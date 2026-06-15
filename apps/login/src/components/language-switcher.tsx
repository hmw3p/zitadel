"use client";

import { setLanguageCookie } from "@/lib/cookies";
import { Lang } from "@/lib/i18n";
import { getComponentRoundness } from "@/lib/theme";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Helper function to get language switcher roundness from theme
function getLanguageSwitcherRoundness(): string {
  return getComponentRoundness("button");
}

export function LanguageSwitcher({ languages }: { languages: Lang[] }) {
  const currentLocale = useLocale();
  const switcherRoundness = getLanguageSwitcherRoundness();

  const [selected, setSelected] = useState(languages.find((l) => l.code === currentLocale) || languages[0]);

  const router = useRouter();

  const handleChange = async (language: Lang) => {
    setSelected(language);
    const newLocale = language.code;

    await setLanguageCookie(newLocale);

    router.refresh();
  };

  return (
    <div className="w-32">
      <Listbox value={selected} onChange={handleChange}>
        <ListboxButton
          className={clsx(
            `relative block w-full py-1.5 pl-3 pr-8 text-left text-sm/6 text-[#1d1d1d] ${switcherRoundness}`,
            "border border-[#dde6eb] bg-white drop-shadow-[0_8px_8px_rgba(29,29,29,0.10)] hover:border-primary-light-500/35 hover:bg-[#e7f7fd]",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary-light-500/25",
          )}
        >
          {selected.name}
          <ChevronDownIcon className="group pointer-events-none absolute right-2.5 top-2.5 size-4" aria-hidden="true" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-[8px] border border-[#dde6eb] bg-white p-1 drop-shadow-[0_8px_8px_rgba(29,29,29,0.10)] [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {languages.map((lang) => (
            <ListboxOption
              key={lang.code}
              value={lang}
              className={`group flex cursor-default select-none items-center gap-2 px-3 py-1.5 text-[#1d1d1d] data-[focus]:bg-primary-light-500/10 ${switcherRoundness}`}
            >
              <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
              <div className="text-sm/6">{lang.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}

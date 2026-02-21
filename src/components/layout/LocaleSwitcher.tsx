"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  "pt-BR": "PT",
  es: "ES",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Replace current locale prefix with new one
    const segments = pathname.split("/");
    if (routing.locales.includes(segments[1] as "en" | "pt-BR" | "es")) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
  };

  return (
    <div className="flex gap-1 shrink-0">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={`px-2 py-1 text-xs rounded transition ${
            locale === loc
              ? "bg-[#daa520] text-black font-bold"
              : "text-skin-base/50 hover:text-skin-base"
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}

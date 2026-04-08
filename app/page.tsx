import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/src/i18n/locale";

export default function Root() {
  redirect(`/${DEFAULT_LOCALE}`);
}

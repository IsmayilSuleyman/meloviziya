import { redirect } from "next/navigation";

// Hard-coded until the season logic exists; Prompt 4 derives the code from the date.
export default function SeasonIndexPage() {
  redirect("/movsum/2026-10");
}

import { redirect } from "next/navigation";
import { CURRENT_SEASON_CODE } from "@/lib/season-facts";

// Hard-coded until the season logic exists; Prompt 4 derives the code from the date.
export default function SeasonIndexPage() {
  redirect(`/movsum/${CURRENT_SEASON_CODE}`);
}

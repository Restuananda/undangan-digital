import { useMemo } from "react";
import { getGuestNameFromUrl } from "../lib/utils";

/** Returns the personalized guest name decoded from the current URL's ?to= param. */
export function useGuestName(): string {
  return useMemo(() => getGuestNameFromUrl(window.location.search), []);
}

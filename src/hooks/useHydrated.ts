"use client";

import { useSyncExternalStore } from "react";
import { useRamadanStore } from "@/store/useRamadanStore";

/** True once the persisted store has rehydrated from localStorage (client only). */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    (cb) => useRamadanStore.persist.onFinishHydration(cb),
    () => useRamadanStore.persist.hasHydrated(),
    () => false,
  );
}

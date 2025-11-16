"use client";

import { useState } from "react";
import { useBookingStore } from "@/stores/bookingStore";

export function BookingStoreDevPanel() {
  // 프로덕션에서는 아예 렌더 안 되게
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const [open, setOpen] = useState(true);

  // zustand 전체 스냅샷
  const snapshot = useBookingStore((state) => state);

  return (
    <div
      className="fixed bottom-4 right-4 z-50 text-xs font-mono"
      style={{ maxWidth: 420 }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 rounded-t-md border border-b-0 bg-black/80 text-white"
      >
        {open ? "▼" : "▲"} booking store debug
      </button>

      {open && (
        <div className="border rounded-b-md bg-black/80 text-green-200 p-2 max-h-72 overflow-auto whitespace-pre">
          {JSON.stringify(
            {
              step: snapshot.step,
              draft: snapshot.draft,
            },
            null,
            2
          )}
        </div>
      )}
    </div>
  );
}
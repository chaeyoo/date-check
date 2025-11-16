// app/booking/page.tsx
import { members } from "@/lib/fakeData";
import Link from "next/link";
import { BookingStoreDevPanel } from "./[memberId]/_components/BookingStoreDevPanel";

export default function BookingMemberPage() {
  return (
    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-bold">건강검진 예약 - 대상자 선택</h1>
      <p className="text-sm text-gray-600">
        회사 지원 대상자 및 본인부담 가족 구성원을 선택해 예약을 진행합니다.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {members.map((m) => (
          <div
            key={m.id}
            className="border rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-xs text-gray-500">
                관계: {m.relation} /{" "}
                {m.supportType === "COMPANY" ? "회사 지원" : "본인 부담"}
              </div>
            </div>
            <Link
              href={`/booking/${m.id}`}
              className="mt-4 inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
            >
              예약하기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

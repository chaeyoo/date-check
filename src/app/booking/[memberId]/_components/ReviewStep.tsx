"use client";
import { useBookingStore } from "@/stores/bookingStore";

export default function ReviewStep({ onConfirm }: { onConfirm: () => void }) {
    const { draft, goToStep } = useBookingStore();
  
    if (!draft.hospital) {
      goToStep("SELECT_HOSPITAL");
      return null;
    }
  
    return (
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">예약 내용 확인</h2>
  
        <div className="border rounded p-4 text-sm space-y-2">
          <div>
            <span className="font-medium">대상자: </span>
            {draft.memberName}
          </div>
          <div>
            <span className="font-medium">병원: </span>
            {draft.hospital.name} ({draft.hospital.city})
          </div>
          <div>
            <span className="font-medium">선호 날짜: </span>
            {draft.preferredDates.length > 0
              ? draft.preferredDates.join(", ")
              : "선택된 날짜 없음"}
          </div>
          <div>
            <span className="font-medium">선택검사: </span>
            {draft.optionalExams.length > 0
              ? draft.optionalExams.map((e) => e.name).join(", ")
              : "선택된 선택검사 없음"}
          </div>
        </div>
  
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => goToStep("SELECT_DATE_EXAM")}
            className="border rounded px-3 py-2 text-sm"
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded px-4 py-2 text-sm text-white bg-blue-600"
          >
            예약 확정
          </button>
        </div>
      </section>
    );
  }
  
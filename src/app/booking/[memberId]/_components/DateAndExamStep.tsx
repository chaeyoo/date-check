import * as React from "react";
import { useBookingStore } from "@/stores/bookingStore";
import { optionalExams } from "@/lib/fakeData";

export default function DateAndExamStep({ onNext }: { onNext: () => void }) {
  const { draft, setPreferredDates, toggleOptionalExam, goToStep } =
    useBookingStore();

  if (!draft.hospital) {
    // 강제로 되돌리기
    goToStep("SELECT_HOSPITAL");
    return null;
  }

  const [dateInput, setDateInput] = React.useState("");

  const handleAddDate = () => {
    if (!dateInput) return;
    const date = dateInput; // "YYYY-MM-DD"
    if (!draft.preferredDates.includes(date)) {
      setPreferredDates([...draft.preferredDates, date]);
    }
    setDateInput("");
  };

  const handleRemoveDate = (d: string) => {
    setPreferredDates(draft.preferredDates.filter((x) => x !== d));
  };

  const isNextDisabled =
    draft.preferredDates.length === 0 || !draft.hospital; // 심플 검증

  const compatibleExams = optionalExams.filter((e) => {
    if (!e.requiredSpecialty) return true;
    return draft.hospital?.specialties.includes(e.requiredSpecialty);
  });

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg">예약 날짜 & 선택검사</h2>
        <p className="text-xs text-gray-500">
          먼저 날짜를 여러 개 선택하거나, 선택검사를 먼저 선택해도 됩니다.
        </p>
      </div>

      {/* 날짜 선택 (진짜에선 달력 컴포넌트 사용) */}
      <div className="space-y-2">
        <div className="text-sm font-medium">선호 날짜</div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={handleAddDate}
            className="text-xs border rounded px-2 py-1"
          >
            추가
          </button>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {draft.preferredDates.map((d) => (
            <span
              key={d}
              className="px-2 py-1 rounded-full bg-gray-100 flex items-center gap-1"
            >
              {d}
              <button onClick={() => handleRemoveDate(d)}>×</button>
            </span>
          ))}
          {draft.preferredDates.length === 0 && (
            <span className="text-gray-400">선택된 날짜가 없습니다.</span>
          )}
        </div>
      </div>

      {/* 선택검사 */}
      <div className="space-y-2">
        <div className="text-sm font-medium">
          선택검사 (현재 병원에서 가능한 검사만 노출)
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {compatibleExams.map((exam) => {
            const checked = draft.optionalExams.some((e) => e.id === exam.id);
            return (
              <button
                type="button"
                key={exam.id}
                onClick={() => toggleOptionalExam(exam)}
                className={`px-3 py-1 rounded-full border ${
                  checked ? "bg-blue-50 border-blue-400" : "bg-white"
                }`}
              >
                {exam.name}
              </button>
            );
          })}
          {compatibleExams.length === 0 && (
            <span className="text-gray-400">
              이 병원에서는 선택 가능한 검사가 없습니다.
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => goToStep("SELECT_HOSPITAL")}
          className="border rounded px-3 py-2 text-sm"
        >
          이전
        </button>
        <button
          type="button"
          disabled={isNextDisabled}
          onClick={onNext}
          className="rounded px-4 py-2 text-sm text-white bg-blue-600 disabled:bg-gray-300"
        >
          예약 정보 확인하기
        </button>
      </div>
    </section>
  );
}

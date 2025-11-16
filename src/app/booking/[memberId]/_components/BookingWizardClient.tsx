"use client";

import { useRouter } from "next/navigation";
import { useBookingStore } from "@/stores/bookingStore";
import { useEffect } from "react";
import { BookingStoreDevPanel } from "@/app/booking/[memberId]/_components/BookingStoreDevPanel";
import HospitalSearchStep from "@/app/booking/[memberId]/_components/HospitalSearchStep";
import DateAndExamStep from "@/app/booking/[memberId]/_components/DateAndExamStep";
import ReviewStep from "@/app/booking/[memberId]/_components/ReviewStep";

export default function BookingWizardClient({
  memberId,
  memberName,
}: {
  memberId: string;
  memberName: string;
}) {
  const router = useRouter();
  const { step, draft, startBooking, goToStep, reset } = useBookingStore();

  // 멤버 변경 시 draft 초기화
  useEffect(() => {
    startBooking(memberId, memberName);
  }, [memberId, memberName, startBooking]);

  const handleComplete = () => {
    // 여기에서 실제로는 API 호출로 예약 확정
    console.log("예약 확정!", draft);
    reset();
    router.push("/reservations");
  };

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            {memberName} 님 건강검진 예약
          </h1>        
          <BookingStoreDevPanel />
          <p className="text-xs text-gray-500">
            단계별로 정보를 입력하여 예약을 진행합니다.
          </p>
        </div>
        <StepIndicator currentStep={step} onStepClick={goToStep} />
      </header>

      {step === "SELECT_HOSPITAL" && <HospitalSearchStep />}
      {step === "SELECT_DATE_EXAM" && (
        <DateAndExamStep onNext={() => goToStep("REVIEW")} />
      )}
      {step === "REVIEW" && <ReviewStep onConfirm={handleComplete} />}
    </div>
  );
}

function StepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: "SELECT_HOSPITAL" | "SELECT_DATE_EXAM" | "REVIEW";
  onStepClick: (s: any) => void;
}) {
  const steps: { id: any; label: string }[] = [
    { id: "SELECT_HOSPITAL", label: "1. 병원 선택" },
    { id: "SELECT_DATE_EXAM", label: "2. 날짜/검사 선택" },
    { id: "REVIEW", label: "3. 예약 확인" },
  ];

  return (
    <ol className="flex gap-4 text-xs">
      {steps.map((s, idx) => (
        <li
          key={s.id}
          className={`flex items-center gap-1 cursor-pointer ${
            s.id === currentStep ? "font-semibold" : "text-gray-400"
          }`}
          onClick={() => onStepClick(s.id)}
        >
          <span className="w-5 h-5 rounded-full border flex items-center justify-center">
            {idx + 1}
          </span>
          {s.label}
        </li>
      ))}
    </ol>
  );
}

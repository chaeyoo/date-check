"use client";
import { useBookingStore } from "@/stores/bookingStore";
import { hospitals } from "@/lib/fakeData";
import React from "react";

export default function HospitalSearchStep() {
    const { selectHospital, draft } = useBookingStore();
    const [showVisitedOnly, setShowVisitedOnly] = React.useState(false);
    const [cityFilter, setCityFilter] = React.useState("");
  
    const draftHospital = draft.hospital;
    const filtered = hospitals.filter((h) => {
      if (showVisitedOnly && !h.isVisitedBefore) return false;
      if (cityFilter && h.city !== cityFilter) return false;
      return true;
    });
  
    const cities = Array.from(new Set(hospitals.map((h) => h.city)));
  
    return (
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">검진 병원 선택</h2>
  
        <div className="flex flex-wrap gap-4 text-sm items-center">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={showVisitedOnly}
              onChange={(e) => setShowVisitedOnly(e.target.checked)}
            />
            과거 방문 병원만 보기
          </label>
  
          <select
            className="border rounded px-2 py-1"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">전체 지역</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))} 
          </select>
        </div>
  
        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((h) => (
            <button
              key={h.id}
              className={`border rounded p-3 text-left hover:bg-gray-50 ${draftHospital?.id === h.id ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => selectHospital(h)}
            >
              <div className="font-medium">{h.name}</div>
              <div className="text-xs text-gray-500">{h.city}</div>
              <div className="mt-1 text-xs text-gray-400">
                가능 검사: {h.specialties.join(", ")}
              </div>
              {h.isVisitedBefore && (
                <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded bg-green-50 text-green-700">
                  과거 방문 병원
                </span>
              )}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-gray-500">
              조건에 맞는 병원이 없습니다.
            </div>
          )}
        </div>
      </section>
    );
  }
  
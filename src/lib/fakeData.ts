// lib/fakeData.ts
export type Member = {
    id: string;
    name: string;
    isEmployee: boolean;
    supportType: "COMPANY" | "SELF";
    relation: "SELF" | "SPOUSE" | "CHILD" | "PARENT" | "OTHER";
  };
  
  export type Hospital = {
    id: string;
    name: string;
    city: string;
    specialties: string[];         // 가능 검사(장비)
    isVisitedBefore: boolean;      // 과거 방문 여부
  };
  
  export type OptionalExam = {
    id: string;
    name: string;
    requiredSpecialty?: string;
  };
  
  export const members: Member[] = [
    {
      id: "m1",
      name: "김직원",
      isEmployee: true,
      supportType: "COMPANY",
      relation: "SELF",
    },
    {
      id: "m2",
      name: "김배우자",
      isEmployee: false,
      supportType: "COMPANY",
      relation: "SPOUSE",
    },
    {
      id: "m3",
      name: "김자녀",
      isEmployee: false,
      supportType: "SELF",
      relation: "CHILD",
    },
  ];
  
  export const hospitals: Hospital[] = [
    {
      id: "h1",
      name: "서울 메디컬 센터",
      city: "서울",
      specialties: ["CT", "MRI", "X-RAY"],
      isVisitedBefore: true,
    },
    {
      id: "h2",
      name: "부산 헬스케어 병원",
      city: "부산",
      specialties: ["MRI"],
      isVisitedBefore: false,
    },
    {
      id: "h3",
      name: "대구 검진 센터",
      city: "대구",
      specialties: ["초음파", "X-RAY"],
      isVisitedBefore: true,
    },
  ];
  
  export const optionalExams: OptionalExam[] = [
    { id: "o1", name: "뇌 MRI", requiredSpecialty: "MRI" },
    { id: "o2", name: "흉부 CT", requiredSpecialty: "CT" },
    { id: "o3", name: "복부 초음파", requiredSpecialty: "초음파" },
  ];
  
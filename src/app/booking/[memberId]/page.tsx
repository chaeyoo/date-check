// app/booking/[memberId]/page.tsx
import { notFound } from "next/navigation";
import { members, hospitals, optionalExams } from "@/lib/fakeData";
import BookingWizardClient from "@/app/booking/[memberId]/_components/BookingWizardClient";


type Props = {
  params: { memberId: string };
};

export default function BookingWizardPage({ params }: Props) {
  const member = members.find((m) => m.id === params.memberId);
  if (!member) return notFound();

  return (
    
    <BookingWizardClient memberId={member.id} memberName={member.name} />
  );
}


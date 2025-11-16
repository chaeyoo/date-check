// app/reservations/page.tsx
export default function ReservationsPage() {
    // 실제로는 서버에서 로그인 사용자의 예약 목록을 가져옴
    const dummy = [
      {
        id: "r1",
        memberName: "김직원",
        hospitalName: "서울 메디컬 센터",
        date: "2025-12-03",
        status: "예약완료",
      },
    ];
  
    return (
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-bold">나의 건강검진 예약 내역</h1>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">대상자</th>
                <th className="px-3 py-2 text-left">병원</th>
                <th className="px-3 py-2 text-left">날짜</th>
                <th className="px-3 py-2 text-left">상태</th>
              </tr>
            </thead>
            <tbody>
              {dummy.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2">{r.memberName}</td>
                  <td className="px-3 py-2">{r.hospitalName}</td>
                  <td className="px-3 py-2">{r.date}</td>
                  <td className="px-3 py-2">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
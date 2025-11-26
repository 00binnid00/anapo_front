"use client";

import {
  CalendarDays,
  Heart,
  Settings,
  Headphones,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ✅ 1. 경로 수정 ('../../../' 3단계 위로)
import { useAuth } from "../../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// 'QuickMenu' 함수를 'My' 컴포넌트 위로 이동
function QuickMenu({ icon, text }) {
  return (
    <button className="flex flex-col items-center gap-2 py-4 border rounded-xl hover:bg-gray-50">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}

// --- (이제 My 컴포넌트 시작) ---
const Page = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // (보안) 로그인 안 한 유저 쫓아내기
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      router.push("/main/login");
    }
  }, [isLoggedIn, router]);

  // '내 예약 뇌' API에 'fetch' 쏘기
  useEffect(() => {
    if (user) {
      const fetchReservations = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/reservations/${user.id}`, {
            cache: "no-store", // "캐시 쓰지 마!"
          });

          if (response.ok) {
            const data = await response.json();
            setReservations(data);
          }
        } catch (error) {
          console.error("예약 목록 불러오기 실패:", error);
        }
        setIsLoading(false);
      };
      fetchReservations();
    }
  }, [user]);

  // --- (목업 데이터) ---
  const stats = [
    { label: "총 예약 횟수", value: reservations.length },
    { label: "즐겨찾는 병원", value: 3 },
    { label: "상담 횟수", value: 8 },
  ];
  const favoriteHospitals = [
    { name: "부천세종병원", department: "내과", distance: "0.5km" },
  ];
  // --- (여기까지 목업 데이터) ---

  // 로딩 중...
  if (!isLoggedIn || !user || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 ">
      <div className="container mx-auto px-6 pt-10">
        <h1 className="mb-8 p-16  flex flex-col w-full justify-center h-[100px] rounded-2xl bg-white text-[20px] text-gray-600 font-semibold shadow pt-10">
          마이페이지
          <p className="text-gray-500 mb-2 text-[16px] font-light">
            회원 정보와 예약 내역을 확인하고 관리하세요.
          </p>
        </h1>

        {/* 사용자 정보 (DB 연동 완료) */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-xl font-semibold">{user.name}님</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          {/* 통계 (일부 DB 연동 완료) */}
          <div className="flex mt-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`flex-1 text-center py-4 ${
                  i === 1
                    ? "bg-green-50"
                    : i === 2
                    ? "bg-purple-50"
                    : "bg-blue-50"
                } rounded-xl mx-1`}
              >
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-gray-600 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 예약 내역 + 즐겨찾는 병원 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 최근 예약 내역 (✅ DB 연동 완료) */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={20} />
              <h2 className="font-semibold">최근 예약 내역</h2>
            </div>

            {reservations.length > 0 ? (
              reservations.map((r, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 mb-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{r.hospitalName}</p>
                    <p className="text-gray-500 text-sm">{r.doctorName}</p>
                    <p className="text-gray-400 text-sm">
                      {/* ✅ 2. DB에서 받은 DATETIME을 예쁘게 표시 */}
                      {new Date(r.reservationDate).toLocaleString("ko-KR")}
                    </p>{" "}
                    {/* <--- ✅ 3. 여기가 </p> (소문자)가 되어야 합니다 */}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      r.status === "예약완료"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">최근 예약 내역이 없습니다.</p>
            )}

            <button className="w-full mt-2 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              새 예약하기
            </button>
          </div>

          {/* 즐겨찾는 병원 (아직 목업) */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={20} />
              <h2 className="font-semibold">즐겨찾는 병원</h2>
            </div>
            {favoriteHospitals.map((h, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 mb-3 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{h.name}</p>
                  <p className="text-gray-500 text-sm">{h.department}</p>
                </div>
                <span className="text-gray-400 text-sm">{h.distance}</span>
              </div>
            ))}
            <button className="w-full mt-2 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              병원 찾기
            </button>
          </div>
        </div>

        {/* 빠른 메뉴 */}
      </div>
    </section>
  );
};

export default Page;

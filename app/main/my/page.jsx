"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Heart, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyPage() {
  // ---------------------------------------------------------
  // ⭐ 회원 정보 (나중에 백엔드 연동)
  // ---------------------------------------------------------
  const [user, setUser] = useState({
    name: "ggg님",
    email: "ggg@naver.com",
    phone: "010-1234-5678",
  });

  /*  
  🔌 [백엔드 연동 예정 코드]

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await fetch("http://localhost:8080/api/user/info", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("회원 정보 불러오기 실패");
        const data = await res.json();

        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserInfo();
  }, []);
  */

  // ---------------------------------------------------------
  // ⭐ 통계 (예약 횟수 / 즐겨찾기 / 리뷰)
  // ---------------------------------------------------------
  const [stats, setStats] = useState({
    reservations: 0,
    favorites: 3,
    reviews: 8,
  });

  /*  
  🔌 [백엔드 연동 예정 코드]

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("http://localhost:8080/api/user/stats", {
        credentials: "include",
      });
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
  }, []);
  */

  // ---------------------------------------------------------
  // ⭐ 즐겨찾는 병원 (하드코딩)
  // ---------------------------------------------------------
  const [favorites, setFavorites] = useState([
    {
      hospitalId: 1,
      name: "부천세종병원",
      dept: "내과",
      distance: "0.5km",
    },
    {
      hospitalId: 2,
      name: "서울대학교병원",
      dept: "정형외과",
      distance: "1.2km",
    },
    {
      hospitalId: 3,
      name: "강남성심병원",
      dept: "피부과",
      distance: "2.1km",
    },
  ]);

  /*  
  🔌 [백엔드 연동 예정 코드]

  useEffect(() => {
    async function fetchFavorites() {
      const res = await fetch(`http://localhost:8080/api/user/favorites`, {
        credentials: "include",
      });
      const data = await res.json();
      setFavorites(data);
    }
    fetchFavorites();
  }, []);

  // 즐겨찾기 삭제 API
  const removeFavorite = async (hospitalId) => {
    await fetch(`http://localhost:8080/api/user/favorites/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hospitalId }),
      credentials: "include",
    });

    setFavorites((prev) => prev.filter((h) => h.hospitalId !== hospitalId));
  };
  */

  // ---------------------------------------------------------
  // ⭐ 최근 예약 내역(하드코딩)
  // ---------------------------------------------------------
  const [recentReservations] = useState([]);

  /*  
  🔌 [백엔드 연동 예정 코드]

  useEffect(() => {
    async function fetchRecent() {
      const res = await fetch("http://localhost:8080/api/user/recent-reservations", {
        credentials: "include",
      });
      const data = await res.json();
      setRecentReservations(data);
    }
    fetchRecent();
  }, []);
  */
  const router = useRouter();
  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* ----------------------------- */}
        {/* 제목 */}
        {/* ----------------------------- */}
        <h1 className="text-2xl font-semibold mb-2 pt-16">마이페이지</h1>
        <p className="text-gray-600 mb-6">
          회원 정보와 예약 내역을 확인하고 관리하세요.
        </p>

        {/* ----------------------------- */}
        {/* 사용자 정보 */}
        {/* ----------------------------- */}
        <div className="bg-white rounded-2xl shadow-sm  p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-medium">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm">{user.phone}</p>
            </div>
            <button
              onClick={() => router.push("/main/edit")}
              className="ml-auto border border-gray-500 rounded-lg px-4 py-2 text-sm hover:bg-gray-50"
            >
              정보 수정
            </button>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* 통계 */}
        {/* ----------------------------- */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold">{stats.reservations}</p>
            <p className="text-gray-600 text-sm mt-1">총 예약 접수</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold">{stats.favorites}</p>
            <p className="text-gray-600 text-sm mt-1">즐겨찾는 병원</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold">{stats.reviews}</p>
            <p className="text-gray-600 text-sm mt-1">작성 리뷰</p>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* 최근 예약 + 즐겨찾기 */}
        {/* ----------------------------- */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 최근 예약 내역 */}
          <div className="bg-white  rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={18} />
              <h3 className="font-semibold">최근 예약 내역</h3>
            </div>

            {recentReservations.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                최근 예약 내역이 없습니다.
              </div>
            ) : (
              recentReservations.map((item, i) => (
                <div key={i} className="border rounded-xl p-4 mb-3">
                  {item.hospitalName}
                </div>
              ))
            )}

            <button className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg mt-2">
              새 예약하기
            </button>
          </div>

          {/* 즐겨찾는 병원 */}
          <div className="bg-white  rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={18} className="text-red-500" />
              <h3 className="font-semibold">즐겨찾는 병원</h3>
            </div>

            {favorites.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-4 mb-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm flex gap-1 items-center">
                    {item.dept} · <MapPin size={14} /> {item.distance}
                  </p>
                </div>

                {/* 삭제 */}
                <button className="text-gray-400 hover:text-black text-lg">
                  ✕
                </button>
              </div>
            ))}

            <button className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg mt-2">
              병원 찾기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

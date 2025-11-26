"use client";

import { Activity } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext"; // <--- 1. '라디오 수신기' import
import { useRouter } from "next/navigation"; // <--- 2. '로그아웃' 후 이동을 위한 라우터 import

const MainHeader = () => {
  // 3. '방송' 듣기 (isLoggedIn 상태, logout 방송 기능)
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // 4. '로그아웃' 방송하기
    alert("로그아웃되었습니다.");
    // router.push('/main'); // (새로고침을 위해 push 대신 location.reload()를 쓸 수도 있습니다)
  };

  return (
    <header className=" bg-white w-full shadow-md shadow-black/10 z-10 fixed">
      <nav className=" container mx-auto px-3 py-3  flex justify-between items-center">
        <Link className="flex flex-row items-center gap-3" href={"/main"}>
          <Activity size={38} color="#5CA0FF" />
          <span className="text-2xl font-semibold text-[#5CA0FF]">anapo</span>
        </Link>

        <ul className=" flex flex-row items-center gap-8">
          <li>
            <Link href={"/main/findhospital"}>병원찾기/예약</Link>
          </li>
          <li>
            <Link href={"/main/myreservation"}>나의 예약</Link>
          </li>
          <li>
            <Link href={"/main/faq"}>상담 톡</Link>
          </li>
          <li>
            <Link href={"/main/community"}>커뮤니티</Link>
          </li>
          <li>
            <Link href={"/main/my"}>마이페이지</Link>
          </li>
        </ul>

        <div className="flex flex-row gap-1.5 ">
          {/* ✅ 5. '방송' 상태에 따라 버튼을 다르게 보여주기 */}
          {isLoggedIn ? (
            <>
              {/* --- 로그인 했을 때 --- */}
              <Link href="/main/my">
                {" "}
                {/* ✅ 님의 마이페이지 주소로 수정됨 */}
                <button className=" border border-gray-400 rounded-md px-3 py-1 text-[14px] text-gray-900">
                  마이페이지
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className=" border  border-[#5CA0FF] bg-[#5CA0FF] rounded-md px-3 py-1 text-[14px] text-white"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              {/* --- 로그인 안 했을 때 (기존 코드 수정) --- */}
              <Link href={"/main/login"}>
                <button className=" border border-gray-400 rounded-md px-3 py-1 text-[14px] text-gray-900">
                  로그인
                </button>
              </Link>
              <Link href={"/main/join"}>
                <button className=" border  border-[#5CA0FF] bg-[#5CA0FF] rounded-md px-3 py-1 text-[14px] text-white">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;

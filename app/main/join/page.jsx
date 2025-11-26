"use client";

import { Activity, User, Mail, Lock, MoveLeft, Phone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // <--- 1. 라우터 import

const Page = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");

  // ✅ 추가: 체크박스 상태 관리
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const router = useRouter(); // <--- 2. 라우터 준비
  // ✅ 체크박스 변경 핸들러
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  // ✅ 3. handleSubmit 함수에서 TypeScript 타입 제거 (e: React.FormEvent -> e)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ 필수 항목 체크 확인
    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 모두 동의해야 회원가입이 가능합니다.");
      return;
    }
    // 폼 검증 (비밀번호 일치 확인 등)
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 4. '뇌' (API)에게 데이터를 전송
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone: phone,
          date: date,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 성공! (201status)
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/main/login"); // 로그인 페이지로 이동
      } else {
        // 실패 (400, 409, 500 status)
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      // fetch 자체가 실패한 경우 (네트워크 오류 등)
      console.error("폼 제출 네트워크 에러:", error);
      alert("알 수 없는 오류가 발생했습니다. 네트워크를 확인하세요.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-15">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-2xl items-center">
            <Activity color="#5CA0FF" size={38} />
          </div>

          <h1 className="font-bold text-2xl text-gray-900 ">
            anapo에 회원가입
          </h1>
          <span className="text-lg text-gray-600 ">
            건강한 의료 서비스의 시작
          </span>
        </div>
        <article className="flex justify-center mt-8">
          <div className="w-[500px] h-[900px]  rounded-2xl bg-white shadow-md flex flex-col items-center ">
            <h1 className="text-2xl mt-5 text-gray-600">회원가입</h1>

            <form onSubmit={handleSubmit} className="mt-10 ">
              {/* 이름 */}
              <div className="text-sm text-gray-900 mb-1">이름 *</div>
              <div className="relative flex items-center">
                <User className="absolute left-3  text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[420px] bg-gray-100  rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 이메일 */}
              <div className="text-sm text-gray-900 mt-5">이메일 *</div>
              <div className="relative flex items-center">
                <Mail className="absolute left-3  text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-[420px] bg-gray-100  rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 비밀번호 */}
              <div className="text-sm text-gray-900 mb-1 mt-5">비밀번호 *</div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3  text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[420px] bg-gray-100  rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>

              {/* 비밀번호 확인 */}
              <div className="text-sm text-gray-900 mb-1 mt-5">
                비밀번호 확인 *
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3  text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-[420px] bg-gray-100  rounded-lg pl-10 pr-3 p-2"
                  required
                />
              </div>
              {/* 전화번호 */}
              <div className="text-sm text-gray-900 mt-5">전화번호 * </div>
              <div className="relative flex items-center">
                <Phone className="absolute left-3  text-gray-400" size={20} />
                <input
                  type="phone"
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  className="w-[420px] bg-gray-100  rounded-lg pl-10 pr-3 p-2"
                />
              </div>
              {/* 생년월일 */}
              <div className="flex justify-between">
                <div className="flex flex-col  text-md text-gray-600 mt-8">
                  <label className="   gap-3">생년월일</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-50 h-10 bg-gray-100 rounded-lg p-2"
                  />
                </div>
                {/* 성별 */}
                <div className="flex flex-col  text-md text-gray-600 mt-8">
                  <label className="   gap-3">성별</label>
                  <select className="bg-gray-100 rounded-lg w-50 h-10 p-2">
                    <option value="">선택</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-1">
                <label className="flex items-center flex-row gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={agreements.terms}
                    onChange={handleAgreementChange}
                    className="accent-[#5CA0FF]"
                  />
                  <h4>
                    이용약관에 동의합니다{" "}
                    <span className="text-sm">(필수)</span>
                  </h4>
                </label>

                <label className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={agreements.privacy}
                    onChange={handleAgreementChange}
                    className="accent-[#5CA0FF]"
                  />
                  <h4>
                    개인정보 처리방침에 동의합니다{" "}
                    <span className="text-sm">(필수)</span>
                  </h4>
                </label>

                <label className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={agreements.marketing}
                    onChange={handleAgreementChange}
                    className="accent-[#5CA0FF]"
                  />
                  <h4>
                    마케팅 정보 수신에 동의합니다{" "}
                    <span className="text-sm">(선택)</span>
                  </h4>
                </label>
              </div>

              <button
                type="submit"
                className={`w-[420px] rounded-lg p-2 mt-8 text-white text-lg transition ${
                  agreements.terms && agreements.privacy
                    ? "bg-[#5CA0FF] hover:bg-[#4A8BE0]"
                    : "bg-gray-300 "
                }`}
                disabled={!agreements.terms || !agreements.privacy}
              >
                회원가입
              </button>
              <div className="flex justify-between items-center text-md text-gray-600 mt-8 ">
                <span>이미 계정이 있으신 가요?</span>
                <Link
                  className="text-blue-500 hover:underline"
                  href={"/main/login"}
                >
                  로그인
                </Link>
              </div>
            </form>
          </div>
        </article>
        <p className=" relative text-center text-sm text-gray-400 mt-8">
          <Link
            href="/main"
            className="hover:underline flex items-center justify-center "
          >
            <MoveLeft className=" absolute left-138 " size={18} /> 홈으로
            돌아가기
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;

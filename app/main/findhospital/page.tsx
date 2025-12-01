"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Star,
  Phone,
  Clock,
  X,
  ArrowLeft,
  Heart,
} from "lucide-react";
import KakaoMap from "@/components/KakaoMap";
import Image from "next/image";
import Link from "next/link";
// --- 타입 정의 ---
interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  specialties: string[];
  openHours: string;
  image: string;
  latitude: number;
  longitude: number;
}

// --- 임시 UI 컴포넌트 ---
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`border rounded px-3 py-2 w-full ${props.className}`}
    {...props}
  />
);
const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-4 py-2 rounded font-medium transition-colors bg-[#5CA0FF] text-white hover:bg-blue-500 ${props.className}`}
    {...props}
  >
    {children}
  </button>
);

// --- 통일된 목업 데이터 ---
const hospitalData: Hospital[] = [
  {
    id: "1",
    name: "순천향대학교 부천병원",
    address: "경기도 부천시 조마루로 170",
    phone: "032-621-5114",
    rating: 4.6,
    distance: "0.8km",
    specialties: ["내과", "외과", "소아과", "정형외과"],
    openHours: "08:00 - 17:30",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    latitude: 37.5045,
    longitude: 126.7644,
  },
  {
    id: "2",
    name: "부천세종병원",
    address: "경기도 부천시 호현로 489",
    phone: "032-340-1000",
    rating: 4.5,
    distance: "1.5km",
    specialties: ["정형외과", "신경외과", "내과", "외과"],
    openHours: "09:00 - 18:00",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    latitude: 37.5025,
    longitude: 126.7674,
  },
  {
    id: "3",
    name: "부천성모병원",
    address: "경기도 부천시 소사구 부천로 327",
    phone: "032-340-7000",
    rating: 4.1,
    distance: "0.5km",
    specialties: ["내과", "심장내과", "신경외과", "응급의학과"],
    openHours: "평일 08:30-17:30",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    latitude: 37.4989,
    longitude: 126.7831,
  },
];

// --- 메인 페이지 컴포넌트 ---
export default function FindHospitalPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [showDetail, setShowDetail] = useState(false);
  const specialties = [
    { value: "all", label: "전체" },
    { value: "내과", label: "내과" },
    { value: "외과", label: "외과" },
    { value: "정형외과", label: "정형외과" },
    { value: "산부인과", label: "산부인과" },
  ];
  const filteredHospitals = hospitalData.filter(
    (h) =>
      (h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === "all" || h.specialties.includes(selectedSpecialty))
  );

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedHospital(null);
  };

  const handleGoToBooking = (hospital: Hospital) => {
    router.push(`/main/reservationmed?hospitalId=${hospital.id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full lg:w-[450px] shrink-0 bg-white overflow-y-auto shadow-lg p-4 pt-8">
        {/* 헤더 부분 */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          {showDetail && selectedHospital ? (
            <>
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-gray-800 hover:text-gray-900"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="font-semibold">뒤로</span>
              </button>
              {/* ✅ 상세 정보 제목 색상 */}
              <h3 className="text-lg font-semibold text-gray-900">
                병원 상세정보
              </h3>
              <div className="w-8"></div> {/* 오른쪽 정렬을 위한 빈 공간 */}
            </>
          ) : (
            // ✅ 병원 찾기 제목 색상
            <div className="flex flex-col gap-5">
              <Link href={"/main"}>
                {" "}
                <ArrowLeft />
              </Link>
              <h3 className="text-lg font-semibold text-gray-900 ">
                병원 찾기
              </h3>
            </div>
          )}
        </div>

        {/* 목록 뷰 */}
        {!showDetail ? (
          <>
            <div className="space-y-4 mb-6 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                {/* ✅ 검색창 placeholder 색상도 진하게 수정 */}
                <Input
                  type="text"
                  placeholder="병원명 또는 주소 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 placeholder:text-gray-500 text-gray-900 bg-gray-50 p-2 rounded-lg w-full"
                />
              </div>
              {/* ✅ 드롭다운 글씨 색상 수정 */}
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-gray-900"
              >
                {specialties.map((s) => (
                  // ✅ 옵션 글씨 색상 수정
                  <option
                    key={s.value}
                    value={s.value}
                    className="text-gray-900"
                  >
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 ">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  onClick={() => handleHospitalSelect(hospital)}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    {/* ✅ 병원 이름 글자 크기/색상 */}
                    <h4 className="font-semibold text-base text-gray-900">
                      {hospital.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-red-400 text-red-400" />
                      {/* ✅ 별점 숫자 색상 */}
                      <span className="font-semibold text-sm text-gray-900">
                        {hospital.rating}
                      </span>
                    </div>
                  </div>
                  {/* ✅ 주소 및 시간 텍스트 색상 */}
                  <div className="space-y-1 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{hospital.openHours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          selectedHospital && ( // 상세 뷰
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-6">
                <Image
                  src={selectedHospital.image}
                  alt={selectedHospital.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedHospital.name}
                    </h2>
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 fill-red-400 text-red-400" />
                      {/* ✅ 상세 뷰 별점 숫자 색상 */}
                      <span className="font-semibold text-gray-900">
                        {selectedHospital.rating}
                      </span>
                    </div>
                  </div>
                  {/* ✅ 상세 뷰 주소/전화/시간 텍스트 색상 */}
                  <div className="space-y-3 text-gray-900">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                      <span>{selectedHospital.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedHospital.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedHospital.openHours}</span>
                    </div>
                  </div>
                </div>
                <div>
                  {/* ✅ 상세 뷰 '진료과목' 제목 색상 */}
                  <h4 className="font-semibold mb-3 text-gray-900">진료과목</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.specialties.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-[#5CA0FF] text-sm rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <Button onClick={() => handleGoToBooking(selectedHospital)}>
                    진료 예약하기
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {/* 지도 영역 */}
      <div className="hidden lg:block flex-1">
        <KakaoMap
          latitude={selectedHospital?.latitude ?? 37.484} // 부천역 위도
          longitude={selectedHospital?.longitude ?? 126.7831} // 부천역 경도
        />
      </div>
    </div>
  );
}

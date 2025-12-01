"use client";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Edit, Save, X } from "lucide-react";

const Hospitalinfo = () => {
  const [info, setInfo] = useState(null);

  // ⭐ 편집 모드 여부
  const [isEditing, setIsEditing] = useState(false);

  // ⭐ 편집용 임시 데이터
  const [editData, setEditData] = useState(null);

  // ⭐ 과목 추가용 임시 필드
  const [newDept, setNewDept] = useState({
    name: "",
    description: "",
    doctors: 0,
  });

  /*  
    📌 Spring 백엔드 연동 예정:
    useEffect(() => {
      fetch("/api/hospital/info")
        .then(res => res.json())
        .then(data => {
          setInfo(data);
          setEditData(data);
        });
    }, []);
  */

  useEffect(() => {
    const mockData = {
      name: "MEDICARE 종합병원",
      phone: "02-1234-5678",
      email: "info@medicare.com",
      address: "서울특별시 강남구 테헤란로 123",
      intro:
        "최첨단 의료 시설과 우수한 의료진으로 환자 중심의 진료를 제공하는 종합병원입니다.",
      founded: "1985년",
      beds: "500개",
      hours: {
        월요일: "09:00 - 18:00",
        화요일: "09:00 - 18:00",
        수요일: "09:00 - 18:00",
        목요일: "09:00 - 18:00",
        금요일: "09:00 - 18:00",
        토요일: "09:00 - 13:00",
        일요일: "휴무",
      },
      departments: [
        {
          name: "내과",
          description: "일반 내과 진료 및 만성질환 관리",
          doctors: 8,
        },
        { name: "외과", description: "외과 수술 및 응급 처치", doctors: 6 },
        { name: "소아과", description: "소아 청소년 전문 진료", doctors: 5 },
        {
          name: "정형외과",
          description: "근골격계 질환 및 외상 치료",
          doctors: 4,
        },
        { name: "피부과", description: "피부 질환 및 미용 치료", doctors: 3 },
        { name: "안과", description: "눈 질환 및 시력 교정", doctors: 3 },
      ],
    };

    setInfo(mockData);
    setEditData(mockData);
  }, []);

  if (!info || !editData) return <div>로딩 중...</div>;

  // ⭐ 저장
  const handleSave = () => {
    setInfo(editData);
    setIsEditing(false);

    /*
      📌 백엔드 저장 PUT 요청
      fetch("/api/hospital/info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
    */
  };

  // ⭐ 과목 추가
  const addDepartment = () => {
    if (!newDept.name.trim()) return;

    setEditData({
      ...editData,
      departments: [...editData.departments, newDept],
    });

    setNewDept({ name: "", description: "", doctors: 0 });
  };

  // ⭐ 과목 삭제
  const deleteDepartment = (idx) => {
    setEditData({
      ...editData,
      departments: editData.departments.filter((_, i) => i !== idx),
    });
  };

  // ⭐ 과목 수정
  const updateDepartment = (idx, field, value) => {
    const updated = [...editData.departments];
    updated[idx][field] = value;

    setEditData({ ...editData, departments: updated });
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">병원 정보 관리</h1>
          <p className="text-gray-500 mt-1">
            병원의 기본 정보 및 운영 정보를 관리합니다
          </p>
        </div>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Save size={18} />
            저장
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Edit size={18} />
            편집
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ========= 기본 정보 ========= */}
        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-lg">📘 기본 정보</span>
          </div>

          <div className="space-y-4">
            {/* 병원명 */}
            <div>
              <p className="text-gray-500 text-sm">병원명</p>
              {isEditing ? (
                <input
                  className="w-full border rounded-lg p-2 mt-1"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              ) : (
                <p className="text-lg font-medium">{info.name}</p>
              )}
            </div>

            {/* 전화번호/이메일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 전화 */}
              <div>
                <p className="text-gray-500 text-sm">전화번호</p>
                {isEditing ? (
                  <input
                    className="w-full border rounded-lg p-2 mt-1"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={16} className="text-gray-500" />
                    {info.phone}
                  </div>
                )}
              </div>

              {/* 이메일 */}
              <div>
                <p className="text-gray-500 text-sm">이메일</p>
                {isEditing ? (
                  <input
                    className="w-full border rounded-lg p-2 mt-1"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={16} className="text-gray-500" />
                    {info.email}
                  </div>
                )}
              </div>
            </div>

            {/* 주소 */}
            <div>
              <p className="text-gray-500 text-sm">주소</p>
              {isEditing ? (
                <input
                  className="w-full border rounded-lg p-2 mt-1"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={16} className="text-gray-500" />
                  {info.address}
                </div>
              )}
            </div>

            {/* 소개 */}
            <div>
              <p className="text-gray-500 text-sm">병원 소개</p>
              {isEditing ? (
                <textarea
                  className="w-full border rounded-lg p-3 h-24 mt-1 resize-none"
                  value={editData.intro}
                  onChange={(e) =>
                    setEditData({ ...editData, intro: e.target.value })
                  }
                />
              ) : (
                <p className="mt-1">{info.intro}</p>
              )}
            </div>

            {/* 설립/병상 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 설립 */}
              <div>
                <p className="text-gray-500 text-sm">설립년도</p>
                {isEditing ? (
                  <input
                    className="w-full border rounded-lg p-2 mt-1"
                    value={editData.founded}
                    onChange={(e) =>
                      setEditData({ ...editData, founded: e.target.value })
                    }
                  />
                ) : (
                  <p className="mt-1">{info.founded}</p>
                )}
              </div>

              {/* 병상 */}
              <div>
                <p className="text-gray-500 text-sm">병상 수</p>
                {isEditing ? (
                  <input
                    className="w-full border rounded-lg p-2 mt-1"
                    value={editData.beds}
                    onChange={(e) =>
                      setEditData({ ...editData, beds: e.target.value })
                    }
                  />
                ) : (
                  <p className="mt-1">{info.beds}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========= 운영 시간 카드 ========= */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-blue-600" />
            <span className="font-semibold text-lg">운영 시간</span>
          </div>

          <div className="space-y-3">
            {Object.entries(editData.hours).map(([day, time]) => (
              <div key={day} className="flex justify-between text-gray-700">
                <span>{day}</span>

                {isEditing ? (
                  <input
                    className="border rounded-lg p-1 w-32 text-right"
                    value={time}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        hours: { ...editData.hours, [day]: e.target.value },
                      })
                    }
                  />
                ) : (
                  <span
                    className={
                      time === "휴무" ? "text-red-500 font-semibold" : ""
                    }
                  >
                    {time}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========= 진료 과목 ========= */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-lg">🩺 진료 과목</span>
          <button className="text-blue-600 font-medium hover:underline">
            + 과목 추가
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 기존 과목 리스트 */}
          {editData.departments.map((d, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 relative hover:bg-gray-50 transition"
            >
              {isEditing && (
                <button
                  onClick={() => deleteDepartment(idx)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              )}

              {/* 이름 */}
              {isEditing ? (
                <input
                  className="w-full border rounded-lg p-1 font-medium"
                  value={d.name}
                  onChange={(e) =>
                    updateDepartment(idx, "name", e.target.value)
                  }
                />
              ) : (
                <p className="font-medium">{d.name}</p>
              )}

              {/* 의사 수 */}
              {isEditing ? (
                <input
                  type="number"
                  className="text-gray-500 text-sm mt-1 border rounded-lg p-1 w-20"
                  value={d.doctors}
                  onChange={(e) =>
                    updateDepartment(idx, "doctors", Number(e.target.value))
                  }
                />
              ) : (
                <span className="text-gray-500 text-sm">{d.doctors}명</span>
              )}

              {/* 설명 */}
              {isEditing ? (
                <textarea
                  className="border rounded-lg p-2 mt-2 w-full"
                  value={d.description}
                  onChange={(e) =>
                    updateDepartment(idx, "description", e.target.value)
                  }
                />
              ) : (
                <p className="text-gray-500 text-sm mt-2">{d.description}</p>
              )}
            </div>
          ))}

          {/* ⭐ 새 과목 추가 입력창 */}
          {isEditing && (
            <div className="border rounded-xl p-4 bg-gray-50">
              <input
                className="w-full border rounded-lg p-2 mb-2"
                placeholder="과목명 입력"
                value={newDept.name}
                onChange={(e) =>
                  setNewDept({ ...newDept, name: e.target.value })
                }
              />
              <input
                className="w-full border rounded-lg p-2 mb-2"
                placeholder="의사 수"
                type="number"
                value={newDept.doctors}
                onChange={(e) =>
                  setNewDept({ ...newDept, doctors: Number(e.target.value) })
                }
              />
              <textarea
                className="w-full border rounded-lg p-2 mb-2"
                placeholder="설명"
                value={newDept.description}
                onChange={(e) =>
                  setNewDept({ ...newDept, description: e.target.value })
                }
              />
              <button
                onClick={addDepartment}
                className="bg-blue-600 text-white w-full rounded-lg py-2 hover:bg-blue-700"
              >
                추가
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hospitalinfo;

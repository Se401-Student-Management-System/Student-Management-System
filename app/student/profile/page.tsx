"use client";

import React, { useEffect, useState } from "react";

export default function StudentProfile() {
  const [student, setStudent] = useState<any>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStudentId(localStorage.getItem("studentId"));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !studentId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/student/profile/${studentId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setStudent(data))
      .catch(() => setStudent(null))
      .finally(() => setLoading(false));
  }, [studentId, mounted]);

  // Chỉ render khi đã mounted (đã chạy ở client)
  if (!mounted) return null;
  if (loading) return <div>Đang tải thông tin...</div>;
  if (!student) return <div>Không tìm thấy thông tin học sinh.</div>;

  return (
    <div>
      {/* Thông tin cá nhân */}
      <div className="relative justify-start text-primary text-base font-bold font-['Inter'] mt-1 mb-2">
        Thông tin cá nhân
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {/* Mã học sinh */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Mã học sinh</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.id}
            </span>
          </div>
          {/* Họ tên */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Họ tên</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.account?.fullName}
            </span>
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Email</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.account?.email}
            </span>
          </div>
          {/* Số điện thoại */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Số điện thoại</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.account?.phoneNumber}
            </span>
          </div>
          {/* Giới tính */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Giới tính</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.account?.gender}
            </span>
          </div>
          {/* Ngày sinh */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Ngày sinh</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.account?.birthDate}
            </span>
          </div>
          {/* Địa chỉ */}
          <div className="flex flex-col col-span-2">
            <span className="font-normal text-gray-600">Địa chỉ</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.account?.address}
            </span>
          </div>
          {/* Nơi sinh */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Nơi sinh</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.birthPlace}
            </span>
          </div>
          {/* Dân tộc */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Dân tộc</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.ethnicity}
            </span>
          </div>
          {/* Lớp học */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Lớp học</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.className}
            </span>
          </div>
          {/* Tình trạng học */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Tình trạng học</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {student.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

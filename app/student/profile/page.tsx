"use client";

import React from "react";

// Dữ liệu profile học sinh (có thể lấy từ API hoặc file data)
const studentProfileData = {
  id: "HS001",
  name: "Nguyễn Văn B",
  email: "student@gmail.com",
  phone: "0987654321",
  gender: "Nam",
  birthday: "01/01/2007",
  address: "123 Thủ Đức",
  placeOfBirth: "TP.HCM",
  ethnicity: "Kinh",
  className: "10A1",
  status: "Đang học",
};

export default function StudentProfile() {
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
              {studentProfileData.id}
            </span>
          </div>
          {/* Họ tên */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Họ tên</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.name}
            </span>
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Email</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.email}
            </span>
          </div>
          {/* Số điện thoại */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Số điện thoại</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.phone}
            </span>
          </div>
          {/* Giới tính */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Giới tính</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.gender}
            </span>
          </div>
          {/* Ngày sinh */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Ngày sinh</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.birthday}
            </span>
          </div>
          {/* Địa chỉ */}
          <div className="flex flex-col col-span-2">
            <span className="font-normal text-gray-600">Địa chỉ</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.address}
            </span>
          </div>
          {/* Nơi sinh */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Nơi sinh</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.placeOfBirth}
            </span>
          </div>
          {/* Dân tộc */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Dân tộc</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.ethnicity}
            </span>
          </div>
          {/* Lớp học */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Lớp học</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.className}
            </span>
          </div>
          {/* Tình trạng học */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Tình trạng học</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {studentProfileData.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

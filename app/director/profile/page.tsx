"use client";

import React from "react";

// Dữ liệu mẫu, bạn thay bằng dữ liệu thực tế
const directorProfileData = {
  name: "Nguyễn Văn A",
  staffId: "NV001",
  email: "director@gmail.com",
  gender: "Nam",
  birthday: "01/01/1980",
  department: "Phòng Đào tạo",
  position: "Giám đốc",
};

export default function DirectorProfile() {
  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Thông tin cá nhân */}
      <div className="relative justify-start text-primary text-base font-bold font-['Inter'] mt-1 mb-2">
        Thông tin cá nhân
      </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {/* Họ tên */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Họ tên</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {directorProfileData.name}
            </span>
          </div>
          {/* Mã công nhân viên */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Mã công nhân viên</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {directorProfileData.staffId}
            </span>
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Email</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {directorProfileData.email}
            </span>
          </div>
          {/* Giới tính */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Giới tính</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {directorProfileData.gender}
            </span>
          </div>
          {/* Ngày sinh */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Ngày sinh</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {directorProfileData.birthday}
            </span>
          </div>
        </div>
        {/* Công tác */}
        <div className="font-bold text-base text-primary font-['Inter'] mt-6 mb-2">
          Công tác
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {/* Phòng ban */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Phòng ban</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {directorProfileData.department}
            </span>
          </div>
          {/* Chức vụ */}
          <div className="flex flex-col">
            <span className="font-normal text-gray-600">Chức vụ</span>
            <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
              {directorProfileData.position}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

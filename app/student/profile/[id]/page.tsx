"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  account: {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string;
    birthDate: string;
  };
  ethnicity: string;
  birthPlace: string;
  status: string;
  studentClasses: {
    clazz: { className: string };
    academicYear: string;
  }[];
  scores: {
    subject: { subjectName: string };
    finalScore: number;
    semester: number;
    academicYear: string;
    comments: string;
  }[];
}

export default function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ unwrap params
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  if (!id) return;

  fetch(`http://localhost:8080/students/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const mappedStudent: Student = {
        id: data.id,
        ethnicity: data.ethnicity,
        birthPlace: data.birthPlace,
        status: data.status,
        account: {
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          gender: data.gender,
          birthDate: data.birthDate,
        },
        studentClasses: [
          {
            clazz: {
              className: data.className,
            },
            academicYear: data.academicYear,
          },
        ],
        scores: [], // Hoặc fetch riêng nếu cần
      };

      setStudent(mappedStudent);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (!student) return <div>Không tìm thấy sinh viên</div>;

  const className =
    student.studentClasses && student.studentClasses.length > 0
      ? student.studentClasses[student.studentClasses.length - 1].clazz.className
      : "";

  return (
    <div className="p-6">
      <div className="relative justify-start text-primary text-base font-bold font-['Inter'] mt-1 mb-2">
        Thông tin cá nhân
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <Info label="Mã học sinh" value={student.id} />
          <Info label="Họ tên" value={student.account.fullName} />
          <Info label="Email" value={student.account.email} />
          <Info label="Số điện thoại" value={student.account.phoneNumber} />
          <Info label="Giới tính" value={student.account.gender} />
          <Info label="Ngày sinh" value={student.account.birthDate} />
          <Info label="Địa chỉ" value={student.account.address} fullWidth />
          <Info label="Nơi sinh" value={student.birthPlace} />
          <Info label="Dân tộc" value={student.ethnicity} />
          <Info label="Lớp học" value={className} />
          <Info label="Tình trạng học" value={student.status} />
        </div>
      </div>
    </div>
  );
}

// Component phụ cho đẹp và ngắn gọn
function Info({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={`flex flex-col ${fullWidth ? "col-span-2" : ""}`}>
      <span className="font-normal text-gray-600">{label}</span>
      <span className="w-full px-3 py-2 bg-gray-100 rounded border border-gray-200 font-['Inter'] text-base">
        {value}
      </span>
    </div>
  );
}

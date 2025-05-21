// app/admin/layout.tsx
"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartColumnBig,
  House,
  PersonStanding,
  Receipt,
  School,
  Ticket,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const handleLogout = async () => {};

  return (
    <div className="h-full w-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
      {/* Heading */}
      <div className="w-full h-14 px-[30px] py-2.5 bg-white border-b border-black/20 justify-between items-center inline-flex overflow-hidden">
        {/* Left */}
        <div className="h-[60px] justify-start items-center gap-5 inline-flex">
          <img className=" h-[90%] p-2" src="/logo_sg.png" alt="logo" />
        </div>
        {/* Right */}
        <div className="h-[40px] justify-start items-center gap-[30px] inline-flex">
          <div className="w-[130px] self-stretch justify-start items-center gap-2.5 flex">
            <img className="grow shrink basis-0 self-stretch" src="/ava.png" />
            <div className="w-[100px] text-center text-black text-[16px] font-normal font-['Inter'] whitespace-nowrap flex items-center justify-center">
              Director
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 10L12 14L8 10"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => router.push("/director/profile")}
              >
                Thông tin cá nhân
              </DropdownMenuItem>{" "}
              <DropdownMenuItem
                onClick={() => router.push("/director/password")}
              >
                Đổi mật khẩu
              </DropdownMenuItem>{" "}
              <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Body */}
      <div className="w-full h-full justify-start items-start inline-flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[250px] h-full px-[30px] py-[20px] bg-white border-r border-black/20 flex justify-start items-start gap-[20px] overflow-y-auto overflow-x-hidden">
          <Accordion type="multiple" className="w-full">
            <div className="h-[30px] justify-start items-center gap-5 inline-flex">
              <div className="grow shrink basis-0 text-[#afafaf] text-base font-normal font-['Inter']">
                Trung tâm
              </div>
            </div>
            {/* Quy định */}
            <AccordionItem value="thongke" className="w-full">
              <div className="w-full h-[30px] justify-between items-center inline-flex">
                <AccordionTrigger>
                  <div data-svg-wrapper className="relative">
                    <House color="#E14177" />
                  </div>
                  Quy định
                </AccordionTrigger>
              </div>
              <AccordionContent className="w-full">
                <Link
                  href="/director/title"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Danh hiệu
                </Link>
              </AccordionContent>{" "}
              <AccordionContent className="w-full">
                <Link
                  href="/director/tuition"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Học phí
                </Link>
              </AccordionContent>{" "}
            </AccordionItem>
            {/* Thống kê */}
            <AccordionItem value="quanly" className="w-full mb-[10px]">
              <div className="h-[30px] justify-between items-center inline-flex">
                <AccordionTrigger>
                  <div data-svg-wrapper className="relative">
                    <ChartColumnBig color="#01B3EF" />
                  </div>
                  Thống kê
                </AccordionTrigger>
              </div>
              <AccordionContent className="w-full">
                <Link
                  href="/director/statics/grade"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Học lực
                </Link>
              </AccordionContent>
              <AccordionContent className="w-full">
                <Link
                  href="/director/statics/student"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Học sinh
                </Link>
              </AccordionContent>
              <AccordionContent className="w-full">
                <Link
                  href="/director/statics/conduct"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Hạnh kiểm
                </Link>
              </AccordionContent>{" "}
            </AccordionItem>

            {/* Học tập */}
            <div className="h-[30px] justify-start items-center gap-5 inline-flex">
              <div className="grow shrink basis-0 text-[#afafaf] text-base font-normal font-['Inter']">
                Học tập
              </div>
            </div>
            <AccordionItem value="donhang">
              <div className="h-[30px] justify-between items-center inline-flex">
                <AccordionTrigger>
                  <div data-svg-wrapper className="relative">
                    <Users color="#E14177" />
                  </div>
                  Học sinh
                </AccordionTrigger>
              </div>
              <AccordionContent className="w-full">
                <Link
                  href="/director/student/list"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Danh sách học sinh
                </Link>
              </AccordionContent>{" "}
              <AccordionContent className="w-full">
                <Link
                  href="/director/student/payment"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Thông tin thanh toán
                </Link>
              </AccordionContent>{" "}
              <AccordionContent className="w-full">
                <Link
                  href="/director/student/perserved"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Bảo lưu
                </Link>
              </AccordionContent>{" "}
              <AccordionContent className="w-full">
                <Link
                  href="/director/student/record"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Thông tin học bạ
                </Link>
              </AccordionContent>{" "}
            </AccordionItem>

            {/* Lớp học */}
            <AccordionItem value="khuyenmai" className="w-full mb-[10px]">
              <div className="h-[30px] justify-between items-center inline-flex">
                <AccordionTrigger>
                  <div data-svg-wrapper className="relative">
                    <School color="#01B3EF" />
                  </div>
                  Lớp học
                </AccordionTrigger>
              </div>
              <AccordionContent className="w-full">
                <Link
                  href="/director/class"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Danh sách
                </Link>
              </AccordionContent>{" "}
            </AccordionItem>

            {/* Quản lý */}
            <div className="h-[30px] justify-start items-center gap-5 inline-flex">
              <div className="grow shrink basis-0 text-[#afafaf] text-base font-normal font-['Inter']">
                Quản lý
              </div>
            </div>
            <AccordionItem value="khachhang" className="w-full">
              <div className="w-full h-[30px] justify-between items-center inline-flex">
                <AccordionTrigger>
                  <div data-svg-wrapper className="relative">
                    <PersonStanding color="#E14177" />
                  </div>
                  Quản lý nhân viên
                </AccordionTrigger>
              </div>
              <AccordionContent className="w-full">
                <Link
                  href="/director/manage/teacher/list"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Giáo viên
                </Link>
              </AccordionContent>{" "}
              <AccordionContent className="w-full">
                <Link
                  href="/director/manage/cashier/list"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Thu ngân
                </Link>
              </AccordionContent>{" "}
              <AccordionContent className="w-full">
                <Link
                  href="/director/manage/supervisor/list"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Giám thị
                </Link>
              </AccordionContent>{" "}
            </AccordionItem>
          </Accordion>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white h-full overflow-y-auto">
          {children}
          <Toaster
            position="top-right"
            richColors
            duration={5000}
            closeButton
          />
        </main>
      </div>
    </div>
  );
}

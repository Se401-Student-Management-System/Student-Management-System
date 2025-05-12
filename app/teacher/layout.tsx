"use client";
import { ReactNode, useState } from "react";
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
  Users,
  School,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

interface TeacherLayoutProps {
  children: ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Giả lập gọi API đăng xuất
      // await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
      {/* Header */}
      <div className="w-full h-14 px-[30px] py-2.5 bg      bg-white border-b border-black/20 justify-between items-center inline-flex overflow-hidden">
        {/* Left */}
        <div className="h-[60px] justify-start items-center gap-5 inline-flex">
          <img className="h-[90%] p-2" src="/logo_sg.png" alt="logo" />
        </div>
        {/* Right */}
        <div className="h-[40px] justify-start items-center gap-[30px] inline-flex">
          <div className="w-[130px] self-stretch justify-start items-center gap-2.5 flex">
            <img className="grow shrink basis-0 self-stretch" src="/ava.png" />
            <div className="w-[100px] text-center text-black text-[16px] font-normal font-['Inter'] whitespace-nowrap flex items-center justify-center">
              Teacher
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
                onClick={() => router.push("/teacher/password")}
              >
                Đổi mật khẩu
              </DropdownMenuItem>
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
            {/* Thống kê */}
            <div className="h-[30px] justify-start items-center gap-5 inline-flex">
              <div className="grow shrink basis-0 text-[#afafaf] text-base font-normal font-['Inter']">
                Thống kê
              </div>
            </div>
            <AccordionItem value="thongke" className="w-full">
              <div className="w-full h-[30px] justify-between items-center inline-flex">
                <AccordionTrigger>
                  <div data-svg-wrapper className="relative">
                    <ChartColumnBig color="#01B3EF" />
                  </div>
                  Học lực
                </AccordionTrigger>
              </div>
              <AccordionContent className="w-full">
                <Link
                  href="/teacher/statics/grade"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Thống kê học lực
                </Link>
              </AccordionContent>
            </AccordionItem>

            {/* Học sinh */}
            <div className="h-[30px] justify-start items-center gap-5 inline-flex">
              <div className="grow shrink basis-0 text-[#afafaf] text-base font-normal font-['Inter']">
                Học sinh
              </div>
            </div>
            <AccordionItem value="hocsinh" className="w-full">
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
                  href="/teacher/student"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Danh sách học sinh
                </Link>
              </AccordionContent>
            </AccordionItem>

            {/* Lớp học */}
            <div className="h-[30px] justify-start items-center gap-5 inline-flex">
              <div className="grow shrink basis-0 text-[#afafaf] text-base font-normal font-['Inter']">
                Lớp học
              </div>
            </div>
            <AccordionItem value="lophoc" className="w-full">
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
                  href="/teacher/class/rate"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Đánh giá kết quả học
                </Link>
              </AccordionContent>
              <AccordionContent className="w-full">
                <Link
                  href="/teacher/class/enter/list"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Nhập điểm
                </Link>
              </AccordionContent>
              <AccordionContent className="w-full">
                <Link
                  href="/teacher/class/record"
                  className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                >
                  Báo cáo học lực lớp
                </Link>
              </AccordionContent>
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
"use client"

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
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { ChevronDown, NotebookPen } from "lucide-react";

interface CashierLayoutProps {
  children: ReactNode;
}

export default function CashierLayout ({ children }: CashierLayoutProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState<string>("");
    const router = useRouter();
    return (
        <div className="h-full w-full bg-white flex-col justify-start items-start inline-flex overflow-hidden">
            {/* Heading */}
            <div className="w-full h-14 px-[30px] py-2.5 bg-white border-b border-black/20 justify-between items-center inline-flex overflow-hidden">
                {/* Left */}
                <div className="h-[60px] justify-start items-center gap-5 inline-flex"></div>
                {/* Right */}
                <div className="h-[40px] justify-start items-center gap-[30px] inline-flex">
                <div className="w-[130px] self-stretch justify-start items-center gap-2.5 flex">
                    <img className="grow shrink basis-0 self-stretch" src="/ava.png" />
                    <div className="flex flex-col">
                        <span className="w-[100px] whitespace-nowrap">Nguyễn Văn A</span>
                        <span>Giám thị</span>
                    </div>
                    {/* <div className="w-[100px] text-center text-black text-[16px] font-normal font-['Inter'] whitespace-nowrap flex items-center justify-center">
                    {userName || "Đang tải..."}
                    </div> */}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push("/cashier/profile")}>
                        Profile
                    </DropdownMenuItem>{" "}
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
                                Hạnh kiểm
                            </div>
                        </div>
                        <AccordionItem value="thongke" className="w-full">
                            <div className="w-full h-[30px] justify-between items-center inline-flex">
                                <AccordionTrigger>
                                    <div data-svg-wrapper className="relative">
                                        <NotebookPen color="#E14177" />
                                    </div>
                                    Quản lý hạnh kiểm
                                </AccordionTrigger>
                            </div>
                            <AccordionContent className="w-full">
                                <Link
                                href="/supervisor/fault"
                                className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                                >
                                Thông tin vi phạm
                                </Link>
                            </AccordionContent>{" "}
                            <AccordionContent className="w-full">
                                <Link
                                href="/supervisor/category"
                                className="block w-full py-2 px-2 text-black hover:bg-gray-200"
                                >
                                Danh mục vi phạm
                                </Link>
                            </AccordionContent>{" "}
                        </AccordionItem>
                    </Accordion>
                </div>
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
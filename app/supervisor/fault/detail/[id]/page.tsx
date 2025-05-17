"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogOut, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

const formSchema = z.object({
    student_id: z.string().min(1, "Mã học sinh không được để trống" ),
    category_id: z.string().min(1, "Loại vi phạm không được để trống"),
})

export default function FaultDetail() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        student_id: "",
        category_id: "",
    },
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const [categoryId, setCategoryId] = useState<string>("");
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/fault", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("Thêm vi phạm thành công");
      router.push("/supervisor/fault");
    } else {
      toast.error("Có lỗi xảy ra");
    }
  }

  return(
    <div>
      <div className="relative justify-start text-black text-base font-normal font-['Inter']">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/supervisor/fault">Danh mục vi phạm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/supervisor/fault/add`}>Chi tiết vi phạm</BreadcrumbLink>
            </BreadcrumbItem>   
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative justify-start text-[#6DCFFB] text-base font-bold font-['Inter'] mt-[10px]">
        Thông tin vi phạm
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 space-y-6"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-2 gap-6">
            <FormItem className="w-full flex flex-col">
              <FormLabel className="font-normal">Mã học sinh</FormLabel>
              <Input value="1" readOnly />
            </FormItem>
            <FormItem className="w-full flex flex-col">
              <FormLabel className="font-normal">Tên học sinh</FormLabel>
              <Input value="Nguyễn Văn A" readOnly />
            </FormItem>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Lớp</FormLabel>
                <Input value="11A1" readOnly />
              </FormItem>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormItem className="w-full flex flex-col">
              <FormLabel className="font-normal">Học kỳ</FormLabel>
              <Input value="1" readOnly />
            </FormItem>
            <FormItem className="w-full flex flex-col">
              <FormLabel className="font-normal">Năm học</FormLabel>
              <Input value="2024-2025" readOnly />
            </FormItem>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormItem className="w-full flex flex-col">
              <FormLabel className="font-normal">Lỗi vi phạm</FormLabel>
              <Input value="Đi trễ" readOnly />
            </FormItem>
            <FormItem className="w-full flex flex-col">
              <FormLabel className="font-normal">Ngày vi phạm</FormLabel>
              <Input value="11-01-2025" readOnly />
            </FormItem>
          </div>
          <div className="w-full self-stretch inline-flex flex-col justify-start items-end gap-5 mt-[15px]">
            <div className="inline-flex justify-start items-start gap-[29px]">
              <div className="relative">
                <LogOut className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <Button variant={"secondary"} className="pl-12" type="button">
                  <Link href="/supervisor/fault" className="text-white">
                    Thoát
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
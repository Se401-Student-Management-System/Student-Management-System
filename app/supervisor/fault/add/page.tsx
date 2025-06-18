"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogOut, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
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
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

const formSchema = z.object({
  studentId: z.string().min(1, "Mã học sinh không được để trống"),
  className: z.string().min(1, "Tên lớp không được để trống"),
  supervisorId: z.string().min(1, "Mã giám thị không được để trống"),
  violationTypeId: z.string().min(1, "Mã vi phạm không được để trống"),
  academicYear: z.string().optional(),
  semester: z.string().optional(),
  violationDate: z.string().optional(),
});

export default function AddFault() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      className: "",
      supervisorId: "",
      violationTypeId: "",
      academicYear: "",
      semester: "",
      violationDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const [categoryId, setCategoryId] = useState<string>("");
  useEffect(() => {
    form.setValue("violationDate", format(new Date(), "yyyy-MM-dd"));
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        "http://localhost:8080/violations/record-and-process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add fault");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Quay lại trang trước đó
      router.back();
    } catch (error) {
      console.error("Error:", error);
      // Optional: show notification
    }
  }
  return (
    <div>
      <div className="relative justify-start text-black text-base font-normal font-['Inter']">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/supervisor/fault">
                Danh mục vi phạm
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/supervisor/fault/add`}>
                Thêm vi phạm
              </BreadcrumbLink>
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
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Mã học sinh</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Tên lớp</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="10A1" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="supervisorId"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Mã giám thị</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="SP001" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="violationTypeId"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Mã vi phạm</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Năm học</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="2024-2025" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Học kỳ</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="violationDate"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Ngày vi phạm</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      readOnly
                      {...field}
                      value={
                        form.watch("violationDate") ||
                        format(new Date(), "yyyy-MM-dd")
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />
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
              <div className="relative">
                <Save className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <Button className="pl-12" type="submit">
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  className: z.string(),
  academicYear: z.string(),
  studentId: z.string(),
});

export default function addStudentArrange() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      academicYear: "",
      studentId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        "http://localhost:8080/students/assign-class",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign student to class");
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
        Học tập / Lớp học / Sắp xếp / Thêm học sinh
      </div>
      <div className="relative justify-start text-primary text-base font-bold font-['Inter'] mt-[10px]">
        Thêm học sinh
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="w-full self-stretch inline-flex justify-between items-center mt-[10px]">
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="academicYear"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Năm học</FormLabel>
                    <FormControl>
                      <Input placeholder="2024 - 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Tên lớp</FormLabel>
                    <FormControl>
                      <Input placeholder="11A1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full self-stretch inline-flex justify-between items-center mt-[10px]">
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">
                      Mã số học sinh
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="HS001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Button */}
          <div className="w-full self-stretch self-stretch inline-flex flex-col justify-start items-end gap-5 overflow-hidden mt-[15px]">
            <div className="inline-flex justify-start items-start gap-[29px]">
              <div className="relative">
                <LogOut className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <Button variant={"secondary"} className="pl-12" type="button">
                  <Link href="#" className="text-white">
                    Thoát
                  </Link>
                </Button>{" "}
              </div>
              <div className="relative">
                <Save className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <Button className="pl-12" type="submit">
                  Lưu
                </Button>{" "}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

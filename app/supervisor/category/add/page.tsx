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

const formSchema = z.object({
    name: z.string().min(1, "Tên vi phạm không được để trống"),
    minus_point: z
      .string()
      .min(1, "Điểm trừ không được để trống") 
      .refine((val) => Number(val) > 0, {
      message: "Điểm trừ phải lớn hơn 0",
    }),
})

export default function AddCategory() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        minus_point: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("Thêm loại vi phạm thành công");
      router.push("/supervisor/category");
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
              <BreadcrumbLink href="/supervisor/category">Danh mục vi phạm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/supervisor/category/add`}>Thêm loại vi phạm</BreadcrumbLink>
            </BreadcrumbItem>   
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative justify-start text-[#6DCFFB] text-base font-bold font-['Inter'] mt-[10px]">
        Thông tin loại vi phạm
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
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Tên vi phạm</FormLabel>
                  <FormControl>
                    <Input 
                      type="text"
                      placeholder="Đi trễ" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-semibold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minus_point"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Điểm trừ</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={1}
                      placeholder="3" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-semibold" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full self-stretch inline-flex flex-col justify-start items-end gap-5 mt-[15px]">
            <div className="inline-flex justify-start items-start gap-[29px]">
              <div className="relative">
                <LogOut className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <Button variant={"secondary"} className="pl-12" type="button">
                  <Link href="/supervisor/category" className="text-white">
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
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
import { useParams, useRouter } from "next/navigation";
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
    student_id: z.string(),
    totalPayment: z
      .string()
      .min(1, "Số tiền đóng không được để trống") 
      .refine((val) => Number(val) > 0, {
      message: "Số tiền phải lớn hơn 0",
    }),
    // totalFee: z.string(),
    // debtAmount: z.string(),
})

export default function AddInvoice() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [studentInfo] = useState({
    id: "HS001",
    name: "Nguyễn Văn A",
    class: "10A1",
    year: "2024-2025",
    totalFee: "1000000",
    status: "Còn nợ"
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: studentInfo.id,
        totalPayment: "",
        // totalFee: studentInfo.totalFee,
        // debtAmount: "",
    },
  });

  // useEffect(() => {
  //   const subscription = form.watch((values) => {
  //     const totalFee = Number(values.totalFee);
  //     const totalPayment = Number(values.totalPayment);
  
  //     if (!isNaN(totalFee) && !isNaN(totalPayment)) {
  //       const debt = Math.max(totalFee - totalPayment, 0);
  //       form.setValue("debtAmount", debt.toString());
  //     }
  //   });
  
  //   return () => subscription.unsubscribe();
  // }, [form]);

  // function formatCurrency(value: string | number) {
  //   const number = typeof value === "string" ? Number(value) : value;
  //   return number.toLocaleString("vi-VN") + " đ";
  // }

  // function unformatCurrency(value: string) {
  //   return value.replace(/[^0-9]/g, ""); // chỉ giữ số
  // }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("Thêm thanh toán thành công");
      router.push("/cashier/invoice");
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
              <BreadcrumbLink href="/cashier/invoice">Danh sách hóa đơn</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/cashier/invoice/add/${id}`}>Thêm thanh toán</BreadcrumbLink>
            </BreadcrumbItem>   
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative justify-start text-[#6DCFFB] text-base font-bold font-['Inter'] mt-[10px]">
        Thông tin hóa đơn
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 space-y-6"
          encType="multipart/form-data"
        >
          {/* Thông tin học sinh */}
           <div className="grid grid-cols-2 gap-6">
            <div>
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Mã học sinh</FormLabel>
                <Input value={studentInfo.id} readOnly />
              </FormItem>
            </div>
            <div className="w-full inline-flex flex-col justify-start items-start gap-5">
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Tên học sinh</FormLabel>
                <Input value={studentInfo.name} readOnly />
              </FormItem>
            </div>
            <div>
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Lớp</FormLabel>
                <Input value={studentInfo.class} readOnly />
              </FormItem>
            </div>
            <div>
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Năm học</FormLabel>
                <Input value={studentInfo.year} readOnly />
              </FormItem>
            </div>
            <div>
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Tổng học phí</FormLabel>
                <Input value={studentInfo.totalFee} readOnly />
              </FormItem>
            </div>
            <div>
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Trạng thái</FormLabel>
                <Input value={studentInfo.status} readOnly />
              </FormItem>
            </div>
          </div>
          {/* Số tiền đóng */}
          <FormField
            control={form.control}
            name="totalPayment"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Số tiền đóng</FormLabel>
                <FormControl>
                  <Input 
                  // value={formatCurrency(field.value || 0)}
                  // onChange={(e) => {
                  //   const raw = unformatCurrency(e.target.value);
                  //   form.setValue("totalPayment", raw);
                  // }}
                    type="number"
                    min={1}
                    placeholder="Nhập số tiền" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-semibold" />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="debtAmount"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Số tiền còn nợ</FormLabel>
                <FormControl>
                  <Input value={formatCurrency(field.value || 0)} readOnly />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <div className="w-full self-stretch inline-flex flex-col justify-start items-end gap-5 mt-[15px]">
            <div className="inline-flex justify-start items-start gap-[29px]">
              <div className="relative">
                <LogOut className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
                <Button variant={"secondary"} className="pl-12" type="button">
                  <Link href="/cashier/invoice" className="text-white">
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
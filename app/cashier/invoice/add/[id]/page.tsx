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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const formSchema = z.object({
  student_id: z.string(),
  totalPayment: z
    .string()
    .min(1, "Số tiền đóng không được để trống")
    .refine((val) => Number(val) > 0, {
      message: "Số tiền phải lớn hơn 0",
    }),
});

export default function AddInvoice() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState<{
    id: string;
    name: string;
    class: string;
    year: string;
    totalFee: string;
    status: string;
    paidAmount: string;
    outstandingAmount: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      totalPayment: "",
    },
  });

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/cashier/invoices/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Không thể tải thông tin hóa đơn");
        const data = await response.json();
        if (data) {
          setStudentInfo({
            id: data.studentId || "",
            name: data.studentName || "",
            class: data.className || "",
            year: data.academicYear || "",
            totalFee: data.totalFee?.toString() || "0",
            status: data.status || "",
            paidAmount: data.paidAmount?.toString() || "0",
            outstandingAmount: data.outstandingAmount?.toString() || "0",
          });
          form.setValue("student_id", data.studentId || "");
        } else {
          setStudentInfo(null);
        }
      } catch (err) {
        toast.error("Lỗi khi tải thông tin hóa đơn");
        setStudentInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetail();
  }, [id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`http://localhost:8080/cashier/add-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cashierId: "CS001", // Thay bằng ID thu ngân thực tế nếu có
          invoiceId: id,
          amount: Number(values.totalPayment),
        }),
      });

      const result = await response.text();
      if (response.ok) {
        toast.success("Thêm thanh toán thành công");
        router.push("/cashier/invoice");
      } else {
        toast.error(`Thêm thanh toán thất bại: ${result}`);
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi thêm thanh toán");
    }
  }

  if (loading) return <div>Đang tải...</div>;
  if (!studentInfo) return <div>Không tìm thấy thông tin hóa đơn</div>;

  return (
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
                <FormLabel className="font-normal">Số tiền đã thanh toán</FormLabel>
                <Input value={studentInfo.paidAmount} readOnly />
              </FormItem>
            </div>
            <div>
              <FormItem className="w-full flex flex-col">
                <FormLabel className="font-normal">Số tiền còn nợ</FormLabel>
                <Input value={studentInfo.outstandingAmount} readOnly />
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
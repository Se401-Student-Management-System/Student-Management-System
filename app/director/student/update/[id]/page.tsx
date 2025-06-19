"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, Save } from "lucide-react";
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
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
  studentName: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(11),
  address: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  nation: z.string(),
  country: z.string(),
  status: z.string().optional(),
});

export default function updateStudent() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      studentName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      nation: "",
      country: "",
      status: "ACTIVTE",
    },
  });
  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`http://localhost:8080/students/${id}`);
        const data = await res.json();

        form.reset({
          username: data.username,
          password: data.password,
          studentName: data.fullName,
          email: data.email,
          phone: data.phoneNumber,
          address: data.address,
          gender: data.gender,
          dateOfBirth: data.birthDate,
          nation: data.ethnicity,
          country: data.birthPlace,
          status: data.status ?? "ACTIVE",
        });
      } catch (error) {
        toast.error("Không thể lấy thông tin học sinh.");
      }
    }

    if (id) {
      fetchStudent();
    }
  }, [id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`http://localhost:8080/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          username: values.username,
          fullName: values.studentName,
          email: values.email,
          phoneNumber: values.phone,
          address: values.address,
          gender: values.gender,
          birthDate: values.dateOfBirth,
          roleName: "student", // hoặc bất kỳ role nào bạn quy định
          ethnicity: values.nation,
          birthPlace: values.country,
          status: values.status ?? "ACTIVE",
        }),
      });

      if (response.ok) {
        toast.success("Cập nhật học sinh thành công!");
        router.push("/director/student/list");
      } else {
        const error = await response.json();
        toast.error(error.message || "Cập nhật thất bại.");
      }
    } catch (error) {
      toast.error("Lỗi kết nối tới server.");
    }
  }

  return (
    <div>
      <div className="relative justify-start text-black text-base font-normal font-['Inter']">
        Học tập / Học sinh / Danh sách học sinh
      </div>
      <div className="relative justify-start text-primary text-base font-bold font-['Inter'] mt-[10px]">
        Thông tin tài khoản
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
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Tài khoản</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="relative justify-start text-primary text-base font-bold font-['Inter'] mt-[10px]">
            Thông tin cá nhân
          </div>
          <div className="w-full self-stretch inline-flex justify-between items-center mt-[10px]">
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">
                      Họ tên học sinh
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn Văn A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="0123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Thủ Đức" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full self-stretch inline-flex justify-between items-center mt-[10px]">
            <div className="w-[500px] inline-flex justify-between items-start gap-2">
              <div className="w-1/2 flex flex-col">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel className="font-normal">Giới tính</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giới tính" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nam">Nam</SelectItem>
                            <SelectItem value="Nữ">Nữ</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel className="font-normal">Ngày sinh</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-[500px] inline-flex justify-between items-start gap-2">
              <div className="w-1/2 flex flex-col">
                <FormField
                  control={form.control}
                  name="nation"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel className="font-normal">Dân tộc</FormLabel>
                      <FormControl>
                        <Input placeholder="Kinh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col">
                      <FormLabel className="font-normal">Nơi sinh</FormLabel>
                      <FormControl>
                        <Input placeholder="Việt Nam" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full self-stretch inline-flex justify-between items-center mt-[10px]">
            <div className="w-[500px] inline-flex flex-col justify-start items-start gap-5">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col">
                    <FormLabel className="font-normal">Trạng thái</FormLabel>
                    <FormControl>
                      <Input placeholder="0123456789" {...field} />
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
                  <Link href="/director/student/list" className="text-white">
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

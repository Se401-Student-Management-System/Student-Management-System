"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast, Toaster } from "sonner";

// Schema validate
const registerSchema = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().min(9, "Số điện thoại không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    gender: z.enum(["Male", "Female"]),
    birthday: z.string().optional(),
    repassword: z.string().optional(),
    name: z.string().min(1, "Vui lòng nhập tên"),
    address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["repassword"],
  });

export default function PageRegister() {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      repassword: "",
      name: "",
      address: "",
      gender: undefined,
      birthday: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    if (!data.email || !data.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Đăng ký thất bại");
        return;
      }

      toast.success("Đăng ký thành công!", { duration: 5000 });
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đăng ký");
    }
  };

  return (
    <div className="w-full h-full bg-white inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Heading */}
      <div className="h-[80px] px-[30px] py-2.5 bg-white inline-flex justify-start items-center gap-5 overflow-hidden">
        <img
          className="w-[173.68px] h-[60px] relative"
          src="/logo_left.png"
          alt="logo"
        />
        <div className="relative justify-start text-[#fb4141] text-[28px] font-bold font-['Inter']">
          ĐĂNG KÝ
        </div>
      </div>

      {/* Body */}
      <div className="w-full h-full bg-[#5cb338] inline-flex justify-start items-start overflow-hidden">
        {/* Left */}
        <div className="w-1/2 h-full inline-flex justify-between items-center overflow-hidden">
          <Toaster
            position="top-right"
            richColors
            duration={5000}
            closeButton
          />
          <img
            className="h-full relative"
            src="/logo_slogan.png"
            alt="logo_slogan"
          />
        </div>

        {/* Right */}
        <div className="w-1/2 h-full px-[50px] py-[20px] inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="w-full h-full px-[60px] py-[20px] bg-white inline-flex flex-col justify-start items-center gap-[25px] overflow-hidden">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-[20px]"
              >
                <div className="self-stretch text-center justify-start text-red-500 text-3xl font-bold font-['Inter']">
                  ĐĂNG KÝ
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="w-[460px] h-[60px] p-2.5 rounded-[5px] placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Số điện thoại giao hàng"
                          className="w-[460px] h-[60px] p-2.5 rounded-[5px] placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Mật khẩu"
                          className="w-[460px] h-[60px] p-2.5 rounded-[5px] placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                          className="w-[460px] h-[60px] p-2.5 rounded-[5px] placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Tên khách hàng"
                          className="w-[460px] h-[60px] p-2.5 rounded-[5px] placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Địa chỉ giao hàng"
                          className="w-[460px] h-[60px] p-2.5 rounded-[5px] placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Ngày sinh"
                            className="w-full h-[60px] p-2.5 rounded-[5px] placeholder:text-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormControl>
                          <select
                            {...field}
                            className="w-[220px] h-[40px] p-2.5 rounded-[5px] border border-primary text-gray-600"
                          >
                            <option value="">Chọn giới tính</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-[500px] h-[40px] p-2.5 bg-[#5cb338] rounded-[5px] inline-flex justify-center items-center gap-2.5 overflow-hidden"
                >
                  <div className="relative justify-start text-white text-[20px] font-bold font-['Inter']">
                    ĐĂNG KÝ
                  </div>
                </Button>
              </form>
            </Form>

            <div className="w-full flex flex-col items-center gap-2">
              <div className="text-[16px] text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  href="/login"
                  className="text-[#fb4141] font-bold text-[16px] hover:underline"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

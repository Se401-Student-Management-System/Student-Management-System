"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
});

export default function PageLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Student");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          role: role,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      if (result.userId) {
        localStorage.setItem("userId", result.userId);
      }
      if (result.role) {
        localStorage.setItem("role", result.role);
      }
      if (result.studentId) {
        localStorage.setItem("studentId", result.studentId);
      }
      if (result.teacherId) {
        localStorage.setItem("teacherId", result.teacherId);
      }
      if (result.cashierId) {
        localStorage.setItem("cashierId", result.cashierId);
      }
      if (result.supervisorId) {
        localStorage.setItem("supervisorId", result.supervisorId);
      }

      localStorage.setItem("account", JSON.stringify(result.account));
      toast.success("Đăng nhập thành công!");
      if (result.role === "Teacher" && result.userId) {
        localStorage.setItem("teacherId", result.userId);
      }
      if (result.role === "Teacher") router.push("/teacher/class/record/list");
      else if (result.role === "Student") router.push("/student/score");
      else if (result.role === "Cashier") router.push("/cashier/payment");
      else if (result.role === "Supervisor") router.push("/supervisor/category");
    } catch (err) {
      toast.error("Đăng nhập thất bại: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-white inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Heading */}
      <div className="h-[70px] px-[30px] py-2.5 bg-white inline-flex justify-start items-center gap-5 overflow-hidden">
        <img className="h-[60px] relative" src="/logo.png" alt="logo" />
        <div className="relative justify-start text-[#01B3EF] text-[28px] font-bold font-['Inter']">
          ĐĂNG NHẬP
        </div>
      </div>

      {/* Body */}
      <div className="w-full h-full bg-[#01B3EF] inline-flex justify-start items-start overflow-hidden">
        {/* Left */}
        <div className="w-1/2 h-full inline-flex justify-between items-center overflow-hidden">
          <img
            className="w-[75%] h-[80%] ml-[80px]"
            src="/image.png"
            alt="image"
          />
        </div>

        {/* Right */}
        <div className="self-stretch self-stretch px-12 py-24 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="flex-1 px-14 py-7 bg-white inline-flex flex-col justify-start items-center gap-7 overflow-hidden">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-[20px]"
              >
                <div className="self-stretch text-center justify-start text-[#01B3EF] text-3xl font-bold font-['Inter'] mt-[20px]">
                  ĐĂNG NHẬP
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
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
                {/* Dropdown */}
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="p-2.5 rounded-[5px] border border-primary cursor-pointer"
                >
                  <option value="Student">Học sinh</option>
                  <option value="Teacher">Giáo viên</option>
                  <option value="Cashier">Thu ngân</option>
                  <option value="Supervisor">Giám thị</option>
                </select>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-[500px] h-[40px] p-2.5 bg-primary rounded-[5px] inline-flex justify-center items-center gap-2.5 overflow-hidden mb-[20px]"
                >
                  <div className="relative justify-start text-white text-[20px] font-bold font-['Inter']">
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </div>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

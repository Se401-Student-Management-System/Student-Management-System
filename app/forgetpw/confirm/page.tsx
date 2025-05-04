"use client";

import { Form } from "@/components/ui/form";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ConfirmOTP() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length === 4) {
      // Lấy email từ localStorage
      const email = localStorage.getItem("resetEmail");

      if (!email) {
        alert("Email không hợp lệ. Vui lòng thử lại.");
        return;
      }

      // Gửi yêu cầu xác minh mã OTP tới API
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        // Nếu mã OTP đúng, chuyển tới trang tạo mật khẩu mới
        alert(
          "Mã OTP xác thực thành công! Bạn sẽ được chuyển đến trang tạo mật khẩu mới."
        );
        router.push("/forgetpw/newpassword");
      } else {
        // Nếu mã OTP sai, hiển thị thông báo lỗi
        alert(data.message || "Mã OTP không hợp lệ.");
      }
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
        <div className="text-[#fb4141] text-[28px] font-bold font-['Inter']">
          QUÊN MẬT KHẨU
        </div>
      </div>

      {/* Body */}
      <div className="w-full h-full bg-[#5cb338] inline-flex justify-start items-start overflow-hidden">
        {/* Left */}
        <div className="w-1/2 h-full inline-flex justify-between items-center overflow-hidden">
          <img
            className="h-full relative"
            src="/logo_slogan.png"
            alt="logo_slogan"
          />
        </div>

        {/* Right */}
        <div className="w-1/2 h-full px-[50px] py-[100px] inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="w-full px-[60px] py-[30px] bg-white inline-flex flex-col justify-start items-center gap-[30px] overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="self-stretch text-center justify-start text-red-500 text-3xl font-bold font-['Inter']">
                XÁC THỰC
              </div>
              <div className="text-black text-base font-medium font-['Inter'] text-center mb-[20px] mt-[10px]">
                Nhập 4 chữ số được gửi đến email của bạn
              </div>

              <div className="flex gap-4">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => {
                      inputRefs.current[index] = el as HTMLInputElement;
                    }}
                    className="w-[60px] h-[60px] text-center text-2xl rounded-[5px]"
                  />
                ))}
              </div>

              <Button
                type="submit"
                className="w-[500px] h-[40px] mt-6 bg-[#5cb338] rounded-[5px] inline-flex justify-center items-center gap-2.5 mb-[20px]"
              >
                <div className="text-white text-[20px] font-bold font-['Inter']">
                  TIẾP THEO
                </div>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

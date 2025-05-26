"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  oldPw: string;
  newPw: string;
  confirmPw: string;
}

interface FormErrors {
  oldPw?: string;
  newPw?: string;
  confirmPw?: string;
  general?: string;
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    oldPw: "",
    newPw: "",
    confirmPw: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.oldPw) newErrors.oldPw = "Vui lòng nhập mật khẩu cũ";
    if (!formData.newPw) newErrors.newPw = "Vui lòng nhập mật khẩu mới";
    else if (formData.newPw.length < 6) newErrors.newPw = "Mật khẩu mới phải có ít nhất 6 ký tự";
    if (!formData.confirmPw) newErrors.confirmPw = "Vui lòng xác nhận mật khẩu";
    else if (formData.confirmPw !== formData.newPw)
      newErrors.confirmPw = "Mật khẩu xác nhận không khớp";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("/api/cashier/changepw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPw: formData.oldPw,
          newPw: formData.newPw,
          confirmPw: formData.confirmPw,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Đổi mật khẩu thất bại");
      }

      toast.success("Đổi mật khẩu thành công");
      setFormData({ oldPw: "", newPw: "", confirmPw: "" });
      setErrors({});
    } catch (err: any) {
      setErrors({ general: err.message });
      toast.error(err.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
  };

  const handleExit = () => {
    router.push("/cashier/statics");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-black text-base font-medium mb-6">
        Tài khoản / Đổi mật khẩu
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl mx-auto">
        <h1 className="text-lg font-bold mb-4">Đổi mật khẩu:</h1>
        <h2 className="text-lg font-bold text-[#01B3EF] mb-6">Thông tin mật khẩu:</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Mật khẩu cũ */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 font-medium">
                <Lock className="h-5 w-5 text-[#E14177]" />
                Mật khẩu cũ
              </label>
              <Input
                type="password"
                name="oldPw"
                value={formData.oldPw}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu cũ"
                required
                className="max-w-[300px]"
              />
              {errors.oldPw && <p className="text-red-500 text-sm">{errors.oldPw}</p>}
            </div>

            {/* Mật khẩu mới */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 font-medium">
                <Lock className="h-5 w-5 text-[#E14177]" />
                Mật khẩu mới
              </label>
              <Input
                type="password"
                name="newPw"
                value={formData.newPw}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu mới"
                required
                className="max-w-[300px]"
              />
              {errors.newPw && <p className="text-red-500 text-sm">{errors.newPw}</p>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 font-medium">
                <Lock className="h-5 w-5 text-[#E14177]" />
                Xác nhận mật khẩu
              </label>
              <Input
                type="password"
                name="confirmPw"
                value={formData.confirmPw}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu mới"
                required
                className="max-w-[300px]"
              />
              {errors.confirmPw && <p className="text-red-500 text-sm">{errors.confirmPw}</p>}
            </div>
          </div>

          {/* Thông báo lỗi chung */}
          {errors.general && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md">
              {errors.general}
            </div>
          )}

          {/* Nút hành động */}
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleExit}
              className="min-w-[120px]"
            >
              Thoát
            </Button>
            <Button type="submit" className="min-w-[120px]">
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
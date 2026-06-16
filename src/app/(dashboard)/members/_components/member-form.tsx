"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MEMBER_TYPES = [
  { value: "Student", label: "Student" },
  { value: "Researcher", label: "Researcher" },
  { value: "Scholar", label: "Scholar" },
  { value: "Government Officer", label: "Government Officer" },
  { value: "Public Member", label: "Public Member" },
] as const;

const ID_TYPES = [
  { value: "Aadhar", label: "Aadhar" },
  { value: "PAN", label: "PAN" },
  { value: "College ID", label: "College ID" },
  { value: "Driver License", label: "Driver License" },
] as const;

interface MemberFormData {
  full_name: string;
  email: string;
  phone: string;
  member_type: string;
  address: string;
  id_type: string;
  id_number: string;
  notes: string;
}

interface MemberFormProps {
  initialData?: MemberFormData;
  onSubmit: (data: MemberFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const defaultFormData: MemberFormData = {
  full_name: "",
  email: "",
  phone: "",
  member_type: "Student",
  address: "",
  id_type: "Aadhar",
  id_number: "",
  notes: "",
};

export function MemberForm({ initialData, onSubmit, onCancel, isLoading }: MemberFormProps) {
  const [form, setForm] = useState<MemberFormData>(initialData ?? defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({});

  const handleChange = (field: keyof MemberFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof MemberFormData, string>> = {};
    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s-]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!form.member_type) newErrors.member_type = "Member type is required";
    if (!form.id_number.trim()) newErrors.id_number = "ID number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  const inputClass = (field: keyof MemberFormData) =>
    cn(
      "w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
      errors[field] ? "border-red-400" : "border-gray-200"
    );

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
            className={inputClass("full_name")}
            placeholder="Member's full name"
          />
          {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClass("email")}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClass("phone")}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className={labelClass}>Member Type *</label>
          <select
            value={form.member_type}
            onChange={(e) => handleChange("member_type", e.target.value)}
            className={inputClass("member_type")}
          >
            {MEMBER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {errors.member_type && <p className="text-xs text-red-500 mt-1">{errors.member_type}</p>}
        </div>
        <div>
          <label className={labelClass}>ID Type</label>
          <select
            value={form.id_type}
            onChange={(e) => handleChange("id_type", e.target.value)}
            className={inputClass("id_type")}
          >
            {ID_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>ID Number *</label>
          <input
            type="text"
            value={form.id_number}
            onChange={(e) => handleChange("id_number", e.target.value)}
            className={inputClass("id_number")}
            placeholder="Government ID number"
          />
          {errors.id_number && <p className="text-xs text-red-500 mt-1">{errors.id_number}</p>}
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <textarea
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className={cn(inputClass("address"), "min-h-[80px] resize-y")}
            placeholder="Full address"
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className={cn(inputClass("notes"), "min-h-[80px] resize-y")}
            placeholder="Additional notes about the member"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 inline-flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Update Member" : "Add Member"}
        </button>
      </div>
    </form>
  );
}

export type { MemberFormData };
export { MEMBER_TYPES, ID_TYPES };

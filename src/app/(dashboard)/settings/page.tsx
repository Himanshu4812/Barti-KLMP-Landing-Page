"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { toast } from "sonner";
import { Save, LogOut, Shield } from "lucide-react";

interface MemberTypeRule {
  id: string;
  type: string;
  maxBooks: number;
  maxDuration: number;
  renewals: number;
  validity: number;
  autoRenew: boolean;
}

const defaultGeneralSettings = {
  libraryName: "BARTI Knowledge & Library Management Platform",
  address: "Dr. Babasaheb Ambedkar Research and Training Institute (BARTI),\nNear Yerwada Central Jail,\nPune – 411006, Maharashtra",
  contactEmail: "library@barti.gov.in",
  contactPhone: "+91 20 2668 4000",
  maxFinePerDay: 5,
};

const defaultMemberRules: MemberTypeRule[] = [
  { id: "1", type: "Student", maxBooks: 5, maxDuration: 14, renewals: 2, validity: 12, autoRenew: false },
  { id: "2", type: "Faculty", maxBooks: 10, maxDuration: 30, renewals: 3, validity: 24, autoRenew: true },
  { id: "3", type: "Researcher", maxBooks: 8, maxDuration: 21, renewals: 2, validity: 12, autoRenew: true },
  { id: "4", type: "General Member", maxBooks: 3, maxDuration: 14, renewals: 1, validity: 6, autoRenew: false },
  { id: "5", type: "Staff", maxBooks: 6, maxDuration: 21, renewals: 2, validity: 12, autoRenew: false },
];

const defaultNotifications = {
  dueReminder: true,
  overdueAlert: true,
  reservationReady: true,
  reservationExpiring: false,
  membershipExpiry: true,
};

const sessionTimeoutOptions = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 120, label: "2 hours" },
  { value: 240, label: "4 hours" },
  { value: 480, label: "8 hours" },
];

export default function SettingsPage() {
  const [general, setGeneral] = useState(defaultGeneralSettings);
  const [memberRules, setMemberRules] = useState(defaultMemberRules);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [sessionTimeout, setSessionTimeout] = useState(60);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const handleGeneralChange = (field: string, value: string | number) => {
    setGeneral((prev) => ({ ...prev, [field]: value }));
  };

  const handleRuleChange = (id: string, field: keyof MemberTypeRule, value: string | number | boolean) => {
    setMemberRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, [field]: value } : rule))
    );
  };

  const handleSave = (section: string) => {
    setIsSaving(section);
    setTimeout(() => {
      setIsSaving(null);
      toast.success(`${section} settings saved successfully`);
    }, 800);
  };

  const handleForceSignOut = () => {
    setConfirmOpen(false);
    toast.success("All users have been signed out successfully");
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Super Admin only" />

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">General Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Library Name</label>
            <input
              type="text"
              value={general.libraryName}
              onChange={(e) => handleGeneralChange("libraryName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <textarea
              value={general.address}
              onChange={(e) => handleGeneralChange("address", e.target.value)}
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </div>
          <div>
            <label className={labelClass}>Contact Email</label>
            <input
              type="email"
              value={general.contactEmail}
              onChange={(e) => handleGeneralChange("contactEmail", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Contact Phone</label>
            <input
              type="text"
              value={general.contactPhone}
              onChange={(e) => handleGeneralChange("contactPhone", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Max Fine per Day (₹)</label>
            <input
              type="number"
              value={general.maxFinePerDay}
              onChange={(e) => handleGeneralChange("maxFinePerDay", parseInt(e.target.value) || 0)}
              className={inputClass}
              min={0}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleSave("General")}
            disabled={isSaving === "General"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving === "General" ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Borrowing Rules */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">Borrowing Rules</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 font-medium text-gray-700">Member Type</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700">Max Books</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700">Max Duration (days)</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700">Renewals</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700">Validity (months)</th>
                <th className="text-left py-3 px-3 font-medium text-gray-700">Auto-renew</th>
              </tr>
            </thead>
            <tbody>
              {memberRules.map((rule) => (
                <tr key={rule.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-3 font-medium text-gray-800">{rule.type}</td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={rule.maxBooks}
                      onChange={(e) => handleRuleChange(rule.id, "maxBooks", parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      min={1}
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={rule.maxDuration}
                      onChange={(e) => handleRuleChange(rule.id, "maxDuration", parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      min={1}
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={rule.renewals}
                      onChange={(e) => handleRuleChange(rule.id, "renewals", parseInt(e.target.value) || 0)}
                      className="w-14 px-2 py-1 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      min={0}
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={rule.validity}
                      onChange={(e) => handleRuleChange(rule.id, "validity", parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                      min={1}
                    />
                  </td>
                  <td className="py-3 px-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.autoRenew}
                        onChange={(e) => handleRuleChange(rule.id, "autoRenew", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-navy" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleSave("Borrowing Rules")}
            disabled={isSaving === "Borrowing Rules"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving === "Borrowing Rules" ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">Notification Settings</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: "dueReminder", label: "Due Reminder", description: "Send reminder 24 hours before due date" },
            { key: "overdueAlert", label: "Overdue Alert", description: "Send alert when book is overdue" },
            { key: "reservationReady", label: "Reservation Ready", description: "Notify when reserved book is available" },
            { key: "reservationExpiring", label: "Reservation Expiring", description: "Remind when reservation is about to expire" },
            { key: "membershipExpiry", label: "Membership Expiry", description: "Notify before membership expires" },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={(e) => setNotifications((prev) => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-navy" />
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleSave("Notification")}
            disabled={isSaving === "Notification"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving === "Notification" ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900">Security</h3>
        </div>
        <div className="space-y-5">
          <div className="max-w-xs">
            <label className={labelClass}>Session Timeout</label>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
              className={inputClass}
            >
              {sessionTimeoutOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setConfirmOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Force Sign Out All Users
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleSave("Security")}
            disabled={isSaving === "Security"}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving === "Security" ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleForceSignOut}
        title="Force Sign Out All Users"
        message="This will immediately sign out all users from the system. They will need to log in again. Are you sure you want to proceed?"
        confirmLabel="Sign Out All"
        variant="danger"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Modal } from "@/components/shared/modal";
import { toast } from "sonner";
import {
  UserPlus,
  Shield,
  UserCog,
  Ban,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Edit,
  UserX,
} from "lucide-react";

type UserRole = "super_admin" | "library_manager" | "librarian";
type UserStatus = "active" | "suspended";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
}

const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin",
  library_manager: "Library Manager",
  librarian: "Librarian",
};

const roleColors: Record<UserRole, string> = {
  super_admin: "bg-purple-50 text-purple-700",
  library_manager: "bg-blue-50 text-blue-700",
  librarian: "bg-green-50 text-green-700",
};

const initialUsers: User[] = [
  { id: "1", name: "Dr. Ajay Deshmukh", email: "ajay.deshmukh@barti.gov.in", role: "super_admin", status: "active", lastActive: "2026-06-14 09:30 AM" },
  { id: "2", name: "Priya Sharma", email: "priya.sharma@barti.gov.in", role: "library_manager", status: "active", lastActive: "2026-06-14 08:45 AM" },
  { id: "3", name: "Rohan Joshi", email: "rohan.joshi@barti.gov.in", role: "librarian", status: "active", lastActive: "2026-06-13 05:15 PM" },
  { id: "4", name: "Sneha Patil", email: "sneha.patil@barti.gov.in", role: "librarian", status: "active", lastActive: "2026-06-13 04:30 PM" },
  { id: "5", name: "Vikram Singh", email: "vikram.singh@barti.gov.in", role: "library_manager", status: "active", lastActive: "2026-06-12 11:00 AM" },
  { id: "6", name: "Anita Kale", email: "anita.kale@barti.gov.in", role: "librarian", status: "suspended", lastActive: "2026-06-10 02:20 PM" },
  { id: "7", name: "Suresh Iyer", email: "suresh.iyer@barti.gov.in", role: "librarian", status: "active", lastActive: "2026-06-14 10:00 AM" },
  { id: "8", name: "Meera Nair", email: "meera.nair@barti.gov.in", role: "library_manager", status: "active", lastActive: "2026-06-13 03:45 PM" },
  { id: "9", name: "Rajesh Kulkarni", email: "rajesh.kulkarni@barti.gov.in", role: "librarian", status: "active", lastActive: "2026-06-11 01:10 PM" },
  { id: "10", name: "Divya Mishra", email: "divya.mishra@barti.gov.in", role: "librarian", status: "suspended", lastActive: "2026-06-08 10:30 AM" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "librarian" as UserRole });
  const [editRole, setEditRole] = useState<UserRole>("librarian");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.name.trim() || !inviteForm.email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newUser: User = {
      id: String(Date.now()),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: "active",
      lastActive: "Just now",
    };
    setUsers((prev) => [newUser, ...prev]);
    setInviteModalOpen(false);
    setInviteForm({ name: "", email: "", role: "librarian" });
    toast.success(`Invitation sent to ${inviteForm.email}`);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleSaveEdit = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, role: editRole } : u))
    );
    setEditModalOpen(false);
    setSelectedUser(null);
    toast.success("User role updated successfully");
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === "active" ? "suspended" as const : "active" as const;
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
    );
    setActionMenuOpen(null);
    toast.success(newStatus === "suspended" ? "User suspended" : "User reactivated");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage library staff accounts and permissions"
        actions={
          <button
            onClick={() => setInviteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Invite User
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Role</th>
                <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3.5 px-4 font-semibold text-gray-700">Last Active</th>
                <th className="text-right py-3.5 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-navy" />
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                      <UserCog className="w-3 h-3" />
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                      user.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                      {user.status === "active" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Ban className="w-3 h-3" />
                      )}
                      {user.status === "active" ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {user.lastActive}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right relative">
                    <button
                      onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                    {actionMenuOpen === user.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActionMenuOpen(null)} />
                        <div className="absolute right-4 top-12 z-20 w-44 bg-white rounded-xl border border-gray-200 shadow-lg py-1">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit User
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {user.status === "active" ? (
                              <>
                                <UserX className="w-4 h-4 text-red-500" />
                                <span className="text-red-600">Suspend</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-green-600">Reactivate</span>
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} title="Invite User">
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={inviteForm.name}
              onChange={(e) => setInviteForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={inviteForm.email}
              onChange={(e) => setInviteForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="email@barti.gov.in"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
            <select
              value={inviteForm.role}
              onChange={(e) => setInviteForm((f) => ({ ...f, role: e.target.value as UserRole }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            >
              <option value="super_admin">Super Admin</option>
              <option value="library_manager">Library Manager</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setInviteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors inline-flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Send Invitation
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); setSelectedUser(null); }} title="Edit User">
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-navy/5 flex items-center justify-center">
                <Shield className="w-6 h-6 text-navy" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              >
                <option value="super_admin">Super Admin</option>
                <option value="library_manager">Library Manager</option>
                <option value="librarian">Librarian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                selectedUser.status === "active"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}>
                {selectedUser.status === "active" ? "Active" : "Suspended"}
              </span>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setEditModalOpen(false); setSelectedUser(null); }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

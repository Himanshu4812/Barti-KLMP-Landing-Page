"use client";

import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Edit,
  Plus,
  QrCode,
  ShieldOff,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { Modal } from "@/components/shared/modal";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { MemberForm, type MemberFormData } from "./_components/member-form";
import { MemberDetail } from "./_components/member-detail";
import { cn } from "@/lib/utils";

interface BorrowRecord {
  id: string;
  book_title: string;
  isbn: string;
  issue_date: string;
  due_date: string;
  return_date: string | null;
  status: "active" | "returned" | "overdue" | "lost";
}

interface MemberRecord {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  phone: string;
  member_type: string;
  status: "active" | "suspended" | "expired" | "inactive";
  address: string;
  id_type: string;
  id_number: string;
  registered_at: string;
  expires_at: string;
  notes: string;
  borrowing_history: BorrowRecord[];
}

const statusColors: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  suspended: "bg-amber-50 text-amber-700 border-amber-200",
  expired: "bg-red-50 text-red-700 border-red-200",
  inactive: "bg-gray-50 text-gray-700 border-gray-200",
};

const MOCK_MEMBERS: MemberRecord[] = [
  { id: "M001", member_id: "MBR-00001", full_name: "Amit Sharma", email: "amit.sharma@email.com", phone: "+91 98765 43210", member_type: "Student", status: "active", address: "42, Sadashiv Peth, Pune - 411030", id_type: "Aadhar", id_number: "1234-5678-9012", registered_at: "2024-01-15", expires_at: "2025-01-14", notes: "", borrowing_history: [{ id: "BR001", book_title: "Annihilation of Caste", isbn: "978-81-234-5678-9", issue_date: "2024-11-01", due_date: "2024-11-15", return_date: "2024-11-14", status: "returned" }, { id: "BR002", book_title: "The Constitution of India", isbn: "978-81-234-5679-6", issue_date: "2024-12-01", due_date: "2024-12-15", return_date: null, status: "active" }] },
  { id: "M002", member_id: "MBR-00002", full_name: "Dr. Priya Deshmukh", email: "priya.d@email.com", phone: "+91 98765 43211", member_type: "Researcher", status: "active", address: "15, Model Colony, Shivajinagar, Pune - 411016", id_type: "PAN", id_number: "ABCDE1234F", registered_at: "2024-02-20", expires_at: "2025-02-19", notes: "PhD scholar", borrowing_history: [] },
  { id: "M003", member_id: "MBR-00003", full_name: "Rajesh Patil", email: "rajesh.patil@email.com", phone: "+91 98765 43212", member_type: "Government Officer", status: "active", address: "8, Civil Lines, Mumbai - 400001", id_type: "Aadhar", id_number: "2345-6789-0123", registered_at: "2024-03-05", expires_at: "2025-03-04", notes: "IAS officer", borrowing_history: [{ id: "BR003", book_title: "Public Policy in India", isbn: "978-81-234-5687-1", issue_date: "2024-10-15", due_date: "2024-10-29", return_date: "2024-10-28", status: "returned" }] },
  { id: "M004", member_id: "MBR-00004", full_name: "Sunita Kale", email: "sunita.k@email.com", phone: "+91 98765 43213", member_type: "Scholar", status: "suspended", address: "22, Bhandarkar Road, Pune - 411004", id_type: "College ID", id_number: "CLG-2024-045", registered_at: "2024-01-10", expires_at: "2025-01-09", notes: "Suspended for overdue", borrowing_history: [{ id: "BR004", book_title: "Buddha and His Dhamma", isbn: "978-81-234-5681-9", issue_date: "2024-08-01", due_date: "2024-08-15", return_date: null, status: "overdue" }] },
  { id: "M005", member_id: "MBR-00005", full_name: "Vijay More", email: "vijay.more@email.com", phone: "+91 98765 43214", member_type: "Public Member", status: "active", address: "55, MG Road, Nagpur - 440001", id_type: "Driver License", id_number: "MH-12-2024-12345", registered_at: "2024-04-12", expires_at: "2025-04-11", notes: "", borrowing_history: [] },
  { id: "M006", member_id: "MBR-00006", full_name: "Prof. Meena Joshi", email: "meena.joshi@email.com", phone: "+91 98765 43215", member_type: "Scholar", status: "active", address: "3, University Road, Aurangabad - 431001", id_type: "Aadhar", id_number: "3456-7890-1234", registered_at: "2024-05-01", expires_at: "2025-04-30", notes: "Professor of Sociology", borrowing_history: [{ id: "BR005", book_title: "Caste in Modern India", isbn: "978-81-234-5695-6", issue_date: "2024-11-10", due_date: "2024-11-24", return_date: "2024-11-22", status: "returned" }, { id: "BR006", book_title: "Social Justice in India", isbn: "978-81-234-5684-0", issue_date: "2024-12-05", due_date: "2024-12-19", return_date: null, status: "active" }] },
  { id: "M007", member_id: "MBR-00007", full_name: "Suresh Gaikwad", email: "suresh.g@email.com", phone: "+91 98765 43216", member_type: "Student", status: "expired", address: "77, Kasba Peth, Pune - 411011", id_type: "College ID", id_number: "CLG-2023-112", registered_at: "2022-06-15", expires_at: "2023-06-14", notes: "Membership expired", borrowing_history: [] },
  { id: "M008", member_id: "MBR-00008", full_name: "Dr. Anil Pawar", email: "anil.pawar@email.com", phone: "+91 98765 43217", member_type: "Researcher", status: "active", address: "44, Shaniwar Peth, Kolhapur - 416002", id_type: "PAN", id_number: "FGHIJ5678K", registered_at: "2024-07-20", expires_at: "2025-07-19", notes: "", borrowing_history: [{ id: "BR007", book_title: "Research Methods in Social Sciences", isbn: "978-81-234-5691-8", issue_date: "2024-12-01", due_date: "2024-12-29", return_date: null, status: "active" }] },
  { id: "M009", member_id: "MBR-00009", full_name: "Kavita Salunkhe", email: "kavita.s@email.com", phone: "+91 98765 43218", member_type: "Public Member", status: "active", address: "12, Laxmi Road, Nashik - 422001", id_type: "Aadhar", id_number: "4567-8901-2345", registered_at: "2024-08-10", expires_at: "2025-08-09", notes: "", borrowing_history: [] },
  { id: "M010", member_id: "MBR-00010", full_name: "Adv. Rohan Kulkarni", email: "rohan.k@email.com", phone: "+91 98765 43219", member_type: "Government Officer", status: "active", address: "90, FC Road, Pune - 411005", id_type: "Aadhar", id_number: "5678-9012-3456", registered_at: "2024-09-01", expires_at: "2025-08-31", notes: "Public Prosecutor", borrowing_history: [{ id: "BR008", book_title: "Law and Social Transformation", isbn: "978-81-234-5689-5", issue_date: "2024-11-20", due_date: "2024-12-04", return_date: "2024-12-02", status: "returned" }] },
  { id: "M011", member_id: "MBR-00011", full_name: "Dr. Sharda Kamble", email: "sharda.k@email.com", phone: "+91 98765 43220", member_type: "Researcher", status: "active", address: "33, Tilak Road, Solapur - 413001", id_type: "PAN", id_number: "KLMNO9012P", registered_at: "2024-10-05", expires_at: "2025-10-04", notes: "Post-doctoral researcher", borrowing_history: [] },
  { id: "M012", member_id: "MBR-00012", full_name: "Mangesh Khandare", email: "mangesh.kh@email.com", phone: "+91 98765 43221", member_type: "Student", status: "inactive", address: "19, Gautam Nagar, Nashik - 422005", id_type: "College ID", id_number: "CLG-2024-231", registered_at: "2024-03-01", expires_at: "2025-02-28", notes: "Inactive - never borrowed", borrowing_history: [] },
  { id: "M013", member_id: "MBR-00013", full_name: "Nirmala Bansode", email: "nirmala.b@email.com", phone: "+91 98765 43222", member_type: "Public Member", status: "active", address: "5, Shahu Nagar, Mumbai - 400017", id_type: "Aadhar", id_number: "6789-0123-4567", registered_at: "2024-11-12", expires_at: "2025-11-11", notes: "", borrowing_history: [{ id: "BR009", book_title: "Maharashtrachi Samajik Jagruti", isbn: "978-81-234-5682-6", issue_date: "2024-12-02", due_date: "2024-12-16", return_date: null, status: "active" }] },
  { id: "M014", member_id: "MBR-00014", full_name: "Prof. Dattatray Kamble", email: "dt.kamble@email.com", phone: "+91 98765 43223", member_type: "Scholar", status: "active", address: "101, Gokhale Nagar, Pune - 411016", id_type: "PAN", id_number: "QRSTU3456V", registered_at: "2024-11-20", expires_at: "2025-11-19", notes: "Dept of Political Science", borrowing_history: [{ id: "BR010", book_title: "The Indian Constitution", isbn: "978-81-234-5685-7", issue_date: "2024-12-10", due_date: "2024-12-24", return_date: null, status: "active" }] },
  { id: "M015", member_id: "MBR-00015", full_name: "Shailaja Raut", email: "shailaja.r@email.com", phone: "+91 98765 43224", member_type: "Student", status: "active", address: "66, Shukrawar Peth, Pune - 411002", id_type: "College ID", id_number: "CLG-2024-312", registered_at: "2024-12-01", expires_at: "2025-11-30", notes: "", borrowing_history: [] },
  { id: "M016", member_id: "MBR-00016", full_name: "Dr. Sanjay Khare", email: "sanjay.khare@email.com", phone: "+91 98765 43225", member_type: "Government Officer", status: "suspended", address: "7, Civil Lines, Nagpur - 440001", id_type: "Aadhar", id_number: "7890-1234-5678", registered_at: "2024-04-01", expires_at: "2025-03-31", notes: "Suspended for lost book", borrowing_history: [{ id: "BR011", book_title: "Who Were the Shudras?", isbn: "978-81-234-5680-2", issue_date: "2024-07-01", due_date: "2024-07-15", return_date: null, status: "lost" }] },
  { id: "M017", member_id: "MBR-00017", full_name: "Asha Jagtap", email: "asha.j@email.com", phone: "+91 98765 43226", member_type: "Public Member", status: "active", address: "88, Budhwar Peth, Pune - 411002", id_type: "Driver License", id_number: "MH-14-2024-67890", registered_at: "2024-05-15", expires_at: "2025-05-14", notes: "", borrowing_history: [] },
  { id: "M018", member_id: "MBR-00018", full_name: "Dr. Prakash Shinde", email: "prakash.shinde@email.com", phone: "+91 98765 43227", member_type: "Researcher", status: "active", address: "29, Tilakwadi, Belgaum - 590006", id_type: "PAN", id_number: "VWXYZ7890A", registered_at: "2024-06-20", expires_at: "2025-06-19", notes: "Historical research", borrowing_history: [{ id: "BR012", book_title: "Samata Sainik Dal", isbn: "978-81-234-5686-4", issue_date: "2024-12-08", due_date: "2024-12-22", return_date: null, status: "active" }] },
  { id: "M019", member_id: "MBR-00019", full_name: "Rekha Landge", email: "rekha.l@email.com", phone: "+91 98765 43228", member_type: "Student", status: "active", address: "14, Navi Peth, Solapur - 413001", id_type: "College ID", id_number: "CLG-2024-415", registered_at: "2024-08-01", expires_at: "2025-07-31", notes: "", borrowing_history: [] },
  { id: "M020", member_id: "MBR-00020", full_name: "Dr. Balasaheb Mane", email: "bs.mane@email.com", phone: "+91 98765 43229", member_type: "Scholar", status: "expired", address: "50, Mahatma Phule Nagar, Satara - 415001", id_type: "Aadhar", id_number: "8901-2345-6789", registered_at: "2023-01-01", expires_at: "2024-12-31", notes: "Membership expired, needs renewal", borrowing_history: [{ id: "BR013", book_title: "Towards an Inclusive Society", isbn: "978-81-234-5697-0", issue_date: "2024-09-01", due_date: "2024-09-15", return_date: "2024-09-14", status: "returned" }] },
];

const MEMBER_TYPES = [
  "All",
  "Student",
  "Researcher",
  "Scholar",
  "Government Officer",
  "Public Member",
] as const;

const MEMBER_STATUSES = ["All", "active", "suspended", "expired", "inactive"] as const;

const columnHelper = createColumnHelper<MemberRecord>();

export default function MembersPage() {
  const [data, setData] = useState<MemberRecord[]>(MOCK_MEMBERS);
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberRecord | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<MemberRecord | null>(null);
  const [viewingMember, setViewingMember] = useState<MemberRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((member) => {
      if (typeFilter !== "All" && member.member_type !== typeFilter) return false;
      if (statusFilter !== "All" && member.status !== statusFilter) return false;
      return true;
    });
  }, [data, typeFilter, statusFilter]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("member_id", {
        header: "Member ID",
        cell: (info) => (
          <span className="font-mono text-xs text-gray-500">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("full_name", {
        header: "Name",
        cell: (info) => (
          <div>
            <p className="text-sm font-medium text-gray-900">{info.getValue()}</p>
            <p className="text-xs text-gray-500">{info.row.original.email}</p>
          </div>
        ),
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => <span className="text-sm text-gray-700">{info.getValue()}</span>,
      }),
      columnHelper.accessor("member_type", {
        header: "Member Type",
        cell: (info) => (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-teal/5 text-teal">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border",
                statusColors[status]
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "qr",
        header: "QR",
        cell: (info) => (
          <button
            onClick={() => setViewingMember(info.row.original)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-teal hover:bg-teal/5 transition-colors"
            title="View QR Card"
          >
            <QrCode className="w-4 h-4" />
          </button>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const member = info.row.original;
          const isSuspended = member.status === "suspended";
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingMember(member)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-navy/5 transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSuspendTarget(member)}
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  isSuspended
                    ? "text-green-500 hover:text-green-600 hover:bg-green-50"
                    : "text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                )}
                title={isSuspended ? "Reactivate" : "Suspend"}
              >
                {isSuspended ? <ShieldCheck className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
              </button>
            </div>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const handleAddMember = async (formData: MemberFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const nextNum = data.length + 1;
    const newMember: MemberRecord = {
      id: `M${String(nextNum).padStart(3, "0")}`,
      member_id: `MBR-${String(nextNum).padStart(5, "0")}`,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      member_type: formData.member_type,
      status: "active",
      address: formData.address,
      id_type: formData.id_type,
      id_number: formData.id_number,
      registered_at: new Date().toISOString().split("T")[0],
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      notes: formData.notes,
      borrowing_history: [],
    };
    setData((prev) => [newMember, ...prev]);
    setIsSubmitting(false);
    setIsAddModalOpen(false);
    toast.success("Member added successfully");
  };

  const handleEditMember = async (formData: MemberFormData) => {
    if (!editingMember) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setData((prev) =>
      prev.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              full_name: formData.full_name,
              email: formData.email,
              phone: formData.phone,
              member_type: formData.member_type,
              address: formData.address,
              id_type: formData.id_type,
              id_number: formData.id_number,
              notes: formData.notes,
            }
          : m
      )
    );
    setIsSubmitting(false);
    setEditingMember(null);
    toast.success("Member updated successfully");
  };

  const handleToggleSuspend = async () => {
    if (!suspendTarget) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const newStatus = suspendTarget.status === "suspended" ? "active" : "suspended";
    setData((prev) =>
      prev.map((m) =>
        m.id === suspendTarget.id ? { ...m, status: newStatus } : m
      )
    );
    setIsSubmitting(false);
    setSuspendTarget(null);
    toast.success(newStatus === "active" ? "Member reactivated" : "Member suspended");
  };

  const getEditFormData = (member: MemberRecord): MemberFormData => ({
    full_name: member.full_name,
    email: member.email,
    phone: member.phone,
    member_type: member.member_type,
    address: member.address,
    id_type: member.id_type,
    id_number: member.id_number,
    notes: member.notes,
  });

  if (isError) {
    return (
      <div>
        <PageHeader title="Member Management" />
        <ErrorState onRetry={() => setIsError(false)} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Member Management"
        description="Manage library members and their accounts"
        actions={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        }
      />

      <div className="bg-card-bg rounded-xl border border-border-light shadow-sm">
        <div className="p-4 border-b border-border-light space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <SearchInput
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder="Search name, email, phone, ID..."
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            >
              {MEMBER_TYPES.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            >
              {MEMBER_STATUSES.map((s) => (
                <option key={s} value={s}>{s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} cols={7} />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No members found"
              description={globalFilter || typeFilter !== "All" || statusFilter !== "All" ? "Try adjusting your search or filters." : "Get started by adding your first member."}
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-border-light bg-gray-50/50">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-primary select-none"
                        >
                          <div className="flex items-center gap-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              {
                                asc: <ChevronUp className="w-3 h-3" />,
                                desc: <ChevronDown className="w-3 h-3" />,
                              }[header.column.getIsSorted() as string] ?? <ChevronsUpDown className="w-3 h-3" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border-light hover:bg-gray-50/50 transition-colors cursor-pointer"
                      onClick={() => setViewingMember(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border-light">
              <span className="text-sm text-text-muted">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                {" - "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  filteredData.length
                )}{" "}
                of {filteredData.length} members
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-text-muted px-2">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Member"
        size="lg"
      >
        <MemberForm onSubmit={handleAddMember} onCancel={() => setIsAddModalOpen(false)} isLoading={isSubmitting} />
      </Modal>

      <Modal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        title="Edit Member"
        size="lg"
      >
        {editingMember && (
          <MemberForm
            initialData={getEditFormData(editingMember)}
            onSubmit={handleEditMember}
            onCancel={() => setEditingMember(null)}
            isLoading={isSubmitting}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!suspendTarget}
        onClose={() => setSuspendTarget(null)}
        onConfirm={handleToggleSuspend}
        title={suspendTarget?.status === "suspended" ? "Reactivate Member" : "Suspend Member"}
        message={
          suspendTarget?.status === "suspended"
            ? `Are you sure you want to reactivate "${suspendTarget?.full_name}"?`
            : `Are you sure you want to suspend "${suspendTarget?.full_name}"? They will not be able to borrow books until reactivated.`
        }
        confirmLabel={suspendTarget?.status === "suspended" ? "Reactivate" : "Suspend"}
        isLoading={isSubmitting}
        variant="warning"
      />

      {viewingMember && (
        <MemberDetail
          member={{
            id: viewingMember.id,
            member_id: viewingMember.member_id,
            full_name: viewingMember.full_name,
            email: viewingMember.email,
            phone: viewingMember.phone,
            member_type: viewingMember.member_type,
            status: viewingMember.status,
            address: viewingMember.address,
            id_type: viewingMember.id_type,
            id_number: viewingMember.id_number,
            registered_at: viewingMember.registered_at,
            expires_at: viewingMember.expires_at,
            notes: viewingMember.notes,
            borrowing_history: viewingMember.borrowing_history,
          }}
          onClose={() => setViewingMember(null)}
        />
      )}
    </div>
  );
}

import { BooksKpiGrid } from "./(dashboard-components)/kpi-grid";
import { BorrowingTrendsChart } from "./(dashboard-components)/borrowing-trends";
import { CategoryChart } from "./(dashboard-components)/category-chart";
import { RecentActivity } from "./(dashboard-components)/recent-activity";
import { QuickActions } from "./(dashboard-components)/quick-actions";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of library operations and key metrics
        </p>
      </div>

      <BooksKpiGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BorrowingTrendsChart />
        <CategoryChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}

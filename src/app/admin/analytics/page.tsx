import { requireAdmin } from "@/lib/admin-auth";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";

async function getAnalyticsData() {
  // Mock data for now as we don't have historical tracking yet
  // In a real app, we would query ActivityLog or a dedicated analytics table
  
  const dailyActiveUsers = [
    { date: '2023-12-01', users: 120 },
    { date: '2023-12-02', users: 132 },
    { date: '2023-12-03', users: 101 },
    { date: '2023-12-04', users: 134 },
    { date: '2023-12-05', users: 190 },
    { date: '2023-12-06', users: 230 },
    { date: '2023-12-07', users: 210 },
  ];

  const completionRates = [
    { stage: 'Foundation', rate: 85 },
    { stage: 'Modern Web', rate: 65 },
    { stage: 'Professional', rate: 45 },
    { stage: 'Expert', rate: 30 },
  ];

  return { dailyActiveUsers, completionRates };
}

export default async function AnalyticsPage() {
  await requireAdmin();
  const data = await getAnalyticsData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500">Insights into user behavior and content performance.</p>
      </div>

      <AnalyticsCharts data={data} />
    </div>
  );
}

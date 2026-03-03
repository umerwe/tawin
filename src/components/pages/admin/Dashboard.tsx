import StatsCard from "@/components/card/StatsCard";
import { statsData } from "@/constants/dashboard";
import AlertBanner from "../../Banner";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <AlertBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            {...stat}
          />
        ))}
      </div>

        <WeeklyReportChart />
    </div>
  );
};

export default Dashboard;
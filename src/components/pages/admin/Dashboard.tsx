import StatsCard from "@/components/card/StatsCard";
import { statsData } from "@/constants/dashboard";
import AlertBanner from "../../Banner";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import SalesByRegion from "@/components/charts/SalesByRegion";
import TopCategories from "./TopCategories";
import FinancialTransfers from "./FinancialTransfers";
import AddNewProduct from "./AddNewProduct";
import TopSellingProducts from "./TopSellingProducts";

const tableStats = [
  { label: "Users", value: "52k", active: true },
  { label: "Total Products", value: "3.5k" },
  { label: "Available Products", value: "2.5k" },
  { label: "Out of Stock", value: "0.5k" },
  { label: "Revenue", value: "250k" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <AlertBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Grid for Chart and Regional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyReportChart
            data={tableStats}
          />
        </div>
        <div className="lg:col-span-1">
          <SalesByRegion />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <TopCategories />
        </div>
        <div className="lg:col-span-2">
          <FinancialTransfers />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AddNewProduct />
        </div>
        <div className="lg:col-span-2">
          <TopSellingProducts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
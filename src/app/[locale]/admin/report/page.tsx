"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetAdminReport } from "@/hooks/useContact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Pagination } from "@/components/Pagination";

export default function AdminReportPage() {
  const t = useTranslations("translation");
  const { data, isLoading, error } = useGetAdminReport();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const params = useParams();
  const locale = params.locale as string;

  // Use only API data
  const reportData = data?.data || [];

  const filteredReports = reportData.filter((report: any) => {
    const messageKey = `message[${locale}]`;
    return report[messageKey];
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-aqua" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-600">{t("noDataFound")}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8 text-aqua" />
        <h1 className="text-3xl font-bold text-gray-900">{t("reports")}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedReports?.map((report: any, index: number) => (
          <Card key={startIndex + index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-aqua" />
                {t("report")} #{startIndex + index + 1}
              </CardTitle>
              <p className="text-sm text-gray-600">by {report.username}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-800" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                  {report[`message[${locale}]`]}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!filteredReports?.length && (
        <Card>
          <CardContent className="pt-6 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">{t("noReportsAvailable")}</p>
          </CardContent>
        </Card>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination
          pagination={{
            total: filteredReports.length,
            page: currentPage,
            limit: itemsPerPage
          }}
          changePage={setCurrentPage}
        />
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCompanyBranding } from "@/lib/company-config";
import { generateMockStats, AdminStats } from "@/lib/mock-admin-data";
import StatsCard from "@/components/admin/StatsCard";
import QRCodeCard from "@/components/admin/QRCodeCard";

export default function AdminDashboard() {
  const params = useParams();
  const company = params.company as string;
  const branding = getCompanyBranding(company);

  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    // Generate mock stats for demo
    const mockStats = generateMockStats(company);
    setStats(mockStats);
  }, [company]);

  if (!stats) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard...</div>
      </main>
    );
  }

  const totalRiskDrivers =
    stats.riskDistribution.low +
    stats.riskDistribution.medium +
    stats.riskDistribution.high;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="py-6 px-6"
        style={{ backgroundColor: branding.color }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{branding.name}</h1>
            <p className="text-white/80 text-sm">WinterReady Admin Dashboard</p>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
            Demo Mode
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* QR Code Section */}
        <div className="mb-8">
          <QRCodeCard companySlug={company} companyName={branding.name} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Visitors Prepared"
            value={stats.totalDrivers}
            subtitle="This winter season"
            color="blue"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            subtitle="Course completion"
            color="green"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="First-Time Winter Visitors"
            value={stats.riskDistribution.high}
            subtitle={`${Math.round((stats.riskDistribution.high / totalRiskDrivers) * 100)}% of total`}
            color="orange"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <StatsCard
            title="Safety Record"
            value="0"
            subtitle="Incidents this season"
            color="green"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Visitor Experience Level
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Experienced</span>
                  <span className="font-medium text-safe-green">
                    {stats.riskDistribution.low} visitors (
                    {Math.round(
                      (stats.riskDistribution.low / totalRiskDrivers) * 100
                    )}
                    %)
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-safe-green rounded-full"
                    style={{
                      width: `${(stats.riskDistribution.low / totalRiskDrivers) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Some Experience</span>
                  <span className="font-medium text-warning-orange">
                    {stats.riskDistribution.medium} visitors (
                    {Math.round(
                      (stats.riskDistribution.medium / totalRiskDrivers) * 100
                    )}
                    %)
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning-orange rounded-full"
                    style={{
                      width: `${(stats.riskDistribution.medium / totalRiskDrivers) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">First-Time Winter</span>
                  <span className="font-medium text-danger-red">
                    {stats.riskDistribution.high} visitors (
                    {Math.round(
                      (stats.riskDistribution.high / totalRiskDrivers) * 100
                    )}
                    %)
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-danger-red rounded-full"
                    style={{
                      width: `${(stats.riskDistribution.high / totalRiskDrivers) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Countries */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Visitors by Country
            </h2>
            <div className="space-y-3">
              {stats.topCountries.map((country, index) => (
                <div key={country.country} className="flex items-center gap-3">
                  <span className="text-gray-400 font-medium w-6">
                    {index + 1}.
                  </span>
                  <span className="flex-1 text-gray-700">{country.country}</span>
                  <span className="font-semibold text-winter-blue">
                    {country.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Language Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Course Language Used
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {stats.languageStats.map((lang) => (
              <div
                key={lang.language}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <div className="text-2xl font-bold text-winter-blue">
                  {lang.count}
                </div>
                <div className="text-sm text-gray-600 mt-1">{lang.language}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Module Completion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.moduleStats.map((module) => (
              <div
                key={module.module}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-700 text-sm">{module.module}</span>
                <span className="font-semibold text-winter-blue">
                  {module.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Completions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Completions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Country
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Experience
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Modules
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentDrivers.slice(0, 5).map((driver) => (
                  <tr key={driver.id} className="border-b border-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(driver.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {driver.homeCountry.charAt(0).toUpperCase() +
                        driver.homeCountry.slice(1).replace("_", " ")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          driver.riskLevel === "low"
                            ? "bg-safe-green/10 text-safe-green"
                            : driver.riskLevel === "medium"
                            ? "bg-warning-orange/10 text-warning-orange"
                            : "bg-danger-red/10 text-danger-red"
                        }`}
                      >
                        {driver.riskLevel === "low" ? "EXPERIENCED" : driver.riskLevel === "medium" ? "SOME EXP." : "FIRST-TIME"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {driver.completedModules.length} modules
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          driver.courseCompleted
                            ? "bg-safe-green/10 text-safe-green"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {driver.courseCompleted ? "Completed" : "In Progress"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            Demo data for demonstration purposes. In production, data would be
            stored in a database.
          </p>
        </div>
      </div>
    </main>
  );
}

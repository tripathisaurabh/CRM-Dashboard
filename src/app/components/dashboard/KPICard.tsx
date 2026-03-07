import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconColor?: string;
  dataPlaceholder?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = "bg-blue-100 text-blue-600",
  dataPlaceholder = "{{metricValue}}",
}: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`p-2 sm:p-3 rounded-lg ${iconColor}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="whitespace-nowrap">{Math.abs(change)}%</span>
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 truncate" data-placeholder={dataPlaceholder}>
            {value}
          </p>
          <p className="text-xs text-gray-500 mt-2 truncate">{changeLabel}</p>
        </div>
      </CardContent>
    </Card>
  );
}
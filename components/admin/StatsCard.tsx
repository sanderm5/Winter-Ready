interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "orange" | "red";
}

const colorClasses = {
  blue: "bg-winter-blue/10 text-winter-blue",
  green: "bg-safe-green/10 text-safe-green",
  orange: "bg-warning-orange/10 text-warning-orange",
  red: "bg-danger-red/10 text-danger-red",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>{icon}</div>
      </div>
    </div>
  );
}

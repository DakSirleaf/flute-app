"use client";

interface SportsCardProps {
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "live" | "upcoming" | "finished";
  time?: string;
}

export default function SportsCard({
  league,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  time,
}: SportsCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "live":
        return "bg-red-500";
      case "upcoming":
        return "bg-blue-500";
      case "finished":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "live":
        return "LIVE";
      case "upcoming":
        return time || "Upcoming";
      case "finished":
        return "FT";
      default:
        return "";
    }
  };

  return (
    <div className="glass-card p-4 hover:scale-[1.02] transition-transform">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
          {league}
        </span>
        <span
          className={`${getStatusColor()} text-white text-xs font-bold px-2 py-1 rounded ${
            status === "live" ? "animate-pulse" : ""
          }`}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900 dark:text-white">
            {homeTeam}
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {homeScore}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900 dark:text-white">
            {awayTeam}
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {awayScore}
          </span>
        </div>
      </div>
    </div>
  );
}

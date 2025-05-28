import { calculateTrendPercentage, cn } from "lib/utils";

interface StatsCard {
  total: number;
  headerTitle: string;
  lastMonthCount: number;
  currentMonthCount: number;
}
const StatsCard = ({
  total,
  headerTitle,
  lastMonthCount,
  currentMonthCount,
}: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );
  const isDecriment = trend === "decrement";
  return (
    <div className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>
      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl">{total}</h2>

          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={`./assets/icons/${
                  isDecriment ? "arrow-down-red.svg" : "arrow-up-green.svg"
                }`}
                alt="log"
                className="size-5"
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isDecriment ? "text-red-500" : "text-green-700"
                )}
              >
                {Math.round(percentage)}%
              </span>{" "}
              <p className="text-sm font-medium text-gray-100 truncate">
                vs last month
              </p>
            </figure>
          </div>
        </div>
        <img
          src={`./assets/icons/${
            isDecriment ? "decrement.svg" : "increment.svg"
          }`}
          alt="ccc"
        />
      </div>
    </div>
  );
};

export default StatsCard;

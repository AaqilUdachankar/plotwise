import AreaCard from "./AreaCard";
import EmptyState from "./EmptyState";
import { MapPinOff } from "lucide-react";

export default function AreaRanking({ areas, onCompareToggle, comparingIds = [] }) {
  if (!areas?.length) {
    return <EmptyState icon={MapPinOff} title="No areas found" description="This city doesn't have area data yet." />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {areas.map((area, i) => (
        <AreaCard
          key={area._id}
          area={area}
          rank={i}
          onCompareToggle={onCompareToggle}
          isComparing={comparingIds.includes(area._id)}
        />
      ))}
    </div>
  );
}

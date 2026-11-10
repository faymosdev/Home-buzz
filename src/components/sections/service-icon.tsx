import {
  BroomOutlineIcon,
  Buildings2OutlineIcon,
  CalendarMarkOutlineIcon,
  KeyOutlineIcon,
  LeafOutlineIcon,
  ScissorsOutlineIcon,
  SunOutlineIcon,
  TrashBinMinimalisticOutlineIcon,
} from "@solar-icons/react";
import type { ServiceIcon as IconKey } from "@/config/services";

const map = {
  broom: BroomOutlineIcon,
  leaf: LeafOutlineIcon,
  scissors: ScissorsOutlineIcon,
  trash: TrashBinMinimalisticOutlineIcon,
  calendar: CalendarMarkOutlineIcon,
  key: KeyOutlineIcon,
  buildings: Buildings2OutlineIcon,
  sun: SunOutlineIcon,
} satisfies Record<IconKey, React.ComponentType<{ className?: string }>>;

export function ServiceIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} aria-hidden />;
}

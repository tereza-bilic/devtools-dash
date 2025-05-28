import { CategoryEnum } from "@devtools-dash/types/openapi";

export enum BadgeType {
  SILVER = 'silver',
  GOLD = 'gold',
  BRONZE = 'bronze',
}


export type Badge = {
  type: BadgeType;
  category: CategoryEnum;
}

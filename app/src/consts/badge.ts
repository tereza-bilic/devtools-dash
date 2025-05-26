import { CategoryEnum } from "src/types/openapi";

export enum BadgeType {
  SILVER = 'silver',
  GOLD = 'gold',
  BRONZE = 'bronze',
}


export type Badge = {
  type: BadgeType;
  category: CategoryEnum;
}

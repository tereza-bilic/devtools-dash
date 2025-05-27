import Console from "src/components/icons/Console";
import Elements from "src/components/icons/Elements";
import Network from "src/components/icons/Network";
import Sources from "src/components/icons/Sources";
import { CategoryEnum } from "src/types/openapi";

export const categories: CategoryEnum[] = ['Elements', 'Console', 'Network', 'Sources', 'Performance'];

export const categoryIconMap: Record<string, () => React.ReactNode> = {
  'Elements': Elements,
  'Console': Console,
  'Network': Network,
  'Sources': Sources,
};

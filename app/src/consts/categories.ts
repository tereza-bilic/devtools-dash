import Console from "@devtools-dash/components_temp/icons/Console";
import Elements from "@devtools-dash/components_temp/icons/Elements";
import Network from "@devtools-dash/components_temp/icons/Network";
import Sources from "@devtools-dash/components_temp/icons/Sources";
import { CategoryEnum } from "@devtools-dash/types/openapi";

export const categories: CategoryEnum[] = ['Elements', 'Console', 'Network', 'Sources', 'Performance'];

export const categoryIconMap: Record<string, () => React.ReactNode> = {
  'Elements': Elements,
  'Console': Console,
  'Network': Network,
  'Sources': Sources,
};

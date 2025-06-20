import Console from "@devtools-dash/components/icons/Console";
import Elements from "@devtools-dash/components/icons/Elements";
import Network from "@devtools-dash/components/icons/Network";
import Sources from "@devtools-dash/components/icons/Sources";
import Performance from "@devtools-dash/components/icons/Performance";
import { CategoryEnum } from "@devtools-dash/types/openapi";

export const categories: CategoryEnum[] = ['Elements', 'Console', 'Network', 'Sources', 'Performance'];

export const categoryIconMap: Record<string, (props: {className?: string, width?: string, height?: string}) => React.ReactNode> = {
  'Elements': Elements,
  'Console': Console,
  'Network': Network,
  'Sources': Sources,
  'Performance': Performance,
};

declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
  export type Icon = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >;

  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const ArrowUp: Icon;
  export const ArrowUpRight: Icon;
  export const BarChart3: Icon;
  export const Bell: Icon;
  export const Building2: Icon;
  export const Calendar: Icon;
  export const Check: Icon;
  export const ChevronDown: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const Clock: Icon;
  export const FileText: Icon;
  export const Layers3: Icon;
  export const LayoutDashboard: Icon;
  export const LogOut: Icon;
  export const Menu: Icon;
  export const MessageCircle: Icon;
  export const MessageSquare: Icon;
  export const MessageSquareHeart: Icon;
  export const Minus: Icon;
  export const Moon: Icon;
  export const PanelLeftClose: Icon;
  export const PanelLeftOpen: Icon;
  export const Plus: Icon;
  export const Rocket: Icon;
  export const Search: Icon;
  export const Settings: Icon;
  export const Sparkles: Icon;
  export const StickyNote: Icon;
  export const Sun: Icon;
  export const Target: Icon;
  export const Users: Icon;
  export const Workflow: Icon;
  export const X: Icon;
}

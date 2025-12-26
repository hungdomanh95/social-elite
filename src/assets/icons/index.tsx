import * as LucideIcons from "lucide-react";

type IconProps = {
  name: string
  color?: string
  size?: number
  style?: React.CSSProperties
  strokeWidth?: number;
};

const LucideIcon = ({
  name,
  size,
  color,
  strokeWidth = 1.6,
}: IconProps) => {
  const Cmp = (LucideIcons as any)[name];
  if (!Cmp) return null;
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} />;
};

const Icon: React.FC<IconProps> = (props) => {
  const { name, color = "#FFFFFF", size = 20, strokeWidth } = props
  return <LucideIcon name={name} size={size} color={color} strokeWidth={strokeWidth} />
}

export default Icon
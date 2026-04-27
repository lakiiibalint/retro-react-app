import { iconMap, IconName, IconSize } from '@/src/assets/iconCollection';

interface IconProps {
  name: IconName;
  color: string;
  size?: IconSize;
}

export const Icon = ({ name, color, size = IconSize.SM }: IconProps) => {
  const ResolvedIcon = iconMap[name];
  return <ResolvedIcon size={size} color={color} />;
};

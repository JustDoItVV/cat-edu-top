import { ForwardedRef, forwardRef, SVGProps } from 'react';

import { icons } from '../../const';
import { IconName } from '../../types';

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName;  
}

export const Icon = forwardRef(
  function Icon({
    icon,
    xmlns = "http://www.w3.org/2000/svg",
    fill = "none",
    viewBox = "0 0 24 24",
    strokeWidth = 1.5,
    stroke = "currentColor",
    className = "size-6",
    ...props
  }: IconProps, ref: ForwardedRef<SVGSVGElement>): React.JSX.Element {
    return (
      <svg xmlns={xmlns} fill={fill} viewBox={viewBox} strokeWidth={strokeWidth} stroke={stroke} className={className} ref={ref} {...props}>
        {icons[icon as string]}
      </svg>
    );
  }
);
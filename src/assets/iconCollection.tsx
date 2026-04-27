import { JSX } from 'react';

export enum IconName {
  THUMBS_UP = 'THUMBS_UP',
  THUMBS_DOWN = 'THUMBS_DOWN',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  ACTION = 'ACTION',
  BACK = 'BACK',
  DOWN = 'DOWN',
  UP = 'UP',
  DROPDOWN = 'DROPDOWN',
  MERGE = 'MERGE',
}

export enum IconSize {
  XS = '12',
  SM = '14',
  MD = '16',
  LG = '18',
}

interface SvgIconProps {
  size: string;
  color?: string;
}

export const ThumbsUpIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ThumbsDownIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EditIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DeleteIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ActionIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path
      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BackIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DownIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path
      d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UpIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path
      d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const DropDownIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path
      d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MergeIcon = ({ size, color = 'currentColor' }: SvgIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path
      d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const iconMap: Record<IconName, (props: SvgIconProps) => JSX.Element> = {
  [IconName.MERGE]: MergeIcon,
  [IconName.BACK]: BackIcon,
  [IconName.THUMBS_UP]: ThumbsUpIcon,
  [IconName.THUMBS_DOWN]: ThumbsDownIcon,
  [IconName.EDIT]: EditIcon,
  [IconName.DELETE]: DeleteIcon,
  [IconName.ACTION]: ActionIcon,
  [IconName.DOWN]: DownIcon,
  [IconName.UP]: UpIcon,
  [IconName.DROPDOWN]: DropDownIcon,
};

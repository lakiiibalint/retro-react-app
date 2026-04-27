import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';
export enum ButtonVariants {
  PRIMARY = 'rounded-xl bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700 cursor-pointer',
  GHOST = 'rounded-xl px-5 py-2 text-gray-500 transition hover:bg-gray-100 cursor-pointer',
}

export interface ButtonProps extends Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled' | 'type' | 'children' | 'className' | 'style' | 'disabled'
> {
  variant?: ButtonVariants;
}

export const Button = ({ children, variant, onClick, type, className, style, disabled }: ButtonProps) => {
  return (
    <button className={clsx(variant, className)} onClick={onClick} type={type} style={style} disabled={disabled}>
      {children}
    </button>
  );
};

import Link from 'next/link';
import {
  CSSProperties,
  ComponentProps,
  HTMLAttributeAnchorTarget
} from 'react';
import { VariantProps, tv } from 'tailwind-variants';

export type ButtonTheme =
  | 'primary'
  | 'primary-outline'
  | 'white-outline'
  | 'secondary'
  | 'light'
  | 'highlight'
  | 'danger'
  | 'danger-outline'
  | 'warning';

export type ButtonSize = 'normal' | 'small';

const variants: {
  theme: { [key in ButtonTheme]: string };
  size: { [key in ButtonSize]: string };
} = {
  theme: {
    primary: 'bg-primary text-white',
    'primary-outline': 'bg-transparent text-primary border border-primary',
    'white-outline': 'bg-transparent text-white border border-white',
    secondary: 'bg-secondary text-white',
    light: 'bg-neutral-100 text-neutral-950',
    highlight: 'bg-highlight text-white',
    danger: 'bg-red-600 text-white',
    'danger-outline': 'bg-transparent text-red-600 border border-red-600',
    warning: 'bg-yellow-500 text-white'
  },
  size: {
    small: 'px-2 py-1',
    normal: 'px-4 py-3'
  }
};

const button = tv({
  base: 'flex items-center justify-center rounded-lg h-auto font-bold text-center uppercase shadow-sm transition-all ease-in-out hover:brightness-90 disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-400 disabled:text-gray-300 [text-wrap:nowrap]',
  variants,
  defaultVariants: {
    theme: 'primary',
    size: 'normal'
  }
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    icon?: any;
    href?: string;
    target?: HTMLAttributeAnchorTarget;
    color?: string;
    subText?: string;
  };

export default function Button({
  children,
  icon: Icon,
  href,
  target,
  theme,
  size,
  className,
  color,
  subText,
  style,
  ...otherProps
}: ButtonProps) {
  const content = (
    <>
      {Icon && <Icon />} {children}
    </>
  );

  const buttonClasses = button({ theme, size, className });

  const buttonStyle: CSSProperties = { ...style, backgroundColor: color };

  const contentFormatted = subText ? (
    <div className="flex flex-col">
      <span>{content}</span>
      <span className="text-xs text-wrap">{subText}</span>
    </div>
  ) : (
    content
  );

  return href ? (
    <Link
      className={buttonClasses}
      style={buttonStyle}
      href={href}
      target={target}
    >
      {contentFormatted}
    </Link>
  ) : (
    <button className={buttonClasses} style={buttonStyle} {...otherProps}>
      {contentFormatted}
    </button>
  );
}

export interface ButtonInputs
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  text: string;
  icon?: string;
  iconPosition?: "left" | "right";
  iconSize?: number;
  showIcon?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  iconClassName?: string;
  iconAlt?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  additionalClassName?: string;
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

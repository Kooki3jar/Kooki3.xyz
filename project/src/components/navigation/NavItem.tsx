import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  hasDropdown?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function NavItem({
  to,
  icon: Icon,
  label,
  isActive,
  hasDropdown,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur
}: NavItemProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Link
        to={to}
        className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-lg transition-all duration-200 ${
          isActive || isHovered
            ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
        }`}
        aria-expanded={hasDropdown ? isHovered : undefined}
        role={hasDropdown ? 'button' : undefined}
      >
        <div className="flex items-center gap-1">
          <Icon className="w-5 h-5" />
          <span className="text-xs mt-0.5 font-medium">{label}</span>
          {hasDropdown && (
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              isHovered ? 'rotate-180' : ''
            }`} />
          )}
        </div>
      </Link>
    </div>
  );
}
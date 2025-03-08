import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Store, MapPin, Newspaper, Users, Layers, Palette, Gem, Clock, Home, Shirt, Camera, Gift, Users2, Trophy, Sparkles, PartyPopper } from 'lucide-react';
import { NavItem } from './navigation/NavItem';
import { NavDropdown } from './navigation/NavDropdown';
import { SocialDropdown } from './navigation/SocialDropdown';

const marketplaceCategories = [
  {
    name: 'Art & Prints',
    description: 'Original artwork and limited edition prints',
    icon: Palette,
    to: '/marketplace/art'
  },
  {
    name: 'Jewelry',
    description: 'Handcrafted jewelry and accessories',
    icon: Gem,
    to: '/marketplace/jewelry'
  },
  {
    name: 'Vintage',
    description: 'Curated vintage and antique items',
    icon: Clock,
    to: '/marketplace/vintage'
  },
  {
    name: 'Home & Living',
    description: 'Artisanal home decor and furnishings',
    icon: Home,
    to: '/marketplace/home'
  },
  {
    name: 'Fashion',
    description: 'Independent designer clothing and accessories',
    icon: Shirt,
    to: '/marketplace/fashion'
  },
  {
    name: 'Photography',
    description: 'Fine art photography and prints',
    icon: Camera,
    to: '/marketplace/photography'
  }
];

const eventCategories = [
  {
    name: 'Meetups',
    description: 'Connect with local artisans and creators',
    icon: Users2,
    to: '/events/meetups'
  },
  {
    name: 'Workshops',
    description: 'Learn new skills from expert craftspeople',
    icon: Trophy,
    to: '/events/workshops'
  },
  {
    name: 'Exhibitions',
    description: 'Discover curated art and design shows',
    icon: Sparkles,
    to: '/events/exhibitions'
  },
  {
    name: 'Markets',
    description: 'Shop directly from makers at pop-up markets',
    icon: Store,
    to: '/events/markets'
  },
  {
    name: 'Festivals',
    description: 'Celebrate creativity at featured festivals',
    icon: PartyPopper,
    to: '/events/festivals'
  }
];

const navItems = [
  { to: '/marketplace', icon: Store, label: 'Marketplace', hasDropdown: true, categories: marketplaceCategories },
  { to: '/events', icon: Store, label: 'Events', hasDropdown: true, categories: eventCategories },
  { to: '/map', icon: MapPin, label: 'Map', hasDropdown: false },
  { to: '/news', icon: Newspaper, label: 'News', hasDropdown: false },
  { to: '/social', icon: Users, label: 'Social', hasDropdown: true, isSocialDropdown: true },
  { to: '/nft-collection', icon: Layers, label: 'NFT Library', hasDropdown: false }
];

export function SecondaryNav() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredItem(label);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 100); // Small delay to prevent immediate closing
  };

  const handleFocus = (label: string) => {
    setFocusedItem(label);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setFocusedItem(null);
    }
  };

  const isItemActive = (path: string) => location.pathname.startsWith(path);
  const isItemHovered = (label: string) => hoveredItem === label || focusedItem === label;

  return (
    <nav className="relative border-b bg-white/95 dark:bg-dark-paper/95 backdrop-blur-sm" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between sm:justify-center space-x-1 sm:space-x-2 h-12">
          {navItems.map(({ to, icon, label, hasDropdown, isSocialDropdown }) => (
            <NavItem
              key={to}
              to={to}
              icon={icon}
              label={label}
              isActive={isItemActive(to)}
              hasDropdown={hasDropdown}
              isHovered={isItemHovered(label)}
              onMouseEnter={() => hasDropdown && handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => hasDropdown && handleFocus(label)}
              onBlur={handleBlur}
            />
          ))}
        </div>

        {/* Dropdowns */}
        {hoveredItem && (
          <div 
            onMouseEnter={() => handleMouseEnter(hoveredItem)}
            onMouseLeave={handleMouseLeave}
          >
            {hoveredItem === 'Social' ? (
              <SocialDropdown />
            ) : (
              <NavDropdown 
                items={navItems.find(item => item.label === hoveredItem)?.categories || []}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
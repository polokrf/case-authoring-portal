'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Stethoscope,
  LayoutDashboard,
  FilePlus,
  BookOpen,
  Settings,
  X,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/cases/new', label: 'New Case', icon: FilePlus },
  { href: '/cases', label: 'All Cases', icon: BookOpen },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  
  // console.log(pathname,'pathname')

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-base-100 border-r border-base-200
          z-30 flex flex-col transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-base-200">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Stethoscope className="w-5 h-5 text-primary-content" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none">MedCase</p>
              <p className="text-xs text-base-content/50">Authoring Portal</p>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm lg:hidden" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href 
            
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${active
                    ? 'bg-primary text-primary-content shadow-sm'
                    : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
                  }
                `}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        
      </aside>
    </>
  );
}

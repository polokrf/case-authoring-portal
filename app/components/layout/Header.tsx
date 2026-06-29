'use client';

import { Menu, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Header({ onMenuClick, title = 'Dashboard' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-base-100/80 backdrop-blur border-b border-base-200 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost btn-sm lg:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-base-content">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-sm btn-circle "
              aria-label="User menu"
            >
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-8 flex justify-center items-center">
                  <span>
                    {' '}
                    <User className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 w-40 p-2 shadow border border-base-200"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Sign out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

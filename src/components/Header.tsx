import React from 'react';
import { Search, Bell, User, Plus } from 'lucide-react';

interface HeaderProps {
  onCreateClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-red-600">
            TaskTube
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="タスクを検索..."
              className="w-full px-4 py-2 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onCreateClick}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">新しいタスク</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
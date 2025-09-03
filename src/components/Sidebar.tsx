import React from 'react';
import { Home, Briefcase, Clock, CheckSquare, Star, Archive, Settings } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onCategorySelect }) => {
  const menuItems = [
    { id: 'home', label: 'ホーム', icon: Home, count: null },
    { id: 'work', label: '仕事', icon: Briefcase, count: 12 },
    { id: 'personal', label: '個人', icon: Star, count: 5 },
    { id: 'urgent', label: '緊急', icon: Clock, count: 3 },
    { id: 'completed', label: '完了済み', icon: CheckSquare, count: 28 },
    { id: 'archive', label: 'アーカイブ', icon: Archive, count: 15 },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedCategory === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onCategorySelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-700 border-l-4 border-red-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isActive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
            <span className="font-medium">設定</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
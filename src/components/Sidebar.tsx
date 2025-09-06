import React from "react";
import {
  Home,
  Briefcase,
  Clock,
  CheckSquare,
  Star,
  Archive,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  counts: {
    work: number;
    personal: number;
    urgent: number;
    completed: number;
    archive: number;
  };
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number | null;
}

const SidebarItem: React.FC<{
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
        isActive
          ? "bg-red-50 text-red-700 border-l-4 border-red-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} />
        <span className="font-medium">{item.label}</span>
      </div>
      {typeof item.count === "number" && (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            isActive ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.count}
        </span>
      )}
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onCategorySelect,
  counts,
}) => {
  const menuItems: MenuItem[] = [
    { id: "home", label: "ホーム", icon: Home },
    { id: "work", label: "仕事", icon: Briefcase, count: counts.work },
    { id: "personal", label: "個人", icon: Star, count: counts.personal },
    { id: "urgent", label: "緊急", icon: Clock, count: counts.urgent },
    { id: "completed", label: "完了済み", icon: CheckSquare, count: counts.completed },
    { id: "archive", label: "アーカイブ", icon: Archive, count: counts.archive },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={selectedCategory === item.id}
              onClick={() => onCategorySelect(item.id)}
            />
          ))}
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

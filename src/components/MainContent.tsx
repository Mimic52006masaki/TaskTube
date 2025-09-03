import React from 'react';
import TodoCard from './TodoCard';

interface TodoItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  category: string;
  estimatedTime: string;
}

interface MainContentProps {
  selectedCategory: string;
  todos: TodoItem[];
  onToggleComplete: (id: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ selectedCategory, todos, onToggleComplete }) => {
  const getCategoryTitle = (category: string) => {
    const titles: { [key: string]: string } = {
      home: 'すべてのタスク',
      work: '仕事のタスク',
      personal: '個人のタスク',
      urgent: '緊急タスク',
      completed: '完了済みタスク',
      archive: 'アーカイブ'
    };
    return titles[category] || 'タスク';
  };

  const filteredTodos = todos.filter(todo => {
    if (selectedCategory === 'home') return !todo.completed;
    if (selectedCategory === 'completed') return todo.completed;
    if (selectedCategory === 'urgent') return todo.priority === 'high' && !todo.completed;
    return todo.category === selectedCategory;
  });

  return (
    <main className="ml-64 mt-16 min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {getCategoryTitle(selectedCategory)}
          </h1>
          <p className="text-gray-600">
            {filteredTodos.length} 件のタスク
          </p>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📝</div>
            <p className="text-gray-500">タスクがありません</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;
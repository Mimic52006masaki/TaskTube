import React from 'react';
import { Clock, Flag, CheckCircle, Circle, MoreVertical } from 'lucide-react';

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

interface TodoCardProps {
  todo: TodoItem;
  onToggleComplete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggleComplete }) => {
  const priorityColors = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-green-600 bg-green-50'
  };

  const priorityLabels = {
    high: '高',
    medium: '中',
    low: '低'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Thumbnail Area */}
      <div className={`h-32 bg-gradient-to-br ${
        todo.completed 
          ? 'from-gray-100 to-gray-200' 
          : 'from-red-50 to-red-100'
      } flex items-center justify-center relative`}>
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="absolute top-3 left-3 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-green-600" />
          )}
        </button>
        
        <div className="text-center">
          <Flag className={`w-8 h-8 mx-auto mb-1 ${
            todo.completed ? 'text-gray-400' : 'text-red-400'
          }`} />
          <span className="text-sm text-gray-600">{todo.estimatedTime}</span>
        </div>

        <button className="absolute top-3 right-3 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`font-semibold text-lg mb-2 line-clamp-2 ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
        }`}>
          {todo.title}
        </h3>
        
        <p className={`text-sm mb-3 line-clamp-2 ${
          todo.completed ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {todo.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[todo.priority]}`}>
              優先度: {priorityLabels[todo.priority]}
            </span>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              {todo.category}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-3 text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          <span>期限: {todo.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
import React, { useState } from 'react';
import { X, Calendar, Clock, Flag, Briefcase, Star, User } from 'lucide-react';

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

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTodo: (todo: Omit<TodoItem, 'id' | 'completed'>) => void;
}

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({ isOpen, onClose, onCreateTodo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    category: 'work',
    estimatedTime: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    { id: 'work', label: '仕事', icon: Briefcase },
    { id: 'personal', label: '個人', icon: Star },
    { id: 'urgent', label: '緊急', icon: Clock }
  ];

  const priorities = [
    { id: 'high', label: '高', color: 'bg-red-100 text-red-700 border-red-200' },
    { id: 'medium', label: '中', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 'low', label: '低', color: 'bg-green-100 text-green-700 border-green-200' }
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    }

    if (!formData.description.trim()) {
      newErrors.description = '説明は必須です';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = '期限は必須です';
    }

    if (!formData.estimatedTime.trim()) {
      newErrors.estimatedTime = '推定時間は必須です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreateTodo(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: 'work',
        estimatedTime: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">新しいタスクを作成</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              タスクタイトル *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="例: 新しいプロジェクトの企画書を作成する"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              詳細説明 *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="タスクの詳細な説明を入力してください..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none ${
                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Category and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                カテゴリ
              </label>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <label
                      key={category.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.category === category.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={formData.category === category.id}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="sr-only"
                      />
                      <Icon size={20} className={`mr-3 ${
                        formData.category === category.id ? 'text-red-600' : 'text-gray-500'
                      }`} />
                      <span className={`font-medium ${
                        formData.category === category.id ? 'text-red-700' : 'text-gray-700'
                      }`}>
                        {category.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                優先度
              </label>
              <div className="space-y-2">
                {priorities.map((priority) => (
                  <label
                    key={priority.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.priority === priority.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.id}
                      checked={formData.priority === priority.id}
                      onChange={(e) => handleInputChange('priority', e.target.value as 'high' | 'medium' | 'low')}
                      className="sr-only"
                    />
                    <Flag size={20} className={`mr-3 ${
                      formData.priority === priority.id ? 'text-red-600' : 'text-gray-500'
                    }`} />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${priority.color}`}>
                      優先度: {priority.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Due Date and Estimated Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                期限 *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                    errors.dueDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
              )}
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                推定時間 *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
                  placeholder="例: 2時間, 30分, 1日"
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                    errors.estimatedTime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <Clock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.estimatedTime && (
                <p className="mt-1 text-sm text-red-600">{errors.estimatedTime}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>タスクを作成</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoModal;
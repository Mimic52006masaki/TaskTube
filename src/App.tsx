import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CreateTodoModal from './components/CreateTodoModal';

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

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: '新しいプロジェクトの企画書を作成する',
      description: 'クライアントとの打ち合わせで使用する企画書を作成し、必要な資料をまとめる。市場調査データも含める必要がある。',
      priority: 'high',
      dueDate: '2025-01-25',
      completed: false,
      category: 'work',
      estimatedTime: '3時間'
    },
    {
      id: '2',
      title: '週次チームミーティングの準備',
      description: 'チームミーティングのアジェンダ作成と資料準備。進捗報告と課題の整理を行う。',
      priority: 'medium',
      dueDate: '2025-01-22',
      completed: false,
      category: 'work',
      estimatedTime: '1時間'
    },
    {
      id: '3',
      title: '歯医者の予約を取る',
      description: '定期検診の予約を取る。できれば来月の第2週あたりで調整したい。',
      priority: 'low',
      dueDate: '2025-01-30',
      completed: false,
      category: 'personal',
      estimatedTime: '15分'
    },
    {
      id: '4',
      title: 'システムのセキュリティ更新',
      description: '重要なセキュリティアップデートを適用し、システムの脆弱性チェックを実施する。',
      priority: 'high',
      dueDate: '2025-01-21',
      completed: false,
      category: 'work',
      estimatedTime: '2時間'
    },
    {
      id: '5',
      title: '読書時間の確保',
      description: '今月は技術書を2冊読む予定。毎日30分は読書時間を確保する。',
      priority: 'medium',
      dueDate: '2025-01-31',
      completed: false,
      category: 'personal',
      estimatedTime: '30分/日'
    },
    {
      id: '6',
      title: 'データベース設計の見直し',
      description: 'パフォーマンス問題を解決するため、データベース設計を見直し最適化を行う。',
      priority: 'high',
      dueDate: '2025-01-23',
      completed: false,
      category: 'work',
      estimatedTime: '4時間'
    },
    {
      id: '7',
      title: 'APIドキュメントの更新',
      description: '新しいエンドポイントの追加に伴い、APIドキュメントを更新する。',
      priority: 'medium',
      dueDate: '2025-01-28',
      completed: true,
      category: 'work',
      estimatedTime: '1.5時間'
    },
    {
      id: '8',
      title: 'ジムの入会手続き',
      description: '健康管理のため、近所のジムに入会する。見学も兼ねて手続きを行う。',
      priority: 'low',
      dueDate: '2025-02-01',
      completed: true,
      category: 'personal',
      estimatedTime: '1時間'
    }
  ]);

  const handleToggleComplete = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleCreateTodo = (newTodo: Omit<TodoItem, 'id' | 'completed'>) => {
    const todo: TodoItem = {
      ...newTodo,
      id: Date.now().toString(),
      completed: false
    };
    setTodos(prev => [todo, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateClick={() => setIsCreateModalOpen(true)} />
      <Sidebar 
        selectedCategory={selectedCategory} 
        onCategorySelect={setSelectedCategory}
      />
      <MainContent 
        selectedCategory={selectedCategory}
        todos={todos}
        onToggleComplete={handleToggleComplete}
      />
      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTodo={handleCreateTodo}
      />
    </div>
  );
};

export default App;
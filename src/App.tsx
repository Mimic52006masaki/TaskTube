// TaskTube/src/App.tsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import CreateTodoModal from "./components/CreateTodoModal";
import axios from "axios";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  completed: boolean;
  category: string;
  estimatedTime: string;
}

const API_BASE = "http://localhost:3000/api/v1";

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [allTodos, setAllTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Rails の snake_case を camelCase に変換
  const mapTodo = (todo: any): TodoItem => ({
    id: todo.id.toString(),
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    dueDate: todo.due_date,
    completed: todo.completed,
    category: todo.category,
    estimatedTime: todo.estimated_time,
  });

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      let params: any = {};
      if (selectedCategory === "completed") {
        params.completed = true;
      } else if (selectedCategory !== "home") {
        params.category = selectedCategory;
      }

      const res = await axios.get(`${API_BASE}/todos`, { params });
      const mapped = res.data.map(mapTodo);
      setTodos(mapped);
      console.log("Fetched todos:", mapped);
    } catch (err) {
      console.error("Failed to fetch todos", err);
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/todos`);
      const mapped = res.data.map(mapTodo);
      setAllTodos(mapped);
    } catch (err) {
      console.error("Failed to fetch all todos", err);
      setAllTodos([]);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchAllTodos(); // ホームでもカテゴリでも最新を取得
  }, [selectedCategory]);

  const handleCreateTodo = async (newTodo: Omit<TodoItem, "id" | "completed">) => {
    try {
      const payload = {
        title: newTodo.title,
        description: newTodo.description,
        priority: newTodo.priority,
        due_date: newTodo.dueDate,
        category: newTodo.category,
        estimated_time: newTodo.estimatedTime,
      };

      await axios.post(`${API_BASE}/todos`, { todo: payload });
      await fetchTodos();
      await fetchAllTodos();
    } catch (err) {
      console.error("Failed to create todo", err);
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const res = await axios.put(`${API_BASE}/todos/${id}`, {
        todo: { completed: !todo.completed },
      });

      const mapped = mapTodo(res.data);
      setTodos((prev) => prev.map((t) => (t.id === id ? mapped : t)));
      await fetchAllTodos();
    } catch (err) {
      console.error("Failed to toggle todo", err);
    }
  };

  const categoryCount = allTodos.reduce((acc, todo) => {
    if (!acc[todo.category]) acc[todo.category] = 0;
    acc[todo.category]++;
    return acc;
  }, {} as Record<string, number>);

  const completedCount = allTodos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateClick={() => setIsCreateModalOpen(true)} />
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        counts={{
          work: categoryCount["work"] || 0,
          personal: categoryCount["personal"] || 0,
          urgent: categoryCount["urgent"] || 0,
          completed: completedCount,
          archive: 0,
        }}
      />
      <MainContent
        selectedCategory={selectedCategory}
        todos={todos}
        onToggleComplete={handleToggleComplete}
        isLoading={isLoading}
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

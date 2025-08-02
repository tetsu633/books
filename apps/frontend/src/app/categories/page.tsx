'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: '給与', type: 'income', color: 'bg-green-500' },
    { id: '2', name: '副業', type: 'income', color: 'bg-green-400' },
    { id: '3', name: '食費', type: 'expense', color: 'bg-red-500' },
    { id: '4', name: '交通費', type: 'expense', color: 'bg-blue-500' },
    { id: '5', name: '日用品', type: 'expense', color: 'bg-yellow-500' },
    { id: '6', name: '光熱費', type: 'expense', color: 'bg-purple-500' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState<'income' | 'expense'>('expense');
  const [categoryColor, setCategoryColor] = useState('bg-blue-500');

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-gray-500',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: categoryName, type: categoryType, color: categoryColor }
            : cat
        )
      );
      setEditingCategory(null);
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: categoryName,
        type: categoryType,
        color: categoryColor,
      };
      setCategories([...categories, newCategory]);
    }

    setShowForm(false);
    setCategoryName('');
    setCategoryType('expense');
    setCategoryColor('bg-blue-500');
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryType(category.type);
    setCategoryColor(category.color);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('このカテゴリを削除してもよろしいですか？')) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const incomeCategories = categories.filter((cat) => cat.type === 'income');
  const expenseCategories = categories.filter((cat) => cat.type === 'expense');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">カテゴリ管理</h1>
          <Button
            onClick={() => {
              setEditingCategory(null);
              setShowForm(!showForm);
            }}
            size="sm"
          >
            {showForm ? 'キャンセル' : '新規カテゴリ'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ名</label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="カテゴリ名を入力"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">タイプ</label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={categoryType === 'income' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryType('income')}
                    >
                      収入
                    </Button>
                    <Button
                      type="button"
                      variant={categoryType === 'expense' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryType('expense')}
                    >
                      支出
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">カラー</label>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setCategoryColor(color)}
                        className={`w-10 h-10 rounded-lg ${color} ${
                          categoryColor === color ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingCategory(null);
                    }}
                  >
                    キャンセル
                  </Button>
                  <Button type="submit">{editingCategory ? '更新' : '作成'}</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">収入カテゴリ</h2>
            <div className="space-y-2">
              {incomeCategories.map((category) => (
                <Card key={category.id} variant="bordered">
                  <CardBody className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                        編集
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                        削除
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
              {incomeCategories.length === 0 && (
                <p className="text-gray-500 text-sm">収入カテゴリがありません</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">支出カテゴリ</h2>
            <div className="space-y-2">
              {expenseCategories.map((category) => (
                <Card key={category.id} variant="bordered">
                  <CardBody className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                        編集
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                        削除
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
              {expenseCategories.length === 0 && (
                <p className="text-gray-500 text-sm">支出カテゴリがありません</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

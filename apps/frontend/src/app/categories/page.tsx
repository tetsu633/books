'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Category, colors } from '@/types/category';
import { useCategories } from '../hooks/useCategories';
import { useForm } from 'react-hook-form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DemoDataBanner } from '@/components/DemoDataBanner';

interface ICategoryForm {
  userId: string;
  name: string;
  type: 'income' | 'expense';
  color: keyof typeof colors;
}

export default function CategoriesPage() {
  const { categories, createCategory, updateCategory, deleteCategory } = useCategories();

  const {
    register,
    handleSubmit: handleSubmitForm,
    reset,
    setValue,
  } = useForm<ICategoryForm>({
    defaultValues: {
      name: '',
      type: 'expense',
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryType, setCategoryType] = useState<'income' | 'expense'>('expense');
  const [categoryColor, setCategoryColor] = useState<keyof typeof colors>('blue');

  /**
   * カテゴリを追加または更新する
   * @param data カテゴリのデータ
   */
  const handleSubmit = async (data: ICategoryForm) => {
    if (editingCategory) {
      await updateCategory({
        id: editingCategory.id,
        name: data.name,
        type: categoryType,
        color: categoryColor,
      });
    } else {
      await createCategory({
        name: data.name,
        type: categoryType,
        color: categoryColor,
      });
    }
    setShowForm(false);
    reset();
  };

  /**
   * カテゴリを編集する
   * @param category カテゴリ
   */
  const handleEdit = (category: Category) => {
    setCategoryColor(category.color);
    if (category.type === 'income') {
      setCategoryType('income');
    } else {
      setCategoryType('expense');
    }
    setValue('name', category.name);
    setShowForm(true);
  };

  /**
   * カテゴリを削除する
   * @param id カテゴリID
   */
  const handleDelete = (id: number) => {
    if (confirm('このカテゴリを削除してもよろしいですか？')) {
      deleteCategory(id);
    }
  };

  /**
   * カテゴリの作成をキャンセルする
   */
  const handleCancel = () => {
    setShowForm(false);
    reset();
    setCategoryType('expense');
    setCategoryColor('blue');
    setEditingCategory(null);
  };

  // 収支と費用のリスト
  const incomeCategories = categories.filter((cat) => cat.type === 'income');
  const expenseCategories = categories.filter((cat) => cat.type === 'expense');

  return (
    <>
      <DemoDataBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">カテゴリ管理</h1>
            <Button
              onClick={() => {
                if (showForm) {
                  handleCancel();
                } else {
                  setShowForm(true);
                }
              }}
              size="sm"
            >
              {showForm ? 'キャンセル' : '新規カテゴリ'}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardBody>
                <form onSubmit={handleSubmitForm(handleSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      カテゴリ名
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="カテゴリ名を入力"
                      required
                      {...register('name')}
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
                      {Object.keys(colors).map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setCategoryColor(color);
                          }}
                          className={`w-10 h-10 rounded-lg ${colors[color]} ${
                            categoryColor === color ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => handleCancel()}>
                      キャンセル
                    </Button>
                    <Button type="submit">{editingCategory ? '更新' : '作成'}</Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}

          {/* カテゴリ一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">収入カテゴリ</h2>
              <div className="space-y-2">
                {incomeCategories.map((category, index) => (
                  <Card key={`${category.name}-${index}`} variant="bordered">
                    <CardBody className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${colors[category.color]}`} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            handleEdit(category);
                            setEditingCategory(category);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => {
                            if (category.id) {
                              handleDelete(category.id);
                            }
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <IconTrash />
                        </button>
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
                {expenseCategories.map((category, index) => (
                  <Card key={`${category.name}-${index}`} variant="bordered">
                    <CardBody className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${colors[category.color]}`} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            handleEdit(category);
                            setEditingCategory(category);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() => {
                            if (category.id) {
                              handleDelete(category.id);
                            }
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <IconTrash />
                        </button>
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
    </>
  );
}

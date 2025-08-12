import { defaultCategories } from '@/data/demo-data';
import {
  createCategory as createCategoryApi,
  getCategories,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
} from '@/services/category';
import { Category } from '@/types/category';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

/**
 * カテゴリを取得する
 * @returns カテゴリ
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: session, status } = useSession();

  /**
   * カテゴリを取得する
   */
  useEffect(() => {
    initCategories(status);
  }, [status]);

  /**
   * カテゴリを取得する
   * @param status セッションの状態
   */
  const initCategories = async (status: string) => {
    switch (status) {
      case 'authenticated':
        if (!session?.user.id) return;
        const categories = await getCategories({ userId: session?.user.id });
        setCategories(categories);
        break;

      // 未認証時
      case 'unauthenticated':
        setCategories(defaultCategories);
        break;

      // default時は何もしない
      default:
        break;
    }
  };

  /**
   * カテゴリを追加する
   * @param category カテゴリ
   */
  const createCategory = async (category: Category) => {
    if (!session) {
      // デモモード時のみ一時的なIDを生成
      const newCategory = {
        ...category,
        id: Date.now(),
      };
      setCategories([newCategory, ...categories]);
    } else {
      const createdCategory = await createCategoryApi({
        userId: session.user.id,
        name: category.name,
        type: category.type,
        color: category.color,
      });

      setCategories([createdCategory, ...categories]);
    }
  };

  /**
   * カテゴリを編集する
   * @param category カテゴリ
   */
  const updateCategory = async (category: Category) => {
    if (!session) {
      setCategories(categories.map((cat) => (cat.id === category.id ? category : cat)));
    } else {
      if (!category.id) return;
      await updateCategoryApi({
        id: category.id,
        name: category.name,
        type: category.type,
        color: category.color,
      });

      setCategories(categories.map((cat) => (cat.id === category.id ? category : cat)));
    }
  };

  /**
   * カテゴリを削除する
   * @param id カテゴリID
   */
  const deleteCategory = async (id: number) => {
    if (!session) {
      setCategories(categories.filter((cat) => cat.id !== id));
    } else {
      await deleteCategoryApi(id);
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return { categories, createCategory, updateCategory, deleteCategory };
};

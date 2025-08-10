import { Category } from '@/types/category';

/**
 * カテゴリを作成する
 * @param category カテゴリ
 * @returns カテゴリ
 */
export const createCategory = async (category: {
  userId: string;
  name: string;
  type: string;
  color: string;
}): Promise<Category> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to create category');
  }

  return res.json();
};

/**
 * カテゴリを更新する
 * @param category カテゴリ
 * @returns 更新したカテゴリ
 */
export const updateCategory = async (category: {
  id: number;
  name: string;
  type: string;
  color: string;
}): Promise<Category> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${category.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to update category');
  }

  return res.json();
};

/**
 * カテゴリを削除する
 * @param id カテゴリID
 * @returns 削除したカテゴリ
 */
export const deleteCategory = async (id: number): Promise<Category> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to delete category');
  }

  return res.json();
};

/**
 * カテゴリを取得する
 * @param userId ユーザーID
 * @returns カテゴリ
 */
export const getCategories = async ({ userId }: { userId: string }): Promise<Category[]> => {
  const params = new URLSearchParams({ userId });
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(res);
    throw new Error('Failed to get categories');
  }

  return res.json();
};

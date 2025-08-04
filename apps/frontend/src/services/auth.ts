import { User } from '@prisma/client';

/**
 * ユーザーを作成する
 * @param userData ユーザー情報
 * @returns ユーザー情報
 */
export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  return res.json();
}

/**
 * ログインする
 * @param userData ユーザー情報
 * @returns ユーザー情報
 */
export async function loginUser(userData: { email: string; password: string }): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  return res.json();
}

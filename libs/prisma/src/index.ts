export * from '@prisma/client';

// PrismaClientのシングルトンインスタンス（バックエンド用）
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// 型のみのエクスポート（フロントエンド用）
export type * from '@prisma/client';

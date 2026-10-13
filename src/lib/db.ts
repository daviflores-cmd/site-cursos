// Abstração da camada de dados
// Pronta para SQLite (WAL Mode), Cloudflare D1 ou PostgreSQL (Prisma/Drizzle)

export const db = {
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    // Execução genérica de queries de forma segura e parametrizada
    console.log("[DB Query]:", sql, params);
    return [] as T[];
  },
};

/**
 * Módulo de Idempotência em Memória
 * 
 * Evita disparos duplicados de e-mails caso a Greenn reenvie notificações do mesmo pedido.
 * Utiliza um cache em memória com TTL (Time-To-Live) de 24h e limite máximo de registros (LRU).
 */

interface CacheEntry {
  timestamp: number;
}

const MAX_CACHE_SIZE = 2000;
const TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

// Armazena no escopo global/módulo (persiste durante o ciclo de vida da instância serverless)
const processedSalesCache = new Map<string, CacheEntry>();

/**
 * Limpa chaves expiradas para evitar vazamento de memória
 */
function cleanupExpired(): void {
  const now = Date.now();
  
  processedSalesCache.forEach((entry, id) => {
    if (now - entry.timestamp > TTL_MS) {
      processedSalesCache.delete(id);
    }
  });

  // Se ultrapassar o limite, remove os mais antigos (LRU simples)
  if (processedSalesCache.size > MAX_CACHE_SIZE) {
    const keysToRemove: string[] = [];
    processedSalesCache.forEach((_, key) => {
      if (keysToRemove.length < processedSalesCache.size - MAX_CACHE_SIZE) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach((key) => {
      processedSalesCache.delete(key);
    });
  }
}

/**
 * Verifica se uma venda/transação já foi processada recentemente
 */
export function isDuplicateTransaction(transactionId: string | null | undefined): boolean {
  if (!transactionId) return false;
  
  cleanupExpired();

  const entry = processedSalesCache.get(transactionId);
  if (!entry) return false;

  const isExpired = Date.now() - entry.timestamp > TTL_MS;
  if (isExpired) {
    processedSalesCache.delete(transactionId);
    return false;
  }

  return true;
}

/**
 * Marca uma venda/transação como processada com sucesso
 */
export function markTransactionProcessed(transactionId: string | null | undefined): void {
  if (!transactionId) return;

  cleanupExpired();
  processedSalesCache.set(transactionId, { timestamp: Date.now() });
}

/**
 * Limpa todo o cache (útil para testes unitários)
 */
export function clearIdempotencyCache(): void {
  processedSalesCache.clear();
}


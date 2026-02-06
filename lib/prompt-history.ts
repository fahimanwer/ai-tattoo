import Storage from "expo-sqlite/kv-store";

const STORAGE_KEY = "@prompt_history";
const MAX_ENTRIES = 50;

export interface PromptHistoryEntry {
  id: string;
  text: string;
  timestamp: number;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getPromptHistory(): PromptHistoryEntry[] {
  try {
    const stored = Storage.getItemSync(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load prompt history:", error);
  }
  return [];
}

export function addPromptToHistory(text: string): void {
  const trimmed = text.trim();
  if (!trimmed) return;

  try {
    const history = getPromptHistory();

    // Deduplicate: skip if the most recent entry has the same text
    if (history.length > 0 && history[0].text === trimmed) {
      return;
    }

    const entry: PromptHistoryEntry = {
      id: generateId(),
      text: trimmed,
      timestamp: Date.now(),
    };

    // Prepend new entry, cap at MAX_ENTRIES
    const updated = [entry, ...history].slice(0, MAX_ENTRIES);
    Storage.setItemSync(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to add prompt to history:", error);
  }
}

export function deletePrompt(id: string): void {
  try {
    const history = getPromptHistory();
    const updated = history.filter((entry) => entry.id !== id);
    Storage.setItemSync(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to delete prompt:", error);
  }
}

export function clearPromptHistory(): void {
  try {
    Storage.removeItemSync(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear prompt history:", error);
  }
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
}

import { openDB, DBSchema } from "idb";

interface WinterReadyDB extends DBSchema {
  userProgress: {
    key: string;
    value: {
      id: string;
      assessmentResult?: string;
      assessmentAnswers?: string;
      selectedDestination?: string;
      completedModules?: string[];
      updatedAt: string;
    };
  };
}

const DB_NAME = "winterready";
const DB_VERSION = 1;

async function getDB() {
  return openDB<WinterReadyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("userProgress")) {
        db.createObjectStore("userProgress", { keyPath: "id" });
      }
    },
  });
}

export async function saveProgress(
  key: string,
  value: string
): Promise<void> {
  try {
    const db = await getDB();
    const existing = (await db.get("userProgress", "current")) || {
      id: "current",
      updatedAt: "",
    };
    await db.put("userProgress", {
      ...existing,
      [key]: value,
      updatedAt: new Date().toISOString(),
    });
    // Keep sessionStorage in sync as fallback
    sessionStorage.setItem(key, value);
  } catch {
    // Fall back to sessionStorage only
    sessionStorage.setItem(key, value);
  }
}

export async function loadProgress(key: string): Promise<string | null> {
  try {
    const db = await getDB();
    const data = await db.get("userProgress", "current");
    if (data && key in data) {
      const value = (data as unknown as Record<string, unknown>)[key];
      return typeof value === "string" ? value : null;
    }
  } catch {
    // Fall back to sessionStorage
  }
  return sessionStorage.getItem(key);
}

export async function clearProgress(): Promise<void> {
  try {
    const db = await getDB();
    await db.delete("userProgress", "current");
  } catch {
    // ignore
  }
  sessionStorage.removeItem("assessmentResult");
  sessionStorage.removeItem("assessmentAnswers");
  sessionStorage.removeItem("selectedDestination");
}

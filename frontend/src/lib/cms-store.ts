"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BOOKS_DB,
  TIPS_DB,
  DAILY_PRACTICE_DB,
  ENGLISH_LESSONS_DB,
  VOCABULARY_DB,
  QUESTION_BANK,
  PASSAGES_DB,
  TESTS_DB,
  type BookItem,
  type TipArticleItem,
  type DailyPracticeSetItem,
  type EnglishLessonItem,
  type VocabularyEntry,
  type QuestionItem,
  type PassageItem,
  type TestConfig,
} from "./question-bank";

export interface CMSDataStore {
  books: BookItem[];
  tips: TipArticleItem[];
  dailyPractice: DailyPracticeSetItem[];
  lessons: EnglishLessonItem[];
  vocabulary: VocabularyEntry[];
  questions: QuestionItem[];
  passages: PassageItem[];
  tests: TestConfig[];
}

const CMS_STORAGE_KEY = "me_cms_store_v1";

export function getDefaultCMSData(): CMSDataStore {
  return {
    books: BOOKS_DB,
    tips: TIPS_DB,
    dailyPractice: DAILY_PRACTICE_DB,
    lessons: ENGLISH_LESSONS_DB,
    vocabulary: VOCABULARY_DB,
    questions: QUESTION_BANK,
    passages: PASSAGES_DB,
    tests: TESTS_DB,
  };
}

export function getCMSDataSync(): CMSDataStore {
  if (typeof window === "undefined") return getDefaultCMSData();
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CMSDataStore>;
      return {
        books: parsed.books ?? BOOKS_DB,
        tips: parsed.tips ?? TIPS_DB,
        dailyPractice: parsed.dailyPractice ?? DAILY_PRACTICE_DB,
        lessons: parsed.lessons ?? ENGLISH_LESSONS_DB,
        vocabulary: parsed.vocabulary ?? VOCABULARY_DB,
        questions: parsed.questions ?? QUESTION_BANK,
        passages: parsed.passages ?? PASSAGES_DB,
        tests: parsed.tests ?? TESTS_DB,
      };
    }
  } catch {
    // ignore
  }
  return getDefaultCMSData();
}

export async function saveCMSData(nextData: CMSDataStore): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(nextData));
      window.dispatchEvent(new Event("me-cms-updated"));
    } catch {
      // ignore
    }
  }

  try {
    await fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextData),
    });
  } catch {
    // ignore offline error
  }
}

export function useCMSContent() {
  const [data, setData] = useState<CMSDataStore>(getDefaultCMSData);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    // First load from localStorage immediately
    const local = getCMSDataSync();
    setData(local);

    // Also fetch from server disk store (/api/cms) if localStorage wasn't customized yet
    if (typeof window !== "undefined" && !window.localStorage.getItem(CMS_STORAGE_KEY)) {
      try {
        const res = await fetch("/api/cms");
        if (res.ok) {
          const serverData = (await res.json()) as CMSDataStore;
          window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(serverData));
          setData(serverData);
        }
      } catch {
        // fallback to local
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => {
      setData(getCMSDataSync());
    };
    window.addEventListener("me-cms-updated", handler);
    return () => window.removeEventListener("me-cms-updated", handler);
  }, [refresh]);

  const updateStore = async (updater: (prev: CMSDataStore) => CMSDataStore) => {
    const current = getCMSDataSync();
    const next = updater(current);
    setData(next);
    await saveCMSData(next);
  };

  return {
    data,
    loaded,
    updateStore,
  };
}

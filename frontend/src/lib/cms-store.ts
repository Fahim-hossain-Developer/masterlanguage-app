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
  dailySets: DailyPracticeSetItem[];
  lessons: EnglishLessonItem[];
  englishLessons: EnglishLessonItem[];
  vocabulary: VocabularyEntry[];
  questions: QuestionItem[];
  passages: PassageItem[];
  tests: TestConfig[];
}

const CMS_STORAGE_KEY = "me_cms_store_v1";

function withAliases(raw: Partial<CMSDataStore>): CMSDataStore {
  const daily = raw.dailyPractice ?? raw.dailySets ?? DAILY_PRACTICE_DB;
  const lessons = raw.lessons ?? raw.englishLessons ?? ENGLISH_LESSONS_DB;
  return {
    books: raw.books ?? BOOKS_DB,
    tips: raw.tips ?? TIPS_DB,
    dailyPractice: daily,
    dailySets: daily,
    lessons,
    englishLessons: lessons,
    vocabulary: raw.vocabulary ?? VOCABULARY_DB,
    questions: raw.questions ?? QUESTION_BANK,
    passages: raw.passages ?? PASSAGES_DB,
    tests: raw.tests ?? TESTS_DB,
  };
}

export function getDefaultCMSData(): CMSDataStore {
  return withAliases({});
}

export function getCMSDataSync(): CMSDataStore {
  if (typeof window === "undefined") return getDefaultCMSData();
  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CMSDataStore>;
      return withAliases(parsed);
    }
  } catch {
    // ignore
  }
  return getDefaultCMSData();
}

export async function saveCMSData(nextData: CMSDataStore): Promise<void> {
  const normalized = withAliases(nextData);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(normalized));
      window.dispatchEvent(new Event("me-cms-updated"));
    } catch {
      // ignore
    }
  }

  try {
    await fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized),
    });
  } catch {
    // ignore offline error
  }
}

export function useCMSContent() {
  const [data, setData] = useState<CMSDataStore>(getDefaultCMSData);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const local = getCMSDataSync();
    setData(local);

    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/cms", { cache: "no-store" });
        if (res.ok) {
          const serverRaw = (await res.json()) as Partial<CMSDataStore>;
          const normalized = withAliases(serverRaw);
          window.localStorage.setItem(
            CMS_STORAGE_KEY,
            JSON.stringify(normalized)
          );
          setData(normalized);
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

  const updateStore = async (
    updater: (prev: CMSDataStore) => Partial<CMSDataStore>
  ) => {
    const current = getCMSDataSync();
    const next = withAliases(updater(current));
    setData(next);
    await saveCMSData(next);
  };

  return {
    data,
    loaded,
    updateStore,
  };
}

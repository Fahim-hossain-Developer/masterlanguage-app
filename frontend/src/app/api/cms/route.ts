import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import {
  BOOKS_DB,
  TIPS_DB,
  DAILY_PRACTICE_DB,
  ENGLISH_LESSONS_DB,
  VOCABULARY_DB,
  QUESTION_BANK,
  PASSAGES_DB,
  TESTS_DB,
} from "@/lib/question-bank";

const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE = path.join(DATA_DIR, "cms-content.json");

async function loadCMSData() {
  try {
    const raw = await readFile(CMS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    const initial = {
      books: BOOKS_DB,
      tips: TIPS_DB,
      dailyPractice: DAILY_PRACTICE_DB,
      lessons: ENGLISH_LESSONS_DB,
      vocabulary: VOCABULARY_DB,
      questions: QUESTION_BANK,
      passages: PASSAGES_DB,
      tests: TESTS_DB,
    };
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(CMS_FILE, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
}

export async function GET() {
  const data = await loadCMSData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(CMS_FILE, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save CMS data:", err);
    return NextResponse.json(
      { error: "Failed to save CMS data" },
      { status: 500 }
    );
  }
}

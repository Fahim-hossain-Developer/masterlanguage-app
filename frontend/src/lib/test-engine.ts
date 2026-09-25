import {
  QUESTION_BANK,
  PASSAGES_DB,
  TESTS_DB,
  DAILY_PRACTICE_DB,
  type QuestionItem,
  type PassageItem,
  type TestConfig,
  type DifficultyLevel,
  type IELTSQuestionType,
} from "./question-bank";
import { getCMSDataSync } from "./cms-store";
import { buildCambridgeEngineConfig } from "./cambridge-data";

// ============================================================
// TYPES FOR REUSABLE TEST ENGINE, AUTO-SAVE, RESULTS & BOOKMARKS
// ============================================================

export interface ActiveTestAttempt {
  attemptId: string;
  testId: string;
  title: string;
  module: string;
  mode: "timed" | "practice";
  startedAt: number; // Unix ms
  expiresAt: number | null; // Server-safe absolute timestamp in ms (null if untimed practice)
  lastSavedAt: number;
  currentSectionIdx: number;
  currentQuestionIdx: number;
  answers: Record<string, string>; // question_id -> user answer
  markedForReview: string[]; // question_id[]
  sections: {
    id: string;
    title: string;
    module: string;
    passageId?: string;
    audioUrl?: string;
    audioTitle?: string;
    questionIds: string[];
  }[];
  isBandScored: boolean;
}

export interface QuestionReviewItem {
  questionNum: number;
  question: QuestionItem;
  userAnswer: string;
  isUnanswered: boolean;
  isCorrect: boolean;
}

export interface TestResultRecord {
  attemptId: string;
  testId: string;
  title: string;
  module: string;
  mode: "timed" | "practice";
  submittedAt: string;
  durationTakenSeconds: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  accuracyPct: number;
  bandScore: number | null;
  reviews: QuestionReviewItem[];
}

export interface SavedBookmarkItem {
  id: string;
  type: "Question" | "Lesson" | "Tip" | "Book" | "Vocabulary";
  title: string;
  subtitle: string;
  href: string;
  savedAt: string;
}

export interface ContinueLearningState {
  levelSlug: string;
  levelLabel: string;
  skill: string;
  topic: string;
  lessonTitle: string;
  lessonHref: string;
  progressPct: number;
  updatedAt: string;
}

const STORAGE_KEYS = {
  ACTIVE_ATTEMPTS: "me_active_attempts_v1",
  COMPLETED_RESULTS: "me_completed_results_v1",
  BOOKMARKS: "me_saved_bookmarks_v1",
  CONTINUE_LEARNING: "me_continue_learning_v1",
  COMPLETED_LESSONS: "me_completed_lessons_v1",
  WRITING_SUBMISSIONS: "me_writing_submissions_v1",
};

// ============================================================
// CONFIGURABLE IELTS BAND CONVERSION LOGIC
// ============================================================

export function calculateIELTSBand(correct: number, total: number): number {
  if (total <= 0) return 0;
  // Scale raw score proportionally to a 40-question IELTS scale
  const scaledOutOf40 = Math.round((correct / total) * 40);
  if (scaledOutOf40 >= 39) return 9.0;
  if (scaledOutOf40 >= 37) return 8.5;
  if (scaledOutOf40 >= 35) return 8.0;
  if (scaledOutOf40 >= 33) return 7.5;
  if (scaledOutOf40 >= 30) return 7.0;
  if (scaledOutOf40 >= 27) return 6.5;
  if (scaledOutOf40 >= 23) return 6.0;
  if (scaledOutOf40 >= 19) return 5.5;
  if (scaledOutOf40 >= 15) return 5.0;
  if (scaledOutOf40 >= 13) return 4.5;
  if (scaledOutOf40 >= 10) return 4.0;
  return 3.5;
}

export function isAnswerCorrect(question: QuestionItem, rawUserAnswer: string): boolean {
  const cleaned = (rawUserAnswer || "").trim().toLowerCase();
  if (!cleaned) return false;

  const accepted =
    question.accepted_answers && question.accepted_answers.length > 0
      ? question.accepted_answers.map((a) => a.trim().toLowerCase())
      : [question.correct_answer.trim().toLowerCase()];

  return accepted.includes(cleaned);
}

// ============================================================
// QUESTION & PASSAGE LOOKUP HELPERS (READS DYNAMIC CMS DATA)
// ============================================================

export function getQuestionById(questionId: string): QuestionItem | undefined {
  const cms = getCMSDataSync();
  const found =
    cms.questions.find((q) => q.question_id === questionId) ||
    QUESTION_BANK.find((q) => q.question_id === questionId);
  if (found) return found;

  // Dynamic Cambridge 9-19 question lookup (e.g., "cam-9-test-1-r1")
  const match = questionId.match(/^(cam-\d+-test-\d+)-[rl]\d+$/);
  if (match) {
    const built = buildCambridgeEngineConfig(match[1], "Full Mock");
    return built?.questions.find((q) => q.question_id === questionId);
  }
  return undefined;
}

export function getPassageById(passageId?: string): PassageItem | undefined {
  if (!passageId) return undefined;
  const cms = getCMSDataSync();
  const found =
    cms.passages.find((p) => p.id === passageId) ||
    PASSAGES_DB.find((p) => p.id === passageId);
  if (found) return found;

  // Dynamic Cambridge 9-19 passage lookup (e.g., "passage-cam-9-test-1-reading")
  const match = passageId.match(/^passage-(cam-\d+-test-\d+)-(reading|listening)$/);
  if (match) {
    const built = buildCambridgeEngineConfig(match[1], "Full Mock");
    return built?.passages.find((p) => p.id === passageId);
  }
  return undefined;
}

export function filterQuestionBank(params: {
  category?: string;
  questionType?: IELTSQuestionType | "All";
  difficulty?: DifficultyLevel | "All";
  topic?: string;
  searchQuery?: string;
  limit?: number;
}): QuestionItem[] {
  const cms = getCMSDataSync();
  let list = [...cms.questions];

  if (params.category && params.category !== "All") {
    list = list.filter((q) => q.category.toLowerCase() === params.category!.toLowerCase());
  }
  if (params.questionType && params.questionType !== "All") {
    list = list.filter((q) => q.question_type === params.questionType);
  }
  if (params.difficulty && params.difficulty !== "All") {
    list = list.filter((q) => q.difficulty === params.difficulty);
  }
  if (params.topic && params.topic !== "All") {
    list = list.filter((q) => q.topic.toLowerCase().includes(params.topic!.toLowerCase()));
  }
  if (params.searchQuery && params.searchQuery.trim()) {
    const qStr = params.searchQuery.trim().toLowerCase();
    list = list.filter(
      (q) =>
        q.question_text.toLowerCase().includes(qStr) ||
        q.topic.toLowerCase().includes(qStr) ||
        q.question_type.toLowerCase().includes(qStr)
    );
  }
  if (params.limit && params.limit > 0) {
    list = list.slice(0, params.limit);
  }
  return list;
}

// ============================================================
// TEST ENGINE: CREATE / AUTO-SAVE / RESUME / SUBMIT ATTEMPTS
// ============================================================

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage quota errors
  }
}

export function getAllActiveAttempts(): Record<string, ActiveTestAttempt> {
  return readJson<Record<string, ActiveTestAttempt>>(STORAGE_KEYS.ACTIVE_ATTEMPTS, {});
}

export function getLatestActiveAttempt(): ActiveTestAttempt | null {
  const map = getAllActiveAttempts();
  const list = Object.values(map).sort((a, b) => b.lastSavedAt - a.lastSavedAt);
  return list[0] || null;
}

export function getActiveAttemptById(attemptId: string): ActiveTestAttempt | null {
  const map = getAllActiveAttempts();
  return map[attemptId] || null;
}

export function startCambridgeTestAttempt(
  camTestId: string,
  moduleType: "Reading" | "Listening" | "Full Mock",
  mode: "timed" | "practice" = "timed"
): ActiveTestAttempt {
  const built = buildCambridgeEngineConfig(camTestId, moduleType);
  if (!built) {
    return startStandardTestAttempt("test-full-mock-01", mode);
  }
  const { testConfig, passages } = built;

  const existingMap = getAllActiveAttempts();
  const existing = Object.values(existingMap).find(
    (a) => a.testId === testConfig.id && a.mode === mode
  );
  if (existing && (!existing.expiresAt || existing.expiresAt > Date.now())) {
    return existing;
  }

  const now = Date.now();
  const attemptId = `attempt-${testConfig.id}-${now}`;
  const attempt: ActiveTestAttempt = {
    attemptId,
    testId: testConfig.id,
    title: testConfig.title,
    module: testConfig.module,
    mode,
    startedAt: now,
    expiresAt:
      mode === "timed" ? now + testConfig.durationMinutes * 60 * 1000 : null,
    lastSavedAt: now,
    currentSectionIdx: 0,
    currentQuestionIdx: 0,
    answers: {},
    markedForReview: [],
    sections: testConfig.sections.map((s) => {
      const p = passages.find((pas) => pas.id === s.passageId);
      return {
        id: s.id,
        title: s.title,
        module: testConfig.module,
        passageId: s.passageId,
        audioUrl: p?.audioUrl,
        audioTitle: p?.title,
        questionIds: s.questionIds,
      };
    }),
    isBandScored: true,
  };

  existingMap[attemptId] = attempt;
  writeJson(STORAGE_KEYS.ACTIVE_ATTEMPTS, existingMap);
  return attempt;
}

export function startStandardTestAttempt(
  testId: string,
  mode: "timed" | "practice" = "timed"
): ActiveTestAttempt {
  const testConfig: TestConfig =
    TESTS_DB.find((t) => t.id === testId || t.slug === testId) || TESTS_DB[0];

  // Check if there is already an active attempt for this testId & mode
  const existingMap = getAllActiveAttempts();
  const existing = Object.values(existingMap).find(
    (a) => a.testId === testConfig.id && a.mode === mode
  );
  if (existing) {
    // Check if expired
    if (!existing.expiresAt || existing.expiresAt > Date.now()) {
      return existing;
    }
  }

  const now = Date.now();
  const attemptId = `attempt-${testConfig.id}-${now}`;
  const attempt: ActiveTestAttempt = {
    attemptId,
    testId: testConfig.id,
    title: testConfig.title,
    module: testConfig.module,
    mode,
    startedAt: now,
    expiresAt:
      mode === "timed" ? now + testConfig.durationMinutes * 60 * 1000 : null,
    lastSavedAt: now,
    currentSectionIdx: 0,
    currentQuestionIdx: 0,
    answers: {},
    markedForReview: [],
    sections: testConfig.sections,
    isBandScored: testConfig.isBandScored,
  };

  existingMap[attemptId] = attempt;
  writeJson(STORAGE_KEYS.ACTIVE_ATTEMPTS, existingMap);
  return attempt;
}

export function startCustomQuestionSetAttempt(params: {
  title: string;
  module: string;
  questionIds: string[];
  mode: "timed" | "practice";
  durationMinutes: number;
  isBandScored?: boolean;
}): ActiveTestAttempt {
  const now = Date.now();
  const attemptId = `custom-${now}`;

  // Group questions by passageId if any have a passage
  const firstQ = getQuestionById(params.questionIds[0]);
  const passageId = firstQ?.passage_id;
  const audioUrl = firstQ?.audio_reference;

  const attempt: ActiveTestAttempt = {
    attemptId,
    testId: attemptId,
    title: params.title,
    module: params.module,
    mode: params.mode,
    startedAt: now,
    expiresAt:
      params.mode === "timed" ? now + params.durationMinutes * 60 * 1000 : null,
    lastSavedAt: now,
    currentSectionIdx: 0,
    currentQuestionIdx: 0,
    answers: {},
    markedForReview: [],
    sections: [
      {
        id: "sec-custom-1",
        title: params.title,
        module: params.module,
        passageId,
        audioUrl,
        questionIds: params.questionIds,
      },
    ],
    isBandScored: Boolean(params.isBandScored),
  };

  const existingMap = getAllActiveAttempts();
  existingMap[attemptId] = attempt;
  writeJson(STORAGE_KEYS.ACTIVE_ATTEMPTS, existingMap);
  return attempt;
}

export function startDailyPracticeAttempt(
  setId: string,
  mode: "timed" | "practice" = "timed"
): ActiveTestAttempt {
  const cms = getCMSDataSync();
  const dailySet =
    cms.dailyPractice.find((d) => d.id === setId) ||
    DAILY_PRACTICE_DB.find((d) => d.id === setId) ||
    cms.dailyPractice[0] ||
    DAILY_PRACTICE_DB[0];
  return startCustomQuestionSetAttempt({
    title: dailySet.title,
    module: `Daily Practice · ${dailySet.category}`,
    questionIds: dailySet.questionIds,
    mode,
    durationMinutes: dailySet.durationMinutes,
    isBandScored: dailySet.category === "IELTS",
  });
}

export function autoSaveAttemptState(
  attemptId: string,
  patch: Partial<
    Pick<
      ActiveTestAttempt,
      "answers" | "markedForReview" | "currentSectionIdx" | "currentQuestionIdx"
    >
  >
): ActiveTestAttempt | null {
  const map = getAllActiveAttempts();
  const current = map[attemptId];
  if (!current) return null;

  const updated: ActiveTestAttempt = {
    ...current,
    ...patch,
    lastSavedAt: Date.now(),
  };
  map[attemptId] = updated;
  writeJson(STORAGE_KEYS.ACTIVE_ATTEMPTS, map);
  return updated;
}

export function submitTestAttempt(attemptId: string): TestResultRecord | null {
  const map = getAllActiveAttempts();
  const attempt = map[attemptId];
  if (!attempt) {
    // Check if already submitted
    const existingResult = getResultByAttemptId(attemptId);
    return existingResult;
  }

  const allQuestionIds = attempt.sections.flatMap((s) => s.questionIds);
  const reviews: QuestionReviewItem[] = [];

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  allQuestionIds.forEach((qId, idx) => {
    const q = getQuestionById(qId);
    if (!q) return;
    const userAnswer = (attempt.answers[qId] || "").trim();
    const isUnanswered = userAnswer.length === 0;
    const isCorrect = !isUnanswered && isAnswerCorrect(q, userAnswer);

    if (isUnanswered) {
      unansweredCount++;
    } else if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    reviews.push({
      questionNum: idx + 1,
      question: q,
      userAnswer,
      isUnanswered,
      isCorrect,
    });
  });

  const totalQuestions = reviews.length;
  const accuracyPct =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const durationTakenSeconds = Math.max(
    1,
    Math.round((Date.now() - attempt.startedAt) / 1000)
  );

  const resultRecord: TestResultRecord = {
    attemptId: attempt.attemptId,
    testId: attempt.testId,
    title: attempt.title,
    module: attempt.module,
    mode: attempt.mode,
    submittedAt: new Date().toISOString(),
    durationTakenSeconds,
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    accuracyPct,
    bandScore: attempt.isBandScored
      ? calculateIELTSBand(correctCount, totalQuestions)
      : null,
    reviews,
  };

  // Save to completed results & remove from active attempts
  const results = getAllCompletedResults();
  writeJson(STORAGE_KEYS.COMPLETED_RESULTS, [resultRecord, ...results]);

  delete map[attemptId];
  writeJson(STORAGE_KEYS.ACTIVE_ATTEMPTS, map);

  return resultRecord;
}

export function getAllCompletedResults(): TestResultRecord[] {
  const stored = readJson<TestResultRecord[]>(STORAGE_KEYS.COMPLETED_RESULTS, []);
  if (stored.length > 0) return stored;

  // Provide 1 realistic initial demo result so the user can immediately inspect Results & Mistake Review
  const demoQuestions = [
    QUESTION_BANK[0],
    QUESTION_BANK[1],
    QUESTION_BANK[2],
    QUESTION_BANK[7],
  ];
  const demoReviews: QuestionReviewItem[] = [
    {
      questionNum: 1,
      question: demoQuestions[0],
      userAnswer: "TRUE",
      isUnanswered: false,
      isCorrect: true,
    },
    {
      questionNum: 2,
      question: demoQuestions[1],
      userAnswer: "TRUE",
      isUnanswered: false,
      isCorrect: false,
    },
    {
      questionNum: 3,
      question: demoQuestions[2],
      userAnswer: "FALSE",
      isUnanswered: false,
      isCorrect: false,
    },
    {
      questionNum: 4,
      question: demoQuestions[3],
      userAnswer: "biomass",
      isUnanswered: false,
      isCorrect: true,
    },
  ];

  return [
    {
      attemptId: "demo-attempt-reading-1",
      testId: "test-reading-academic-01",
      title: "IELTS Academic Reading Practice Test #1",
      module: "Reading",
      mode: "timed",
      submittedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
      durationTakenSeconds: 1140,
      totalQuestions: 4,
      correctCount: 2,
      incorrectCount: 2,
      unansweredCount: 0,
      accuracyPct: 50,
      bandScore: 6.0,
      reviews: demoReviews,
    },
  ];
}

export function getResultByAttemptId(attemptId: string): TestResultRecord | null {
  const all = getAllCompletedResults();
  return all.find((r) => r.attemptId === attemptId) || all[0] || null;
}

// ============================================================
// BOOKMARKS / SAVED ITEMS MANAGER
// ============================================================

export function getSavedBookmarks(): SavedBookmarkItem[] {
  const stored = readJson<SavedBookmarkItem[]>(STORAGE_KEYS.BOOKMARKS, []);
  if (stored.length > 0) return stored;
  return [
    {
      id: "tip-1",
      type: "Tip",
      title: "How to Never Confuse FALSE and NOT GIVEN in IELTS Reading",
      subtitle: "Reading Strategy · 4 min read",
      href: "/tips/true-false-not-given-golden-rules",
      savedAt: "Today",
    },
    {
      id: "lesson-inter-conditionals",
      type: "Lesson",
      title: "Conditionals: Zero, First, Second & Third Conditionals",
      subtitle: "Intermediate · Grammar",
      href: "/english/intermediate?lesson=conditionals-zero-first-second-third",
      savedAt: "Yesterday",
    },
  ];
}

export function isItemBookmarked(id: string): boolean {
  return getSavedBookmarks().some((b) => b.id === id);
}

export function toggleBookmarkItem(item: Omit<SavedBookmarkItem, "savedAt">): boolean {
  const current = getSavedBookmarks();
  const exists = current.some((b) => b.id === item.id);
  if (exists) {
    const next = current.filter((b) => b.id !== item.id);
    writeJson(STORAGE_KEYS.BOOKMARKS, next);
    return false;
  } else {
    const next: SavedBookmarkItem[] = [
      { ...item, savedAt: "Just now" },
      ...current,
    ];
    writeJson(STORAGE_KEYS.BOOKMARKS, next);
    return true;
  }
}

// ============================================================
// CONTINUE WHERE YOU LEFT OFF ("CONTINUE LEARNING") MANAGER
// ============================================================

export function getContinueLearningState(): ContinueLearningState {
  return readJson<ContinueLearningState>(STORAGE_KEYS.CONTINUE_LEARNING, {
    levelSlug: "intermediate",
    levelLabel: "Intermediate",
    skill: "Grammar",
    topic: "Conditionals",
    lessonTitle: "Conditionals: Zero, First, Second & Third Conditionals",
    lessonHref: "/english/intermediate?lesson=conditionals-zero-first-second-third",
    progressPct: 65,
    updatedAt: "Today",
  });
}

export function saveContinueLearningState(state: ContinueLearningState): void {
  writeJson(STORAGE_KEYS.CONTINUE_LEARNING, state);
}

export function getCompletedLessonIds(): string[] {
  return readJson<string[]>(STORAGE_KEYS.COMPLETED_LESSONS, [
    "lesson-basic-present-simple",
  ]);
}

export function toggleLessonCompleted(lessonId: string): string[] {
  const current = getCompletedLessonIds();
  const next = current.includes(lessonId)
    ? current.filter((id) => id !== lessonId)
    : [...current, lessonId];
  writeJson(STORAGE_KEYS.COMPLETED_LESSONS, next);
  return next;
}

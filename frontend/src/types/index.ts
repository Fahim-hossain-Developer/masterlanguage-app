// ─── Core Entity Types ───────────────────────────────────────────────────────

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export type TrackType =
  | "FOUNDATION_A1"
  | "FOUNDATION_A2"
  | "INTERMEDIATE_B1"
  | "UPPER_INTERMEDIATE_B2"
  | "ADVANCED_C1"
  | "IELTS_ACADEMIC"
  | "IELTS_GENERAL"
  | "SPOKEN_ENGLISH";

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type SubscriptionPlan = "FREE" | "PREMIUM" | "PRO";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED" | "TRIAL";

export interface Profile {
  name: string;
  avatarUrl?: string;
  targetTrack?: TrackType;
  currentCEFR?: CEFRLevel;
  targetBand?: number; // Target IELTS band (e.g. 7.5)
  examDate?: string; // ISO date string
  phone?: string;
  country?: string;
  timezone?: string;
  nativeLanguage?: string;
  bio?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: Profile;
  subscription?: Subscription;
  createdAt: string;
  updatedAt: string;
}

// ─── Course & Lesson ─────────────────────────────────────────────────────────

export type CourseCategory =
  | "FOUNDATION_GRAMMAR"
  | "FOUNDATION_VOCABULARY"
  | "SPOKEN_ENGLISH"
  | "PRONUNCIATION"
  | "IELTS_READING"
  | "IELTS_WRITING"
  | "IELTS_LISTENING"
  | "IELTS_SPEAKING";

export type DifficultyLevel =
  | "BEGINNER"
  | "ELEMENTARY"
  | "INTERMEDIATE"
  | "UPPER_INTERMEDIATE"
  | "ADVANCED";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  difficulty: DifficultyLevel;
  trackType: TrackType;
  cefrLevel?: CEFRLevel;
  thumbnailUrl?: string;
  totalLessons: number;
  estimatedHours: number;
  enrolledCount: number;
  rating: number;
  ratingCount: number;
  isPremium: boolean;
  instructorId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type LessonType =
  | "VIDEO"
  | "READING"
  | "QUIZ"
  | "GRAMMAR_LAB"
  | "WRITING_TASK"
  | "SPEAKING_PRACTICE"
  | "VOCABULARY_SRS";

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: LessonType;
  content: string; // HTML / markdown
  videoUrl?: string;
  audioUrl?: string;
  duration: number; // in seconds
  order: number;
  isPremium: boolean;
  points: number;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // seconds
  lastAccessedAt: string;
  completedAt?: string;
}

// ─── Foundation: Grammar & Vocab ──────────────────────────────────────────────

export interface GrammarTopic {
  id: string;
  level: CEFRLevel;
  title: string;
  slug: string;
  summaryEn: string;
  summaryBn?: string;
  contentEn: string;
  contentBn?: string;
  ruleExamples: Array<{ rule: string; example: string; translation?: string }>;
  commonErrors?: Array<{ incorrect: string; correct: string; explanation: string }>;
  exercisesCount: number;
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  level: CEFRLevel;
  definitionEn: string;
  definitionBn?: string;
  exampleSentence: string;
  exampleTranslation?: string;
  collocations: string[];
  synonyms: string[];
  audioUrl?: string;
  isAcademicWordList: boolean;
}

export interface SRSCard {
  id: string;
  userId: string;
  vocabId: string;
  vocab: VocabularyItem;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  dueAt: string;
  lastReviewedAt?: string;
}

// ─── Tests & Evaluations ─────────────────────────────────────────────────────

export type TestType =
  | "PLACEMENT_DIAGNOSTIC"
  | "IELTS_ACADEMIC_FULL"
  | "IELTS_GENERAL_FULL"
  | "IELTS_READING"
  | "IELTS_WRITING"
  | "IELTS_LISTENING"
  | "IELTS_SPEAKING"
  | "GRAMMAR_CHECK"
  | "VOCAB_QUIZ";

export type TestStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "ABANDONED";

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  testType: TestType;
  status: TestStatus;
  score?: number;
  bandScore?: number;
  startedAt: string;
  completedAt?: string;
  timeSpent?: number; // seconds
  answers: TestAnswer[];
  aiEvaluation?: AIEvaluation;
}

export interface TestAnswer {
  questionId: string;
  userAnswer: string;
  isCorrect?: boolean;
  score?: number;
  maxScore?: number;
}

export interface AIEvaluation {
  id: string;
  attemptId: string;
  overallScore: number;
  taskAchievement?: number;
  coherenceCohesion?: number;
  lexicalResource?: number;
  grammaticalRange?: number;
  pronunciation?: number;
  fluency?: number;
  feedback: string;
  suggestions: string[];
  highlightedErrors?: ErrorHighlight[];
  improvements?: Array<{ original: string; improved: string; reason: string }>;
  createdAt: string;
}

export interface ErrorHighlight {
  text: string;
  type: "grammar" | "vocabulary" | "spelling" | "coherence";
  suggestion: string;
  explanation: string;
}

// ─── Subscription ────────────────────────────────────────────────────────────

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod?: string;
  createdAt: string;
}

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  priceBDT: number;
  priceUSD: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// ─── Activity & Stats ────────────────────────────────────────────────────────

export interface StudyActivity {
  id: string;
  userId: string;
  type:
    | "LESSON_COMPLETED"
    | "TEST_TAKEN"
    | "VOCABULARY_PRACTICED"
    | "SPEAKING_SESSION"
    | "GRAMMAR_EXERCISE"
    | "AI_FEEDBACK";
  description: string;
  metadata?: Record<string, unknown>;
  points: number;
  createdAt: string;
}

export interface UserStats {
  totalStudyHours: number;
  studyStreak: number;
  longestStreak: number;
  totalPoints: number;
  testsCompleted: number;
  lessonsCompleted: number;
  currentBand?: number;
  currentCEFR?: CEFRLevel;
  weeklyGoalMinutes: number;
  weeklyStudiedMinutes: number;
}

export interface WeakArea {
  category: string;
  score: number;
  maxScore: number;
}

export interface StudyPlanItem {
  id: string;
  title: string;
  type: LessonType | "TEST";
  duration: number; // in minutes
  completed: boolean;
}

// ─── API & Auth Types ────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  path?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  targetTrack?: TrackType;
  phone?: string;
}

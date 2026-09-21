// ─── Core Entity Types ───────────────────────────────────────────────────────

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";
export type ExamType =
  | "IELTS_ACADEMIC"
  | "IELTS_GENERAL"
  | "JLPT_N1"
  | "JLPT_N2"
  | "JLPT_N3"
  | "JLPT_N4"
  | "JLPT_N5";
export type SubscriptionPlan = "FREE" | "PREMIUM" | "PRO";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED" | "TRIAL";

export interface Profile {
  name: string;
  avatarUrl?: string;
  targetExam?: ExamType;
  targetScore?: number; // IELTS band (0-9) or JLPT level (1-5)
  examDate?: string; // ISO date string
  phone?: string;
  country?: string;
  timezone?: string;
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
  | "IELTS_READING"
  | "IELTS_WRITING"
  | "IELTS_LISTENING"
  | "IELTS_SPEAKING"
  | "JLPT_VOCABULARY"
  | "JLPT_GRAMMAR"
  | "JLPT_KANJI"
  | "JLPT_READING"
  | "JLPT_LISTENING";

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
  | "WRITING_TASK"
  | "SPEAKING_PRACTICE"
  | "VOCABULARY"
  | "GRAMMAR";

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

// ─── Tests & Evaluations ─────────────────────────────────────────────────────

export type TestType =
  | "IELTS_FULL"
  | "IELTS_READING"
  | "IELTS_WRITING"
  | "IELTS_LISTENING"
  | "IELTS_SPEAKING"
  | "JLPT_MOCK"
  | "JLPT_VOCABULARY"
  | "JLPT_GRAMMAR";

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
  price: number; // USD per month
  annualPrice?: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// ─── Vocabulary & Flashcards ─────────────────────────────────────────────────

export interface VocabularyItem {
  id: string;
  word: string;
  reading?: string; // furigana for Japanese
  meaning: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  imageUrl?: string;
  audioUrl?: string;
  jlptLevel?: "N1" | "N2" | "N3" | "N4" | "N5";
  ieltsFrequency?: "HIGH" | "MEDIUM" | "LOW";
  tags: string[];
}

export interface FlashcardDeck {
  id: string;
  userId: string;
  name: string;
  description?: string;
  totalCards: number;
  dueCount: number;
  masteredCount: number;
  createdAt: string;
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
  currentLevel?: string;
  weeklyGoalMinutes: number;
  weeklyStudiedMinutes: number;
}

export interface WeakArea {
  category: string;
  score: number;
  maxScore: number;
  lastPracticed?: string;
}

export interface StudyPlanItem {
  id: string;
  title: string;
  type: LessonType;
  duration: number; // minutes
  completed: boolean;
  courseId?: string;
  lessonId?: string;
}

// ─── Community ───────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  authorId: string;
  author: Pick<User, "id" | "email" | "profile">;
  title: string;
  content: string;
  category: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: Pick<User, "id" | "email" | "profile">;
  content: string;
  likesCount: number;
  createdAt: string;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  targetExam?: ExamType;
  phone?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

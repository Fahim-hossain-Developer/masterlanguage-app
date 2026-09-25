export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export type ContentSourceType =
  | "Original"
  | "Licensed"
  | "User-provided"
  | "Authorized Educational";

export type QuestionModule =
  | "IELTS_READING"
  | "IELTS_LISTENING"
  | "IELTS_WRITING"
  | "IELTS_SPEAKING"
  | "ENGLISH_GRAMMAR"
  | "ENGLISH_VOCABULARY"
  | "ENGLISH_READING"
  | "DAILY_PRACTICE";

export type IELTSQuestionType =
  | "Multiple Choice"
  | "True / False / Not Given"
  | "Yes / No / Not Given"
  | "Matching Headings"
  | "Matching Information"
  | "Matching Features"
  | "Sentence Completion"
  | "Summary Completion"
  | "Note Completion"
  | "Table Completion"
  | "Diagram Label Completion"
  | "Form Completion"
  | "Map Labeling"
  | "Short Answer"
  | "Fill in the Blank"
  | "Meaning Selection"
  | "Writing Task 1"
  | "Writing Task 2"
  | "Speaking Part 1"
  | "Speaking Part 2"
  | "Speaking Part 3";

export interface PassageItem {
  id: string;
  title: string;
  subtitle?: string;
  module: "IELTS_READING" | "ENGLISH_READING";
  difficulty: DifficultyLevel;
  topic: string;
  source: ContentSourceType;
  paragraphs: { label?: string; text: string }[];
}

export interface QuestionItem {
  question_id: string;
  module: QuestionModule;
  category: "Reading" | "Listening" | "Writing" | "Speaking" | "Grammar" | "Vocabulary";
  question_type: IELTSQuestionType;
  difficulty: DifficultyLevel;
  topic: string;
  source: ContentSourceType;
  test_id?: string;
  passage_id?: string;
  section: string;
  instruction?: string;
  question_text: string;
  options?: { label: string; text: string }[];
  correct_answer: string;
  accepted_answers?: string[];
  explanation: string;
  explanation_bn?: string;
  audio_reference?: string;
  created_at: string;
}

export interface TestConfig {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  module: "Full Mock" | "Reading" | "Listening" | "Writing" | "Speaking" | "Question Types" | "Daily Practice";
  difficulty: DifficultyLevel;
  durationMinutes: number;
  source: ContentSourceType;
  totalQuestions: number;
  isBandScored: boolean;
  instructions: string[];
  sections: {
    id: string;
    title: string;
    module: string;
    durationMinutes: number;
    passageId?: string;
    audioUrl?: string;
    audioTitle?: string;
    questionIds: string[];
  }[];
}

// ============================================================
// PASSAGES REPOSITORY
// ============================================================

export const PASSAGES_DB: PassageItem[] = [
  {
    id: "passage-urban-forests",
    title: "The Rise of Urban Micro-Forests in Modern Megacities",
    subtitle:
      "How the Miyawaki method of dense native planting is transforming heat islands in South Asia and Europe.",
    module: "IELTS_READING",
    difficulty: "Medium",
    topic: "Environment & Urban Planning",
    source: "Original",
    paragraphs: [
      {
        label: "A",
        text: "Over the past two decades, rapid urbanization across South Asia and Europe has replaced permeable soil with heat-absorbing concrete and asphalt. As a consequence, metropolitan centers regularly experience the 'urban heat island' effect, recording temperatures up to five degrees Celsius higher than surrounding rural districts. In response, municipal planners have increasingly turned away from decorative lawns toward dense, fast-growing 'micro-forests' modeled on the research of Japanese botanist Akira Miyawaki.",
      },
      {
        label: "B",
        text: "Unlike conventional city parks where saplings are planted several meters apart, the Miyawaki technique involves planting three to four native tree species per square meter after deeply enriching the soil with organic biomass. Because the young trees compete intensely for sunlight from the very beginning, their vertical growth rate accelerates dramatically. Field studies conducted in the Netherlands and Bangladesh indicate that such micro-forests establish a self-sustaining canopy in just three years, compared with twenty to thirty years for traditional plantations.",
      },
      {
        label: "C",
        text: "Critics initially argued that crowding saplings so closely would stunt root development and increase vulnerability to seasonal drought. However, soil moisture monitoring in Dhaka and Rotterdam revealed the opposite: the dense multi-layered canopy shields the forest floor from direct solar radiation, while interlocking fungal networks beneath the surface retain rainwater far more effectively than isolated street trees.",
      },
      {
        label: "D",
        text: "Beyond cooling local neighborhoods, urban micro-forests serve as vital acoustic buffers and biodiversity corridors. Acoustic engineers measuring traffic noise along arterial highways found that a ten-meter-wide belt of multi-layered native vegetation reduced high-frequency traffic noise by nearly seven decibels. At the same time, entomologists documented a fourfold increase in native pollinator species within eighteen months of planting.",
      },
      {
        label: "E",
        text: "Despite these ecological benefits, large-scale adoption faces economic hurdles. Preparing compacted urban soil requires mechanical excavation and significant quantities of compost, making initial installation roughly twice as expensive per square meter as conventional turf grass. Yet municipal economists point out that once a micro-forest matures after thirty-six months, it requires zero irrigation, mowing, or chemical fertilizer—ultimately cutting ten-year maintenance budgets by more than sixty percent.",
      },
    ],
  },
  {
    id: "passage-maritime-chronometers",
    title: "Solving Longitude: Precision Timekeeping at Sea",
    subtitle:
      "The eighteenth-century quest to determine a ship's east-west position across open oceans.",
    module: "IELTS_READING",
    difficulty: "Hard",
    topic: "History of Science",
    source: "Original",
    paragraphs: [
      {
        label: "A",
        text: "For centuries, ocean navigators could calculate their latitude—their north-south position—with reasonable accuracy by measuring the angle of the sun or pole star above the horizon. Determining longitude, however, remained an intractable problem. Because the Earth rotates fifteen degrees every hour, knowing one's east-west coordinates required comparing local solar time on board the vessel with the exact time at a reference meridian simultaneously.",
      },
      {
        label: "B",
        text: "Pendulum clocks, which kept reliable time on land, were rendered useless on rolling ship decks where gravity and motion constantly fluctuated. In 1714, following a series of catastrophic naval shipwrecks, Parliament enacted the Longitude Act, offering a prize of twenty thousand pounds to anyone who could devise a practical method of determining longitude within thirty nautical miles.",
      },
      {
        label: "C",
        text: "While prominent astronomers favored the 'lunar distance' method—which required complex mathematical tables and clear night skies—a self-taught Yorkshire carpenter named John Harrison pursued a mechanical solution. Over three decades, Harrison engineered a sequence of marine timekeepers that replaced the pendulum with counter-balancing spring mechanisms and bimetallic strips that automatically compensated for temperature expansion.",
      },
      {
        label: "D",
        text: "His fourth timepiece, known today as H4, resembled an oversized pocket watch measuring just thirteen centimeters in diameter. During a transatlantic trial voyage to Jamaica in 1761, H4 lost only five seconds across eighty-one days at sea—an accuracy corresponding to roughly one nautical mile, far surpassing the strict threshold stipulated by the Longitude Act.",
      },
    ],
  },
];

// ============================================================
// UNIFIED QUESTION BANK REPOSITORY
// ============================================================

export const QUESTION_BANK: QuestionItem[] = [
  // --- READING PASSAGE 1: TRUE / FALSE / NOT GIVEN (Q1 - Q4) ---
  {
    question_id: "qb-read-001",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "True / False / Not Given",
    difficulty: "Easy",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction:
      "Do the following statements agree with the information given in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.",
    question_text:
      "Urban areas often record temperatures up to five degrees Celsius warmer than nearby rural regions.",
    options: [
      { label: "TRUE", text: "TRUE" },
      { label: "FALSE", text: "FALSE" },
      { label: "NOT GIVEN", text: "NOT GIVEN" },
    ],
    correct_answer: "TRUE",
    explanation:
      "Paragraph A explicitly states that metropolitan centers regularly record temperatures 'up to five degrees Celsius higher than surrounding rural districts.'",
    explanation_bn:
      "প্যারাগ্রাফ A-তে স্পষ্ট বলা আছে যে শহরের তাপমাত্রা আশেপাশের গ্রামীণ এলাকার চেয়ে ৫ ডিগ্রি সেলসিয়াস পর্যন্ত বেশি হতে পারে। তাই উত্তর TRUE।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-002",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "True / False / Not Given",
    difficulty: "Medium",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction:
      "Do the following statements agree with the information given in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.",
    question_text:
      "Traditional tree plantations typically become self-sustaining within three years of planting.",
    options: [
      { label: "TRUE", text: "TRUE" },
      { label: "FALSE", text: "FALSE" },
      { label: "NOT GIVEN", text: "NOT GIVEN" },
    ],
    correct_answer: "FALSE",
    explanation:
      "Paragraph B states that Miyawaki micro-forests become self-sustaining in three years, whereas traditional plantations require 'twenty to thirty years.'",
    explanation_bn:
      "প্যারাগ্রাফ B অনুযায়ী ৩ বছরে স্বয়ংসম্পূর্ণ হয় মিয়াওয়াকি বন, কিন্তু সাধারণ বৃক্ষরোপণে ২০ থেকে ৩০ বছর সময় লাগে। তাই এটি FALSE।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-003",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "True / False / Not Given",
    difficulty: "Medium",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction:
      "Do the following statements agree with the information given in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.",
    question_text:
      "Akira Miyawaki personally supervised the first urban micro-forest project in Rotterdam.",
    options: [
      { label: "TRUE", text: "TRUE" },
      { label: "FALSE", text: "FALSE" },
      { label: "NOT GIVEN", text: "NOT GIVEN" },
    ],
    correct_answer: "NOT GIVEN",
    explanation:
      "Although Rotterdam is mentioned in Paragraph C and Akira Miyawaki is mentioned in Paragraph A, the passage never states whether he personally supervised the Rotterdam project.",
    explanation_bn:
      "প্যাসেজে রটারডাম এবং মিয়াওয়াকির নাম থাকলেও তিনি নিজে রটারডামের প্রজেক্ট তদারকি করেছিলেন কি না তা উল্লেখ নেই। তাই উত্তর NOT GIVEN।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-004",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "True / False / Not Given",
    difficulty: "Hard",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction:
      "Do the following statements agree with the information given in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.",
    question_text:
      "Installing a Miyawaki micro-forest initially costs less per square meter than planting ordinary turf grass.",
    options: [
      { label: "TRUE", text: "TRUE" },
      { label: "FALSE", text: "FALSE" },
      { label: "NOT GIVEN", text: "NOT GIVEN" },
    ],
    correct_answer: "FALSE",
    explanation:
      "Paragraph E notes that initial installation is 'roughly twice as expensive per square meter as conventional turf grass.'",
    explanation_bn:
      "প্যারাগ্রাফ E-তে বলা হয়েছে শুরুতে এই বন তৈরির খরচ সাধারণ ঘাস লাগানোর চেয়ে প্রায় দ্বিগুণ। তাই উত্তর FALSE।",
    created_at: "2026-09-25",
  },

  // --- READING PASSAGE 1: MATCHING HEADINGS (Q5 - Q7) ---
  {
    question_id: "qb-read-005",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Matching Headings",
    difficulty: "Medium",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction:
      "Choose the correct heading for Paragraph B from the list of headings below.",
    question_text: "Select the most suitable heading for Paragraph B:",
    options: [
      { label: "i", text: "i. Long-term financial savings despite high initial costs" },
      { label: "ii", text: "ii. How dense planting accelerates canopy formation" },
      { label: "iii", text: "iii. Noise reduction and wildlife recovery in cities" },
      { label: "iv", text: "iv. Why soil moisture concerns proved unfounded" },
    ],
    correct_answer: "ii",
    explanation:
      "Paragraph B explains how planting 3–4 native species per square meter creates competition for sunlight and accelerates vertical canopy formation to just 3 years.",
    explanation_bn:
      "প্যারাগ্রাফ B-তে ঘন করে গাছ লাগানোর ফলে কীভাবে সূর্যের আলোর প্রতিযোগিতায় দ্রুত ক্যানোপি তৈরি হয় তা ব্যাখ্যা করা হয়েছে।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-006",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Matching Headings",
    difficulty: "Medium",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction:
      "Choose the correct heading for Paragraph D from the list of headings below.",
    question_text: "Select the most suitable heading for Paragraph D:",
    options: [
      { label: "i", text: "i. Long-term financial savings despite high initial costs" },
      { label: "ii", text: "ii. How dense planting accelerates canopy formation" },
      { label: "iii", text: "iii. Noise reduction and wildlife recovery in cities" },
      { label: "iv", text: "iv. Why soil moisture concerns proved unfounded" },
    ],
    correct_answer: "iii",
    explanation:
      "Paragraph D focuses on two benefits: acoustic buffering (7 dB traffic noise reduction) and a fourfold increase in native pollinator species.",
    explanation_bn:
      "প্যারাগ্রাফ D-তে শব্দদূষণ কমানো এবং পরাগায়নকারী পতঙ্গের সংখ্যা চারগুণ বৃদ্ধির কথা বলা হয়েছে।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-007",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Matching Headings",
    difficulty: "Easy",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction:
      "Choose the correct heading for Paragraph E from the list of headings below.",
    question_text: "Select the most suitable heading for Paragraph E:",
    options: [
      { label: "i", text: "i. Long-term financial savings despite high initial costs" },
      { label: "ii", text: "ii. How dense planting accelerates canopy formation" },
      { label: "iii", text: "iii. Noise reduction and wildlife recovery in cities" },
      { label: "iv", text: "iv. Why soil moisture concerns proved unfounded" },
    ],
    correct_answer: "i",
    explanation:
      "Paragraph E contrasts the double initial installation cost with the 60% reduction in 10-year maintenance budgets.",
    explanation_bn:
      "প্যারাগ্রাফ E-তে শুরুর দ্বিগুণ খরচ এবং পরবর্তীতে ১০ বছরে রক্ষণাবেক্ষণ খরচ ৬০% কমে যাওয়ার হিসাব দেওয়া হয়েছে।",
    created_at: "2026-09-25",
  },

  // --- READING PASSAGE 1: NOTE COMPLETION (Q8 - Q10) ---
  {
    question_id: "qb-read-008",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Note Completion",
    difficulty: "Medium",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction: "Complete the notes below. Write ONE WORD ONLY from the passage.",
    question_text:
      "Before planting a micro-forest, urban soil is deeply enriched with organic __________.",
    correct_answer: "biomass",
    accepted_answers: ["biomass"],
    explanation:
      "Paragraph B states: '...after deeply enriching the soil with organic biomass.'",
    explanation_bn: "প্যারাগ্রাফ B-তে সরাসরি 'organic biomass' শব্দটি আছে।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-009",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Note Completion",
    difficulty: "Medium",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction: "Complete the notes below. Write ONE WORD ONLY from the passage.",
    question_text:
      "Underground __________ networks help micro-forests retain rainwater more effectively than single street trees.",
    correct_answer: "fungal",
    accepted_answers: ["fungal"],
    explanation:
      "Paragraph C mentions 'interlocking fungal networks beneath the surface retain rainwater far more effectively.'",
    explanation_bn: "প্যারাগ্রাফ C অনুযায়ী মাটির নিচে 'fungal' নেটওয়ার্ক বৃষ্টির পানি ধরে রাখে।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-010",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Note Completion",
    difficulty: "Hard",
    topic: "Environment & Urban Planning",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-urban-forests",
    section: "Part 1",
    instruction: "Complete the notes below. Write ONE WORD ONLY from the passage.",
    question_text:
      "Preparing compacted city ground requires mechanical excavation and large amounts of __________.",
    correct_answer: "compost",
    accepted_answers: ["compost"],
    explanation:
      "Paragraph E states: 'Preparing compacted urban soil requires mechanical excavation and significant quantities of compost.'",
    explanation_bn: "প্যারাগ্রাফ E অনুযায়ী মাটি প্রস্তুত করতে প্রচুর 'compost' প্রয়োজন হয়।",
    created_at: "2026-09-25",
  },

  // --- READING PASSAGE 2: MULTIPLE CHOICE & SENTENCE COMPLETION (Q11 - Q13) ---
  {
    question_id: "qb-read-011",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Multiple Choice",
    difficulty: "Hard",
    topic: "History of Science",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-maritime-chronometers",
    section: "Part 2",
    instruction: "Choose the correct letter, A, B, C, or D.",
    question_text:
      "Why did pendulum clocks fail to work accurately aboard ocean-going vessels?",
    options: [
      { label: "A", text: "Salt air corroded their brass gears within weeks." },
      { label: "B", text: "The rolling motion of the ship disrupted gravity-dependent pendulums." },
      { label: "C", text: "Sailors could not see the sun on cloudy days to reset them." },
      { label: "D", text: "They were too heavy to transport on wooden ships." },
    ],
    correct_answer: "B",
    explanation:
      "Paragraph B explains that pendulum clocks were rendered useless on rolling ship decks where gravity and motion constantly fluctuated.",
    explanation_bn:
      "প্যারাগ্রাফ B-তে বলা হয়েছে সমুদ্রের ঢেউয়ে জাহাজের দুলুনির কারণে পেন্ডুলাম ঘড়ি ঠিকমতো কাজ করত না।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-read-012",
    module: "IELTS_READING",
    category: "Reading",
    question_type: "Sentence Completion",
    difficulty: "Hard",
    topic: "History of Science",
    source: "Original",
    test_id: "test-reading-academic-01",
    passage_id: "passage-maritime-chronometers",
    section: "Part 2",
    instruction: "Complete the sentence below. Write ONE WORD ONLY from the passage.",
    question_text:
      "John Harrison used __________ strips inside his timekeepers to compensate automatically for temperature changes.",
    correct_answer: "bimetallic",
    accepted_answers: ["bimetallic"],
    explanation:
      "Paragraph C states that Harrison used 'bimetallic strips that automatically compensated for temperature expansion.'",
    explanation_bn: "তাপমাত্রার পরিবর্তন সামলাতে হ্যারিসন 'bimetallic' স্ট্রিপ ব্যবহার করেছিলেন।",
    created_at: "2026-09-25",
  },

  // --- IELTS LISTENING QUESTIONS (Q14 - Q18) ---
  {
    question_id: "qb-list-001",
    module: "IELTS_LISTENING",
    category: "Listening",
    question_type: "Form Completion",
    difficulty: "Easy",
    topic: "University Accommodation Booking",
    source: "Original",
    test_id: "test-listening-01",
    section: "Section 1",
    instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
    question_text: "Applicant Surname: __________ (Spelled: H-E-N-D-E-R-S-O-N)",
    correct_answer: "Henderson",
    accepted_answers: ["henderson", "Henderson"],
    explanation:
      "In the Section 1 dialogue, the student spells out her surname letter by letter: H-E-N-D-E-R-S-O-N.",
    explanation_bn: "কথোপকথনে শিক্ষার্থী তার নামের বানান H-E-N-D-E-R-S-O-N স্পষ্টভাবে বলেছে।",
    audio_reference: "/audio/demo-listening-sec1.mp3",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-list-002",
    module: "IELTS_LISTENING",
    category: "Listening",
    question_type: "Form Completion",
    difficulty: "Easy",
    topic: "University Accommodation Booking",
    source: "Original",
    test_id: "test-listening-01",
    section: "Section 1",
    instruction: "Write ONE WORD AND/OR A NUMBER for each answer.",
    question_text: "Preferred Hall of Residence: __________ Hall (quiet zone near library)",
    correct_answer: "Oakwood",
    accepted_answers: ["oakwood", "Oakwood"],
    explanation:
      "The applicant initially asks about Riverside Hall, but chooses Oakwood Hall after learning it has a quiet study zone next to the main library.",
    explanation_bn:
      "প্রথমে Riverside Hall-এর কথা বললেও লাইব্রেরির পাশে নীরব পরিবেশের কারণে সে Oakwood Hall বেছে নেয় (Distractor trap)।",
    audio_reference: "/audio/demo-listening-sec1.mp3",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-list-003",
    module: "IELTS_LISTENING",
    category: "Listening",
    question_type: "Form Completion",
    difficulty: "Medium",
    topic: "University Accommodation Booking",
    source: "Original",
    test_id: "test-listening-01",
    section: "Section 1",
    instruction: "Write A NUMBER for the answer.",
    question_text: "Monthly Rent Including Utilities: £__________",
    correct_answer: "485",
    accepted_answers: ["485", "£485"],
    explanation:
      "The officer mentions £450 base rent, then clarifies that with heating and internet included the total monthly fee is £485.",
    explanation_bn: "মূল ভাড়া ৪৫০ পাউন্ড হলেও ইউটিলিটি ও ইন্টারনেটসহ মোট ভাড়া ৪৮৫ পাউন্ড।",
    audio_reference: "/audio/demo-listening-sec1.mp3",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-list-004",
    module: "IELTS_LISTENING",
    category: "Listening",
    question_type: "Multiple Choice",
    difficulty: "Medium",
    topic: "Campus Orientation Tour",
    source: "Original",
    test_id: "test-listening-01",
    section: "Section 2",
    instruction: "Choose the correct letter, A, B, or C.",
    question_text:
      "When is the Science Faculty Laboratory safety briefing mandatory for new students?",
    options: [
      { label: "A", text: "Wednesday afternoon at 2:00 PM" },
      { label: "B", text: "Thursday morning at 9:30 AM" },
      { label: "C", text: "Friday morning at 11:00 AM" },
    ],
    correct_answer: "B",
    explanation:
      "The speaker corrects the printed brochure schedule, noting that Wednesday's session was moved to Thursday morning at 9:30 AM.",
    explanation_bn: "ব্রোশিওরে বুধবার লেখা থাকলেও বক্তা জানান যে তা পরিবর্তন করে বৃহস্পতিবার সকাল ৯:৩০-এ নেওয়া হয়েছে।",
    audio_reference: "/audio/demo-listening-sec1.mp3",
    created_at: "2026-09-25",
  },

  // --- ENGLISH GRAMMAR & VOCABULARY QUESTIONS (For English Learning & Daily Practice) ---
  {
    question_id: "qb-gram-001",
    module: "ENGLISH_GRAMMAR",
    category: "Grammar",
    question_type: "Multiple Choice",
    difficulty: "Easy",
    topic: "Tenses",
    source: "Original",
    section: "Basic Grammar",
    instruction: "Choose the correct verb form to complete the sentence.",
    question_text:
      "Water __________ at 100 degrees Celsius at standard atmospheric pressure.",
    options: [
      { label: "A", text: "boil" },
      { label: "B", text: "boils" },
      { label: "C", text: "is boiling" },
      { label: "D", text: "boiled" },
    ],
    correct_answer: "B",
    explanation:
      "Scientific facts and universal truths always use the Present Simple tense. Since 'Water' is an uncountable singular noun, we add '-s' ('boils').",
    explanation_bn:
      "চিরন্তন সত্য বা বৈজ্ঞানিক তথ্যের ক্ষেত্রে সর্বদা Present Indefinite (Simple) Tense হয়। 'Water' singular uncountable noun হওয়ায় verb-এর সাথে 's' যুক্ত হয়ে 'boils' হবে।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-gram-002",
    module: "ENGLISH_GRAMMAR",
    category: "Grammar",
    question_type: "Multiple Choice",
    difficulty: "Medium",
    topic: "Conditionals",
    source: "Original",
    section: "Intermediate Grammar",
    instruction: "Choose the correct option to complete the conditional sentence.",
    question_text:
      "If the municipal authority __________ better drainage systems last decade, the city would not experience severe waterlogging today.",
    options: [
      { label: "A", text: "built" },
      { label: "B", text: "has built" },
      { label: "C", text: "had built" },
      { label: "D", text: "would build" },
    ],
    correct_answer: "C",
    explanation:
      "An unreal past condition ('last decade') requires the Past Perfect ('had + past participle') in the 'if'-clause.",
    explanation_bn:
      "অতীতের অপূর্ণ শর্ত (If + Past Perfect) থাকলে 'if' ক্লজে 'had + V3' (had built) বসে।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-gram-003",
    module: "ENGLISH_GRAMMAR",
    category: "Grammar",
    question_type: "Fill in the Blank",
    difficulty: "Medium",
    topic: "Subject-Verb Agreement",
    source: "Original",
    section: "Intermediate Grammar",
    instruction: "Type the correct auxiliary verb (is / are).",
    question_text:
      "Neither the project director nor the field engineers __________ aware of the revised deadline.",
    correct_answer: "are",
    accepted_answers: ["are", "were"],
    explanation:
      "With 'Neither ... nor', the verb agrees with the closer subject ('the field engineers', which is plural -> 'are').",
    explanation_bn:
      "'Neither...nor' দ্বারা দুটি সাবজেক্ট যুক্ত হলে verb-টি কাছের সাবজেক্ট ('the field engineers' — plural) অনুযায়ী বসে।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-vocab-001",
    module: "ENGLISH_VOCABULARY",
    category: "Vocabulary",
    question_type: "Meaning Selection",
    difficulty: "Medium",
    topic: "Academic Vocabulary",
    source: "Original",
    section: "Vocabulary Practice",
    instruction: "Choose the closest meaning of the highlighted academic word.",
    question_text:
      "What is the closest meaning of the word 'MITIGATE' in the context of environmental policy?",
    options: [
      { label: "A", text: "To make something less severe, harmful, or painful" },
      { label: "B", text: "To accelerate industrial production rapidly" },
      { label: "C", text: "To ignore long-term scientific evidence" },
      { label: "D", text: "To relocate citizens from rural areas" },
    ],
    correct_answer: "A",
    explanation:
      "'Mitigate' means to reduce the severity or negative impact of something (e.g., 'mitigate the effects of climate change').",
    explanation_bn:
      "'Mitigate' শব্দের অর্থ কোনো কিছুর তীব্রতা বা ক্ষতিকর প্রভাব কমানো বা প্রশমিত করা।",
    created_at: "2026-09-25",
  },
  {
    question_id: "qb-vocab-002",
    module: "ENGLISH_VOCABULARY",
    category: "Vocabulary",
    question_type: "Multiple Choice",
    difficulty: "Hard",
    topic: "Academic Vocabulary",
    source: "Original",
    section: "Vocabulary Practice",
    instruction: "Select the word that best completes the academic sentence.",
    question_text:
      "Despite initial skepticism, empirical data eventually __________ the researcher's hypothesis.",
    options: [
      { label: "A", text: "corroborated" },
      { label: "B", text: "fluctuated" },
      { label: "C", text: "diminished" },
      { label: "D", text: "prohibited" },
    ],
    correct_answer: "A",
    explanation:
      "'Corroborate' means to confirm or give support to a statement, theory, or finding with evidence.",
    explanation_bn: "'Corroborate' মানে প্রমাণ বা তথ্যের মাধ্যমে কোনো তত্ত্বকে সমর্থন বা নিশ্চিত করা।",
    created_at: "2026-09-25",
  },
];

// ============================================================
// CONFIGURED TESTS (CONSUMED BY REUSABLE TEST ENGINE)
// ============================================================

export const TESTS_DB: TestConfig[] = [
  {
    id: "test-reading-academic-01",
    slug: "academic-reading-practice-test-1",
    title: "IELTS Academic Reading Practice Test #1",
    subtitle: "Urban Micro-Forests & Maritime Chronometers · Original Authorized Set",
    module: "Reading",
    difficulty: "Medium",
    durationMinutes: 60,
    source: "Original",
    totalQuestions: 12,
    isBandScored: true,
    instructions: [
      "This test contains Reading Passages with True/False/Not Given, Matching Headings, Note Completion, Multiple Choice, and Sentence Completion questions.",
      "Your answers and remaining time are automatically saved in real time.",
      "You can switch between Timed Mode and Untimed Practice Mode before starting.",
    ],
    sections: [
      {
        id: "sec-read-p1",
        title: "Passage 1: Urban Micro-Forests",
        module: "Reading",
        durationMinutes: 35,
        passageId: "passage-urban-forests",
        questionIds: [
          "qb-read-001",
          "qb-read-002",
          "qb-read-003",
          "qb-read-004",
          "qb-read-005",
          "qb-read-006",
          "qb-read-007",
          "qb-read-008",
          "qb-read-009",
          "qb-read-010",
        ],
      },
      {
        id: "sec-read-p2",
        title: "Passage 2: Solving Longitude",
        module: "Reading",
        durationMinutes: 25,
        passageId: "passage-maritime-chronometers",
        questionIds: ["qb-read-011", "qb-read-012"],
      },
    ],
  },
  {
    id: "test-listening-01",
    slug: "ielts-listening-practice-test-1",
    title: "IELTS Listening Practice Test #1",
    subtitle: "University Accommodation & Campus Orientation · Sections 1 & 2",
    module: "Listening",
    difficulty: "Easy",
    durationMinutes: 30,
    source: "Original",
    totalQuestions: 4,
    isBandScored: true,
    instructions: [
      "Listen to the audio recording and answer the Form Completion and Multiple Choice questions.",
      "Pay close attention to spelling and distractor corrections in the conversation.",
    ],
    sections: [
      {
        id: "sec-list-1",
        title: "Section 1 & 2: University Accommodation",
        module: "Listening",
        durationMinutes: 30,
        audioUrl: "/audio/demo-listening-sec1.mp3",
        audioTitle: "IELTS Listening Section 1 — Accommodation Inquiry",
        questionIds: ["qb-list-001", "qb-list-002", "qb-list-003", "qb-list-004"],
      },
    ],
  },
  {
    id: "test-full-mock-01",
    slug: "full-ielts-academic-mock-test-1",
    title: "Full IELTS Academic Mock Test #1",
    subtitle: "Complete Simulation: Listening + Reading + Writing + Speaking",
    module: "Full Mock",
    difficulty: "Medium",
    durationMinutes: 90,
    source: "Original",
    totalQuestions: 16,
    isBandScored: true,
    instructions: [
      "This Full Mock Test runs through Listening and Reading sections using the unified Test Engine.",
      "Your progress is auto-saved continuously so you can safely resume if your connection drops.",
      "Upon submission, you will receive your section breakdown and full Wrong Answer Review.",
    ],
    sections: [
      {
        id: "mock-sec-listening",
        title: "Module 1: Listening",
        module: "Listening",
        durationMinutes: 30,
        audioUrl: "/audio/demo-listening-sec1.mp3",
        audioTitle: "Listening Section 1 & 2 Audio",
        questionIds: ["qb-list-001", "qb-list-002", "qb-list-003", "qb-list-004"],
      },
      {
        id: "mock-sec-reading-1",
        title: "Module 2: Reading Passage 1",
        module: "Reading",
        durationMinutes: 35,
        passageId: "passage-urban-forests",
        questionIds: [
          "qb-read-001",
          "qb-read-002",
          "qb-read-003",
          "qb-read-004",
          "qb-read-005",
          "qb-read-006",
          "qb-read-007",
          "qb-read-008",
          "qb-read-009",
          "qb-read-010",
        ],
      },
      {
        id: "mock-sec-reading-2",
        title: "Module 2: Reading Passage 2",
        module: "Reading",
        durationMinutes: 25,
        passageId: "passage-maritime-chronometers",
        questionIds: ["qb-read-011", "qb-read-012"],
      },
    ],
  },
];

// ============================================================
// ENGLISH LEARNING (5 LEVELS: BASIC -> ADVANCED)
// ============================================================

export interface EnglishLessonItem {
  id: string;
  slug: string;
  level: "basic" | "elementary" | "intermediate" | "upper-intermediate" | "advanced";
  levelLabel: string;
  skill: "Grammar" | "Vocabulary" | "Reading" | "Listening" | "Speaking" | "Writing";
  topic: string;
  title: string;
  summary: string;
  explanationEn: string;
  explanationBn: string;
  examples: { en: string; bn: string; note?: string }[];
  questionIds: string[];
}

export const ENGLISH_LEVELS = [
  {
    slug: "basic",
    name: "Basic",
    badge: "Level 1",
    description: "Build strong foundations in sentence structure, parts of speech, articles, and everyday present/past tenses.",
  },
  {
    slug: "elementary",
    name: "Elementary",
    badge: "Level 2",
    description: "Master prepositions, subject-verb agreement, modal verbs, and practical reading & listening comprehension.",
  },
  {
    slug: "intermediate",
    name: "Intermediate",
    badge: "Level 3",
    description: "Learn conditionals, passive voice, relative clauses, connectors, and structured paragraph writing.",
  },
  {
    slug: "upper-intermediate",
    name: "Upper Intermediate",
    badge: "Level 4",
    description: "Transition to academic English, complex subordinate clauses, paraphrasing, and IELTS readiness.",
  },
  {
    slug: "advanced",
    name: "Advanced",
    badge: "Level 5",
    description: "Master C1 academic register, inversion, nominalization, and high-band analytical writing & speaking.",
  },
] as const;

export const ENGLISH_LESSONS_DB: EnglishLessonItem[] = [
  {
    id: "lesson-basic-present-simple",
    slug: "present-simple-tense",
    level: "basic",
    levelLabel: "Basic",
    skill: "Grammar",
    topic: "Tenses",
    title: "Present Simple Tense: Habits, Facts & Routines",
    summary: "Learn how to describe daily routines, universal truths, and permanent situations accurately.",
    explanationEn:
      "We use the Present Simple tense for habits, general truths, and permanent situations. For third-person singular subjects (he, she, it, or any singular noun), add -s or -es to the base verb. Use 'do not (don't)' or 'does not (doesn't)' for negative sentences.",
    explanationBn:
      "প্রতিদিনের অভ্যাস (habit), চিরন্তন সত্য (universal truth), এবং স্থায়ী কোনো কাজের ক্ষেত্রে Present Simple Tense ব্যবহৃত হয়। Subject যদি 3rd Person Singular (He, She, It বা যেকোনো একবচন নাম) হয়, তবে মূল Verb-এর সাথে s বা es যোগ করতে হয়।",
    examples: [
      {
        en: "Water boils at 100 degrees Celsius.",
        bn: "পানি ১০০ ডিগ্রি সেলসিয়াস তাপমাত্রায় ফোটে।",
        note: "Scientific fact (Singular uncountable noun -> boils)",
      },
      {
        en: "She reads an English newspaper every morning.",
        bn: "সে প্রতিদিন সকালে একটি ইংরেজি পত্রিকা পড়ে।",
        note: "Regular habit (She -> reads)",
      },
      {
        en: "They do not commute by bus on Fridays.",
        bn: "তারা শুক্রবার বাসে যাতায়াত করে না।",
        note: "Plural negative (do not + base verb)",
      },
    ],
    questionIds: ["qb-gram-001"],
  },
  {
    id: "lesson-elem-sv-agreement",
    slug: "subject-verb-agreement-rules",
    level: "elementary",
    levelLabel: "Elementary",
    skill: "Grammar",
    topic: "Subject-Verb Agreement",
    title: "Subject-Verb Agreement: Core Rules & Common Traps",
    summary: "Avoid the most common grammatical errors in both university admission tests and IELTS Writing.",
    explanationEn:
      "A singular subject requires a singular verb, and a plural subject requires a plural verb. Watch out for correlative conjunctions like 'Neither...nor' and 'Either...or': the verb must agree with the noun closer to it.",
    explanationBn:
      "বাক্যের Subject একবচন হলে Verb একবচন হবে, আর বহুবচন হলে Verb বহুবচন হবে। তবে 'Neither...nor' বা 'Either...or' থাকলে Verb-এর সবচেয়ে কাছের Subject অনুযায়ী Verb বসে।",
    examples: [
      {
        en: "Neither the teacher nor the students are present today.",
        bn: "শিক্ষক বা ছাত্রছাত্রীদের কেউই আজ উপস্থিত নেই।",
        note: "Closer subject 'students' is plural -> 'are'",
      },
      {
        en: "The quality of these mangoes is excellent.",
        bn: "এই আমগুলোর মান চমৎকার।",
        note: "Head noun is 'The quality' (singular) -> 'is'",
      },
    ],
    questionIds: ["qb-gram-003"],
  },
  {
    id: "lesson-inter-conditionals",
    slug: "conditionals-zero-first-second-third",
    level: "intermediate",
    levelLabel: "Intermediate",
    skill: "Grammar",
    topic: "Conditionals",
    title: "Conditionals: Zero, First, Second & Third Conditionals",
    summary: "Express real possibilities, hypothetical situations, and past regrets with precision.",
    explanationEn:
      "Conditional sentences have two parts: the 'if'-clause (condition) and the main clause (result). First Conditional describes real future possibilities (If + Present, will + verb). Second Conditional describes hypothetical present situations (If + Past Simple, would + verb). Third Conditional describes unreal past situations (If + Past Perfect, would have + V3).",
    explanationBn:
      "শর্তবাচক বাক্যে দুটি অংশ থাকে। ভবিষ্যতের বাস্তব সম্ভাবনা বোঝাতে First Conditional (If + Present, will + V1) এবং অতীতের অপূর্ণ শর্ত বোঝাতে Third Conditional (If + had + V3, would have + V3) ব্যবহৃত হয়।",
    examples: [
      {
        en: "If the government invests in public transport, traffic congestion will decrease.",
        bn: "সরকার গণপরিবহনে বিনিয়োগ করলে যানজট কমবে।",
        note: "First Conditional (Real future possibility)",
      },
      {
        en: "If they had built better drainage last decade, the city would not flood today.",
        bn: "গত দশকে ভালো ড্রেনেজ তৈরি করলে আজ শহরে জলাবদ্ধতা হতো না।",
        note: "Mixed / Third Conditional (Unreal past condition)",
      },
    ],
    questionIds: ["qb-gram-002"],
  },
  {
    id: "lesson-upper-academic-vocab",
    slug: "essential-academic-vocabulary-environment",
    level: "upper-intermediate",
    levelLabel: "Upper Intermediate",
    skill: "Vocabulary",
    topic: "Academic Word List",
    title: "High-Utility Academic Vocabulary: Environment & Policy",
    summary: "Master formal verbs and nouns frequently tested in IELTS Reading and Writing Task 2.",
    explanationEn:
      "Using precise academic verbs such as 'mitigate', 'corroborate', 'exacerbate', and 'allocate' elevates both your reading comprehension speed and your essay lexical resource.",
    explanationBn:
      "IELTS Reading এবং Writing Task 2-তে ভালো করতে সাধারণ শব্দের বদলে ফরমাল একাডেমিক শব্দ যেমন 'mitigate' (প্রশমিত করা), 'corroborate' (প্রমাণ দ্বারা সমর্থন করা) ব্যবহার করা জরুরি।",
    examples: [
      {
        en: "Planting urban micro-forests helps mitigate the heat island effect.",
        bn: "শহরে ছোট বন তৈরি তাপমাত্রা বৃদ্ধির প্রভাব প্রশমিত করতে সাহায্য করে।",
      },
      {
        en: "Recent field measurements corroborated the scientist's initial findings.",
        bn: "সাম্প্রতিক মাঠ পর্যায়ের তথ্য বিজ্ঞানীর প্রাথমিক গবেষণাকে সমর্থন করেছে।",
      },
    ],
    questionIds: ["qb-vocab-001", "qb-vocab-002"],
  },
  {
    id: "lesson-adv-inversion",
    slug: "complex-sentences-and-inversion",
    level: "advanced",
    levelLabel: "Advanced",
    skill: "Writing",
    topic: "Sentence Structure",
    title: "Negative Inversion & Nominalization in Academic Writing",
    summary: "Write natural, authoritative academic prose using negative adverbials and noun phrases.",
    explanationEn:
      "When a sentence begins with a restrictive or negative adverbial such as 'Not only', 'Rarely', or 'Seldom', the subject and auxiliary verb invert (just like a question): 'Not only does this policy reduce emissions, but it also lowers costs.'",
    explanationBn:
      "বাক্যের শুরুতে 'Not only', 'Rarely', বা 'Seldom' থাকলে জোর দেওয়ার জন্য Subject-এর আগে Auxiliary Verb বসে (যেমন: 'Not only does this policy...').",
    examples: [
      {
        en: "Not only did the micro-forest cool the street, but it also reduced traffic noise.",
        bn: "বনটি শুধু রাস্তাই ঠান্ডা করেনি, বরং যানবাহনের শব্দও কমিয়েছে।",
      },
    ],
    questionIds: ["qb-vocab-002"],
  },
];

// ============================================================
// VOCABULARY BANK
// ============================================================

export interface VocabularyEntry {
  id: string;
  word: string;
  partOfSpeech: string;
  meaningEn: string;
  meaningBn: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
  category: string;
  difficulty: DifficultyLevel;
}

export const VOCABULARY_DB: VocabularyEntry[] = [
  {
    id: "voc-1",
    word: "Mitigate",
    partOfSpeech: "Verb",
    meaningEn: "To make something less severe, serious, or painful.",
    meaningBn: "প্রশমিত করা / তীব্রতা কমানো",
    example: "Coastal mangrove forests mitigate the destructive impact of cyclones.",
    synonyms: ["Alleviate", "Reduce", "Lessen"],
    antonyms: ["Aggravate", "Exacerbate", "Intensify"],
    category: "Environment",
    difficulty: "Medium",
  },
  {
    id: "voc-2",
    word: "Corroborate",
    partOfSpeech: "Verb",
    meaningEn: "To confirm or give support to a statement, theory, or finding.",
    meaningBn: "প্রমাণ বা তথ্যের মাধ্যমে সমর্থন করা / নিশ্চিত করা",
    example: "Independent laboratory tests corroborated the water quality report.",
    synonyms: ["Verify", "Confirm", "Substantiate"],
    antonyms: ["Contradict", "Refute", "Disprove"],
    category: "Academic Research",
    difficulty: "Hard",
  },
  {
    id: "voc-3",
    word: "Pragmatic",
    partOfSpeech: "Adjective",
    meaningEn: "Dealing with things sensibly and realistically in a practical way.",
    meaningBn: "বাস্তবধর্মী / ব্যবহারিক",
    example: "City planners adopted a pragmatic approach to solving traffic congestion.",
    synonyms: ["Practical", "Realistic", "Sensible"],
    antonyms: ["Idealistic", "Impractical"],
    category: "Policy & Society",
    difficulty: "Medium",
  },
  {
    id: "voc-4",
    word: "Ubiquitous",
    partOfSpeech: "Adjective",
    meaningEn: "Present, appearing, or found everywhere.",
    meaningBn: "সর্বব্যাপী / সর্বত্র বিদ্যমান",
    example: "Smartphones have become ubiquitous in both urban and rural classrooms.",
    synonyms: ["Omnipresent", "Pervasive", "Universal"],
    antonyms: ["Rare", "Scarce"],
    category: "Technology",
    difficulty: "Hard",
  },
  {
    id: "voc-5",
    word: "Sustainable",
    partOfSpeech: "Adjective",
    meaningEn: "Able to be maintained at a certain rate or level without depleting resources.",
    meaningBn: "টেকসই / দীর্ঘস্থায়ী",
    example: "Solar irrigation offers a sustainable alternative to diesel pumps.",
    synonyms: ["Viable", "Renewable", "Enduring"],
    antonyms: ["Unsustainable", "Short-lived"],
    category: "Environment",
    difficulty: "Easy",
  },
];

// ============================================================
// DIGITAL ENGLISH BOOK LIBRARY
// ============================================================

export interface BookItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  category: "Grammar" | "Vocabulary" | "IELTS Strategy" | "Reading";
  level: "Basic" | "Elementary" | "Intermediate" | "Upper Intermediate" | "Advanced";
  pages: number;
  source: ContentSourceType;
  pdfUrl: string;
  chapters: { page: number; title: string; content: string[] }[];
}

export const BOOKS_DB: BookItem[] = [
  {
    id: "book-1",
    slug: "practical-english-grammar-for-bangladeshi-learners",
    title: "Practical English Grammar (Basic to Advanced)",
    author: "MasterEnglish Editorial Board",
    description:
      "A clear, step-by-step handbook covering Tenses, Articles, Prepositions, Subject-Verb Agreement, Conditionals, and Complex Sentences with bilingual English + Bangla notes.",
    category: "Grammar",
    level: "Basic",
    pages: 4,
    source: "Original",
    pdfUrl: "/books/practical-english-grammar.pdf",
    chapters: [
      {
        page: 1,
        title: "Chapter 1: Sentence Structure & Present Tenses",
        content: [
          "1.1 Every complete English sentence requires a Subject and a Finite Verb. Unlike Bangla (where the verb comes at the end: Subject + Object + Verb), English follows Subject + Verb + Object (SVO) order.",
          "Example: আমি বই পড়ি (Ami boi pori -> S + O + V) → I read books (S + V + O).",
          "1.2 Present Simple is used for permanent facts, routines, and schedules. Always remember to add -s/-es when the subject is third-person singular (He, She, It, A student).",
        ],
      },
      {
        page: 2,
        title: "Chapter 2: Subject-Verb Agreement Rules",
        content: [
          "2.1 Prepositional phrases between the subject and verb never change the number of the subject.",
          "Example: 'The box of imported chocolates IS (not are) on the desk.' Here, the head noun is 'The box' (singular).",
          "2.2 With 'Neither...nor' and 'Either...or', match the verb to the closer noun.",
        ],
      },
      {
        page: 3,
        title: "Chapter 3: Conditionals (Zero, First, Second & Third)",
        content: [
          "3.1 Zero Conditional: If + Present Simple, Present Simple (Scientific facts).",
          "3.2 First Conditional: If + Present Simple, will + Base Verb (Real future possibilities).",
          "3.3 Second Conditional: If + Past Simple, would + Base Verb (Hypothetical present).",
          "3.4 Third Conditional: If + had + Past Participle, would have + Past Participle (Past regrets/unreal past).",
        ],
      },
      {
        page: 4,
        title: "Chapter 4: Connectors & Cohesive Devices for Academic Writing",
        content: [
          "4.1 Contrast: However, Nevertheless, On the contrary, Whereas, While.",
          "4.2 Cause & Effect: Consequently, Therefore, As a result, Owing to.",
          "4.3 Addition: Furthermore, Moreover, In addition to this.",
        ],
      },
    ],
  },
  {
    id: "book-2",
    slug: "ielts-reading-question-types-handbook",
    title: "Mastering IELTS Reading Question Types",
    author: "MasterEnglish Curriculum Team",
    description:
      "Proven scanning, skimming, and keyword-mapping workflows for True/False/Not Given, Matching Headings, and Summary Completion.",
    category: "IELTS Strategy",
    level: "Intermediate",
    pages: 3,
    source: "Original",
    pdfUrl: "/books/ielts-reading-handbook.pdf",
    chapters: [
      {
        page: 1,
        title: "Unit 1: True / False / Not Given vs. Yes / No / Not Given",
        content: [
          "TRUE means the passage states the exact same meaning using synonyms.",
          "FALSE means the passage directly contradicts or states the opposite of the statement.",
          "NOT GIVEN means the specific information cannot be verified from the text—never assume or use outside knowledge.",
        ],
      },
      {
        page: 2,
        title: "Unit 2: How to Solve Matching Headings Without Wasting Time",
        content: [
          "Step 1: Read the paragraph's first two sentences and last sentence to identify the core theme.",
          "Step 2: Watch out for distractor headings that repeat a minor detail or single keyword rather than summarizing the whole paragraph.",
        ],
      },
      {
        page: 3,
        title: "Unit 3: Note & Summary Completion Word Limits",
        content: [
          "Always check the instruction: 'ONE WORD ONLY' means writing 'the compost' instead of 'compost' will be marked wrong.",
          "Identify the part of speech (noun, adjective, verb) needed in the gap before scanning the passage.",
        ],
      },
    ],
  },
  {
    id: "book-3",
    slug: "academic-vocabulary-collocations-builder",
    title: "Academic Vocabulary & Collocations Builder",
    author: "MasterEnglish Editorial Board",
    description:
      "300 core academic words organized by topic (Environment, Education, Technology, Health, Urbanization) with natural collocations.",
    category: "Vocabulary",
    level: "Upper Intermediate",
    pages: 2,
    source: "Original",
    pdfUrl: "/books/academic-vocab-builder.pdf",
    chapters: [
      {
        page: 1,
        title: "Topic 1: Environment, Climate & Urbanization",
        content: [
          "• Mitigate climate impacts (প্রভাব প্রশমিত করা)",
          "• Permeable soil / Urban heat island (নগর তাপদ্বীপ)",
          "• Sustainable infrastructure (টেকসই অবকাঠামো)",
        ],
      },
      {
        page: 2,
        title: "Topic 2: Scientific Research & Evidence",
        content: [
          "• Empirical evidence (বাস্তব বা পরীক্ষালব্ধ প্রমাণ)",
          "• Corroborate a hypothesis (গবেষণার অনুমান নিশ্চিত করা)",
          "• Statistically significant correlation (পরিসংখ্যানগতভাবে গুরুত্বপূর্ণ সম্পর্ক)",
        ],
      },
    ],
  },
];

// ============================================================
// IELTS TIPS & TRICKS ARTICLES
// ============================================================

export interface TipArticleItem {
  id: string;
  slug: string;
  title: string;
  category:
    | "Reading"
    | "Listening"
    | "Writing"
    | "Speaking"
    | "Vocabulary"
    | "Grammar"
    | "Time Management"
    | "Exam Strategy"
    | "Common Mistakes";
  readTime: string;
  summary: string;
  content: string[];
  relatedPracticeUrl: string;
  relatedPracticeLabel: string;
  relatedQuestionType?: IELTSQuestionType;
}

export const TIPS_DB: TipArticleItem[] = [
  {
    id: "tip-1",
    slug: "true-false-not-given-golden-rules",
    title: "How to Never Confuse FALSE and NOT GIVEN in IELTS Reading",
    category: "Reading",
    readTime: "4 min read",
    summary:
      "Learn the exact logical difference between a contradicted statement (FALSE) and an unmentioned claim (NOT GIVEN) with real examples.",
    content: [
      "Many Bangladeshi students lose 4 to 6 marks in IELTS Reading simply by guessing FALSE when the answer is actually NOT GIVEN.",
      "Rule 1: Ask yourself, 'Can I prove the opposite from the passage?' If the passage says 'Traditional plantations take 20–30 years' and the question says 'Traditional plantations take 3 years', you can prove it is wrong—so the answer is FALSE.",
      "Rule 2: If the question adds a specific comparison, person, or intention that the author never mentions (even if the topic is there), the answer is NOT GIVEN.",
      "Rule 3: Questions in True/False/Not Given always follow the order of the text! If you found Question 1 in Paragraph A and Question 3 in Paragraph C, the answer to Question 2 is guaranteed to be between them.",
    ],
    relatedPracticeUrl: "/ielts/question-types?type=True+%2F+False+%2F+Not+Given",
    relatedPracticeLabel: "Practice True / False / Not Given Questions",
    relatedQuestionType: "True / False / Not Given",
  },
  {
    id: "tip-2",
    slug: "listening-section-1-distractor-traps",
    title: "Spotting Self-Corrections & Distractors in IELTS Listening",
    category: "Listening",
    readTime: "3 min read",
    summary:
      "Why the first number, date, or room name you hear in IELTS Listening is often a trap—and how to catch the speaker's correction.",
    content: [
      "In IELTS Listening, speakers frequently state a piece of information and then immediately modify or correct it.",
      "Watch for signpost words like 'Actually...', 'Oh, wait...', 'No, sorry, that's...', or 'We used to..., but now...'.",
      "Always wait until the speaker finishes the entire exchange before locking in your final word or number.",
    ],
    relatedPracticeUrl: "/ielts/listening",
    relatedPracticeLabel: "Take Listening Practice Test #1",
    relatedQuestionType: "Form Completion",
  },
  {
    id: "tip-3",
    slug: "60-minute-reading-time-management",
    title: "The 15–20–25 Minute Time Management Formula for IELTS Reading",
    category: "Time Management",
    readTime: "5 min read",
    summary:
      "Stop running out of time on Passage 3 by allocating your 60 minutes strategically according to passage complexity.",
    content: [
      "Passage 1 is typically the most factual and straightforward. Aim to complete Questions 1–13 in 15 minutes.",
      "Passage 2 requires more careful matching and synthesis. Allocate 20 minutes for Questions 14–26.",
      "This leaves a full 25 minutes for Passage 3, which features denser academic arguments and abstract vocabulary.",
      "Never spend more than 90 seconds stuck on a single question—flag it for review in the Question Navigator and move forward.",
    ],
    relatedPracticeUrl: "/ielts/reading",
    relatedPracticeLabel: "Start Timed Reading Practice",
  },
  {
    id: "tip-4",
    slug: "writing-task-2-essay-structure-guide",
    title: "A Clear 4-Paragraph Blueprint for IELTS Writing Task 2",
    category: "Writing",
    readTime: "6 min read",
    summary:
      "How to organize Discussion, Opinion, and Problem-Solution essays cleanly without memorized templates.",
    content: [
      "Paragraph 1 (Introduction — 40–50 words): Paraphrase the prompt in your own words and state a clear thesis/position.",
      "Paragraph 2 (Body Paragraph 1 — 90–100 words): Topic sentence + Explanation + Concrete real-world example.",
      "Paragraph 3 (Body Paragraph 2 — 90–100 words): Second main argument or opposing view + Explanation + Example.",
      "Paragraph 4 (Conclusion — 35–45 words): Summarize your main points and restate your final opinion clearly without introducing new ideas.",
    ],
    relatedPracticeUrl: "/ielts/writing",
    relatedPracticeLabel: "Open IELTS Writing Workspace",
  },
];

// ============================================================
// MODULAR DAILY PRACTICE SETS
// ============================================================

export interface DailyPracticeSetItem {
  id: string;
  title: string;
  category: "Grammar" | "Vocabulary" | "Reading" | "Listening" | "Writing" | "Speaking" | "IELTS";
  difficulty: DifficultyLevel;
  durationMinutes: number;
  description: string;
  questionIds: string[];
}

export const DAILY_PRACTICE_DB: DailyPracticeSetItem[] = [
  {
    id: "daily-ielts-reading-sprint",
    title: "Daily IELTS Reading Sprint (True/False/NG + Notes)",
    category: "IELTS",
    difficulty: "Medium",
    durationMinutes: 12,
    description: "Quick 6-question reading accuracy drill on Urban Micro-Forests.",
    questionIds: [
      "qb-read-001",
      "qb-read-002",
      "qb-read-003",
      "qb-read-008",
      "qb-read-009",
      "qb-read-010",
    ],
  },
  {
    id: "daily-grammar-essentials",
    title: "Daily Grammar Check: Tenses, Conditionals & Agreement",
    category: "Grammar",
    difficulty: "Easy",
    durationMinutes: 5,
    description: "3 high-yield grammar questions with Bangla & English explanations.",
    questionIds: ["qb-gram-001", "qb-gram-002", "qb-gram-003"],
  },
  {
    id: "daily-academic-vocab",
    title: "Daily Academic Vocabulary Boost",
    category: "Vocabulary",
    difficulty: "Medium",
    durationMinutes: 5,
    description: "Test your command of high-band academic vocabulary in context.",
    questionIds: ["qb-vocab-001", "qb-vocab-002"],
  },
  {
    id: "daily-listening-focus",
    title: "Daily Listening Section 1 Accuracy Drill",
    category: "Listening",
    difficulty: "Easy",
    durationMinutes: 8,
    description: "Practice catching numbers, spellings, and distractor corrections.",
    questionIds: ["qb-list-001", "qb-list-002", "qb-list-003", "qb-list-004"],
  },
];

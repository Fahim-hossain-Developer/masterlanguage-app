import { PrismaClient, CEFRLevel, TrackType, FoundationSkill, QuestionType, IELTSSkill } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding MasterEnglish Supabase Database...');

  // 1. Seed Subscription Plans
  const plans = [
    {
      name: 'Free Starter',
      slug: 'free',
      descriptionEn: 'Essential English foundations and limited IELTS practice',
      descriptionBn: 'প্রাথমিক ইংরেজি ও সীমিত IELTS অনুশীলন',
      priceBDT: 0,
      priceUSD: 0,
      durationDays: 365,
      trialDays: 0,
      features: [
        'CEFR A1 Foundation Grammar & Vocab',
        '1 Diagnostic Placement Test',
        '3 AI Writing Evaluations / month',
        'Daily Flashcard SRS',
      ],
    },
    {
      name: 'IELTS & English Premium',
      slug: 'premium',
      descriptionEn: 'Full CEFR A1-C1 curriculum + Unlimited IELTS mock tests & AI grading',
      descriptionBn: 'সম্পূর্ণ ইংরেজি কোর্স ও আনলিমিটেড IELTS মক টেস্ট এবং AI গ্রেডিং',
      priceBDT: 990,
      priceUSD: 19,
      durationDays: 30,
      trialDays: 7,
      features: [
        'Complete CEFR A1 to C1 Foundation Track',
        'Unlimited AI Writing Task 1 & 2 Evaluations',
        'Unlimited AI Speaking Examiner Sessions',
        'All Official-Style IELTS Mock Tests',
        '3,500+ Oxford Academic Vocabulary SRS',
      ],
    },
    {
      name: 'Master Pro',
      slug: 'pro',
      descriptionEn: 'Complete 90-day Band 7.5+ transformation with 1-on-1 AI & personalized roadmap',
      descriptionBn: '৯০ দিনের টার্গেট ব্যান্ড ৭.৫+ গ্যারান্টি রোডম্যাপ ও AI কোচিং',
      priceBDT: 2490,
      priceUSD: 39,
      durationDays: 90,
      trialDays: 7,
      features: [
        'Everything in Premium',
        'Personalized Daily AI Study Planner',
        'Line-by-line Band 8.0 Essay Rewrites',
        'Phoneme-level Pronunciation Coaching',
        'Priority Support & Exam Prediction Reports',
      ],
    },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }
  console.log('✅ Subscription Plans seeded.');

  // 2. Seed Diagnostic Placement Test
  const existingPlacement = await prisma.placementTest.findFirst();
  if (!existingPlacement) {
    await prisma.placementTest.create({
      data: {
        title: 'CEFR & IELTS Adaptive Diagnostic Assessment',
        description: 'Evaluates your Grammar, Vocabulary, Reading, and Comprehension from A1 to C1 and predicts your starting IELTS Band.',
        durationMinutes: 20,
        totalQuestions: 5,
        questions: {
          create: [
            {
              questionNumber: 1,
              targetCEFR: CEFRLevel.A1,
              skill: FoundationSkill.GRAMMAR,
              questionText: 'She _______ to the university library every morning.',
              options: [
                { label: 'A', text: 'go' },
                { label: 'B', text: 'goes' },
                { label: 'C', text: 'going' },
                { label: 'D', text: 'gone' },
              ],
              correctAnswer: 'B',
              explanationEn: 'With third-person singular subjects (he/she/it) in the Present Simple, add -es to "go".',
              explanationBn: 'Present Simple টেন্সে Third-person singular (he/she/it) এর পরে মূল ভার্বের সাথে s/es যুক্ত হয়।',
            },
            {
              questionNumber: 2,
              targetCEFR: CEFRLevel.A2,
              skill: FoundationSkill.VOCABULARY,
              questionText: 'Choose the best word: The train was delayed _______ the heavy rain.',
              options: [
                { label: 'A', text: 'because' },
                { label: 'B', text: 'because of' },
                { label: 'C', text: 'although' },
                { label: 'D', text: 'despite of' },
              ],
              correctAnswer: 'B',
              explanationEn: '"Because of" is followed by a noun phrase ("the heavy rain").',
              explanationBn: '"Because of" এর পরে Noun phrase ("the heavy rain") বসে।',
            },
            {
              questionNumber: 3,
              targetCEFR: CEFRLevel.B1,
              skill: FoundationSkill.GRAMMAR,
              questionText: 'If I _______ more time yesterday, I would have reviewed the essay thoroughly.',
              options: [
                { label: 'A', text: 'have' },
                { label: 'B', text: 'had' },
                { label: 'C', text: 'had had' },
                { label: 'D', text: 'would have' },
              ],
              correctAnswer: 'C',
              explanationEn: 'Third Conditional uses "If + Past Perfect (had + V3), ... would have + V3" for unreal past situations.',
              explanationBn: 'অতীতের অবাস্তব শর্ত বোঝাতে Third Conditional-এ "If + had + V3" ব্যবহৃত হয়।',
            },
            {
              questionNumber: 4,
              targetCEFR: CEFRLevel.B2,
              skill: FoundationSkill.VOCABULARY,
              questionText: 'Rapid urbanization has _______ significant environmental challenges in developing nations.',
              options: [
                { label: 'A', text: 'done' },
                { label: 'B', text: 'posed' },
                { label: 'C', text: 'made' },
                { label: 'D', text: 'taken' },
              ],
              correctAnswer: 'B',
              explanationEn: '"Pose a challenge" is a high-scoring academic collocation for IELTS Writing Task 2.',
              explanationBn: '"Pose a challenge" একটি উন্নত একাডেমিক Collocation যা IELTS Writing-এ ভালো স্কোর পেতে সাহায্য করে।',
            },
            {
              questionNumber: 5,
              targetCEFR: CEFRLevel.C1,
              skill: FoundationSkill.GRAMMAR,
              questionText: 'Not only _______ carbon emissions, but the policy also incentivizes renewable energy adoption.',
              options: [
                { label: 'A', text: 'it reduces' },
                { label: 'B', text: 'does it reduce' },
                { label: 'C', text: 'reduces it' },
                { label: 'D', text: 'is it reducing' },
              ],
              correctAnswer: 'B',
              explanationEn: 'When a sentence begins with a negative/restrictive adverbial like "Not only", subject-auxiliary inversion is required.',
              explanationBn: '"Not only" দিয়ে বাক্য শুরু হলে Inversion নিয়ম অনুযায়ী সাহায্যকারী ভার্ব (does) সাবজেক্টের আগে বসে।',
            },
          ],
        },
      },
    });
    console.log('✅ Diagnostic Placement Test seeded.');
  }

  // 3. Seed Grammar Lab Topics
  const grammarTopics = [
    {
      level: CEFRLevel.A1,
      title: 'Present Simple & Daily Routines',
      slug: 'present-simple-daily-routines',
      summaryEn: 'Master how to talk about habits, facts, and daily schedules accurately.',
      summaryBn: 'প্রতিদিনের অভ্যাস, চিরন্তন সত্য ও রুটিন নিয়ে সঠিক বাক্য গঠন শিখুন।',
      contentEn: '### Present Simple Tense\nUse the Present Simple for things that are always true or happen regularly.\n- **Subject + Base Verb (+ s/es for he/she/it)**',
      contentBn: '### Present Simple Tense\nনিয়মিত অভ্যাস বা সাধারণ সত্য প্রকাশ করতে এটি ব্যবহৃত হয়।',
      ruleExamples: [
        { rule: 'He/She/It + Verb+s', example: 'She works in Dhaka.', translation: 'সে ঢাকায় কাজ করে।' },
        { rule: 'Negative with do/does not', example: 'They do not (don\'t) drink coffee.', translation: 'তারা কফি পান করে না।' },
      ],
      commonErrors: [
        { incorrect: 'He go to office every day.', correct: 'He goes to the office every day.', explanation: 'Add -es for third-person singular.' },
      ],
      orderIndex: 1,
    },
    {
      level: CEFRLevel.B2,
      title: 'Complex Sentences & Subordinating Conjunctions for IELTS Band 7+',
      slug: 'complex-sentences-ielts-band-7',
      summaryEn: 'Elevate your Grammatical Range & Accuracy score using Although, Despite, Whereas, and Provided that.',
      summaryBn: 'IELTS Writing-এ ৭+ ব্যান্ড পেতে জটিল বাক্য (Complex Sentences) তৈরির কৌশল।',
      contentEn: '### Why Complex Sentences Matter in IELTS\nExaminers look for a mix of simple and complex structures to award Band 7.0+ in Grammatical Range.',
      contentBn: '### IELTS-এ Complex Sentence কেন জরুরি\nব্যান্ড ৭ বা তার বেশি পেতে হলে সাধারণ বাক্যের পাশাপাশি জটিল ও যৌগিক বাক্য ব্যবহার করতে হবে।',
      ruleExamples: [
        { rule: 'Although + Clause', example: 'Although remote work offers flexibility, it can lead to isolation.', translation: 'যদিও রিমোট ওয়ার্ক নমনীয়তা দেয়, এটি একাকীত্ব তৈরি করতে পারে।' },
      ],
      commonErrors: [
        { incorrect: 'Although it was raining, but we went out.', correct: 'Although it was raining, we went out.', explanation: 'Never use "but" in the same sentence after "Although".' },
      ],
      orderIndex: 2,
    },
  ];

  for (const topic of grammarTopics) {
    await prisma.grammarTopic.upsert({
      where: { slug: topic.slug },
      update: topic,
      create: topic,
    });
  }
  console.log('✅ Grammar Topics seeded.');

  // 4. Seed English Vocabulary (Oxford / Academic Word List)
  const vocabList = [
    {
      word: 'mitigate',
      phonetic: '/ˈmɪt.ɪ.ɡeɪt/',
      partOfSpeech: 'verb',
      level: CEFRLevel.C1,
      definitionEn: 'To make something less harmful, unpleasant, or bad.',
      definitionBn: 'প্রশমিত করা, তীব্রতা বা ক্ষতি কমানো।',
      exampleSentence: 'Governments must act swiftly to mitigate the effects of climate change.',
      exampleTranslation: 'জলবায়ু পরিবর্তনের প্রভাব কমাতে সরকারকে দ্রুত পদক্ষেপ নিতে হবে।',
      collocations: ['mitigate the impact', 'mitigate risks', 'mitigate climate change'],
      synonyms: ['alleviate', 'reduce', 'diminish'],
      antonyms: ['aggravate', 'exacerbate'],
      isAcademicWordList: true,
    },
    {
      word: 'ubiquitous',
      phonetic: '/juːˈbɪk.wɪ.təs/',
      partOfSpeech: 'adjective',
      level: CEFRLevel.C1,
      definitionEn: 'Seeming to be everywhere at the same time.',
      definitionBn: 'সর্বব্যাপী, যা সব জায়গায় দেখা যায়।',
      exampleSentence: 'Smartphones have become ubiquitous in modern society.',
      exampleTranslation: 'আধুনিক সমাজে স্মার্টফোন সর্বব্যাপী হয়ে উঠেছে।',
      collocations: ['become ubiquitous', 'ubiquitous presence', 'ubiquitous technology'],
      synonyms: ['omnipresent', 'pervasive', 'universal'],
      antonyms: ['rare', 'scarce'],
      isAcademicWordList: true,
    },
    {
      word: 'substantial',
      phonetic: '/səbˈstæn.ʃəl/',
      partOfSpeech: 'adjective',
      level: CEFRLevel.B2,
      definitionEn: 'Large in size, value, or importance.',
      definitionBn: 'উল্লেখযোগ্য, প্রচুর বা বড় আকারের।',
      exampleSentence: 'A substantial number of graduates struggle to find jobs in their field.',
      exampleTranslation: 'উল্লেখযোগ্য সংখ্যক গ্র্যাজুয়েট তাদের নিজ ক্ষেত্রে চাকরি পেতে হিমশিম খায়।',
      collocations: ['substantial amount', 'substantial increase', 'substantial evidence'],
      synonyms: ['considerable', 'significant', 'sizeable'],
      antonyms: ['negligible', 'minor'],
      isAcademicWordList: true,
    },
  ];

  for (const item of vocabList) {
    await prisma.englishVocabulary.upsert({
      where: { word: item.word },
      update: item,
      create: item,
    });
  }
  console.log('✅ Academic Vocabulary seeded.');

  // 5. Seed AI Conversation Scenarios
  const existingScenario = await prisma.aIConversationScenario.findFirst();
  if (!existingScenario) {
    await prisma.aIConversationScenario.createMany({
      data: [
        {
          title: 'IELTS Speaking Part 1: Work, Studies & Hometown',
          scenarioType: 'IELTS Speaking',
          targetLevel: CEFRLevel.B1,
          systemPrompt: 'You are a certified IELTS Speaking Examiner conducting Part 1. Ask one question at a time, listen to the candidate, and keep a polite, neutral tone.',
          initialGreeting: 'Good morning. My name is Dr. Sarah Bennett. Could you tell me your full name, please?',
          objectives: [
            'Answer fluently without long pauses',
            'Extend answers to 2-3 sentences',
            'Use natural linking words',
          ],
        },
        {
          title: 'Everyday English: Ordering at an International Cafe',
          scenarioType: 'Daily',
          targetLevel: CEFRLevel.A2,
          systemPrompt: 'You are a friendly barista at a coffee shop in London. Help the student order a drink and a pastry.',
          initialGreeting: 'Hi there! Welcome to Artisan Roast. What can I get started for you today?',
          objectives: [
            'Use polite requests (Could I have / I would like)',
            'Ask about menu items or prices',
            'Complete the payment interaction',
          ],
        },
      ],
    });
    console.log('✅ AI Conversation Scenarios seeded.');
  }

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

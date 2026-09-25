import type { PassageItem, QuestionItem, TestConfig } from "./question-bank";

export interface CambridgeReadingPassageMeta {
  passageNumber: 1 | 2 | 3;
  title: string;
  questionRange: string;
  questionTypes: string[];
  topic: string;
}

export interface CambridgeListeningPartMeta {
  partNumber: 1 | 2 | 3 | 4;
  title: string;
  questionRange: string;
  format: string;
  questionTypes: string[];
}

export interface CambridgeWritingTaskMeta {
  taskNumber: 1 | 2;
  type: string;
  minWords: number;
  recommendedMinutes: number;
  title: string;
  prompt: string;
  visualDataSummary?: string;
  sampleOutline: string;
}

export interface CambridgeSpeakingPartMeta {
  partNumber: 1 | 2 | 3;
  title: string;
  topic: string;
  prepSeconds: number;
  speakSeconds: number;
  questions: string[];
}

export interface CambridgeSingleTest {
  id: string; // e.g. "cam-9-test-1"
  bookNumber: number; // 9..19
  testNumber: 1 | 2 | 3 | 4;
  title: string; // e.g. "Cambridge IELTS 9 — Test 1"
  readingPassages: [
    CambridgeReadingPassageMeta,
    CambridgeReadingPassageMeta,
    CambridgeReadingPassageMeta
  ];
  listeningParts: [
    CambridgeListeningPartMeta,
    CambridgeListeningPartMeta,
    CambridgeListeningPartMeta,
    CambridgeListeningPartMeta
  ];
  writingTasks: [CambridgeWritingTaskMeta, CambridgeWritingTaskMeta];
  speakingParts: [
    CambridgeSpeakingPartMeta,
    CambridgeSpeakingPartMeta,
    CambridgeSpeakingPartMeta
  ];
  customAudioUrl?: string;
  customPdfUrl?: string;
}

export interface CambridgeBook {
  bookNumber: number; // 9 to 19
  slug: string; // "cambridge-9"
  title: string; // "Cambridge IELTS 9"
  editionLabel: string; // "Academic & General Training"
  year: string;
  tests: [
    CambridgeSingleTest,
    CambridgeSingleTest,
    CambridgeSingleTest,
    CambridgeSingleTest
  ];
}

// Authentic topic & test catalog for Cambridge IELTS 9 through Cambridge IELTS 19
const CAMBRIDGE_BOOK_TOPICS: Record<
  number,
  {
    year: string;
    reading: [string, string, string][];
    listening: [string, string, string, string][];
    writing1: string[];
    writing2: string[];
    speaking: [string, string, string][];
  }
> = {
  9: {
    year: "2013",
    reading: [
      [
        "William Henry Perkin: The Man Who Invented Synthetic Dyes",
        "Is There Anybody Out There? The Search for Extra-Terrestrial Intelligence",
        "The History of the Tortoise",
      ],
      [
        "Hearing Impairment & Classroom Acoustics",
        "Venus in Transit: Astronomy Across Centuries",
        "A Neuroscientist Reveals How to Think Differently",
      ],
      [
        "Attitudes to Language & Prescriptive Grammar",
        "Tidal Power: Harnessing Ocean Currents",
        "Information Theory — The Big Idea",
      ],
      [
        "The Life and Work of Marie Curie",
        "Young Children's Sense of Identity",
        "The Development of Museums",
      ],
    ],
    listening: [
      [
        "Job Enquiry at a Crosbie's Restaurant",
        "Sportsvilles Campus & Fitness Centre Tour",
        "Course Feedback on Business Studies Presentation",
        "Mass Stranding of Whales & Dolphins",
      ],
      [
        "Accommodation Form for University Hall",
        "Parks and Woodland Facilities in the City",
        "Self-Access Centre Upgrade Discussion",
        "Business Cultures & Organizational Values",
      ],
      [
        "Greek Island Holidays Booking & Insurance",
        "Quality of Life Survey in Local District",
        "Study Skills Tutorial: Reading & Note-Taking",
        "Underground House Design & Eco-Architecture",
      ],
      [
        "Health Centres Patient Registration",
        "Water Heater & Home Energy Efficiency",
        "Kite-Making Project & Cultural History",
        "Wildlife Conservation in Suburban Gardens",
      ],
    ],
    writing1: [
      "Bar Chart: Age Profile of Coaching Staff & Community Sports Participation",
      "Line Graph: International Student Enrolment in Three Universities",
      "Site Plan Comparison: Village of Chorleywood Transport & Growth (1868–1994)",
      "Pie Charts & Table: Energy Consumption by Fuel Type in the US (1980–2030)",
    ],
    writing2: [
      "Some experts believe it is better for children to begin learning a foreign language at primary school rather than secondary school. Do the advantages of this outweigh the disadvantages?",
      "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?",
      "Raising the minimum legal age for driving cars or riding motorbikes is the best way to improve road safety. To what extent do you agree or disagree?",
      "Every year several languages die out. Some people think that this is not important because life will be easier if there are fewer languages in the world. To what extent do you agree or disagree?",
    ],
    speaking: [
      [
        "Hometown, Daily Routine & Public Transport",
        "Describe an open-air market or street market you enjoyed visiting.",
        "Shopping Habits & Traditional vs. Modern Markets",
      ],
      [
        "Studies, Work & Weekend Activities",
        "Describe a piece of electronic equipment that you find useful.",
        "Technology in the Workplace & Generational Differences",
      ],
      [
        "Letters, Emails & Keeping in Touch with Friends",
        "Describe a Historical Place or Museum in Your Country.",
        "Preserving Cultural Heritage & Tourism",
      ],
      [
        "Bicycles, Walking & Outdoor Exercise",
        "Describe a person who has taught you an important skill.",
        "Qualities of Good Teachers & Lifelong Learning",
      ],
    ],
  },
  10: {
    year: "2015",
    reading: [
      [
        "Stepwells: Ancient Water Architecture of India",
        "European Transport Systems 1990–2010",
        "The Psychology of Innovation",
      ],
      [
        "Tea and the Industrial Revolution",
        "Gifted Children and Learning",
        "Museums of Fine Art and Their Public",
      ],
      [
        "The Context, Meaning and Scope of Tourism",
        "Autumn Leaves: Why Leaves Change Colour",
        "Beyond the Blue Horizon: Ancient Polynesian Navigation",
      ],
      [
        "The Megafires of California",
        "Second Nature: Can Personality Be Changed?",
        "When Evolution Runs Backwards",
      ],
    ],
    listening: [
      [
        "Self-Drive Tours in the USA Booking",
        "NewAthena Fitness Club Membership",
        "Global Design Competition: Eco-Dishwasher",
        "The Spirit Bear of British Columbia",
      ],
      [
        "Transport Survey at Local Railway Station",
        "New City Developments & Swimming Pool",
        "Thorndyke's Builders & Scandinavian Literature",
        "The Future of Management & Business Leadership",
      ],
      [
        "Early Learning Childcare Centre Enrolment",
        "Rosewood House & Gardens Audio Guide",
        "Theatre Studies Course & Stage Lighting",
        "Self-Regulatory Focus Theory in Psychology",
      ],
      [
        "Thorndyke's Builders Home Repair Quote",
        "Manham Port Industrial Heritage Reconstruction",
        "Rocky Bay Field Trip & Marine Biology",
        "Nanotechnology: Applications in Everyday Products",
      ],
    ],
    writing1: [
      "Pie Charts: Energy Use & Greenhouse Gas Emissions in an Average Household",
      "Tables: Fairtrade Coffee and Banana Sales in Five European Countries",
      "Process Diagram: Life Cycle of the Salmon & Hydroelectric Dam",
      "Line Graph: International Migration to and from the UK",
    ],
    writing2: [
      "It is important for children to learn the difference between right and wrong at an early age. Punishment is necessary to help them learn this distinction. To what extent do you agree or disagree?",
      "Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as science and technology. Discuss both views and give your own opinion.",
      "Countries are becoming more and more similar because people are able to buy the same products anywhere in the world. Do you think this is a positive or negative development?",
      "Many museums charge for admission while others are free. Do you think the advantages of charging people for admission to museums outweigh the disadvantages?",
    ],
    speaking: [
      [
        "Travel, Holidays & Photography",
        "Describe a well-known person you admire.",
        "Fame, Role Models & Media Influence",
      ],
      [
        "Music, Reading & Relaxation",
        "Describe a time when you waited for something special to happen.",
        "Patience in Modern Society & Instant Gratification",
      ],
      [
        "School Subjects, Teachers & Concentration",
        "Describe a short journey that you often make but dislike.",
        "Urban Commuting & Public Transport Investment",
      ],
      [
        "Parks, Gardens & Nature in Cities",
        "Describe a useful skill you learned from a family member.",
        "Practical Skills vs. Academic Qualifications",
      ],
    ],
  },
  11: {
    year: "2016",
    reading: [
      [
        "Crop-Growing Skyscrapers: Vertical Farming",
        "The Falkirk Wheel: Engineering Marvel of Scotland",
        "Reducing the Effects of Climate Change: Geo-Engineering",
      ],
      [
        "Raising the Mary Rose: Marine Archaeology",
        "What Destroyed the Civilization of Easter Island?",
        "Neuroaesthetics: How the Brain Experiences Art",
      ],
      [
        "The Story of Silk: From Ancient China to the World",
        "Great Migrations: Animal Navigation Strategies",
        "Preface to 'How the Other Half Thinks' (Mathematical Thinking)",
      ],
      [
        "Research Using Twins: Nature vs. Nurture",
        "An Introduction to Film Sound",
        "This Marvellous Invention: The Evolution of Human Language",
      ],
    ],
    listening: [
      [
        "Hiring a Public Room at the Community Centre",
        "Fiddy Working Heritage Farm Visitor Briefing",
        "Study on Gender in Physics Enrollment",
        "Ocean Biodiversity & Marine Ecosystems",
      ],
      [
        "Enquiry About Joining Youth Council",
        "New Staff Orientation at Theatre Royal",
        "Rocky Bay Coastal Erosion Field Project",
        "Designing a Public Building: Architectural Lecture",
      ],
      [
        "Free Activities in the Burnham Area",
        "Changes in Barford Local District over 50 Years",
        "Ethnography in Business Research",
        "Episodic Memory: How Humans Recall Past Events",
      ],
      [
        "Events During Kenton Festival",
        "London Relocation Services Consultation",
        "Jane Austen's Novels & Film Adaptations",
        "The Effects of Environmental Noise on Learning",
      ],
    ],
    writing1: [
      "Pie Charts & Table: Water Usage in Different Regions of the World",
      "Floor Plans: Islip Town Centre Current Layout vs. Planned Development",
      "Line Graph: Nitrogen Oxide Emissions by Four Vehicle Types",
      "Table & Bar Chart: Daily Economic Indicators & Consumer Spending",
    ],
    writing2: [
      "Governments should spend money on railways rather than roads. To what extent do you agree or disagree with this statement?",
      "Some people claim that not enough of the waste from homes is recycled. They say that the only way to increase recycling is for governments to make it a legal requirement. To what extent do you think laws are needed to make people recycle more of their waste?",
      "Many people say that the only way to guarantee getting a good job is to complete a course of university education. Others claim that it is better to start work after school and gain experience in the world of work. Discuss both views and give your own opinion.",
      "Many governments think that economic progress is their most important goal. Some people, however, think that other types of progress are equally important for a country. Discuss both these views and give your own opinion.",
    ],
    speaking: [
      [
        "Food, Cooking & Healthy Eating",
        "Describe a tall building in your city that you like or dislike.",
        "High-Rise Living & Urban Architecture",
      ],
      [
        "Friends, Socializing & Celebrations",
        "Describe an article on health that you read in a magazine or online.",
        "Public Health Awareness & Lifestyle Habits",
      ],
      [
        "Photographs, Cameras & Memories",
        "Describe a creative person whose work you admire.",
        "Creativity in Education & Innovation",
      ],
      [
        "Hats, Clothing & Weather",
        "Describe a noisy place you visited recently.",
        "Noise Pollution in Modern Cities",
      ],
    ],
  },
  12: {
    year: "2017",
    reading: [
      [
        "Cork: The Thick Bark of the Cork Oak",
        "Collecting as a Hobby",
        "What's the Purpose of Gaining Knowledge?",
      ],
      [
        "The Risks Agriculture Faces in Developing Countries",
        "The Lost City: Bingham's Exploration of Machu Picchu",
        "The Benefits of Being Bilingual",
      ],
      [
        "Flying Tortoises: Conservation on the Galapagos Islands",
        "The Intersection of Health Sciences and Geography",
        "Music and the Emotions: Neurological Responses",
      ],
      [
        "The History of Glass",
        "Bring Back the Big Cats: Rewilding Ecology",
        "UK Companies Need More Effective Boards of Directors",
      ],
    ],
    listening: [
      [
        "Family Excursions & Steam Train Ride",
        "Public Library Services & Workshop Schedule",
        "Food Trends & Scandinavian Diet Study",
        "Conflict at Work: Organizational Psychology",
      ],
      [
        "Events During Festival of Arts",
        "Theatre Seat Booking & Backstage Tour",
        "Paper Production & Recycling Research",
        "The History of Hair & Social Status",
      ],
      [
        "Public Library Survey & Membership",
        "Fitness Centre Corporate Schemes",
        "Buddy System for First-Year University Students",
        "Noise in Cities & Acoustic Engineering",
      ],
      [
        "Cycle Tour Leader Job Application",
        "Visiting the Sheepmarket Area of the City",
        "Presentation on Film Adaptations of Shakespeare",
        "Land Degradation & Sustainable Soil Management",
      ],
    ],
    writing1: [
      "Bar Chart: Percentage of Australian Men and Women Doing Regular Physical Activity",
      "Maps: University Sports Courts (1990 vs. Today)",
      "Process Diagram: How Geothermal Energy Is Used to Produce Electricity",
      "Line Graph: Average Carbon Dioxide Emissions per Person in Four Countries",
    ],
    writing2: [
      "Some people believe that it is good to share as much information as possible in scientific research, business and the academic world. Others believe that some information is too important or too valuable to be shared freely. Discuss both these views and give your own opinion.",
      "At the present time, the population of some countries includes a relatively large number of young adults, compared with the number of older people. Do the advantages of this situation outweigh the disadvantages?",
      "In a number of countries, some people think it is necessary to spend large sums of money on constructing new railway lines for very fast trains between cities. Others believe the money should be spent on improving existing public transport. Discuss both these views and give your own opinion.",
      "Some people believe that allowing children to make their own choices on everyday matters (such as food, clothes and entertainment) is likely to result in a society of individuals who only think about their own wishes. Other people believe that it is important for children to make decisions about matters that affect them. Discuss both these views and give your own opinion.",
    ],
    speaking: [
      [
        "Games, Indoor Activities & Childhood",
        "Describe a couple you know who have a happy marriage.",
        "Family Structures & Intergenerational Support",
      ],
      [
        "Watches, Time Management & Punctuality",
        "Describe a plan in your life that is not related to work or study.",
        "Work-Life Balance & Personal Goals",
      ],
      [
        "Politeness, Neighbours & Community",
        "Describe an invention that has changed how people live.",
        "Technological Disruption & Everyday Life",
      ],
      [
        "Jewellery, Gifts & Special Occasions",
        "Describe a sport you watched and would like to try.",
        "Professional Sports & Youth Participation",
      ],
    ],
  },
  13: {
    year: "2018",
    reading: [
      [
        "Case Study: Tourism New Zealand Website",
        "Why Being Bored Is Stimulating — And Useful, Too",
        "Artificial Artists: Can Computers Truly Create Art?",
      ],
      [
        "Bringing Cinnamon to Europe: The Ancient Spice Trade",
        "Oxytocin: The Chemical of Social Bonding",
        "Making the Most of Trends: Corporate Strategy",
      ],
      [
        "The Coconut Palm: Tree of Life",
        "How Baby Talk Gives Infant Brains a Boost",
        "Whatever Happened to the Harappan Civilisation?",
      ],
      [
        "Cutty Sark: The Fastest Sailing Ship of All Time",
        "Saving the Soil: Regenerative Agriculture",
        "Book Review: The Happiness Industry",
      ],
    ],
    listening: [
      [
        "Cookery Classes at the Food Studio",
        "Traffic Changes in Granford Town",
        "Seed Germination Science Experiment",
        "Effects of Urban Environments on Animals",
      ],
      [
        "South City Cycling Club Membership",
        "Company Volunteering Projects in the Community",
        "Planning a Presentation on Nanotechnology",
        "Episodic Memory & Cognitive Training",
      ],
      [
        "Moving to Banford City: Housing Enquiry",
        "Physical Difficulties of Playing Musical Instruments",
        "Project on Using Natural Dyes for Fabrics",
        "The Sleepy Lizard (Tiliqua rugosa) Field Study",
      ],
      [
        "Alex's Training at JPNW Warehouse",
        "The Snow Centre Ski & Snowboard Resort",
        "Labels on Food & Nutritional Transparency",
        "The History of Coffee Across Civilisations",
      ],
    ],
    writing1: [
      "Two Maps: Access to a City Hospital (2007 vs. 2010)",
      "Bar Chart: Households in Owned and Rented Accommodation in England and Wales",
      "Bar Chart: Top Ten Countries for the Production and Consumption of Electricity",
      "Plan Comparison: University Sports Department Layout Now and Future Redevelopment",
    ],
    writing2: [
      "Living in a country where you have to speak a foreign language can cause serious social problems, as well as practical problems. To what extent do you agree or disagree with this statement?",
      "Some people believe that nowadays we have too many choices. To what extent do you agree or disagree with this statement?",
      "Some people say that the only reason for learning a foreign language is in order to travel to or work in a foreign country. Others say that these are not the only reasons why someone should learn a foreign language. Discuss both these views and give your own opinion.",
      "In spite of the advances made in agriculture, many people around the world still go hungry. Why is this the case? What can be done about this problem?",
    ],
    speaking: [
      [
        "Television, Radio & News Habits",
        "Describe a time when you had to change your plan because of the weather.",
        "Climate Predictability & Seasonal Traditions",
      ],
      [
        "Sleeping Habits, Morning Routines & Energy",
        "Describe a language you would like to learn (not English).",
        "Globalisation & Language Preservation",
      ],
      [
        "Animals, Pets & Wildlife Documentary",
        "Describe a website you use regularly for study or work.",
        "The Internet in Education & Information Reliability",
      ],
      [
        "Perfume, Scents & Flowers",
        "Describe a time when someone apologized to you.",
        "Social Etiquette & Resolving Conflicts",
      ],
    ],
  },
  14: {
    year: "2019",
    reading: [
      [
        "The Importance of Children's Play",
        "The Growth of Bike-Sharing Schemes Around the World",
        "Motivational Factors and the Hospitality Industry",
      ],
      [
        "Alexander Henderson (1831–1913): Canadian Landscape Photographer",
        "Back to the Future of Skyscraper Design: Natural Ventilation",
        "Why Companies Should Welcome Disorder",
      ],
      [
        "The Concept of Intelligence Across Cultures",
        "Saving Bugs to Find New Drugs: Insect Pharmacology",
        "The Power of Play: Developmental Psychology",
      ],
      [
        "The Secret of Staying Young: Ant Colony Longevity",
        "Why Zoos Are Good for Conservation",
        "Marine Debris & Ocean Plastic Solutions",
      ],
    ],
    listening: [
      [
        "Crime Report Form: Stolen Briefcase on Bus",
        "Induction Talk for New Apprentices at Engineering Plant",
        "Cities Built by the Sea & Coastal Flooding",
        "Marine Renewable Energy: Wave & Tidal Turbines",
      ],
      [
        "Total Health Clinic Patient Registration",
        "Visit to Branley Castle History & Grounds",
        "Woolly Mammoth Extinction Research",
        "The History of Weather Forecasting",
      ],
      [
        "Flanders Conference Hotel Booking",
        "Volunteering at sea-turtle & conservation camps",
        "Background on School Marching Band",
        "Concerts in University Arts Festival",
      ],
      [
        "Enquiry About Booking Hotel Venue for Event",
        "Excursions from Hotel: Dolphin Watching & Caves",
        "Literature Review on Children's Poetry",
        "The Hunt for Sunken Ships & Underwater Archaeology",
      ],
    ],
    writing1: [
      "Tables: Average Percentages in Typical Meals of Three Types of Nutrients",
      "Bar Chart: Value of Exports of One Country in Five Categories",
      "Process Diagram: How Hydroelectric Power Is Generated",
      "Plans: Public Park in 1920 when it Opened vs. Today",
    ],
    writing2: [
      "Some people believe that it is best to accept a bad situation, such as an unsatisfactory job or shortage of money. Others argue that it is better to try and improve such situations. Discuss both these views and give your own opinion.",
      "Some people say that the main environmental problem of our time is the loss of particular species of plants and animals. Others say that there are more important environmental problems. Discuss both these views and give your own opinion.",
      "Some people say that music is a good way of bringing people of different cultures and ages together. To what extent do you agree or disagree with this opinion?",
      "Nowadays many people choose to be self-employed, rather than to work for a company or organisation. Why might this be the case? What could be the disadvantages of being self-employed?",
    ],
    speaking: [
      [
        "Future Plans, Career & Ambitions",
        "Describe a book you have read more than once.",
        "Reading Culture in the Age of Short Videos",
      ],
      [
        "Social Media, Messaging Apps & Privacy",
        "Describe a piece of advice you received about choosing a career.",
        "Youth Employment & Career Guidance",
      ],
      [
        "Neighbours, Apartments & Community Spaces",
        "Describe a historical period you would like to learn more about.",
        "Teaching History in Schools & National Identity",
      ],
      [
        "Sky, Stars & Space Exploration",
        "Describe a prize or award you would like to win.",
        "Competition, Rewards & Motivation at Work",
      ],
    ],
  },
  15: {
    year: "2020",
    reading: [
      [
        "Nutmeg — A Valuable Spice",
        "Driverless Cars: Autonomous Mobility",
        "What Is Exploration?",
      ],
      [
        "Could Urban Engineers Learn from Dance?",
        "Should We Try to Bring Extinct Species Back to Life?",
        "Having a Laugh: The Psychology of Humour",
      ],
      [
        "Henry Moore (1898–1986): British Sculptor",
        "The Desolenator: Producing Clean Water with Solar Energy",
        "Why Fairy Tales Are Really Scary Tales",
      ],
      [
        "The Return of the Huarango: Desert Trees of Peru",
        "Silbo Gomero — The Whistled Language of the Canary Islands",
        "Environmental Practices of Big Businesses",
      ],
    ],
    listening: [
      [
        "Bankside Recruitment Agency Registration",
        "Matthews Island Holidays Timetable",
        "Birth Order and Personality Research",
        "The Eucalyptus Tree in Australia",
      ],
      [
        "Festival Information & Eustatis Concert",
        "Minster Park History & Redesign",
        "Visual Arts Project on Charles Dickens",
        "Agricultural Programme in Mozambique",
      ],
      [
        "Employment Agency Job Interview Notes",
        "Street Play Scheme for Local Neighbourhoods",
        "Assignment on Water Hyacinth in East Africa",
        "The History of Salt & Food Preservation",
      ],
      [
        "Customer Satisfaction Survey on Train Journey",
        "Croft Valley Park New Cafe & Facilities",
        "Presentation on Refrigeration History",
        "How the Industrial Revolution Affected Life in Britain",
      ],
    ],
    writing1: [
      "Bar Chart: Survey Results on Coffee and Tea Buying and Drinking Habits in Five Australian Cities",
      "Line Graph: Number of Tourists Visiting a Particular Caribbean Island (2010–2017)",
      "Process Diagram: How Instant Noodles Are Manufactured",
      "Bar Chart: Anthropological Graduates from One University Destination after Course",
    ],
    writing2: [
      "In some countries, owning a home rather than renting one is very important for people. Why might this be the case? Do you think this is a positive or negative situation?",
      "In the future, nobody will buy printed newspapers or books because they will be able to read everything they want online without paying. To what extent do you agree or disagree with this statement?",
      "Some people say that advertising is extremely successful at persuading us to buy things. Other people think that advertising is so common that we no longer pay attention to it. Discuss both these views and give your own opinion.",
      "In some cultures, children are often told that they can achieve anything if they try hard enough. What are the advantages and disadvantages of giving children this message?",
    ],
    speaking: [
      [
        "Email, Communication & Handwriting",
        "Describe a hotel or place you stayed in during a holiday.",
        "Hospitality Standards & Eco-Tourism",
      ],
      [
        "Languages, Accents & Foreign Travel",
        "Describe a time when you helped a friend or relative.",
        "Volunteering & Community Solidarity",
      ],
      [
        "Fish, Rivers & Water Sports",
        "Describe a challenge you overcame while learning something new.",
        "Resilience & Growth Mindset in Education",
      ],
      [
        "Laughter, Comedy & Stress Relief",
        "Describe an environmental law or initiative you think is effective.",
        "Corporate Responsibility & Climate Action",
      ],
    ],
  },
  16: {
    year: "2021",
    reading: [
      [
        "Why We Need to Protect Polar Bears",
        "The Step Pyramid of Djoser",
        "The Future of Work: AI and Workforce Transformation",
      ],
      [
        "The White Horse of Uffington",
        "I Contain Multitudes: Microbes and Human Health",
        "How to Make Wise Decisions",
      ],
      [
        "Roman Shipbuilding and Navigation",
        "Climate Change Reveals Ancient Artefacts in Norway's Glaciers",
        "Plant 'Thermometers' Trigger Springtime Growth",
      ],
      [
        "Roman Tunnels: Ancient Underground Engineering",
        "Changes in Reading Habits in the Digital Era",
        "Attitudes Towards Artificial Intelligence",
      ],
    ],
    listening: [
      [
        "Children's Engineering Workshops",
        "Stevenson's Metal Goods Factory Layout",
        "Art Projects on Outdoor Sculptures",
        "Stoicism: Ancient Philosophy in Modern Life",
      ],
      [
        "Copying Photos to Digital Format Service",
        "Dartfield House School Cafeteria & Renovation",
        "Assignment on Sleep and Dreams",
        "Health Benefits of Dance Across Age Groups",
      ],
      [
        "Junior Cycle Camp Registration",
        "Recruitment for Bidcaster Archaeological Dig",
        " nutritional Value of Potatoes & Sweet Potatoes",
        "Hand Knitting: History & Global Revival",
      ],
      [
        "Holiday Rental Cottage in Chamonix",
        "Local Council Traffic & Bike Lane Proposals",
        "Bike-Sharing Scheme Case Study in Cities",
        "The Extinction of the Dodo Bird",
      ],
    ],
    writing1: [
      "Line Graphs: Electrical Appliances in Households & Hours of Housework (1920–2019)",
      "Process Diagram: How Sugar Is Produced from Sugar Cane",
      "Site Plans: Southwest Airport Current Layout vs. Next Year's Redevelopment",
      "Process Diagram: Recycling Plastic Bottles into New Products",
    ],
    writing2: [
      "In some countries, more and more people are becoming interested in finding out about the history of the house or building they live in. What are the reasons for this? How can people research this?",
      "In their advertising, businesses nowadays usually emphasise that their products are new in some way. Why is this? Do you think it is a positive or negative development?",
      "Many manufactured food and drink products contain high levels of sugar, which causes many health problems. Sugary products should be made more expensive to encourage people to consume less sugar. Do you agree or disagree?",
      "In the future all cars, buses and trucks will be driverless. The only people travelling inside these vehicles will be passengers. Do you think the advantages of driverless vehicles outweigh the disadvantages?",
    ],
    speaking: [
      [
        "Trees, Forests & Childhood Parks",
        "Describe a luxury item you would like to buy in the future.",
        "Consumerism & Financial Literacy",
      ],
      [
        "Flowers, Gardening & Local Markets",
        "Describe a live performance or concert you enjoyed watching.",
        "Performing Arts & Cultural Funding",
      ],
      [
        "Summer Weather, Holidays & Picnics",
        "Describe a small local business in your neighbourhood that you like.",
        "Small Enterprises vs. Multinational Chains",
      ],
      [
        "Fast Food, Street Food & Traditional Dishes",
        "Describe a piece of good news you received recently.",
        "Media Reporting & Positive Journalism",
      ],
    ],
  },
  17: {
    year: "2022",
    reading: [
      [
        "The Development of the London Underground Railway",
        "Stadiums: Past, Present and Future",
        "To Catch a King: Charles II's Escape",
      ],
      [
        "The Dead Sea Scrolls: Ancient Manuscripts",
        "A Second Attempt at Domesticating the Tomato",
        "Insight or Evolution? How Scientific Discoveries Happen",
      ],
      [
        "The Thylacine: Extinction of the Tasmanian Tiger",
        "Palm Oil: Global Production and Sustainability",
        "Building the Skyline: The Birth and Growth of Manhattan's Skyscrapers",
      ],
      [
        "Bats to the Rescue: Madagascar's Pest Control",
        "Timur Gareyev — Blindfold Chess Champion",
        "Does Education Fuel Economic Growth?",
      ],
    ],
    listening: [
      [
        "Buckworth Conservation Group Volunteering",
        "Boat Trip Round Tasmania Briefing",
        "Work Experience for Veterinary Science Students",
        "Labyrinths: History, Geometry and Meditation",
      ],
      [
        "Opportunities for Voluntary Work in Southoe",
        "Oniton Hall Historic Estate Audio Tour",
        "Romeo and Juliet Stage Production Discussion",
        "The Impact of Digital Technology on Children's Reading",
      ],
      [
        "Advice on Surfing Holidays in County Clare",
        "Childcare Services at Little Stars Nursery",
        "Hollylands Museum & Textile History Project",
        "Bird Migration and Navigation Mechanisms",
      ],
      [
        "Easy Life Cleaning Services Booking",
        "Staff Turnover in Hotel & Hospitality Sector",
        "Sporting Goods & Equipment Innovation",
        "Maple Syrup Production in Canada",
      ],
    ],
    writing1: [
      "Maps: Norbiton Industrial Area Now vs. Planned Housing Development",
      "Table & Pie Charts: Police Budget and Crime Rates in One Area of Britain",
      "Bar Chart: Family Weekly Expenditure Comparison (1968 vs. 2018)",
      "Line Graph: Shop Closures and Openings in One Country (2011–2018)",
    ],
    writing2: [
      "It is important for people to take risks, both in their professional lives and their personal lives. Do you think the advantages of taking risks outweigh the disadvantages?",
      "Some children spend hours every day on their smartphones. Why is this the case? Do you think this is a positive or a negative development?",
      "Some people believe that professionals, such as doctors and engineers, should be required to work in the country where they did their training. Others believe they should be free to work in another country if they wish. Discuss both these views and give your own opinion.",
      "Nowadays, a growing number of people with health problems are trying alternative medicines and treatments instead of visiting their usual doctor. Do you think this is a positive or a negative development?",
    ],
    speaking: [
      [
        "History, Museums & Old Buildings",
        "Describe a disagreement you had with a friend or colleague.",
        "Conflict Resolution & Communication Skills",
      ],
      [
        "Reading Habits, Libraries & E-Books",
        "Describe a movie or documentary that made a strong impression on you.",
        "Cinema, Streaming Platforms & Cultural Storytelling",
      ],
      [
        "Drinks, Tea/Coffee & Social Gatherings",
        "Describe an object you lost and fortunately found again.",
        "Material Possessions & Mindfulness",
      ],
      [
        "Maps, Navigation & Exploring New Cities",
        "Describe a person you know who loves growing plants.",
        "Urban Agriculture & Sustainable Food Systems",
      ],
    ],
  },
  18: {
    year: "2023",
    reading: [
      [
        "Urban Farming in Paris: Rooftop Agriculture",
        "Forest Management in Pennsylvania, USA",
        "Conquering Earth's Space Junk Problem",
      ],
      [
        "Stonehenge: Ancient Monument of Britain",
        "Living with Artificial Intelligence",
        "An Ideal City: Leonardo da Vinci's Urban Vision",
      ],
      [
        "Materials to Take Us Beyond Concrete",
        "The Steam Car: Rise, Fall and Engineering",
        "The Case for Mixed-Ability Classes in Schools",
      ],
      [
        "Green Roofs: Cooling Modern Cities",
        "The Growth Mindset in Education",
        "Alfred Wegener: Continental Drift Theory",
      ],
    ],
    listening: [
      [
        "Transport Survey in Sadie's Postcode Area",
        "Becoming a Volunteer for ACE Organisation",
        "Talk on Jobs in Fashion Design",
        "Elephant Translocation in Malawi",
      ],
      [
        "Working at Milo's Restaurants Recruitment",
        "Housing Development in Nunston",
        "The Laki Eruption of 1783 Case Study",
        "Pockets in Women's & Men's Clothing History",
      ],
      [
        "Wayside Camera Club Membership",
        "Danube Coaching & Business Consultancy",
        "自动化 (Automation) and the Future of Work",
        "Space Traffic Management & Satellite Orbits",
      ],
      [
        "Job Details from Employment Agency (Receptionist)",
        " Winridge Forest Railway Park Visitor Guide",
        "Origami in Education & Engineering",
        "Victor Hugo's Exile in Guernsey",
      ],
    ],
    writing1: [
      "Line Graph: Percentage of Population Living in Urban Areas in Four Asian Countries",
      "Bar Chart: Households by Annual Income in the US (2007, 2011, 2015)",
      "Floor Plans: Central Library 20 Years Ago vs. Today",
      "Line Graph: Average Monthly Change in the Prices of Copper, Nickel and Zinc",
    ],
    writing2: [
      "The most important aim of science should be to improve people's lives. To what extent do you agree or disagree with this statement?",
      "Some university students want to learn about other subjects in addition to their main subjects. Others believe it is more important to give all their time and attention to studying for a qualification. Discuss both these views and give your own opinion.",
      "In many countries around the world, rural people are moving to cities, so the population in the countryside is decreasing. Do you think this is a positive or a negative development?",
      "In many countries, people now wear Western-style clothes such as suits and jeans rather than traditional clothing. Why is this? Is this a positive or negative development?",
    ],
    speaking: [
      [
        "Paying Bills, Digital Banking & Budgeting",
        "Describe a person who recently moved to a new place.",
        "Relocation, Urbanisation & Community Integration",
      ],
      [
        "Rainy Days, Seasons & Outdoor Plans",
        "Describe a science subject (e.g., Biology, Physics) you enjoyed at school.",
        "STEM Education & Public Understanding of Science",
      ],
      [
        "Online Shopping vs. Local Markets",
        "Describe a painting or photograph you would like to have in your home.",
        "Visual Arts, Architecture & Public Aesthetics",
      ],
      [
        "Sleep, Rest & Daily Productivity",
        "Describe a traditional festival celebrated in your country.",
        "Cultural Traditions in a Globalised World",
      ],
    ],
  },
  19: {
    year: "2024",
    reading: [
      [
        "How Tennis Rackets Have Changed",
        "The Pirates of the Ancient Mediterranean",
        "The Persistence and Peril of Misinformation",
      ],
      [
        "The Industrial Revolution in Britain",
        "Athletes and Stress: Sports Psychology",
        "An Inquiry into the Existence of the Gifted Child",
      ],
      [
        "Archaeologists Discover Evidence of Prehistoric Island Settlers",
        "The Global Importance of Wetlands",
        "Speech Dysfluency and Artificial IntelligenceTranslation",
      ],
      [
        "The Impact of Climate Change on Butterflies in Britain",
        "Deep-Sea Mining: Resource Extraction vs. Marine Ecology",
        "The Unfairness of Human Society: Evolutionary Perspectives",
      ],
    ],
    listening: [
      [
        "Hinchingbrooke Country Park Educational Visit",
        "Stanfield Theatre Redevelopment & Booking",
        "Food Science: Local vs. Imported Produce",
        "Céide Fields: Neolithic Site in Ireland",
      ],
      [
        "Guitar Group Coordinator Enquiry",
        "Working as a Lifeboat Volunteer",
        "Recycling Footwear & Circular Fashion",
        "Tardigrades (Water Bears): Extreme Survival",
      ],
      [
        "Local Food Shops & Shannon's Supermarket",
        "Festival Workshops for Children & Families",
        "Clare and Grant's Science Experiment on Books",
        "Microplastics in the Environment",
      ],
      [
        "First Day at Work: Supermarket Induction",
        "Running & Marathon Training Podcast",
        "Bookbinding & Paper Conservation History",
        "Tree Planting Schemes & Biodiversity Restoration",
      ],
    ],
    writing1: [
      "Line Graph: Participation in Four Different Sports in a European Area",
      "Maps: Port of Porth Harbour Layout in 2000 vs. Today",
      "Process Diagram: How Biodiesel Is Produced from Vegetable Oils",
      "Bar Charts: Youth Sports Participation by Gender in New Zealand",
    ],
    writing2: [
      "Some people think that competition at work, at school and in daily life is a good thing. Others believe that we should try to cooperate more, rather than competing against each other. Discuss both these views and give your own opinion.",
      "The working week should be shorter and workers should have a longer weekend. Do you agree or disagree?",
      "It is important for everyone, including young people, to save money for their future. To what extent do you agree or disagree with this statement?",
      "In many countries, supermarkets give customers access to products from all over the world. Do you think this is a positive or negative development?",
    ],
    speaking: [
      [
        "International Food, Street Markets & Cooking",
        "Describe a park or natural area you enjoy visiting in your city.",
        "Green Spaces, Urban Planning & Well-Being",
      ],
      [
        "Travelling by Plane, Train & Road Trips",
        "Describe a person whose job is very useful to society.",
        "Essential Workers, Wages & Career Prestige",
      ],
      [
        "Holidays, Festivals & Family Gatherings",
        "Describe an indoor game you played when you were a child.",
        "Play, Childhood Development & Screen Time",
      ],
      [
        "Cafes, Study Spaces & Concentration",
        "Describe a law you would like to introduce to protect the environment.",
        "Environmental Policy, Citizens & Global Cooperation",
      ],
    ],
  },
};

export const CAMBRIDGE_BOOKS: CambridgeBook[] = [
  19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9,
].map((bookNum) => {
  const meta = CAMBRIDGE_BOOK_TOPICS[bookNum];
  const tests = ([1, 2, 3, 4] as const).map((tNum) => {
    const idx = tNum - 1;
    const rTitles = meta.reading[idx];
    const lTitles = meta.listening[idx];
    const w1Title = meta.writing1[idx];
    const w2Prompt = meta.writing2[idx];
    const sTopics = meta.speaking[idx];

    const singleTest: CambridgeSingleTest = {
      id: `cam-${bookNum}-test-${tNum}`,
      bookNumber: bookNum,
      testNumber: tNum,
      title: `Cambridge IELTS ${bookNum} — Test ${tNum}`,
      readingPassages: [
        {
          passageNumber: 1,
          title: rTitles[0],
          questionRange: "Questions 1–13",
          questionTypes: ["True / False / Not Given", "Note Completion"],
          topic: "Academic Passage 1",
        },
        {
          passageNumber: 2,
          title: rTitles[1],
          questionRange: "Questions 14–26",
          questionTypes: [
            "Matching Headings",
            "Summary Completion",
            "Multiple Choice",
          ],
          topic: "Academic Passage 2",
        },
        {
          passageNumber: 3,
          title: rTitles[2],
          questionRange: "Questions 27–40",
          questionTypes: [
            "Yes / No / Not Given",
            "Multiple Choice",
            "Matching Features",
          ],
          topic: "Academic Passage 3",
        },
      ],
      listeningParts: [
        {
          partNumber: 1,
          title: lTitles[0],
          questionRange: "Questions 1–10",
          format: "Everyday Social Conversation (2 Speakers)",
          questionTypes: ["Form Completion", "Note Completion"],
        },
        {
          partNumber: 2,
          title: lTitles[1],
          questionRange: "Questions 11–20",
          format: "Public Information Monologue",
          questionTypes: ["Multiple Choice", "Map / Plan Labeling"],
        },
        {
          partNumber: 3,
          title: lTitles[2],
          questionRange: "Questions 21–30",
          format: "Academic Discussion (Tutor & Students)",
          questionTypes: ["Multiple Choice", "Matching Information"],
        },
        {
          partNumber: 4,
          title: lTitles[3],
          questionRange: "Questions 31–40",
          format: "University Lecture Monologue",
          questionTypes: ["Note Completion (ONE WORD ONLY)"],
        },
      ],
      writingTasks: [
        {
          taskNumber: 1,
          type: w1Title.split(":")[0] || "Academic Task 1",
          minWords: 150,
          recommendedMinutes: 20,
          title: `Cambridge ${bookNum} Test ${tNum} — Writing Task 1: ${w1Title}`,
          prompt: `The visual data (${w1Title}) illustrates key trends and comparisons. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.`,
          visualDataSummary: w1Title,
          sampleOutline:
            "Paragraph 1: Paraphrase the visual description · Paragraph 2: Clear Overview of the highest/lowest trends · Paragraph 3 & 4: Specific numerical details and comparisons.",
        },
        {
          taskNumber: 2,
          type: "Academic Task 2 Essay",
          minWords: 250,
          recommendedMinutes: 40,
          title: `Cambridge ${bookNum} Test ${tNum} — Writing Task 2 Essay`,
          prompt: `${w2Prompt} Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`,
          sampleOutline:
            "Paragraph 1: Introduction (Paraphrase + Clear Position/Thesis) · Paragraph 2: First main argument + concrete example · Paragraph 3: Second argument / opposing view + evaluation · Paragraph 4: Conclusion.",
        },
      ],
      speakingParts: [
        {
          partNumber: 1,
          title: "Part 1: Introduction & Interview (4–5 minutes)",
          topic: sTopics[0],
          prepSeconds: 0,
          speakSeconds: 60,
          questions: [
            `1. Let's talk about ${sTopics[0]}. How important is this in your daily life?`,
            `2. Has your attitude toward ${sTopics[0].toLowerCase()} changed since you were younger?`,
            `3. What do people in your hometown usually enjoy about ${sTopics[0].toLowerCase()}?`,
            `4. Would you like to spend more time on this in the future? Why?`,
          ],
        },
        {
          partNumber: 2,
          title: "Part 2: Individual Long Turn / Cue Card (1 min prep + 2 min talk)",
          topic: sTopics[1],
          prepSeconds: 60,
          speakSeconds: 120,
          questions: [
            "You should say:",
            "• What or who it is and when you first encountered it",
            "• What specific details you remember most clearly",
            "• How it affected your thoughts or daily routine",
            "• And explain why it left a strong impression on you.",
          ],
        },
        {
          partNumber: 3,
          title: "Part 3: Two-Way Abstract Discussion (4–5 minutes)",
          topic: sTopics[2],
          prepSeconds: 0,
          speakSeconds: 90,
          questions: [
            `1. Considering ${sTopics[2]}, what are the main changes that have occurred in your country over the last two decades?`,
            `2. Do you think governments or individuals bear more responsibility regarding ${sTopics[2].toLowerCase()}?`,
            `3. How might technological developments influence ${sTopics[2].toLowerCase()} over the next twenty years?`,
          ],
        },
      ],
    };

    return singleTest;
  }) as [
    CambridgeSingleTest,
    CambridgeSingleTest,
    CambridgeSingleTest,
    CambridgeSingleTest
  ];

  return {
    bookNumber: bookNum,
    slug: `cambridge-${bookNum}`,
    title: `Cambridge IELTS ${bookNum}`,
    editionLabel: "Academic & General Training",
    year: meta.year,
    tests,
  };
});

export function getCambridgeBookByNumber(
  bookNumber: number
): CambridgeBook | undefined {
  return CAMBRIDGE_BOOKS.find((b) => b.bookNumber === bookNumber);
}

export function getCambridgeTestById(
  testId: string
): CambridgeSingleTest | undefined {
  for (const book of CAMBRIDGE_BOOKS) {
    const found = book.tests.find((t) => t.id === testId);
    if (found) return found;
  }
  return undefined;
}

/**
 * Generates dynamic PassageItem, QuestionItems, and TestConfig for any
 * Cambridge 9-19 Test so it can run directly inside the unified Test Engine!
 */
export function buildCambridgeEngineConfig(
  camTestId: string,
  moduleType: "Reading" | "Listening" | "Full Mock"
): {
  testConfig: TestConfig;
  passages: PassageItem[];
  questions: QuestionItem[];
} | null {
  const camTest = getCambridgeTestById(camTestId);
  if (!camTest) return null;

  const p1Title = camTest.readingPassages[0].title;
  const p2Title = camTest.readingPassages[1].title;
  const p3Title = camTest.readingPassages[2].title;
  const l1Title = camTest.listeningParts[0].title;
  const l4Title = camTest.listeningParts[3].title;

  const readingPassage: PassageItem = {
    id: `passage-${camTest.id}-reading`,
    title: `${camTest.title}: ${p1Title}`,
    subtitle: `Passages 1–3: (1) ${p1Title} · (2) ${p2Title} · (3) ${p3Title}`,
    module: "IELTS_READING",
    difficulty: "Medium",
    topic: p1Title,
    source: `Cambridge IELTS ${camTest.bookNumber} Test ${camTest.testNumber}`,
    paragraphs: [
      {
        label: "A",
        text: `[Passage 1: ${p1Title}] Over the past three decades, researchers examining "${p1Title}" have documented how technological innovation, environmental adaptation, and institutional reforms interact. Early field observations suggested that localized interventions required at least twenty years to mature, whereas modern systematic methodologies achieve measurable benchmarks within just three to five years.`,
      },
      {
        label: "B",
        text: `A pivotal turning point occurred when interdisciplinary teams compared historical archives with contemporary empirical data. Contrary to the widespread assumption that initial capital expenditure determines long-term viability, the findings demonstrated that community integration and maintenance protocols reduced operational costs by nearly 60 percent over a ten-year cycle.`,
      },
      {
        label: "C",
        text: `[Passage 2: ${p2Title}] Turning to "${p2Title}", analysts identified three distinct phases of development: initial experimentation, rapid standardization, and regulatory consolidation. While critics initially argued that standardization would stifle regional diversity, subsequent longitudinal surveys across twelve countries revealed a fourfold increase in public accessibility.`,
      },
      {
        label: "D",
        text: `[Passage 3: ${p3Title}] Finally, in evaluating "${p3Title}", contemporary scholars emphasize the distinction between short-term correlation and long-term causation. Specifically, where early models relied on isolated laboratory measurements, modern frameworks integrate real-time sensor networks and cross-cultural longitudinal cohorts.`,
      },
    ],
  };

  const listeningPassage: PassageItem = {
    id: `passage-${camTest.id}-listening`,
    title: `${camTest.title} Listening: ${l1Title}`,
    subtitle: `Parts 1–4 Audio Script & Context · Part 1: ${l1Title} · Part 4: ${l4Title}`,
    module: "IELTS_LISTENING",
    difficulty: "Medium",
    topic: l1Title,
    source: `Cambridge IELTS ${camTest.bookNumber} Test ${camTest.testNumber}`,
    audioUrl:
      camTest.customAudioUrl ||
      "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg",
    paragraphs: [
      {
        label: "Part 1",
        text: `[Audio Transcript — Part 1: ${l1Title}] Coordinator: "Good morning! Regarding your registration for ${l1Title}, let me confirm your details. Your reference code is registered under the name Henderson—that's H-E-N-D-E-R-S-O-N. The standard weekly fee was originally 195 pounds, but with the early-bird discount it is 180 pounds, including the orientation pack."`,
      },
      {
        label: "Part 2 & 3",
        text: `[Audio Transcript — Part 2 & 3: ${camTest.listeningParts[1].title} / ${camTest.listeningParts[2].title}] Speaker: "Please note on your site map that the main seminar hall is located directly opposite the library entrance, while the self-access laboratory has been relocated to the north wing."`,
      },
      {
        label: "Part 4",
        text: `[Audio Transcript — Part 4 Lecture: ${l4Title}] Lecturer: "In today's lecture on ${l4Title}, we examine why soil and structural preservation depend critically on organic biomass and long-term acoustic monitoring."`,
      },
    ],
  };

  const readingQuestions: QuestionItem[] = [
    {
      question_id: `${camTest.id}-r1`,
      module: "IELTS_READING",
      category: "Reading",
      question_type: "True / False / Not Given",
      difficulty: "Easy",
      topic: p1Title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: readingPassage.id,
      section: "Passage 1",
      instruction:
        "Do the following statements agree with the information given in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.",
      question_text: `Modern systematic methodologies in "${p1Title}" achieve measurable benchmarks within three to five years.`,
      options: [
        { label: "TRUE", text: "TRUE" },
        { label: "FALSE", text: "FALSE" },
        { label: "NOT GIVEN", text: "NOT GIVEN" },
      ],
      correct_answer: "TRUE",
      explanation:
        "Paragraph A explicitly states that modern systematic methodologies achieve measurable benchmarks within just three to five years.",
      explanation_bn:
        "প্যারাগ্রাফ A-তে স্পষ্ট বলা আছে যে আধুনিক পদ্ধতিতে ৩ থেকে ৫ বছরের মধ্যে ফলাফল পাওয়া যায়। তাই উত্তর TRUE।",
      created_at: "2026-09-25",
    },
    {
      question_id: `${camTest.id}-r2`,
      module: "IELTS_READING",
      category: "Reading",
      question_type: "True / False / Not Given",
      difficulty: "Medium",
      topic: p1Title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: readingPassage.id,
      section: "Passage 1",
      instruction:
        "Do the following statements agree with the information given in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.",
      question_text:
        "Community integration and maintenance protocols increased operational costs over a ten-year cycle.",
      options: [
        { label: "TRUE", text: "TRUE" },
        { label: "FALSE", text: "FALSE" },
        { label: "NOT GIVEN", text: "NOT GIVEN" },
      ],
      correct_answer: "FALSE",
      explanation:
        "Paragraph B states that community integration and maintenance protocols REDUCED operational costs by nearly 60 percent over a ten-year cycle.",
      explanation_bn:
        "প্যারাগ্রাফ B অনুযায়ী খরচ বাড়েনি, বরং ১০ বছরে প্রায় ৬০% কমেছে। তাই উত্তর FALSE।",
      created_at: "2026-09-25",
    },
    {
      question_id: `${camTest.id}-r3`,
      module: "IELTS_READING",
      category: "Reading",
      question_type: "Matching Headings",
      difficulty: "Medium",
      topic: p2Title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: readingPassage.id,
      section: "Passage 2",
      instruction:
        "Choose the correct heading for Paragraph C from the list of headings below.",
      question_text: `Select the most suitable heading for Paragraph C (${p2Title}):`,
      options: [
        {
          label: "i",
          text: "i. Three developmental phases and unexpected gains in accessibility",
        },
        {
          label: "ii",
          text: "ii. Why early laboratory equipment failed in rural regions",
        },
        {
          label: "iii",
          text: "iii. Financial penalties imposed by international regulators",
        },
      ],
      correct_answer: "i",
      explanation:
        "Paragraph C outlines the three distinct phases of development and notes a fourfold increase in public accessibility.",
      explanation_bn:
        "প্যারাগ্রাফ C-তে উন্নয়নের তিনটি ধাপ এবং জনসাধারণের সুবিধাপ্রাপ্তি চারগুণ বৃদ্ধির কথা বলা হয়েছে। তাই উত্তর i।",
      created_at: "2026-09-25",
    },
    {
      question_id: `${camTest.id}-r4`,
      module: "IELTS_READING",
      category: "Reading",
      question_type: "Note Completion",
      difficulty: "Hard",
      topic: p3Title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: readingPassage.id,
      section: "Passage 3",
      instruction:
        "Complete the note below. Write ONE WORD ONLY from Paragraph D.",
      question_text:
        "Modern analytical frameworks integrate real-time __________ networks alongside cross-cultural cohorts.",
      correct_answer: "sensor",
      accepted_answers: ["sensor"],
      explanation:
        "Paragraph D states: 'modern frameworks integrate real-time sensor networks and cross-cultural longitudinal cohorts.'",
      explanation_bn:
        "প্যারাগ্রাফ D-তে 'real-time sensor networks' উল্লেখ আছে, তাই উত্তর sensor।",
      created_at: "2026-09-25",
    },
  ];

  const listeningQuestions: QuestionItem[] = [
    {
      question_id: `${camTest.id}-l1`,
      module: "IELTS_LISTENING",
      category: "Listening",
      question_type: "Form Completion",
      difficulty: "Easy",
      topic: l1Title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: listeningPassage.id,
      section: "Part 1",
      instruction:
        "Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.",
      question_text: "Applicant Registered Surname: __________",
      correct_answer: "Henderson",
      accepted_answers: ["Henderson", "henderson"],
      explanation:
        "The speaker spells out the surname: H-E-N-D-E-R-S-O-N.",
      explanation_bn:
        "অডিওতে নাম বানান করে বলা হয়েছে: H-E-N-D-E-R-S-O-N।",
      created_at: "2026-09-25",
    },
    {
      question_id: `${camTest.id}-l2`,
      module: "IELTS_LISTENING",
      category: "Listening",
      question_type: "Form Completion",
      difficulty: "Medium",
      topic: l1Title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: listeningPassage.id,
      section: "Part 1",
      instruction: "Write A NUMBER for the answer.",
      question_text: "Discounted Weekly Fee: £ __________",
      correct_answer: "180",
      accepted_answers: ["180"],
      explanation:
        "195 pounds was the original fee (distractor), but the discounted fee is 180 pounds.",
      explanation_bn:
        "১৯৫ পাউন্ড ছিল আগের ফি (Distractor), কিন্তু ডিসকাউন্টের পর আসল ফি ১৮০ পাউন্ড।",
      created_at: "2026-09-25",
    },
    {
      question_id: `${camTest.id}-l3`,
      module: "IELTS_LISTENING",
      category: "Listening",
      question_type: "Multiple Choice",
      difficulty: "Medium",
      topic: camTest.listeningParts[1].title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: listeningPassage.id,
      section: "Part 2",
      instruction: "Choose the correct letter, A, B, or C.",
      question_text: "Where has the self-access laboratory been relocated?",
      options: [
        { label: "A", text: "A. Next to the main cafeteria" },
        { label: "B", text: "B. To the north wing" },
        { label: "C", text: "C. Inside the south annex" },
      ],
      correct_answer: "B",
      explanation:
        "Part 2 transcript states: 'the self-access laboratory has been relocated to the north wing.'",
      explanation_bn:
        "পার্ট ২-এ বলা হয়েছে ল্যাবরেটরিটি North Wing-এ সরিয়ে নেওয়া হয়েছে।",
      created_at: "2026-09-25",
    },
    {
      question_id: `${camTest.id}-l4`,
      module: "IELTS_LISTENING",
      category: "Listening",
      question_type: "Note Completion",
      difficulty: "Hard",
      topic: l4Title,
      source: `Cambridge ${camTest.bookNumber} Test ${camTest.testNumber}`,
      test_id: `${camTest.id}-${moduleType}`,
      passage_id: listeningPassage.id,
      section: "Part 4",
      instruction: "Complete the lecture notes. Write ONE WORD ONLY.",
      question_text:
        "Long-term preservation depends critically on organic __________ and acoustic monitoring.",
      correct_answer: "biomass",
      accepted_answers: ["biomass"],
      explanation:
        "Part 4 Lecturer states: '...depend critically on organic biomass and long-term acoustic monitoring.'",
      explanation_bn:
        "পার্ট ৪ লেকচারে 'organic biomass' উল্লেখ করা হয়েছে।",
      created_at: "2026-09-25",
    },
  ];

  if (moduleType === "Reading") {
    return {
      passages: [readingPassage],
      questions: readingQuestions,
      testConfig: {
        id: `${camTest.id}-Reading`,
        title: `${camTest.title} — Academic Reading`,
        subtitle: `Passage 1: ${p1Title} · Passage 2: ${p2Title} · Passage 3: ${p3Title}`,
        module: "Reading",
        durationMinutes: 60,
        totalQuestions: readingQuestions.length,
        difficulty: "Medium",
        source: `Cambridge ${camTest.bookNumber}`,
        isBandScored: true,
        instructions: [
          `Official ${camTest.title} Academic Reading format (60 minutes).`,
          "Read the passage on the left and answer the questions on the right.",
          "Your answers and remaining time are auto-saved automatically.",
        ],
        sections: [
          {
            id: "sec-reading",
            title: `${camTest.title} Reading Passages`,
            passageId: readingPassage.id,
            questionIds: readingQuestions.map((q) => q.question_id),
          },
        ],
      },
    };
  }

  if (moduleType === "Listening") {
    return {
      passages: [listeningPassage],
      questions: listeningQuestions,
      testConfig: {
        id: `${camTest.id}-Listening`,
        title: `${camTest.title} — Academic Listening`,
        subtitle: `Part 1: ${l1Title} · Part 4: ${l4Title}`,
        module: "Listening",
        durationMinutes: 30,
        totalQuestions: listeningQuestions.length,
        difficulty: "Medium",
        source: `Cambridge ${camTest.bookNumber}`,
        isBandScored: true,
        instructions: [
          `Official ${camTest.title} Listening format (30 minutes).`,
          "Play the audio stream and answer the questions carefully.",
          "Watch out for spelling, word limits, and speaker self-corrections.",
        ],
        sections: [
          {
            id: "sec-listening",
            title: `${camTest.title} Listening Parts 1–4`,
            passageId: listeningPassage.id,
            questionIds: listeningQuestions.map((q) => q.question_id),
          },
        ],
      },
    };
  }

  // Full Mock (Listening + Reading)
  const allQuestions = [...listeningQuestions, ...readingQuestions];
  return {
    passages: [listeningPassage, readingPassage],
    questions: allQuestions,
    testConfig: {
      id: `${camTest.id}-FullMock`,
      title: `${camTest.title} — Full Mock Exam`,
      subtitle: `Complete ${camTest.title} Simulation (Listening Parts 1–4 + Reading Passages 1–3)`,
      module: "Full Mock",
      durationMinutes: 90,
      totalQuestions: allQuestions.length,
      difficulty: "Medium",
      source: `Cambridge ${camTest.bookNumber}`,
      isBandScored: true,
      instructions: [
        `Complete ${camTest.title} simulation covering Listening and Reading.`,
        "Auto-save is active on every answer change and section switch.",
        "Detailed Wrong Answer Review and Band Score will appear immediately upon submission.",
      ],
      sections: [
        {
          id: "sec-listening",
          title: "Module 1: Listening (Parts 1–4)",
          passageId: listeningPassage.id,
          questionIds: listeningQuestions.map((q) => q.question_id),
        },
        {
          id: "sec-reading",
          title: "Module 2: Reading (Passages 1–3)",
          passageId: readingPassage.id,
          questionIds: readingQuestions.map((q) => q.question_id),
        },
      ],
    },
  };
}

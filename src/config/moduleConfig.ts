
import type { ScreenConfig, Badge } from '@/types/module';
import { AppleCoreIcon } from '@/components/icons/AppleCoreIcon';
import { PlasticBottleIcon } from '@/components/icons/PlasticBottleIcon';
import { PaperIcon } from '@/components/icons/PaperIcon';

import { AppleIcon } from '@/components/icons/AppleIcon';
import { NapkinIcon } from '@/components/icons/NapkinIcon';
import { NewspaperIcon } from '@/components/icons/NewspaperIcon';
import { WaterBottleIcon } from '@/components/icons/WaterBottleIcon';

import { WasteWarriorBadge } from '@/components/icons/WasteWarriorBadge';
import { GreenBinProBadge } from '@/components/icons/GreenBinProBadge';
import { Info, Recycle, Trash2, Leaf, Lightbulb, HelpCircle, Gift, Trees, Factory } from 'lucide-react';

export const badges: Badge[] = [
  { id: 'wasteWarrior', name: 'Waste Warrior', icon: WasteWarriorBadge, description: 'You are a true Waste Warrior!' },
  { id: 'greenBinPro', name: 'Green Bin Pro', icon: GreenBinProBadge, description: 'You are a Green Bin Pro!' },
];

export const screens: ScreenConfig[] = [
  {
    id: 'intro',
    type: 'intro',
    title: 'Household Waste Awareness',
    content: "Welcome, Newtown resident! In order for our waste collections to run smoothly, we rely on our residents to ensure that they use their waste facilities correctly and recycle as much as they can.",
    backgroundImageUrl: '/images/Waste_Micro_1.svg',
    backgroundAiHint: 'abstract illustration',
    voiceoverUrl: '/audio/1.mp3',
  },
  {
    id: 'coreMessage1',
    type: 'coreMessage',
    title: 'Introduction',
    content: "As residents of Newtown, it is important we work together and do our part to ensure our waste is being sorted and collected correctly. Making sure that we are reducing the amount of waste we produce and recycling everything we can goes a long way to looking after our planet and keeping our community clean and tidy.",
    backgroundImageUrl: '/images/Waste_Micro_3.svg',
    backgroundAiHint: 'community recycling',
    voiceoverUrl: '/audio/2.mp3',
  },
  {
    id: 'videoIntro',
    type: 'coreMessage',
    videoUrl: 'https://www.youtube.com/embed/sDfaRdQ07PU',
    backgroundImageUrl: '/images/Waste_Micro_2.svg',
    backgroundAiHint: 'video play abstract',
  },
  {
    id: 'coreMessage2',
    type: 'coreMessage',
    title: 'Recycle More, Waste Less',
    content: "Our goal: use facilities correctly and recycle as much as possible. Let's make Newtown a recycling champion!",
    backgroundImageUrl: '/images/Waste_Micro_1.svg',
    backgroundAiHint: 'recycling symbol nature',
    voiceoverUrl: '/audio/3.mp3',
  },
  {
    id: 'singleUsePlasticsTips',
    type: 'mythOrFact',
    title: 'Plastic Patrol: Myth or Fact?',
    mythOrFactStatements: [
      {
        id: 'pmf1',
        statementText: "All plastics are easily recyclable through curbside programs.",
        isFact: false,
        explanation: "While many plastics *can* be recycled, not all types are accepted in standard curbside programs. Items like plastic bags, films, and certain containers often require special drop-off locations or are not recyclable at all. Always check local guidelines!"
      },
      {
        id: 'pmf2',
        statementText: "Using a reusable water bottle makes a real difference in reducing plastic waste.",
        isFact: true,
        explanation: "Absolutely! A single person switching to a reusable water bottle can prevent hundreds of single-use plastic bottles from entering landfills or polluting the environment each year."
      },
      {
        id: 'pmf3',
        statementText: "'Biodegradable' plastics quickly break down in any landfill.",
        isFact: false,
        explanation: "Many 'biodegradable' plastics require specific industrial composting conditions (high heat, specific microbes) to break down, which are not typically present in standard landfills. They can persist for a long time if not disposed of correctly."
      },
      {
        id: 'pmf4',
        statementText: "Recycling symbols with numbers (1-7) mean an item is always recyclable curbside.",
        isFact: false,
        explanation: "The numbers inside recycling symbols (Resin Identification Codes) identify the type of plastic resin. However, local recycling capabilities vary greatly. Just because a plastic has a number doesn't guarantee your local facility can process it. Always check with your municipality!"
      }
    ],
    backgroundImageUrl: '/images/Waste_Micro_2.svg',
    backgroundAiHint: 'ocean plastic pollution',
  },
  {
    id: 'interactiveTips',
    type: 'interactiveTips',
    title: 'Household waste management in Newtown',
    tips: [
      { id: 'tip1', title: 'Properties', content: 'In Newtown we empty all the bins in 148,000 properties, which totals over 11 million bins emptied a year.', icon: Recycle },
      { id: 'tip2', title: 'Tonnage', content: 'These 148,000 properties generate over 140,000 tonnes of a year, we recycle 53% of this and are striving to recycle more.', icon: Info },
      { id: 'tip3', title: 'Cost', content: 'When the wrong waste is put into the wrong bin it can cause the whole load of waste to be rejected. Each rejected load costs £1300, costing the council a total of £150,000 per year.', icon: Leaf },    ],
    backgroundImageUrl: '/images/Waste_Micro_3.svg',
    backgroundAiHint: 'financial chart graph',
  },
  {
    id: 'sortingGame',
    type: 'sortingGame',
    title: 'Sort-It Challenge!',
    gameItems: [
      { id: 'item1', name: 'Water Bottle', type: 'recycling', icon: WaterBottleIcon, dataAiHint: "water bottle" },
      { id: 'item2', name: 'Apple', type: 'compost', icon: AppleIcon, dataAiHint: "apple" },
      { id: 'item3', name: 'Newspaper', type: 'recycling', icon: NewspaperIcon, dataAiHint: "newspaper" },
      { id: 'item4', name: 'Used Napkin', type: 'trash', icon: NapkinIcon, dataAiHint: "used napkin"},
    ],
    bins: [
      { id: 'recycling', name: 'Recycling', accepts: 'recycling', icon: Recycle },
      { id: 'trash', name: 'Trash', accepts: 'trash', icon: Trash2 },
      { id: 'compost', name: 'Compost', accepts: 'compost', icon: Leaf },
    ],
    backgroundImageUrl: '/images/Waste_Micro_2.svg',
    backgroundAiHint: 'waste sorting bins',
  },
  {
    id: 'knowledgeQuiz',
    type: 'knowledgeQuiz',
    title: '',
    questions: [
      {
        id: 'q1',
        text: 'Which of these items typically CANNOT be recycled in Newtown?',
        options: [
          { id: 'q1o1', text: 'Plastic Bottles (No. 1 & 2)', isCorrect: false },
          { id: 'q1o2', text: 'Plastic Bags/Film', isCorrect: true },
          { id: 'q1o3', text: 'Cardboard', isCorrect: false },
        ],
        feedbackCorrect: "Correct! Plastic bags often tangle machinery.",
        feedbackIncorrect: "Not quite! Plastic bags and film usually can't go in curbside recycling.",
        explanation: "Plastic bags require special drop-off locations. Check newtownboro.gov for details!"
      },
      {
        id: 'q2',
        text: 'What should you do with pizza boxes?',
        options: [
          { id: 'q2o1', text: 'Recycle the whole box', isCorrect: false },
          { id: 'q2o2', text: 'Trash the whole box', isCorrect: false },
          { id: 'q2o3', text: 'Recycle clean parts, trash greasy parts', isCorrect: true },
        ],
        feedbackCorrect: "You got it! Grease contaminates cardboard recycling.",
        feedbackIncorrect: "Almost! Only clean cardboard can be recycled.",
        explanation: "Remove any food and tear off greasy sections (trash/compost them) before recycling clean cardboard."
      },
    ],
    badgeToAward: 'greenBinPro',
    backgroundImageUrl: '/images/Waste_Micro_3.svg',
    backgroundAiHint: 'question mark brain',
  },
  {
    id: 'reward',
    type: 'reward',
    title: '',
    content: "You've successfully completed this module. Great job!",
    badgeToAward: 'wasteWarrior',
    backgroundImageUrl: '/images/Waste_Micro_1.svg',
    backgroundAiHint: 'celebration fireworks',
    voiceoverUrl: '/audio/4.mp3',
  },
];

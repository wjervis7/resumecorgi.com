import { FormData, Section } from '../types';

export const initialSections: Section[] = [
  { id: 'personalInfo', displayName: 'About You', href: '#start', selected: true, originalOrder: 0, sortOrder: 0, required: true, sortable: false },
  { id: 'experience', displayName: 'Experience', href: '#experience', selected: true, originalOrder: 1, sortOrder: 1, required: false, sortable: true },
  { id: 'education', displayName: 'Education', href: '#education', selected: true, originalOrder: 2, sortOrder: 2, required: false, sortable: true },
  { id: 'skills', displayName: 'Skills', href: '#skills', selected: true, originalOrder: 3, sortOrder: 3, required: false, sortable: true },
];

export const initialFormData: FormData = {
  "personalInfo": {
    "name": "James P. Sullivan",
    "contact0": "james.sullivan@monstersinc.com",
    "contact1": "linkedin.com/in/sully-0834673",
    "contact2": "",
    "contact3": "",
    "summary": "Top-performing monster with over 30 years of elite scaring experience and proven leadership in energy collection innovation. Pioneered the industry-transforming shift from scream to laugh energy, solving Monstropolis's energy crisis. Expert in scare floor management, door technology optimization, and scarer talent development. Holds company record for highest lifetime scare score and led company to 6 consecutive years of record-breaking."
  },
  "experience": [
    {
      "title": "Chief Scare Director",
      "company": "Monsters, Inc.",
      "start": "April 2020",
      "end": "Current",
      "accomplishments": "<ul>\n<li>Pioneered company-wide transition from scream energy to laugh energy, resulting in 843 percent increase in canister fills and solving Monstropolis's energy crisis within 6 months</li>\n<li>Led cross-functional team of 12 scarers to implement new door station technology, resulting in 27 percent increase in scare efficiency and 1.2M additional scream units collected quarterly</li>\n<li>Restructured scare floor operations through data-driven analysis, eliminating 780K in door maintenance costs while improving door deployment time from 82 percent to 97 percent efficiency</li>\n<li>Developed and implemented automated scare simulation framework that reduced scarer training time by 40 percent and identified 35 percent more optimization opportunities for individual scare techniques</li>\n<li>Created comprehensive monster onboarding program that reduced new hire training time by 30 percent and improved 90-day retention rates from 75 percent to 92 percent</li>\n</ul>"
    },
    {
      "title": "Senior Scare Director",
      "company": "Monsters, Inc",
      "start": "January 2017",
      "end": "April 2020",
      "accomplishments": "<ul>\n<li>Managed cross-departmental project to migrate legacy door tracking systems to cloud infrastructure, decreasing operational costs by 32 percent and improving system reliability from 99.1 percent to 99.9 percent uptime</li>\n<li>Pioneered scarer recognition program resulting in 28 percent increase in scare performance and 22 percent growth in average scream collection across 12 scare floors</li>\n<li>Directed comprehensive research initiative that identified three untapped scare techniques, leading to scarer development strategy that generated 3.5M additional scream units within fiscal year</li>\n<li>Established standardized safety protocols across all scare floors, reducing toxic child exposure incidents from 3.2 percent to 0.8 percent and decreasing CDA interventions by 47 percent</li>\n<li>Redesigned scare floor workflow processes by implementing Roar Six Sigma methodologies, increasing departmental productivity by 35 percent while reducing overtime expenses by 28 percent</li>\n</ul>"
    },
    {
      "title": "Senior Scare Floor Manager",
      "company": "Monsters, Inc",
      "start": "January 2015",
      "end": "January 2017",
      "accomplishments": "<ul>\n<li>Orchestrated digital transformation for door assignment department, implementing automated door station system that improved scarer deployment time by 62 percent and raised energy collection rates from 3.6 to 4.7 units per door</li>\n<li>Secured 2.4M in board funding through development of comprehensive scream energy plan, enabling expansion into three new scare territories ahead of projected timeline</li>\n<li>Launched targeted scarer training program that achieved 38 percent improvement in scream collection and 12 percent reduction in door failures, generating 850K in additional quarterly energy while staying 15 percent under allocated budget</li>\n<li>Negotiated strategic partnerships with five key canister manufacturers, resulting in 23 percent reduction in supply chain costs and establishing preferred pricing structure saving 375K annually</li>\n<li>Revitalized underperforming scare floor through data-driven scarer coaching, increasing regional scream collection by 47 percent and expanding productive scare stations from 24 to 38 in 10 months</li>\n</ul>"
    },
    {
      "title": "Scare Floor Manager",
      "company": "Monsters, Inc",
      "start": "August 2010",
      "end": "January 2015",
      "accomplishments": "<ul>\n<li>Engineered proprietary door tracking solution that consolidated information from seven disparate systems, reducing scarer assignment time from 40 minutes to 4 minutes daily and enabling real-time energy collection optimization</li>\n<li>Produced comprehensive training curriculum for 200 plus scare associates on new child behavior patterns, resulting in 42 percent increase in scream prediction scores and 29 percent growth in successful scares</li>\n<li>Executed scare floor redesign project emphasizing scarer efficiency, delivering 54 percent improvement in door cycle time and 67 percent increase in scream collection within first quarter post-implementation</li>\n<li>Cultivated relationships with Monsters University to develop new scarer talent pipeline, expanding potential hire pool by 78 percent and generating 150 qualified scarer candidates through co-created training initiatives</li>\n<li>Implemented robust child containment protocols across all scare floors, reducing contamination incidents by 76 percent and achieving compliance with CDA regulations three months ahead of deadline</li>\n</ul>"
    },
    {
      "title": "Distinguished Scare Fellow",
      "company": "Monsters, Inc",
      "start": "June 1991",
      "end": "August 2010",
      "accomplishments": "<ul>\n<li>Set all-time company record with 100,000 plus scare points for six consecutive years, earning \"Scarer of the Year\" honors and Monster Magazine's \"Top 10 Scarers\" distinction for 5 straight years</li>\n<li>Authored comprehensive scare techniques documentation that reduced training time for new scarers by 45 percent and ensured consistent quality across all monster types regardless of appendage count</li>\n<li>Conducted rigorous testing of 5,000 different door configurations, identifying optimal scare sequence timing that increased scream collection by 37 percent and extended average canister fill time by 4.2 minutes</li>\n<li>Streamlined scare floor processes through implementation of quick-change door tools, reducing door deployment time from 12 seconds to 3 seconds and capturing 125K in energy efficiency improvements annually</li>\n<li>Built scream analytics dashboard integrating key performance indicators from multiple scare floors, enabling executive team to identify emerging child resistance trends and make strategic pivots resulting in 18 percent scream share growth</li>\n</ul>"
    }
  ],
  "education": [
    {
      "degree": "Master of Scaring",
      "institution": "Monsters University",
      "location": "",
      "graduationDate": "1990",
      "gpa": "",
      "accomplishments": ""
    }
  ],
  "skills": [
    {
      category: "Tools",
      skillList: "Scare-o-meter 9000, Laugh-o-matic"
    }
  ]
};
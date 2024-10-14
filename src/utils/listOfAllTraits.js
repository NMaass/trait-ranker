import {
  BiAlarmOff,
  BiHappyBeaming,
  BsFillShieldLockFill,
  BsFillStopwatchFill,
  BsFillTreeFill,
  BsFillUnlockFill,
  BsMusicNoteBeamed,
  BsPeace,
  FaChild,
  FaFistRaised,
  FaHandshake,
  FaPiggyBank,
  FaRegKissWinkHeart,
  FaTools,
  FiTarget,
  GiBreakingChain,
  GiChoice,
  GiClothes,
  GiCrossedSwords,
  GiFlyingFlag,
  GiGearHammer,
  GiGlowingHands,
  GiHeartInside,
  GiHeartKey,
  GiMedallist,
  GiMountainClimbing,
  GiMountainRoad,
  GiNightSleep,
  GiPalette,
  GiPillow,
  GiSplitArrows,
  GrLineChart,
  HiOutlineScale,
  HiPuzzle,
  MdAccessTime,
  MdConnectWithoutContact,
  MdFamilyRestroom,
  MdFitnessCenter,
  MdLeaderboard,
  MdMenuBook,
  MdOutlineThumbsUpDown,
  MdOutlineVerifiedUser,
  MdPsychology,
  MdSocialDistance,
  MdSportsSoccer,
  MdVolunteerActivism,
  RiEmotionSadLine,
  RiGovernmentLine,
  RiUserHeartFill,
  SiHandshake,
  GiLion,
  RiErrorWarningFill,
  FaGrinStars,
  FaThumbsDown,
  GiSittingDog,
  FaUserGraduate,
  GiMeditation,
  FaShapes,
  BiGlasses,
  BsQuestionCircle,
  AiOutlineOrderedList,
  GiFireworkRocket,
  MdBathtub,
  GiBinoculars,
  FaRegSmileBeam,
  FaDoorOpen,
  GiPencilBrush,
  GiButterfly,
} from "react-icons/all";

const allTraits = [
  "Adventure",
  "Ambition",
  "Athleticism",
  "Artistry",
  "Boldness",
  "Caution",
  "Charisma",
  "Confrontation",
  "Contentment",
  "Craftsmanship",
  "Creativity",
  "Decisiveness",
  "Detachment",
  "Discipline",
  "Empathy",
  "Enthusiasm",
  "Flexibility",
  "Frugality",
  "Independence",
  "Ingenuity",
  "Musical Skill",
  "Loyality",
  "Open-mindedness",
  "Optimism",
  "Patience",
  "Perseverance",
  "Personal Space",
  "Physical Appearance",
  "Realism",
  "Romance",
  "Self-care",
  "Spirituality",
  "Simplicity",
  "Teachability",
  "Vision",
  "Vulnerability",
];

export const traitIcons = {
  "Guess the traits": <BsQuestionCircle />,
  "Show the traits": <AiOutlineOrderedList />,
  Artistry: <GiPalette />,
  "Musical Skill": <BsMusicNoteBeamed />,
  Leadership: <GiFlyingFlag />,
  Excellence: <MdLeaderboard />,
  "Self Control": <MdPsychology />,
  "Physical Appearance": <GiClothes />,
  Independence: <GiBreakingChain />,
  Flexibility: <GiSplitArrows />,
  "Personal Space": <MdSocialDistance />,
  Rest: <GiNightSleep />,
  Kindness: <RiUserHeartFill />,
  Recreation: <MdSportsSoccer />,
  Strength: <MdFitnessCenter />,
  Wisdom: <MdMenuBook />,
  Empathy: <MdConnectWithoutContact />,
  Trust: <SiHandshake />,
  Spontaneity: <BiAlarmOff />,
  Adventure: <GiMountainRoad />,
  Integrity: <MdOutlineVerifiedUser />,
  Generosity: <MdVolunteerActivism />,
  Patience: <MdAccessTime />,
  Perseverance: <GiMountainClimbing />,
  Mercy: <GiGlowingHands />,
  Romance: <GiHeartInside />,
  Athleticism: <GiMedallist />,
  "Constructive Criticism": <MdOutlineThumbsUpDown />,
  Productivity: <GiGearHammer />,
  Nature: <BsFillTreeFill />,
  Peace: <BsPeace />,
  Determination: <FaFistRaised />,
  Resourcefulness: <HiPuzzle />,
  Authority: <RiGovernmentLine />,
  Hope: <GiHeartKey />,
  Challenge: <GiCrossedSwords />,
  Decisiveness: <GiChoice />,
  Comfort: <GiPillow />,
  Joy: <BiHappyBeaming />,
  Fairness: <HiOutlineScale />,
  Affection: <FaRegKissWinkHeart />,
  Confidence: <BsFillShieldLockFill />,
  Respect: <FaHandshake />,
  Discipline: <BsFillStopwatchFill />,
  Frugality: <FaPiggyBank />,
  Suffering: <RiEmotionSadLine />,
  "Child-likeness": <FaChild />,
  Optimism: <GrLineChart />,
  Ambition: <FiTarget />,
  Craftsmanship: <FaTools />,
  Vulnerability: <BsFillUnlockFill />,
  Family: <MdFamilyRestroom />,
  Boldness: <GiLion />,
  Caution: <RiErrorWarningFill />,
  Confrontation: <GiCrossedSwords />,
  Charisma: <FaGrinStars />,
  Ingenuity: <HiPuzzle />,
  Teachability: <FaUserGraduate />,
  Pessimism: <FaThumbsDown />,
  Loyality: <GiSittingDog />,
  "Self-Improvement": <GiMeditation />,
  Creativity: <GiPencilBrush />,
  Realism: <BiGlasses />,
  Enthusiasm: <GiFireworkRocket />,
  "Self-care": <MdBathtub />,
  Spirituality: <GiMeditation />,
  Detachment: <GiButterfly />,
  Vision: <GiBinoculars />,
  Simplicity: <FaShapes />,
  "Open-mindedness": <FaDoorOpen />,
  Contentment: <FaRegSmileBeam />,
};

export const traitDefinitions = {
  Adventure:
    "A willingness to embrace new experiences, take risks, and explore the unknown with excitement.",
  Ambition:
    "A strong drive to achieve personal and professional goals, demonstrating determination and commitment.",
  Athleticism:
    "Exhibiting physical strength, coordination, and endurance, along with a love for physical challenges and sportsmanship.",
  Artistry:
    "The ability to express oneself creatively through various forms of art, demonstrating imagination and originality.",
  Boldness:
    "The courage to take initiative and act confidently, even in challenging situations.",
  Caution:
    "Exercising thoughtful care and consideration before making decisions, showing responsibility and foresight.",
  Charisma:
    "A magnetic charm or appeal that inspires and attracts others, creating positive and influential relationships.",
  Confrontation:
    "The ability to address difficult situations directly and assertively, while maintaining respect and fairness.",
  Contentment:
    "A deep sense of satisfaction and peace with one's life, fostering gratitude and happiness.",
  Craftsmanship:
    "Dedication to producing high-quality work through skill, attention to detail, and pride in one’s craft.",
  Creativity:
    "The ability to think outside the box and come up with innovative solutions or ideas.",
  Decisiveness:
    "The quality of making clear and confident decisions, especially in challenging or uncertain situations.",
  Detachment:
    "The ability to remain objective and composed in emotionally charged situations, fostering clear thinking and balance.",
  Discipline:
    "A commitment to maintaining self-control and focus in pursuit of long-term goals, even in the face of distractions or challenges.",
  Empathy:
    "The capacity to deeply understand and care for the feelings and experiences of others, promoting kindness and compassion.",
  Enthusiasm:
    "A contagious energy and excitement that inspires and motivates others toward shared goals.",
  Flexibility:
    "The ability to adapt easily to new circumstances, demonstrating resilience and an open-minded approach to change.",
  Frugality:
    "The practice of making thoughtful and resourceful decisions, valuing efficiency and sustainability.",
  Independence:
    "The strength to think and act freely, demonstrating self-reliance and confidence in one's own abilities.",
  Ingenuity:
    "The ability to be resourceful and inventive, finding creative solutions to challenges and making the most of available resources.",
  "Musical Skill":
    "A natural talent or learned proficiency in music, showcasing creativity and emotional expression through sound.",
  Loyalty:
    "A strong sense of commitment and devotion to others, characterized by reliability and trustworthiness.",
  "Open-mindedness":
    "A willingness to consider diverse perspectives and embrace new ideas, fostering growth and understanding.",
  Optimism:
    "A hopeful and positive outlook on life, expecting good outcomes and focusing on opportunities rather than obstacles.",
  Patience:
    "The ability to remain calm and persistent in the face of delays or difficulties, showing perseverance and emotional maturity.",
  Perseverance:
    "The determination to keep going and overcome obstacles, showing resilience and strength of character.",
  "Personal Space":
    "A healthy respect for one's own boundaries and those of others, promoting self-care and mutual respect.",
  "Physical Appearance":
    "An appreciation for taking care of one's physical health and presentation, reflecting confidence and self-respect.",
  Realism:
    "A balanced and practical approach to life, seeing things as they are while working constructively toward improvement.",
  Romance:
    "A deep appreciation for emotional connection and expressing love, fostering warmth and intimacy in relationships.",
  "Self-care":
    "The practice of tending to one’s mental, emotional, and physical health, prioritizing well-being and balance.",
  Spirituality:
    "A commitment to personal growth and connection with a higher purpose, fostering inner peace and moral integrity.",
  Simplicity:
    "An appreciation for living a life free from unnecessary complexity, focusing on what truly matters.",
  Teachability:
    "A willingness and openness to learn from others and experiences, demonstrating humility and a growth mindset.",
  Vision:
    "The ability to see the bigger picture and work toward long-term goals with purpose, foresight, and imagination.",
  Vulnerability:
    "The strength to be open and honest about one’s feelings, creating deeper connections and emotional authenticity.",
};

export default allTraits;

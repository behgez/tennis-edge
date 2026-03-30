// TennisEdge - Shared Types and Interfaces

export type ExerciseCategory =
  | 'GYM_LOWER_BODY'
  | 'GYM_CORE'
  | 'GYM_UPPER_BODY'
  | 'GYM_WRIST_FOREARM'
  | 'GYM_POWER'
  | 'HOME_LOWER'
  | 'HOME_UPPER'
  | 'HOME_CORE'
  | 'WARMUP'
  | 'PREHAB_SHOULDER'
  | 'PREHAB_ELBOW'
  | 'PREHAB_KNEE'
  | 'PREHAB_CALF'
  | 'FOOTWORK'
  | 'MICRO_A'
  | 'MICRO_B'
  | 'MICRO_C'
  | 'MICRO_D'
  | 'MICRO_E'
  | 'FLEXIBILITY';

export type DrillCategory =
  | 'WALL_DRILLS'
  | 'PARTNER_PATTERN'
  | 'PARTNER_APPROACH'
  | 'PARTNER_SERVE'
  | 'PARTNER_RETURN'
  | 'BACKHAND_DRILLS'
  | 'FOREHAND_DRILLS'
  | 'CONDITIONING';

export type KnowledgeCategory =
  | 'TECHNIQUE'
  | 'TACTICS'
  | 'STRATEGY'
  | 'ANALYSIS';

export type MentalCategory =
  | 'BETWEEN_POINTS'
  | 'PRE_MATCH'
  | 'DURING_MATCH'
  | 'POST_MATCH'
  | 'PRACTICE'
  | 'DAILY';

export type ScheduleActivityType =
  | 'mental'
  | 'prehab'
  | 'micro_workout'
  | 'tennis_match'
  | 'tennis_training'
  | 'strength'
  | 'footwork'
  | 'wall_drills'
  | 'warmup'
  | 'gym'
  | 'rest'
  | 'competition';

export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  sets: number;
  reps: string;
  duration: string;
  muscleGroups: string[];
  equipment: string[];
  level: Level;
  category: ExerciseCategory;
  tips: string[];
  videoUrl?: string;
  imageDesc?: string;
}

export interface Drill {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  duration: string;
  category: DrillCategory;
  level: Level;
  focus: string[];
  equipment: string[];
  partnerRequired: boolean;
  tips: string[];
  videoUrl?: string;
}

export interface TacticalPattern {
  id: string;
  name: string;
  description: string;
  steps: string[];
  when: string;
  courtPosition: string;
  category: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: KnowledgeCategory;
  tags: string[];
  keyTakeaways: string[];
}

export interface MentalExercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  duration: string;
  category: MentalCategory;
  frequency: string;
}

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface ScheduleActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  duration: string;
  type: ScheduleActivityType;
  items: string[];
  category: string;
}

export interface DaySchedule {
  day: WeekDay;
  activities: ScheduleActivity[];
}

export interface JournalEntry {
  id: string;
  date: string;
  opponent: string;
  surface: string;
  conditions: string;
  gamePlan: string;
  score: string;
  firstServePercent: number;
  unforcedErrors: number;
  winners: number;
  tacticalReview: string;
  mentalReview: string;
  actionItems: string[];
  mentalRating: number;
}

export interface ProgressEntry {
  id: string;
  date: string;
  category: string;
  metric: string;
  value: number;
  notes: string;
}

export interface SkillAssessment {
  id: string;
  date: string;
  skills: Record<string, number>;
}

export interface MentalToughnessMonth {
  month: number;
  name: string;
  focus: string;
  weeklyPlan: string[];
  goals: string[];
  resources: string[];
}

export interface MentalToughnessProgram {
  months: MentalToughnessMonth[];
}

export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  keyLessons: string[];
  priority: 'essential' | 'recommended' | 'supplementary';
}

export interface GymRotation {
  id: string;
  name: string;
  week: 'A' | 'B' | 'C';
  focus: string;
  exercises: string[];
  duration: string;
  notes: string;
}

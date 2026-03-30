import type { DaySchedule, GymRotation } from './types';

// ============================================================
// COMPETITION PHASE SCHEDULE - Week of March 30 - April 5, 2026
// Spring competition has started (first match was Saturday March 29).
// This is the first full competition week.
// ============================================================

export const weekSchedule: DaySchedule[] = [
  // ----------------------------------------------------------
  // MONDAY - Singles Match Night
  // ----------------------------------------------------------
  {
    day: 'monday',
    activities: [
      {
        id: 'mon-morning-viz',
        time: '07:00',
        title: 'Morning Visualization + Calf Prehab',
        description: 'Start the day with mental preparation and Achilles maintenance. Visualize tonight\'s match scenarios and key patterns you want to execute.',
        duration: '15 min',
        type: 'mental',
        items: [
          'Daily Visualization: 5 min -- visualize tonight\'s match scenarios',
          'See yourself executing serve+1 patterns (wide serve + open court FH)',
          'Visualize staying calm at 30-40 down, using the 16-second cure',
          'Alfredson Eccentric Heel Drops: straight leg 3x15',
          'Alfredson Eccentric Heel Drops: bent knee 3x15',
          'Single-leg balance: 30 sec each leg (while visualizing)'
        ],
        category: 'morning_routine'
      },
      {
        id: 'mon-micro-a',
        time: '09:30',
        title: 'Micro-Workout A: Lower Body/Balance',
        description: 'First desk break -- activate the lower body after the commute (or walking to the home office).',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Calf raises: 20 reps',
          'Wall sit: 30-45 sec',
          'Single-leg balance: 30 sec each leg',
          'Bodyweight squats: 15 reps',
          'Bent-knee calf raises: 20 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'mon-micro-b',
        time: '11:00',
        title: 'Micro-Workout B: Shoulder/Cuff',
        description: 'Pre-lunch shoulder maintenance. Keep a resistance band at your desk.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Shoulder rolls: 10 each direction',
          'Arm circles: 20 each direction',
          'Doorframe chest stretch: 3x20 sec',
          'Band external rotation: 15 each arm',
          'Band pull-aparts: 15 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'mon-micro-c',
        time: '13:00',
        title: 'Micro-Workout C: Wrist/Forearm',
        description: 'After-lunch forearm maintenance. Protects against tennis elbow.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Wrist circles: 10 each direction',
          'Wrist stretches: 15 sec each position, each arm',
          'Tennis ball squeeze: 15 each hand',
          'Finger extensions with rubber band: 15 each hand',
          'Water bottle wrist curls: 15 flexion + 15 extension each hand'
        ],
        category: 'micro_workout'
      },
      {
        id: 'mon-micro-d',
        time: '15:00',
        title: 'Micro-Workout D: Core',
        description: 'Afternoon core activation. Can be done without leaving your desk.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Seated abdominal brace: 10x10 sec holds',
          'Seated trunk rotation: 10 each side',
          'Standing side bends: 8 each side',
          'Desk plank: 30-45 sec',
          'Seated leg extensions (dead bug variation): 8 each side'
        ],
        category: 'micro_workout'
      },
      {
        id: 'mon-micro-e',
        time: '16:30',
        title: 'Micro-Workout E: Mobility',
        description: 'Pre-match mobility preparation. Opens up the body before tonight\'s match.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Hip circles: 10 each direction, each leg',
          'Bodyweight reverse lunges: 6 each leg',
          'Ankle circles: 10 each direction, each foot',
          'Thoracic rotation: 8 each side',
          'Calf stretch: 20 sec straight + 20 sec bent, each leg'
        ],
        category: 'micro_workout'
      },
      {
        id: 'mon-mental-prep',
        time: '18:15',
        title: 'Pre-Match Mental Preparation',
        description: 'Arrive early for dedicated mental preparation before the physical warm-up. Get into the competitive mindset.',
        duration: '10 min',
        type: 'mental',
        items: [
          'Find a quiet spot (car, hallway, or empty bench). Close your eyes.',
          'Controlled breathing: 5 breaths -- in through nose (5 sec), out through mouth (5 sec)',
          'Choose your 3 cue words for tonight: 1 for composure, 1 for energy, 1 for tactics',
          'Example cue words: "breathe" (composure), "legs" (energy), "deep" (tactics)',
          'Visualize the first game: see yourself holding serve with confidence',
          'Visualize a pressure point: 30-40 down. You use the 16-second cure. You execute.',
          'Rehearse your between-point routine: towel, strings, bounce ball, choose target, play',
          'Set your intention: "I will follow my routine on every single point tonight"',
          'Remind yourself: you have prepared well this week. Trust your game.',
          'Open your eyes. Walk to the court with purpose.'
        ],
        category: 'mental'
      },
      {
        id: 'mon-prematch',
        time: '18:30',
        title: 'Pre-Match Physical Warm-Up',
        description: 'Physical warm-up following the mental preparation. Get the body ready for competition.',
        duration: '20 min',
        type: 'warmup',
        items: [
          'Light jog: 3 min',
          'Dynamic warm-up: high knees, butt kicks, box shuffles (5 min)',
          'Walking lunge with rotation, tin soldiers, sumo lunges (3 min)',
          'Arm circles + YTW activation (2 min)',
          'Shadow strokes: 10 FH, 10 BH, 10 volleys, 5 serves (3 min)',
          'Split step practice: 30 sec continuous',
          'TACTICAL FOCUS: Serve+1 patterns, approach on short balls'
        ],
        category: 'pre_match'
      },
      {
        id: 'mon-match',
        time: '19:00',
        title: 'Singles Match vs KNLTB-6 Player',
        description: 'Competition match. Apply the tactical patterns practiced in training. Focus on serve+1, approaching on short balls, and maintaining mental discipline through your between-point routine.',
        duration: '90 min',
        type: 'tennis_match',
        items: [
          'GAME PLAN: Control rallies with deep cross-court balls',
          'SERVE+1: Wide serve deuce -> open court FH; T serve ad -> inside-out FH',
          'APPROACH: On any ball landing inside service line, approach DTL',
          'BETWEEN-POINT ROUTINE: (1) Towel/strings, (2) Deep breath, (3) Bounce ball, (4) Choose target, (5) Play',
          'MENTAL: 16-second cure between every point -- never rush to the next point',
          'MENTAL: Green light on your serve, yellow light on return',
          'CUE WORDS: Use your 3 pre-selected cue words. Say them before serve or return.',
          'TRACK: First serve %, unforced errors, approach shot conversion',
          'READ OPPONENT: Watch warm-up for backhand weakness, movement, patterns',
          'IF LOSING: Slow down between points, increase net clearance, make them play one more ball'
        ],
        category: 'competition'
      },
      {
        id: 'mon-postmatch',
        time: '20:30',
        title: 'Post-Match Mental Review & Journal',
        description: 'Complete the match journal while the match is fresh. Review tactical performance AND mental discipline. This journal entry is the foundation for the week\'s improvement.',
        duration: '15 min',
        type: 'mental',
        items: [
          'Record score and key statistics',
          'Tactical review: Did I follow the game plan? What worked? What did not?',
          'MENTAL REVIEW: Rate mental toughness 1-10',
          'MENTAL REVIEW: Did I follow the 16-second cure between every point?',
          'MENTAL REVIEW: Did I use my cue words? Which ones helped?',
          'MENTAL REVIEW: Did my between-point routine hold up under pressure?',
          'MENTAL REVIEW: Rate my composure at critical moments 1-10',
          'Serve+1 assessment: How many serve+1 patterns did I execute well?',
          'Approach shot assessment: Did I recognize short balls? What was my conversion?',
          'Key moments: What happened at critical points (break points, 4-4, tiebreak)?',
          'Action items: 3 specific things to work on this week (at least 1 mental)',
          'Opponent notes: Strengths, weaknesses, patterns for future matches',
          'Write a one-sentence summary of today\'s mental performance in your journal'
        ],
        category: 'post_match'
      }
    ]
  },

  // ----------------------------------------------------------
  // TUESDAY - Coached Training
  // ----------------------------------------------------------
  {
    day: 'tuesday',
    activities: [
      {
        id: 'tue-viz',
        time: '06:50',
        title: 'Morning Visualization',
        description: 'Close your eyes and visualize today\'s training improvements. See the techniques you want to groove with your coach tonight.',
        duration: '5 min',
        type: 'mental',
        items: [
          'Find a quiet spot. Close your eyes.',
          'Take 3 deep breaths: in through nose (5 sec), hold (3 sec), out through mouth (5 sec)',
          'Visualize yourself on the court, moving well, feeling confident',
          'See your forehand: unit turn, topspin brush, wiper finish -- feel the racquet path',
          'Visualize your serve landing perfectly. Feel the ball on the sweet spot.',
          'See yourself approaching the net: approach shot, split step, volley away',
          'Replay one action item from Monday\'s match -- see yourself improving it tonight',
          'Open your eyes. You are ready.'
        ],
        category: 'mental'
      },
      {
        id: 'tue-morning',
        time: '07:00',
        title: 'Shoulder Prehab Routine',
        description: 'Complete shoulder maintenance protocol to keep rotator cuff healthy through the competition phase.',
        duration: '10 min',
        type: 'prehab',
        items: [
          'Band external rotation: 2x15 each arm',
          'Band internal rotation: 2x15 each arm',
          'Band pull-aparts: 2x15',
          'YTW prone raises: 2x10 each position'
        ],
        category: 'morning_routine'
      },
      {
        id: 'tue-micro-a',
        time: '09:30',
        title: 'Micro-Workout A: Lower Body/Balance',
        description: 'Desk break lower body activation.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Calf raises: 20 reps',
          'Wall sit: 30-45 sec',
          'Single-leg balance: 30 sec each leg',
          'Bodyweight squats: 15 reps',
          'Bent-knee calf raises: 20 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'tue-micro-b',
        time: '11:00',
        title: 'Micro-Workout B: Shoulder/Cuff',
        description: 'Pre-lunch shoulder work.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Shoulder rolls: 10 each direction',
          'Arm circles: 20 each direction',
          'Doorframe chest stretch: 3x20 sec',
          'Band external rotation: 15 each arm',
          'Band pull-aparts: 15 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'tue-micro-c',
        time: '13:00',
        title: 'Micro-Workout C: Wrist/Forearm',
        description: 'After-lunch forearm care.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Wrist circles: 10 each direction',
          'Wrist stretches: 15 sec each',
          'Tennis ball squeeze: 15 each hand',
          'Finger extensions: 15 each hand',
          'Water bottle wrist curls: 15 each direction each hand'
        ],
        category: 'micro_workout'
      },
      {
        id: 'tue-micro-d',
        time: '15:00',
        title: 'Micro-Workout D: Core',
        description: 'Afternoon core work.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Seated abdominal brace: 10x10 sec',
          'Seated trunk rotation: 10 each side',
          'Standing side bends: 8 each side',
          'Desk plank: 30-45 sec',
          'Seated dead bug variation: 8 each side'
        ],
        category: 'micro_workout'
      },
      {
        id: 'tue-micro-e',
        time: '16:30',
        title: 'Micro-Workout E: Mobility',
        description: 'Pre-training mobility prep.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Hip circles: 10 each direction, each leg',
          'Reverse lunges: 6 each leg',
          'Ankle circles: 10 each direction, each foot',
          'Thoracic rotation: 8 each side',
          'Calf stretch: 20 sec each position, each leg'
        ],
        category: 'micro_workout'
      },
      {
        id: 'tue-training',
        time: '19:00',
        title: 'Coached Tennis Training',
        description: 'Work with coach on current priority areas. Bring specific focus areas from Monday match review.',
        duration: '90 min',
        type: 'tennis_training',
        items: [
          'WARM-UP: Dynamic warm-up + mini-court rally (10 min)',
          'FOCUS AREA 1: Forehand transformation -- unit turn, topspin, wiper finish',
          'FOCUS AREA 2: Serve+1 patterns -- practice wide serve + open court attack',
          'FOCUS AREA 3: Approach shots -- recognize short balls, approach DTL',
          'DRILLS: 3-1 pattern, inside-out FH progression, short ball attack',
          'REVIEW with coach: What to prioritize from Monday match action items',
          'POINT PLAY: Apply the focus areas in match-like situations',
          'ASK COACH: Feedback on backhand development and any technical adjustments'
        ],
        category: 'tennis_training'
      }
    ]
  },

  // ----------------------------------------------------------
  // WEDNESDAY - Active Recovery / Light Training
  // ----------------------------------------------------------
  {
    day: 'wednesday',
    activities: [
      {
        id: 'wed-viz',
        time: '06:50',
        title: 'Morning Visualization',
        description: 'Start the day with a short mental session. Mid-week check-in: reinforce confidence and review what you have learned from Monday and Tuesday.',
        duration: '5 min',
        type: 'mental',
        items: [
          'Find a quiet spot. Close your eyes.',
          'Take 3 deep breaths: in through nose (5 sec), hold (3 sec), out through mouth (5 sec)',
          'Visualize yourself on the court, moving well, feeling confident',
          'Replay the best point from Monday\'s match -- feel the execution',
          'See yourself applying Tuesday\'s coaching feedback in a rally',
          'Visualize a pressure moment: you breathe, choose your cue word, execute. Point won.',
          'Open your eyes. You are ready for the day.'
        ],
        category: 'mental'
      },
      {
        id: 'wed-morning',
        time: '07:00',
        title: 'Morning Home Footwork Drills',
        description: '15-minute footwork session at home. Can be done in the garden or living room.',
        duration: '15 min',
        type: 'footwork',
        items: [
          'Shadow split steps: 30 sec x 3',
          '3-by-3 drill: 45 sec x 3',
          'Side shuffle: 30 sec x 3',
          'Crossover step to sprint: 6 each side',
          'Forward-backward transitions: 30 sec x 2',
          'Light cool-down stretch: 2 min'
        ],
        category: 'morning_routine'
      },
      {
        id: 'wed-micro-a',
        time: '09:30',
        title: 'Micro-Workout A: Lower Body/Balance',
        description: 'Desk break lower body activation.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Calf raises: 20 reps',
          'Wall sit: 30-45 sec',
          'Single-leg balance: 30 sec each leg',
          'Bodyweight squats: 15 reps',
          'Bent-knee calf raises: 20 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'wed-micro-b',
        time: '11:00',
        title: 'Micro-Workout B: Shoulder/Cuff',
        description: 'Mid-morning shoulder maintenance.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Shoulder rolls: 10 each direction',
          'Arm circles: 20 each direction',
          'Doorframe chest stretch: 3x20 sec',
          'Band external rotation: 15 each arm',
          'Band pull-aparts: 15 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'wed-micro-c',
        time: '13:00',
        title: 'Micro-Workout C: Wrist/Forearm',
        description: 'After-lunch wrist and forearm work.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Wrist circles: 10 each direction',
          'Wrist stretches: 15 sec each',
          'Tennis ball squeeze: 15 each hand',
          'Finger extensions: 15 each hand',
          'Water bottle wrist curls: 15 each direction each hand'
        ],
        category: 'micro_workout'
      },
      {
        id: 'wed-micro-d',
        time: '15:00',
        title: 'Micro-Workout D: Core',
        description: 'Afternoon core activation.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Seated abdominal brace: 10x10 sec',
          'Seated trunk rotation: 10 each side',
          'Standing side bends: 8 each side',
          'Desk plank: 30-45 sec',
          'Seated dead bug variation: 8 each side'
        ],
        category: 'micro_workout'
      },
      {
        id: 'wed-micro-e',
        time: '16:30',
        title: 'Micro-Workout E: Mobility',
        description: 'End-of-day mobility work.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Hip circles: 10 each direction, each leg',
          'Reverse lunges: 6 each leg',
          'Ankle circles: 10 each direction, each foot',
          'Thoracic rotation: 8 each side',
          'Calf stretch: 20 sec each position, each leg'
        ],
        category: 'micro_workout'
      },
      {
        id: 'wed-evening',
        time: '19:00',
        title: 'Home Strength Circuit (or Rest Day)',
        description: 'Light-to-moderate home strength session using dumbbells and bands. If body is fatigued from Monday match and Tuesday training, take a full rest day instead.',
        duration: '30 min',
        type: 'strength',
        items: [
          'IF RESTING: Light stretching/foam rolling only, go to bed early',
          'IF TRAINING:',
          'Circuit 1 (x2): Push-ups 10-15, Band rows 15, Dead bugs 8 each side',
          'Circuit 2 (x2): BW squats 15, Reverse lunges 10 each, Single-leg RDL 8 each',
          'Circuit 3 (x2): Plank 45 sec, Side plank 20 sec each, Pallof press 10 each side',
          'Prehab: Band external rotation 15 each, Tyler Twist FlexBar 15',
          'Cool-down stretch: 5 min'
        ],
        category: 'home_strength'
      }
    ]
  },

  // ----------------------------------------------------------
  // THURSDAY - Singles Match Night
  // ----------------------------------------------------------
  {
    day: 'thursday',
    activities: [
      {
        id: 'thu-viz',
        time: '06:50',
        title: 'Morning Visualization',
        description: 'Close your eyes and visualize tonight\'s match. Rehearse the game plan, see yourself executing patterns under pressure.',
        duration: '5 min',
        type: 'mental',
        items: [
          'Find a quiet spot. Close your eyes.',
          'Take 3 deep breaths: in through nose (5 sec), hold (3 sec), out through mouth (5 sec)',
          'Visualize yourself on the court, moving well, feeling confident',
          'See your serve landing perfectly. Feel the ball on the sweet spot.',
          'Rehearse the game plan mentally -- see yourself executing serve+1 patterns',
          'Visualize handling pressure: it is 30-40. You breathe, use the 16-second cure, choose your serve. Ace.',
          'See a tiebreak: you stay calm, play one point at a time. You close it out.',
          'Open your eyes. You are ready.'
        ],
        category: 'mental'
      },
      {
        id: 'thu-morning',
        time: '07:00',
        title: 'Forearm Prehab Routine',
        description: 'Forearm and elbow maintenance to protect against tennis elbow during competition phase.',
        duration: '10 min',
        type: 'prehab',
        items: [
          'Tyler Twist FlexBar protocol: 3x15',
          'Wrist extensions (eccentric): 3x15',
          'Wrist flexion curls: 3x15',
          'Grip ball squeeze: 15 each hand'
        ],
        category: 'morning_routine'
      },
      {
        id: 'thu-micro-a',
        time: '09:30',
        title: 'Micro-Workout A: Lower Body/Balance',
        description: 'Morning desk break lower body activation.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Calf raises: 20 reps',
          'Wall sit: 30-45 sec',
          'Single-leg balance: 30 sec each leg',
          'Bodyweight squats: 15 reps',
          'Bent-knee calf raises: 20 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'thu-micro-b',
        time: '11:00',
        title: 'Micro-Workout B: Shoulder/Cuff',
        description: 'Pre-lunch shoulder work.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Shoulder rolls: 10 each direction',
          'Arm circles: 20 each direction',
          'Doorframe chest stretch: 3x20 sec',
          'Band external rotation: 15 each arm',
          'Band pull-aparts: 15 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'thu-micro-c',
        time: '13:00',
        title: 'Micro-Workout C: Wrist/Forearm',
        description: 'Post-lunch wrist care.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Wrist circles: 10 each direction',
          'Wrist stretches: 15 sec each',
          'Tennis ball squeeze: 15 each hand',
          'Finger extensions: 15 each hand',
          'Water bottle wrist curls: 15 each direction each hand'
        ],
        category: 'micro_workout'
      },
      {
        id: 'thu-micro-d',
        time: '15:00',
        title: 'Micro-Workout D: Core',
        description: 'Afternoon core session.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Seated abdominal brace: 10x10 sec',
          'Seated trunk rotation: 10 each side',
          'Standing side bends: 8 each side',
          'Desk plank: 30-45 sec',
          'Seated dead bug variation: 8 each side'
        ],
        category: 'micro_workout'
      },
      {
        id: 'thu-micro-e',
        time: '16:30',
        title: 'Micro-Workout E: Mobility',
        description: 'Pre-match mobility preparation.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Hip circles: 10 each direction, each leg',
          'Reverse lunges: 6 each leg',
          'Ankle circles: 10 each direction, each foot',
          'Thoracic rotation: 8 each side',
          'Calf stretch: 20 sec each position, each leg'
        ],
        category: 'micro_workout'
      },
      {
        id: 'thu-mental-prep',
        time: '18:15',
        title: 'Pre-Match Mental Preparation',
        description: 'Dedicated mental preparation before the physical warm-up. Build on Monday\'s mental learnings.',
        duration: '10 min',
        type: 'mental',
        items: [
          'Find a quiet spot (car, hallway, or empty bench). Close your eyes.',
          'Controlled breathing: 5 breaths -- in through nose (5 sec), out through mouth (5 sec)',
          'Choose your 3 cue words for tonight: 1 for composure, 1 for energy, 1 for tactics',
          'Reflect: How was your mental game on Monday? What do you want to improve tonight?',
          'Visualize the first game: see yourself holding serve with a strong ritual',
          'Visualize a pressure moment: break point against you. You breathe, you execute your routine, you win the point.',
          'Rehearse your between-point routine: towel, strings, bounce ball, choose target, play',
          'Set your intention: "I will be more mentally disciplined than Monday"',
          'If you know the opponent, visualize the tactical patterns you will use against them',
          'Open your eyes. Walk to the court with purpose.'
        ],
        category: 'mental'
      },
      {
        id: 'thu-prematch',
        time: '18:30',
        title: 'Pre-Match Physical Warm-Up',
        description: 'Physical warm-up following the mental preparation. Adjust tactical focus based on tonight\'s specific opponent.',
        duration: '20 min',
        type: 'warmup',
        items: [
          'Light jog: 3 min',
          'Dynamic warm-up: high knees, butt kicks, box shuffles (5 min)',
          'Walking lunge with rotation, tin soldiers, sumo lunges (3 min)',
          'Arm circles + YTW activation (2 min)',
          'Shadow strokes: 10 FH, 10 BH, 10 volleys, 5 serves (3 min)',
          'Split step practice: 30 sec continuous',
          'TACTICAL FOCUS: Adjust based on opponent scouting (check match history, previous notes)'
        ],
        category: 'pre_match'
      },
      {
        id: 'thu-match',
        time: '19:00',
        title: 'Singles Match vs KNLTB-6 Player',
        description: 'Second competition match of the week. Apply lessons from Monday\'s match and Tuesday\'s training. Focus on consistent between-point routine and cue words.',
        duration: '90 min',
        type: 'tennis_match',
        items: [
          'GAME PLAN: Build from Monday match review -- focus on improvements',
          'SERVE+1: Execute the patterns practiced Tuesday with coach',
          'APPROACH: Approach on every short ball (do not let them go)',
          'BETWEEN-POINT ROUTINE: (1) Towel/strings, (2) Deep breath, (3) Bounce ball, (4) Choose target, (5) Play',
          'MENTAL: 16-second cure -- especially after errors. Never rush.',
          'CUE WORDS: Use your 3 pre-selected cue words. Say them before serve or return.',
          'TRACK: Same metrics as Monday for comparison',
          'ADJUSTMENT: If losing, identify one thing to change and commit to it',
          'COMPETE: Play every point -- no tanking games or mental checkout'
        ],
        category: 'competition'
      },
      {
        id: 'thu-postmatch',
        time: '20:30',
        title: 'Post-Match Mental Review & Journal',
        description: 'Complete match journal. Compare with Monday\'s journal to track weekly progress in both tactical and mental performance.',
        duration: '15 min',
        type: 'mental',
        items: [
          'Record score and statistics',
          'Compare with Monday: what improved? What regressed?',
          'Tactical review: Did I apply Tuesday\'s coaching points?',
          'MENTAL REVIEW: Was I more mentally disciplined than Monday? Rate 1-10',
          'MENTAL REVIEW: Did I follow the between-point routine more consistently?',
          'MENTAL REVIEW: Did my cue words evolve or improve since Monday?',
          'MENTAL REVIEW: Rate composure at pressure moments 1-10',
          'Pressure moments: How did I handle 30-40, break points?',
          'Action items for next week: top 3 priorities (at least 1 mental)',
          'Rate overall performance and mental toughness 1-10',
          'Note opponent patterns for future reference',
          'Write a one-sentence summary comparing Monday vs Thursday mental performance'
        ],
        category: 'post_match'
      }
    ]
  },

  // ----------------------------------------------------------
  // FRIDAY - Light Day / Recovery
  // ----------------------------------------------------------
  {
    day: 'friday',
    activities: [
      {
        id: 'fri-morning',
        time: '07:00',
        title: 'Mental Rehearsal + Flexibility',
        description: 'Light morning focusing on mental preparation for the weekend competition and general flexibility maintenance.',
        duration: '15 min',
        type: 'mental',
        items: [
          'Mental rehearsal: 5 min -- visualize Saturday doubles scenarios',
          'See yourself at the net, poaching, communicating with partner',
          'Visualize specific doubles formations (I-formation, Australian)',
          'Full-body stretch sequence: 10 min',
          'Hamstrings, quads, hip flexors, shoulders, thoracic spine, calves',
          'Hold each stretch 20-30 sec, breathe deeply'
        ],
        category: 'morning_routine'
      },
      {
        id: 'fri-micro-a',
        time: '09:30',
        title: 'Micro-Workout A: Lower Body/Balance',
        description: 'Desk break activation.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Calf raises: 20 reps',
          'Wall sit: 30-45 sec',
          'Single-leg balance: 30 sec each leg',
          'Bodyweight squats: 15 reps',
          'Bent-knee calf raises: 20 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'fri-micro-b',
        time: '11:00',
        title: 'Micro-Workout B: Shoulder/Cuff',
        description: 'Shoulder maintenance.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Shoulder rolls: 10 each direction',
          'Arm circles: 20 each direction',
          'Doorframe chest stretch: 3x20 sec',
          'Band external rotation: 15 each arm',
          'Band pull-aparts: 15 reps'
        ],
        category: 'micro_workout'
      },
      {
        id: 'fri-micro-c',
        time: '13:00',
        title: 'Micro-Workout C: Wrist/Forearm',
        description: 'After-lunch wrist care.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Wrist circles: 10 each direction',
          'Wrist stretches: 15 sec each',
          'Tennis ball squeeze: 15 each hand',
          'Finger extensions: 15 each hand',
          'Water bottle wrist curls: 15 each direction each hand'
        ],
        category: 'micro_workout'
      },
      {
        id: 'fri-micro-d',
        time: '15:00',
        title: 'Micro-Workout D: Core',
        description: 'Afternoon core activation.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Seated abdominal brace: 10x10 sec',
          'Seated trunk rotation: 10 each side',
          'Standing side bends: 8 each side',
          'Desk plank: 30-45 sec',
          'Seated dead bug variation: 8 each side'
        ],
        category: 'micro_workout'
      },
      {
        id: 'fri-micro-e',
        time: '16:30',
        title: 'Micro-Workout E: Mobility',
        description: 'End-of-day mobility.',
        duration: '5 min',
        type: 'micro_workout',
        items: [
          'Hip circles: 10 each direction, each leg',
          'Reverse lunges: 6 each leg',
          'Ankle circles: 10 each direction, each foot',
          'Thoracic rotation: 8 each side',
          'Calf stretch: 20 sec each position, each leg'
        ],
        category: 'micro_workout'
      },
      {
        id: 'fri-evening',
        time: '18:30',
        title: 'Wall Drills Session (or Rest)',
        description: 'Light solo wall session to keep the feel sharp before Saturday competition. If fatigued from the week, take a full rest day.',
        duration: '30 min',
        type: 'wall_drills',
        items: [
          'IF RESTING: Stretching, foam rolling, early bed. Skip the wall session.',
          'IF TRAINING:',
          'Ball bounce control: 3 min warm-up',
          'Mini court wall volleys: 5 min (goal: 30+ consecutive)',
          'Backhand slice wall drill: 5 min',
          'Ground-to-volley transition: 5 min',
          'Serve and second ball: 5 min',
          'Shadow footwork at wall: 5 min',
          'Cool-down stretch: 2 min'
        ],
        category: 'optional_training'
      }
    ]
  },

  // ----------------------------------------------------------
  // SATURDAY - Competition Day (Mixed Doubles)
  // ----------------------------------------------------------
  {
    day: 'saturday',
    activities: [
      {
        id: 'sat-mental-prep',
        time: '08:45',
        title: 'Pre-Match Mental Preparation',
        description: 'Dedicated mental preparation before the doubles competition day. Set the right mindset for a multi-match day.',
        duration: '10 min',
        type: 'mental',
        items: [
          'Find a quiet spot. Close your eyes.',
          'Controlled breathing: 5 breaths -- in through nose (5 sec), out through mouth (5 sec)',
          'Choose your 3 cue words for today: 1 for composure, 1 for energy, 1 for partnership',
          'Example cue words: "breathe" (composure), "quick feet" (energy), "together" (partnership)',
          'Visualize doubles-specific scenarios: poaching, communication, net play',
          'See yourself staying positive with your partner after every point',
          'Rehearse your between-point routine for doubles: quick fist bump, reset, plan next point',
          'Set your intention: "I will be a great partner today -- positive, supportive, focused"',
          'Visualize handling a tough moment: you lose the first set. You regroup, you fight back.',
          'Open your eyes. You are ready for competition.'
        ],
        category: 'mental'
      },
      {
        id: 'sat-prematch-routine',
        time: '09:00',
        title: 'Pre-Match Physical Warm-Up + Game Plan',
        description: 'Physical warm-up and tactical planning for doubles, following the mental preparation.',
        duration: '25 min',
        type: 'warmup',
        items: [
          'PHYSICAL WARM-UP (15 min):',
          'Light jog: 3 min',
          'High knees, butt kicks: 2 min',
          'Box shuffles, walking lunge with rotation: 3 min',
          'Knees-to-chest walk, tin soldiers, sumo lunges: 3 min',
          'Arm circles, YTW activation, shadow strokes: 4 min',
          '',
          'VISUALIZATION (5 min):',
          'See yourself poaching successfully at the net',
          'Visualize clear communication with your partner',
          'See yourself executing I-formation points',
          '',
          'GAME PLAN (5 min):',
          'Review doubles tactical reminders (see below)',
          'Discuss signals and formations with partner',
          'Agree on first-game formation',
          'Share your cue words with your partner'
        ],
        category: 'pre_match'
      },
      {
        id: 'sat-match-1',
        time: '10:00',
        title: 'Competition: Mixed Doubles Match 1',
        description: 'First mixed doubles match of the day. Focus on doubles-specific tactics, communication, and consistent between-point routine.',
        duration: '75 min',
        type: 'competition',
        items: [
          'DOUBLES TACTICS:',
          '- Attack the middle: hit between the opponents to create confusion',
          '- Hit at the feet: when opponents are at net, aim for their feet',
          '- Lob when both opponents are at net and closing',
          '- Poach aggressively when your partner serves wide',
          '- Use the I-formation to disguise net player movement',
          '- Serve to the body in doubles -- limits return angles',
          '',
          'COMMUNICATION:',
          '- Call "mine" or "yours" on every ball in the middle',
          '- Use hand signals for poach, stay, or fake',
          '- After each game, briefly discuss what is working',
          '- Stay positive with partner -- encourage after every point',
          '',
          'MIXED DOUBLES SPECIFIC:',
          '- In mixed, target the weaker player when tactically appropriate',
          '- When returning, try to keep returns low and cross-court',
          '- At net, look for poach opportunities on floating returns',
          '- Cover the lob when your partner moves to poach',
          '',
          'BETWEEN-POINT ROUTINE (doubles):',
          '- After each point: quick fist bump or positive word with partner',
          '- Walk to position together, brief plan for next point',
          '- Deep breath before serve or return. Use your cue word.',
          'CUE WORDS: Use your 3 pre-selected cue words throughout the match'
        ],
        category: 'competition'
      },
      {
        id: 'sat-between-matches',
        time: '11:15',
        title: 'Between-Match Recovery',
        description: 'Active recovery and preparation between doubles matches.',
        duration: '30 min',
        type: 'rest',
        items: [
          'Light stretching and walking (not sitting still)',
          'Hydrate and refuel: water, banana, energy bar',
          'Brief mental review: what worked in match 1?',
          'Discuss tactical adjustments with partner for match 2',
          'If opponents for match 2 are known, discuss their tendencies',
          'Stay loose -- gentle arm circles and hip circles'
        ],
        category: 'recovery'
      },
      {
        id: 'sat-match-2',
        time: '11:45',
        title: 'Competition: Mixed Doubles Match 2',
        description: 'Second mixed doubles match. Apply lessons from match 1. Maintain mental discipline through between-point routine.',
        duration: '75 min',
        type: 'competition',
        items: [
          'Apply same doubles tactics as Match 1',
          'Adjustment focus: address anything that did not work in Match 1',
          'Energy management: if fatigued, simplify your game',
          'BETWEEN-POINT ROUTINE: Fist bump, plan, deep breath, cue word, play',
          'MENTAL: Stay present -- do not think about Match 1 results',
          'CUE WORDS: Recommit to your cue words. Say them before every serve/return.',
          'SERVE: Use the patterns that worked; try body serves if not yet used',
          'NET PLAY: Be more aggressive at the net if you were too passive in Match 1',
          'COMPETE: Every point matters -- fight for every ball'
        ],
        category: 'competition'
      },
      {
        id: 'sat-postmatch',
        time: '13:00',
        title: 'Post-Competition Mental Review & Journal',
        description: 'Complete the match journal for both matches. Review tactical, physical, and mental performance.',
        duration: '15 min',
        type: 'mental',
        items: [
          'Record results from both matches',
          'What worked well in doubles today?',
          'Communication rating with partner: 1-10',
          'Net play assessment: poach attempts, conversions',
          'MENTAL REVIEW: Rate mental discipline 1-10 for each match',
          'MENTAL REVIEW: Did you follow your between-point routine consistently?',
          'MENTAL REVIEW: Did your cue words help? Which ones worked best?',
          'MENTAL REVIEW: How did you handle adversity moments?',
          'What would you do differently?',
          'Doubles-specific action items for next week',
          'Overall energy level: did you manage the double-header well?',
          'Fuel/hydration notes for future competition days',
          'Write a one-sentence summary of today\'s mental performance in your journal'
        ],
        category: 'post_match'
      }
    ]
  },

  // ----------------------------------------------------------
  // SUNDAY - Gym Day
  // ----------------------------------------------------------
  {
    day: 'sunday',
    activities: [
      {
        id: 'sun-viz',
        time: '09:00',
        title: 'Morning Visualization + Weekly Mental Focus',
        description: 'Sunday mental session: review the week\'s mental performance and set the mental focus theme for the coming week.',
        duration: '10 min',
        type: 'mental',
        items: [
          'Find a quiet spot. Close your eyes.',
          'Take 3 deep breaths: in through nose (5 sec), hold (3 sec), out through mouth (5 sec)',
          'WEEKLY REVIEW (3 min):',
          'Replay the best mental moment of the week -- the point where you stayed calm under pressure',
          'Replay one moment where your mental game let you down -- what would you do differently?',
          'Rate your overall mental discipline this week 1-10',
          'WEEKLY MENTAL FOCUS (3 min):',
          'Choose ONE mental theme for the coming week (e.g., "stay present", "trust the process", "compete on every point")',
          'Choose your 3 cue words for the week (1 for composure, 1 for energy, 1 for tactics)',
          'Visualize yourself using the cue words in a match situation',
          'VISUALIZATION (4 min):',
          'See yourself in the gym today, strong and focused',
          'See your week ahead: Monday match, Tuesday coaching, Thursday match, Saturday doubles',
          'Visualize yourself playing your best tennis this coming week',
          'Open your eyes. Write your weekly focus theme and cue words in your journal.'
        ],
        category: 'mental'
      },
      {
        id: 'sun-assessment',
        time: '09:15',
        title: 'Monthly Skill Self-Assessment',
        description: 'Every 4 weeks, rate your 11 KNLTB skills (1-10) to track your progress. Compare with your previous assessment to see growth.',
        duration: '5 min',
        type: 'mental',
        items: [
          'Go to Program > Take Self-Assessment',
          'Rate each of the 11 skills honestly (1-10):',
          '1. Rally Consistency (can you rally 15+ balls with direction?)',
          '2. Groundstroke Depth (do your shots consistently land deep?)',
          '3. Topspin Production (reliable topspin on both wings?)',
          '4. Serve Placement & Spin (can you place and vary your serve?)',
          '5. Volley Confidence (comfortable at the net?)',
          '6. Footwork & Movement (arriving early, recovering well?)',
          '7. Tactical Awareness (constructing points with patterns?)',
          '8. Shot Variety (3-4 variations per wing?)',
          '9. Handling Pace (can you redirect fast balls?)',
          '10. Game Plan Adaptation (adjusting to different opponents?)',
          '11. Mental Toughness (managing emotions, staying focused?)',
          '',
          'Compare with your previous scores. Celebrate improvement!',
          'Set 2-3 specific goals for the next 4 weeks based on your weakest areas.'
        ],
        category: 'mental'
      },
      {
        id: 'sun-gym',
        time: '10:00',
        title: 'Gym Session: Week A - Lower Body + Core + Flexibility',
        description: 'Complete 2-hour tennis-focused gym session. Builds lower body power for court movement, core stability for stroke production, agility for footwork, and flexibility for injury prevention.',
        duration: '120 min',
        type: 'gym',
        items: [
          'WARM-UP (10 min):',
          'Light jog or stationary bike: 5 min',
          'High knees: 30 sec',
          'Butt kicks: 30 sec',
          'Leg swings forward/back: 10 each leg',
          'Leg swings side to side: 10 each leg',
          'Walking lunge with rotation: 8 each leg',
          'Arm circles small to large: 15 each direction',
          'YTW shoulder activation: 8 each position',
          '',
          'SPEED/AGILITY (10 min - do FIRST while fresh):',
          'Split step practice: 10 reps (hop and push off laterally)',
          'Lateral shuffles: 4x10 meters each direction',
          'Crossover step to sprint: 3x6 each direction',
          'Forward-backward transitions: 3x8 (sprint forward 3 steps, backpedal 3)',
          '',
          'LOWER BODY STRENGTH (30 min):',
          'Goblet Squat: 3 sets of 12 reps (hold dumbbell at chest, squat to parallel, drive through heels)',
          'Reverse Lunge with Dumbbells: 3 sets of 10 reps each leg (step back, lower until front thigh parallel, press through front foot)',
          'Romanian Deadlift: 3 sets of 10 reps (hinge at hips, dumbbells slide down shins, squeeze glutes to stand)',
          'Lateral Lunge: 3 sets of 8 reps each side (wide step, bend knee, keep other leg straight, push back)',
          'Calf Raises straight leg: 3 sets of 15 reps (on step edge, rise slow, lower below step 3 sec)',
          'Calf Raises bent knee: 3 sets of 15 reps (slight knee bend targets soleus and lower Achilles)',
          'Single-Leg Balance: 3 sets of 30 sec each leg (progress to eyes closed)',
          '',
          'CORE STABILITY + ROTATIONAL POWER (20 min):',
          'Front Plank: 3 sets of 45 sec (forearms and toes, body straight, squeeze core)',
          'Side Plank: 3 sets of 30 sec each side (stack feet, hips lifted, hold steady)',
          'Pallof Press: 3 sets of 10 reps each side (cable or band at chest height, press out, resist rotation)',
          'Medicine Ball Rotational Throw: 3 sets of 10 reps each side (stand sideways to wall, rotate hips and throw explosively)',
          'Dead Bug: 3 sets of 8 reps each side (lie on back, extend opposite arm and leg, keep lower back flat)',
          'Medicine Ball Overhead Slam: 3 sets of 8 reps (explosive, like a serve motion)',
          '',
          'SHOULDER PREHAB + UPPER BODY (15 min):',
          'Band External Rotation: 3 sets of 15 reps each arm (elbow pinned at 90 degrees, rotate outward slowly)',
          'Band Pull-Aparts: 3 sets of 15 reps (arms extended, squeeze shoulder blades together)',
          'Face Pulls with band: 3 sets of 12 reps (pull toward forehead, elbows high, squeeze rear delts)',
          'Half-Kneeling Dumbbell Press: 3 sets of 8 reps each side (kneel on one knee, press overhead)',
          '',
          'FLEXIBILITY + MOBILITY (15 min):',
          'Hip Flexor Lunge Stretch: 60 sec each side (kneeling lunge, lean forward, feel front of hip)',
          'Pigeon Stretch: 60 sec each side (from push-up position, bring knee forward, lower onto hip)',
          'Thoracic Rotation: 8 reps each side (side-lying, knees stacked, open top arm to floor)',
          'Cat-Cow: 10 reps (hands and knees, alternate arching and rounding back)',
          '90/90 Hip Switch: 8 reps each side (sit with legs at 90 degrees, rotate between positions)',
          'World Greatest Stretch: 5 reps each side (lunge, rotate, extend, hamstring stretch)',
          'Downward Dog: 3 sets of 30 sec (inverted V, push heels toward floor, stretch calves and hamstrings)',
          'Wall Angels: 10 reps (back against wall, slide arms up keeping contact)',
          '',
          'COOL-DOWN + PREHAB (10 min):',
          'Foam roll quads: 60 sec each leg',
          'Foam roll hamstrings: 60 sec each leg',
          'Foam roll calves: 60 sec each leg',
          'Foam roll upper back: 60 sec',
          'Alfredson eccentric heel drops straight: 15 reps (rise on both feet, lower on one, 3 sec down)',
          'Alfredson eccentric heel drops bent knee: 15 reps (same but with slight knee bend)',
          'Tyler Twist FlexBar: 15 reps (twist, extend arms, slowly release -- tennis elbow prevention)'
        ],
        category: 'gym'
      }
    ]
  }
];

// ============================================================
// GYM ROTATION TEMPLATES
// ============================================================

export const gymRotationWeekA: GymRotation = {
  id: 'gym-week-a',
  name: 'Week A: Lower Body + Core',
  week: 'A',
  focus: 'Build the lower body strength and core stability that form the foundation of powerful court movement and stroke production.',
  exercises: [
    'Goblet Squat 3x10-12',
    'Reverse Lunge (DB) 3x10 each leg',
    'Romanian Deadlift 3x10-12',
    'Lateral Lunge 3x8 each side',
    'Calf Raises (straight + bent) 3x15 each',
    'Single-Leg Balance 3x30 sec each leg',
    '---',
    'Front Plank 3x30-60 sec',
    'Side Plank 3x20-40 sec each side',
    'Pallof Press 3x10 each side',
    'Med Ball Rotational Throw 3x8-10 each side',
    'Dead Bug 3x8 each side',
    'Russian Twist 3x12 each side',
    '---',
    'Skater Hops 3x8 each side',
    'Box Step-Ups (explosive) 3x8 each leg'
  ],
  duration: '120 min (including warm-up and cool-down)',
  notes: 'The primary gym session for building the base. Lower body strength is the foundation of court movement. Core stability transfers leg power into racquet head speed. This is the "big rocks" session of the week.'
};

export const gymRotationWeekB: GymRotation = {
  id: 'gym-week-b',
  name: 'Week B: Upper Body + Rotational Power',
  week: 'B',
  focus: 'Develop upper body strength for stroke production and rotational power for groundstroke and serve velocity.',
  exercises: [
    'External Rotation (band) 3x15 each arm',
    'Internal Rotation (band) 3x15 each arm',
    'Band Pull-Aparts 3x15-20',
    'YTW Shoulder Raises 2x8 each position',
    'Half-Kneeling DB Press 3x10 each side',
    'Single-Arm Chest Press 3x10 each arm',
    'Renegade Row 3x8 each arm',
    'Resisted Pull-Downs 3x12',
    '---',
    'Medicine Ball Rotational Throw 4x10 each side',
    'Medicine Ball Overhead Slam 3x10',
    'Plank with Shoulder Taps 3x10 each side',
    'Pallof Press 3x10 each side',
    '---',
    'Wrist Curls 3x15-20',
    'Wrist Extensions 3x15-20',
    'Grip Ball Squeeze 3x15 each hand',
    'Tyler Twist FlexBar 3x15'
  ],
  duration: '120 min (including warm-up and cool-down)',
  notes: 'Focuses on the upper body and rotational power. The rotator cuff and scapular stabilizer work is essential shoulder prehab. The med ball throws are the most sport-specific exercise for tennis. Include farmer\'s walks as a finisher if time allows.'
};

export const gymRotationWeekC: GymRotation = {
  id: 'gym-week-c',
  name: 'Week C: Power + Agility',
  week: 'C',
  focus: 'Explosive power development and agility training for faster court movement and reactive ability.',
  exercises: [
    'Skater Hops 4x8 each side',
    'Box Step-Ups (explosive) 3x10 each leg',
    'Agility Ladder: Icky Shuffles 3x2 lengths',
    'Agility Ladder: In-Out 3x2 lengths',
    'Agility Ladder: Lateral Run 3x2 lengths each direction',
    'Agility Ladder: Carioca 3x2 lengths each direction',
    'Agility Ladder: Two Feet Each Square 3x2 lengths',
    '---',
    'Med Ball Rotational Throw 3x10 each side',
    'Med Ball Overhead Slam 3x10',
    'Goblet Squat 3x8 (heavier weight, explosive up)',
    'Lateral Lunge 3x8 each side (explosive push-off)',
    '---',
    'Front Plank 3x45 sec',
    'Pallof Press 3x10 each side',
    'Dead Bug 3x8 each side',
    '---',
    'Farmer\'s Walk 3x30 sec (heavy)',
    'Calf Raises 3x15 straight + 15 bent'
  ],
  duration: '120 min (including warm-up and cool-down)',
  notes: 'The most dynamic gym session. Emphasizes explosive movements, agility, and foot speed. The ladder work directly translates to court footwork. Keep rest periods short (30-60 sec) to maintain the training effect. This session should feel like a tennis-specific conditioning session.'
};

export const gymRotations: GymRotation[] = [
  gymRotationWeekA,
  gymRotationWeekB,
  gymRotationWeekC
];

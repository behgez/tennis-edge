import type { Exercise } from './types';

// ============================================================
// A) GYM LOWER BODY
// ============================================================

const gobletSquat: Exercise = {
  id: 'gym-lower-goblet-squat',
  name: 'Goblet Squat',
  description: 'Fundamental lower body exercise that builds quad, glute, and core strength essential for explosive court movement and low base position during groundstrokes.',
  instructions: [
    'Hold a dumbbell or kettlebell at chest height with both hands, elbows pointing down.',
    'Stand with feet shoulder-width apart, toes slightly turned out.',
    'Push your hips back and bend your knees to lower into a squat.',
    'Keep your chest up, back straight, and weight in your heels.',
    'Lower until thighs are parallel to the floor (or as deep as comfortable).',
    'Drive through your heels to return to standing.',
    'Squeeze glutes at the top.'
  ],
  sets: 3,
  reps: '10-12',
  duration: '5 min',
  muscleGroups: ['quadriceps', 'glutes', 'core', 'hip flexors'],
  equipment: ['dumbbell', 'kettlebell'],
  level: 'intermediate',
  category: 'GYM_LOWER_BODY',
  tips: [
    'Start with 8-12 kg and increase as form improves.',
    'Think about sitting back into a chair rather than bending forward.',
    'Keep knees tracking over toes -- do not let them cave inward.',
    'For tennis: this builds the loaded leg position for split steps and direction changes.'
  ]
};

const reverseLunge: Exercise = {
  id: 'gym-lower-reverse-lunge',
  name: 'Reverse Lunge (Dumbbell)',
  description: 'Single-leg exercise that improves balance, strengthens glutes and quads, and mimics the deceleration pattern used when recovering from wide shots.',
  instructions: [
    'Hold a dumbbell in each hand at your sides.',
    'Step one foot backward about 2-3 feet.',
    'Lower your back knee toward the floor until both knees form approximately 90-degree angles.',
    'Keep your torso upright and front knee tracking over your ankle.',
    'Drive through the front heel to return to standing.',
    'Alternate legs or complete all reps on one side first.'
  ],
  sets: 3,
  reps: '10 each leg',
  duration: '6 min',
  muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'core'],
  equipment: ['dumbbells'],
  level: 'intermediate',
  category: 'GYM_LOWER_BODY',
  tips: [
    'Start with 6-10 kg dumbbells.',
    'Reverse lunges are easier on the knees than forward lunges.',
    'Focus on controlled descent -- do not slam the back knee down.',
    'For tennis: builds deceleration strength for stopping after sprints to the ball.'
  ]
};

const romanianDeadlift: Exercise = {
  id: 'gym-lower-rdl',
  name: 'Romanian Deadlift (RDL)',
  description: 'Posterior chain exercise targeting hamstrings and glutes. Critical for injury prevention and explosive push-off in court movement.',
  instructions: [
    'Hold dumbbells in front of your thighs with palms facing you.',
    'Stand with feet hip-width apart, slight bend in knees.',
    'Hinge at the hips by pushing your butt backward.',
    'Lower the weights along your shins, keeping them close to your body.',
    'Lower until you feel a stretch in your hamstrings (typically mid-shin).',
    'Squeeze your glutes to drive back to standing.',
    'Keep your back flat throughout -- do not round your spine.'
  ],
  sets: 3,
  reps: '10-12',
  duration: '5 min',
  muscleGroups: ['hamstrings', 'glutes', 'lower back', 'core'],
  equipment: ['dumbbells', 'barbell'],
  level: 'intermediate',
  category: 'GYM_LOWER_BODY',
  tips: [
    'Start with lighter weight to master the hip hinge pattern.',
    'Think about closing a door with your butt as you hinge.',
    'Keep a neutral spine -- imagine a dowel along your back.',
    'For tennis: strengthens the posterior chain to prevent hamstring strains during explosive movements.'
  ]
};

const lateralLunge: Exercise = {
  id: 'gym-lower-lateral-lunge',
  name: 'Lateral Lunge',
  description: 'Trains the lateral movement pattern fundamental to tennis. Strengthens the adductors, glutes, and quads in the frontal plane.',
  instructions: [
    'Stand tall with feet together, holding a dumbbell at chest height (optional).',
    'Take a large step to the right, keeping your left foot planted.',
    'Push your hips back and bend your right knee, keeping left leg straight.',
    'Lower until your right thigh is close to parallel with the floor.',
    'Push off your right foot to return to starting position.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '8 each side',
  duration: '5 min',
  muscleGroups: ['adductors', 'quadriceps', 'glutes', 'hip flexors'],
  equipment: ['dumbbell (optional)'],
  level: 'intermediate',
  category: 'GYM_LOWER_BODY',
  tips: [
    'Start bodyweight before adding load.',
    'Keep the stepping foot pointing forward, not turned out.',
    'Sit into the lunge -- do not let the knee drift past the toes excessively.',
    'For tennis: directly trains the lateral push-off used in side-to-side movement.'
  ]
};

const calfRaises: Exercise = {
  id: 'gym-lower-calf-raises',
  name: 'Calf Raises (Straight + Bent Knee)',
  description: 'Strengthens both the gastrocnemius (straight leg) and soleus (bent knee) -- essential for explosive split steps and Achilles tendon resilience.',
  instructions: [
    'STRAIGHT LEG: Stand on the edge of a step with heels hanging off.',
    'Rise up onto your toes as high as possible.',
    'Hold for 1 second at the top.',
    'Lower slowly (3 seconds) below the step for a full stretch.',
    'Complete all straight-leg reps.',
    'BENT KNEE: Repeat the same movement with knees bent at about 20 degrees.',
    'This shifts the load to the soleus and lower Achilles.'
  ],
  sets: 3,
  reps: '15 straight + 15 bent',
  duration: '6 min',
  muscleGroups: ['gastrocnemius', 'soleus', 'achilles tendon'],
  equipment: ['step or platform', 'dumbbell (optional)'],
  level: 'beginner',
  category: 'GYM_LOWER_BODY',
  tips: [
    'Slow eccentric (lowering) phase is key for tendon health.',
    'Add weight progressively with a dumbbell in one hand.',
    'Can be done single-leg for added difficulty.',
    'For tennis: critical for Achilles prehab and explosive split-step ability.'
  ]
};

const singleLegBalance: Exercise = {
  id: 'gym-lower-single-leg-balance',
  name: 'Single-Leg Balance',
  description: 'Proprioception and stability exercise that improves ankle strength and balance, reducing injury risk during rapid direction changes on court.',
  instructions: [
    'Stand on one foot with a slight bend in the knee.',
    'Keep your core engaged and hips level.',
    'Hold the position for 30-45 seconds.',
    'Progress by closing your eyes or standing on an unstable surface.',
    'For added challenge, perform mini-squats on the standing leg.',
    'Switch legs and repeat.'
  ],
  sets: 3,
  reps: '30-45 sec each leg',
  duration: '5 min',
  muscleGroups: ['ankle stabilizers', 'glutes', 'core', 'quadriceps'],
  equipment: ['balance pad (optional)'],
  level: 'beginner',
  category: 'GYM_LOWER_BODY',
  tips: [
    'Start near a wall for safety.',
    'Eyes-closed variation dramatically increases difficulty.',
    'Try catching and throwing a tennis ball while balancing.',
    'For tennis: builds the proprioception needed for stable shots during movement.'
  ]
};

// ============================================================
// B) GYM CORE
// ============================================================

const frontPlank: Exercise = {
  id: 'gym-core-front-plank',
  name: 'Front Plank',
  description: 'Foundational anti-extension core exercise. Builds the trunk stability needed to transfer power from legs through the kinetic chain into racquet head speed.',
  instructions: [
    'Start face down with forearms on the floor, elbows under shoulders.',
    'Lift your body off the floor, forming a straight line from head to heels.',
    'Engage your core by drawing your belly button toward your spine.',
    'Keep your hips level -- do not sag or pike.',
    'Breathe steadily throughout the hold.',
    'Hold for prescribed time, rest, and repeat.'
  ],
  sets: 3,
  reps: '30-60 sec',
  duration: '4 min',
  muscleGroups: ['rectus abdominis', 'transverse abdominis', 'obliques', 'erectors'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'GYM_CORE',
  tips: [
    'Quality over duration -- maintain perfect form.',
    'Squeeze your glutes to help maintain alignment.',
    'Progress by increasing time or adding small arm/leg lifts.',
    'For tennis: creates the stable base for all stroke production.'
  ]
};

const sidePlank: Exercise = {
  id: 'gym-core-side-plank',
  name: 'Side Plank',
  description: 'Anti-lateral flexion exercise that strengthens obliques and hip stabilizers. Essential for maintaining posture during open-stance shots and serves.',
  instructions: [
    'Lie on your side with forearm on the floor, elbow under shoulder.',
    'Stack your feet or stagger them for stability.',
    'Lift your hips off the floor, creating a straight line from head to feet.',
    'Keep your top hip stacked directly over the bottom hip.',
    'Engage your core and hold.',
    'Lower with control and switch sides.'
  ],
  sets: 3,
  reps: '20-40 sec each side',
  duration: '5 min',
  muscleGroups: ['obliques', 'hip abductors', 'transverse abdominis', 'shoulders'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'GYM_CORE',
  tips: [
    'Start with knees bent if full side plank is too difficult.',
    'Add hip dips (lower and lift hips) for dynamic variation.',
    'Top arm can reach to ceiling for added challenge.',
    'For tennis: builds the lateral stability for open-stance forehands.'
  ]
};

const pallofPress: Exercise = {
  id: 'gym-core-pallof-press',
  name: 'Pallof Press (Band)',
  description: 'Anti-rotation exercise that trains the core to resist twisting forces. Directly translates to rotational stability during groundstrokes and serves.',
  instructions: [
    'Attach a resistance band to a fixed point at chest height.',
    'Stand perpendicular to the anchor with feet shoulder-width apart.',
    'Hold the band handle at your chest with both hands.',
    'Press your arms straight out in front of your chest.',
    'Hold the extended position for 2-3 seconds, resisting the pull of the band.',
    'Bring hands back to chest.',
    'Complete all reps, then switch sides to face the other direction.'
  ],
  sets: 3,
  reps: '10 each side',
  duration: '5 min',
  muscleGroups: ['obliques', 'transverse abdominis', 'hip stabilizers'],
  equipment: ['resistance band', 'cable machine'],
  level: 'intermediate',
  category: 'GYM_CORE',
  tips: [
    'The farther you stand from the anchor, the harder it gets.',
    'Keep your hips square -- do not let the band rotate you.',
    'Try in a split stance for added stability challenge.',
    'For tennis: builds the anti-rotation strength that powers controlled groundstrokes.'
  ]
};

const plankShoulderTaps: Exercise = {
  id: 'gym-core-plank-shoulder-taps',
  name: 'Plank with Shoulder Taps',
  description: 'Dynamic anti-rotation plank variation that builds core stability under shifting load -- simulating the weight transfers during tennis rallies.',
  instructions: [
    'Start in a high plank position with hands under shoulders.',
    'Feet wider than hip-width for stability.',
    'Lift your right hand and tap your left shoulder.',
    'Return hand to floor, then tap right shoulder with left hand.',
    'Keep hips as still as possible throughout -- no rocking.',
    'Alternate sides for the prescribed reps.'
  ],
  sets: 3,
  reps: '10 each side',
  duration: '4 min',
  muscleGroups: ['core', 'shoulders', 'obliques', 'chest'],
  equipment: ['mat'],
  level: 'intermediate',
  category: 'GYM_CORE',
  tips: [
    'Wider feet = easier. Narrow feet = harder.',
    'Go slowly -- speed defeats the purpose.',
    'If hips rock side to side, widen your base.',
    'For tennis: trains core stability during dynamic upper body movement.'
  ]
};

const medBallRotationalThrow: Exercise = {
  id: 'gym-core-med-ball-rotational-throw',
  name: 'Medicine Ball Rotational Throw',
  description: 'Explosive rotational power exercise that directly mimics the groundstroke movement pattern. Develops the trunk rotation speed critical for racquet head velocity.',
  instructions: [
    'Stand sideways to a solid wall, about 3-4 feet away.',
    'Hold a medicine ball at hip height on the side away from the wall.',
    'Rotate your trunk and hips explosively to throw the ball into the wall.',
    'Use your legs and hips to initiate the rotation, not just arms.',
    'Catch the rebound (or pick up the ball).',
    'Complete all reps on one side, then switch to the other side.'
  ],
  sets: 3,
  reps: '8-10 each side',
  duration: '6 min',
  muscleGroups: ['obliques', 'hip rotators', 'core', 'shoulders'],
  equipment: ['medicine ball (2-4 kg)', 'wall'],
  level: 'intermediate',
  category: 'GYM_CORE',
  tips: [
    'Use a 2-3 kg ball to start -- focus on speed, not weight.',
    'Drive rotation from the ground up: feet, hips, trunk, arms.',
    'This mirrors the kinetic chain of a forehand and backhand.',
    'For tennis: THE key exercise for developing stroke power through rotation.'
  ]
};

const medBallOverheadSlam: Exercise = {
  id: 'gym-core-med-ball-slam',
  name: 'Medicine Ball Overhead Slam',
  description: 'Full-body power exercise that trains the overhead throwing pattern used in the serve. Develops shoulder, core, and hip flexor power.',
  instructions: [
    'Stand with feet shoulder-width apart, holding a slam ball overhead.',
    'Extend fully through your arms, rising onto your toes.',
    'Explosively slam the ball into the ground in front of you.',
    'Use your entire body -- engage core, pull down with arms and lats.',
    'Squat down to pick up the ball.',
    'Return to start and repeat.'
  ],
  sets: 3,
  reps: '8-10',
  duration: '5 min',
  muscleGroups: ['core', 'lats', 'shoulders', 'hip flexors', 'quads'],
  equipment: ['slam ball (3-5 kg)'],
  level: 'intermediate',
  category: 'GYM_CORE',
  tips: [
    'Use a dead-bounce slam ball, not a regular medicine ball.',
    'Full extension at the top, aggressive slam at the bottom.',
    'Exhale forcefully as you slam.',
    'For tennis: builds the overhead power pattern used in serves and overhead smashes.'
  ]
};

const russianTwist: Exercise = {
  id: 'gym-core-russian-twist',
  name: 'Russian Twist',
  description: 'Seated rotational exercise that builds oblique endurance for sustained rally play and the ability to generate power from seated/low positions.',
  instructions: [
    'Sit on the floor with knees bent, feet flat (or elevated for harder variation).',
    'Lean back slightly to engage your core, keeping back straight.',
    'Hold a medicine ball, dumbbell, or just clasp your hands.',
    'Rotate your torso to the right, bringing the weight toward the floor beside your hip.',
    'Rotate to the left side in a controlled movement.',
    'One right + one left = one rep.'
  ],
  sets: 3,
  reps: '12 each side',
  duration: '4 min',
  muscleGroups: ['obliques', 'rectus abdominis', 'hip flexors'],
  equipment: ['medicine ball or dumbbell (optional)'],
  level: 'beginner',
  category: 'GYM_CORE',
  tips: [
    'Keep your chest lifted -- do not collapse forward.',
    'Control the rotation, do not use momentum.',
    'Start without weight and add as core strength develops.',
    'For tennis: builds rotational endurance for long rallies and matches.'
  ]
};

const deadBug: Exercise = {
  id: 'gym-core-dead-bug',
  name: 'Dead Bug',
  description: 'Anti-extension exercise that teaches core bracing while moving limbs independently. Excellent for developing the dissociated limb movement tennis requires.',
  instructions: [
    'Lie on your back with arms extended toward the ceiling.',
    'Lift legs to tabletop position (knees over hips, 90-degree bend).',
    'Press your lower back firmly into the floor.',
    'Slowly extend your right arm overhead and left leg out straight simultaneously.',
    'Return to start and switch sides (left arm, right leg).',
    'Keep your lower back pressed into the floor throughout -- this is the key.'
  ],
  sets: 3,
  reps: '8 each side',
  duration: '5 min',
  muscleGroups: ['transverse abdominis', 'rectus abdominis', 'hip flexors'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'GYM_CORE',
  tips: [
    'If lower back lifts off floor, you have gone too far.',
    'Go slowly -- this is about control, not speed.',
    'Exhale as you extend, inhale as you return.',
    'For tennis: trains the core to stay stable while arms and legs move independently.'
  ]
};

// ============================================================
// C) GYM UPPER BODY
// ============================================================

const externalRotationBand: Exercise = {
  id: 'gym-upper-external-rotation',
  name: 'External Rotation (Band)',
  description: 'Strengthens the infraspinatus and teres minor -- the external rotators that decelerate the arm after every serve and overhead. Essential shoulder prehab.',
  instructions: [
    'Attach a band to a door handle or fixed point at elbow height.',
    'Stand sideways to the anchor, affected arm closest to it.',
    'Hold the band with your elbow bent 90 degrees, tucked against your ribs.',
    'Rotate your forearm outward away from your body.',
    'Control the return to the starting position (3 seconds).',
    'Keep your elbow pinned to your side throughout.'
  ],
  sets: 3,
  reps: '15',
  duration: '4 min',
  muscleGroups: ['infraspinatus', 'teres minor', 'rotator cuff'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Use a light band -- this is about high reps and control.',
    'Place a small towel between your elbow and ribs as a reminder.',
    'No pain should be felt -- reduce resistance if painful.',
    'For tennis: the single most important exercise for shoulder injury prevention.'
  ]
};

const internalRotationBand: Exercise = {
  id: 'gym-upper-internal-rotation',
  name: 'Internal Rotation (Band)',
  description: 'Strengthens the subscapularis for internal rotation power and balance with external rotators.',
  instructions: [
    'Attach a band to a fixed point at elbow height.',
    'Stand sideways to the anchor, affected arm farthest from it.',
    'Hold the band with elbow bent 90 degrees, tucked against your ribs.',
    'Rotate your forearm inward across your body.',
    'Control the return (3 seconds).',
    'Keep elbow pinned to your side.'
  ],
  sets: 3,
  reps: '15',
  duration: '4 min',
  muscleGroups: ['subscapularis', 'pectoralis', 'rotator cuff'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Match resistance to external rotation -- typically slightly heavier.',
    'Maintain the 90-degree elbow angle.',
    'For tennis: supports the acceleration phase of serves and forehands.'
  ]
};

const bandPullAparts: Exercise = {
  id: 'gym-upper-band-pull-aparts',
  name: 'Band Pull-Aparts',
  description: 'Posterior shoulder and scapular retractor exercise that counteracts the forward-rounded posture from desk work and repetitive tennis strokes.',
  instructions: [
    'Hold a resistance band in front of you with arms extended at shoulder height.',
    'Grip slightly wider than shoulder width.',
    'Pull the band apart by squeezing your shoulder blades together.',
    'Bring the band to your chest, arms extended wide.',
    'Control the return to start.',
    'Keep arms at shoulder height throughout.'
  ],
  sets: 3,
  reps: '15-20',
  duration: '4 min',
  muscleGroups: ['rear deltoids', 'rhomboids', 'middle trapezius'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Initiate the movement from your shoulder blades, not arms.',
    'Keep a slight bend in your elbows.',
    'Great as a desk break exercise too.',
    'For tennis: counteracts the internal rotation dominance from strokes.'
  ]
};

const ytwShoulder: Exercise = {
  id: 'gym-upper-ytw',
  name: 'YTW Shoulder Raises',
  description: 'Three-position shoulder strengthening exercise targeting the lower trapezius and rotator cuff. Builds scapular control for overhead stability.',
  instructions: [
    'Lie face down on a bench or exercise ball, arms hanging down.',
    'Y: Raise arms forward and up at a 45-degree angle (forming a Y), thumbs up.',
    'Hold 2 seconds, lower slowly. Do all Y reps.',
    'T: Raise arms directly out to the sides (forming a T), thumbs up.',
    'Hold 2 seconds, lower slowly. Do all T reps.',
    'W: Bend elbows to 90 degrees and squeeze shoulder blades back (forming a W).',
    'Hold 2 seconds, lower slowly. Do all W reps.'
  ],
  sets: 2,
  reps: '8 each position',
  duration: '5 min',
  muscleGroups: ['lower trapezius', 'rotator cuff', 'rhomboids', 'rear deltoids'],
  equipment: ['bench or exercise ball', 'light dumbbells (optional)'],
  level: 'beginner',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Start without weight -- these muscles are small.',
    'Thumbs pointing up activates the external rotators.',
    'Go slowly with perfect form.',
    'For tennis: critical for scapular stability during serves and overheads.'
  ]
};

const scapularWallControl: Exercise = {
  id: 'gym-upper-scapular-wall',
  name: 'Scapular Wall Control (Wall Slides)',
  description: 'Teaches proper scapular movement patterns against gravity. Improves overhead mechanics for serving.',
  instructions: [
    'Stand with your back flat against a wall.',
    'Press your head, upper back, and lower back into the wall.',
    'Place arms against the wall in a "goalpost" position (elbows at 90 degrees).',
    'Slowly slide your arms up the wall, maintaining contact throughout.',
    'Slide up as high as you can while keeping back, elbows, and wrists on the wall.',
    'Slowly return to the goalpost position.',
    'If contact is lost, that is your current range -- work within it.'
  ],
  sets: 3,
  reps: '10',
  duration: '4 min',
  muscleGroups: ['serratus anterior', 'lower trapezius', 'rotator cuff'],
  equipment: ['wall'],
  level: 'beginner',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Maintaining wall contact is more important than range of motion.',
    'This exercise reveals shoulder mobility restrictions.',
    'Do this daily if you work at a desk.',
    'For tennis: improves the overhead reaching pattern used in serves.'
  ]
};

const resistedPullDowns: Exercise = {
  id: 'gym-upper-resisted-pulldowns',
  name: 'Resisted Pull-Downs',
  description: 'Lat and upper back exercise that strengthens the pulling muscles used in serve deceleration and one-handed backhand strokes.',
  instructions: [
    'Attach a band overhead or use a cable machine.',
    'Grip the band/handle slightly wider than shoulder width.',
    'Pull down to chest level, squeezing your shoulder blades together.',
    'Control the return to full arm extension overhead.',
    'Keep your core engaged and avoid leaning back excessively.'
  ],
  sets: 3,
  reps: '12',
  duration: '4 min',
  muscleGroups: ['latissimus dorsi', 'rhomboids', 'biceps', 'lower trapezius'],
  equipment: ['resistance band', 'cable machine'],
  level: 'intermediate',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Focus on pulling with your back, not your arms.',
    'Full range of motion -- stretch at top, squeeze at bottom.',
    'For tennis: builds the lat strength for serves and overheads.'
  ]
};

const halfKneelingDBPress: Exercise = {
  id: 'gym-upper-hk-db-press',
  name: 'Half-Kneeling Dumbbell Press',
  description: 'Unilateral overhead pressing from a half-kneeling position. Trains shoulder strength and core stability simultaneously.',
  instructions: [
    'Kneel on one knee with the other foot forward (90/90 position).',
    'Hold a dumbbell at shoulder height on the same side as the back knee.',
    'Press the dumbbell straight overhead.',
    'Keep your core braced and ribs down -- do not arch your back.',
    'Lower with control back to shoulder height.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '10 each side',
  duration: '5 min',
  muscleGroups: ['deltoids', 'triceps', 'core', 'hip flexors'],
  equipment: ['dumbbell'],
  level: 'intermediate',
  category: 'GYM_UPPER_BODY',
  tips: [
    'The half-kneeling position forces core engagement.',
    'Start with a lighter weight than standing press.',
    'Keep your glute squeezed on the kneeling side.',
    'For tennis: builds overhead strength for serves while challenging core stability.'
  ]
};

const singleArmChestPress: Exercise = {
  id: 'gym-upper-sa-chest-press',
  name: 'Single-Arm Chest Press',
  description: 'Unilateral pressing exercise that builds pushing strength and anti-rotation core stability. Mimics the pressing pattern in volleys.',
  instructions: [
    'Lie on a bench holding one dumbbell at chest height.',
    'Press the dumbbell straight up over your chest.',
    'Lower with control back to chest level.',
    'Keep your body from rotating -- use your core to stay flat.',
    'Complete all reps on one arm, then switch.',
    'Free hand can rest on your stomach for awareness.'
  ],
  sets: 3,
  reps: '10 each arm',
  duration: '5 min',
  muscleGroups: ['pectoralis', 'deltoids', 'triceps', 'core'],
  equipment: ['dumbbell', 'bench'],
  level: 'intermediate',
  category: 'GYM_UPPER_BODY',
  tips: [
    'The single-arm version adds a significant core stability demand.',
    'Do not let your body rotate toward the pressing side.',
    'For tennis: trains the push-forward pattern used in volleys and the serve follow-through.'
  ]
};

const renegadeRow: Exercise = {
  id: 'gym-upper-renegade-row',
  name: 'Renegade Row',
  description: 'Combination plank and rowing exercise that builds back strength and core anti-rotation simultaneously. Full-body stability challenge.',
  instructions: [
    'Start in a high plank position with a dumbbell in each hand.',
    'Feet wider than shoulder-width for stability.',
    'Row one dumbbell up to your hip, squeezing your shoulder blade.',
    'Lower with control to the floor.',
    'Row the other side.',
    'Maintain a solid plank position throughout -- minimize hip rotation.'
  ],
  sets: 3,
  reps: '8 each arm',
  duration: '5 min',
  muscleGroups: ['latissimus dorsi', 'rhomboids', 'core', 'shoulders'],
  equipment: ['dumbbells'],
  level: 'advanced',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Use lighter dumbbells than regular rows -- the plank makes it harder.',
    'Wider feet = more stability.',
    'If hips rock, go lighter or wider.',
    'For tennis: total body exercise combining core stability with back strength.'
  ]
};

// ============================================================
// D) GYM WRIST / FOREARM
// ============================================================

const wristCurls: Exercise = {
  id: 'gym-wrist-curls',
  name: 'Wrist Curls',
  description: 'Strengthens the wrist flexors for racquet control and grip endurance. Supports the snap used in topspin generation.',
  instructions: [
    'Sit with forearms resting on your thighs, palms facing up.',
    'Hold a light dumbbell (2-4 kg) in each hand.',
    'Let the wrists extend down over your knees.',
    'Curl the weight up by flexing your wrists.',
    'Pause at the top for 1 second.',
    'Lower slowly back to full extension.'
  ],
  sets: 3,
  reps: '15-20',
  duration: '3 min',
  muscleGroups: ['wrist flexors', 'forearm'],
  equipment: ['light dumbbells'],
  level: 'beginner',
  category: 'GYM_WRIST_FOREARM',
  tips: [
    'Use very light weight -- wrist muscles are small.',
    'Full range of motion is important.',
    'For tennis: builds grip endurance for long matches.'
  ]
};

const wristExtensions: Exercise = {
  id: 'gym-wrist-extensions',
  name: 'Wrist Extensions',
  description: 'Strengthens the wrist extensors -- the muscles most commonly involved in tennis elbow. Essential prehab for racquet sports.',
  instructions: [
    'Sit with forearms resting on thighs, palms facing down.',
    'Hold a light dumbbell (1-3 kg) in each hand.',
    'Let wrists flex down over your knees.',
    'Extend the wrists upward, lifting the back of your hand.',
    'Pause for 1 second at the top.',
    'Lower slowly (3 seconds) back to start.'
  ],
  sets: 3,
  reps: '15-20',
  duration: '3 min',
  muscleGroups: ['wrist extensors', 'forearm'],
  equipment: ['light dumbbells'],
  level: 'beginner',
  category: 'GYM_WRIST_FOREARM',
  tips: [
    'Slow eccentrics help prevent tennis elbow.',
    'Start lighter than you think -- 1 kg is fine.',
    'Pain during this exercise may indicate existing tennis elbow.',
    'For tennis: THE key exercise for tennis elbow prevention.'
  ]
};

const gripBallSqueeze: Exercise = {
  id: 'gym-wrist-grip-squeeze',
  name: 'Grip Ball Squeeze',
  description: 'Simple grip strengthening exercise that improves racquet hold endurance and forearm resilience.',
  instructions: [
    'Hold a tennis ball or grip strengthener in your hand.',
    'Squeeze as hard as you can for 5 seconds.',
    'Release slowly over 3 seconds.',
    'Repeat for prescribed reps.',
    'Switch hands and repeat.'
  ],
  sets: 3,
  reps: '15 each hand',
  duration: '3 min',
  muscleGroups: ['grip', 'forearm flexors'],
  equipment: ['tennis ball', 'grip strengthener'],
  level: 'beginner',
  category: 'GYM_WRIST_FOREARM',
  tips: [
    'Can be done anywhere -- at your desk, watching TV.',
    'Alternate squeeze duration for variation.',
    'For tennis: prevents grip fatigue in long matches.'
  ]
};

const farmersWalk: Exercise = {
  id: 'gym-wrist-farmers-walk',
  name: "Farmer's Walk",
  description: 'Loaded carry that builds grip strength, core stability, shoulder stability, and mental toughness simultaneously.',
  instructions: [
    'Pick up a heavy dumbbell or kettlebell in each hand.',
    'Stand tall with shoulders back and core braced.',
    'Walk forward with controlled, deliberate steps.',
    'Keep your torso upright -- do not lean to either side.',
    'Walk for prescribed distance or time.',
    'Set weights down with control.'
  ],
  sets: 3,
  reps: '30-40 meters or 30 sec',
  duration: '5 min',
  muscleGroups: ['grip', 'forearms', 'core', 'trapezius', 'shoulders'],
  equipment: ['heavy dumbbells', 'kettlebells'],
  level: 'intermediate',
  category: 'GYM_WRIST_FOREARM',
  tips: [
    'Use challenging weight -- grip should be near failure at the end.',
    'Shoulders back and down, not shrugged up.',
    'For tennis: builds the total-body grip endurance and core stability needed for 3-set matches.'
  ]
};

const tylerTwistFlexBar: Exercise = {
  id: 'gym-wrist-tyler-twist',
  name: 'Tyler Twist (FlexBar Protocol)',
  description: 'The gold-standard eccentric exercise for treating and preventing lateral epicondylitis (tennis elbow). Uses a TheraBand FlexBar.',
  instructions: [
    'Hold the FlexBar vertically in your affected hand, wrist extended.',
    'Grip the top of the FlexBar with your other hand.',
    'Twist the FlexBar with the unaffected hand (wring it like a towel).',
    'While maintaining the twist, bring both hands in front of you, arms extended.',
    'Slowly release the twist using only the affected hand (eccentric phase).',
    'This should take 3-5 seconds.',
    'Repeat for prescribed reps.'
  ],
  sets: 3,
  reps: '15',
  duration: '5 min',
  muscleGroups: ['wrist extensors', 'forearm'],
  equipment: ['TheraBand FlexBar (green or red)'],
  level: 'beginner',
  category: 'GYM_WRIST_FOREARM',
  tips: [
    'Start with the red (lightest) FlexBar and progress to green.',
    'The eccentric (releasing) phase is the therapeutic part.',
    'Mild discomfort is okay; sharp pain means stop.',
    'Do this daily if you have any elbow tenderness.',
    'For tennis: evidence-based protocol for tennis elbow prevention and treatment.'
  ],
  videoUrl: 'https://www.youtube.com/watch?v=gsKGbqA9aNo'
};

// ============================================================
// E) GYM POWER
// ============================================================

const skaterHops: Exercise = {
  id: 'gym-power-skater-hops',
  name: 'Skater Hops',
  description: 'Lateral plyometric exercise that develops explosive side-to-side power and single-leg landing stability. Mimics the lateral movement in tennis rallies.',
  instructions: [
    'Stand on your right foot with a slight bend in the knee.',
    'Push off laterally to the left, landing on your left foot.',
    'Absorb the landing softly through your ankle, knee, and hip.',
    'Balance for 1 second on the landing foot.',
    'Push off laterally back to the right.',
    'Swing arms naturally for momentum (like a speed skater).'
  ],
  sets: 3,
  reps: '8 each side',
  duration: '5 min',
  muscleGroups: ['glutes', 'quadriceps', 'hip abductors', 'calves'],
  equipment: ['none'],
  level: 'intermediate',
  category: 'GYM_POWER',
  tips: [
    'Start with small hops and increase distance as control improves.',
    'Soft, quiet landings = good absorption.',
    'Focus on sticking the landing before pushing off.',
    'For tennis: builds the lateral explosive power for wide ball retrieval.'
  ]
};

const boxStepUps: Exercise = {
  id: 'gym-power-box-step-ups',
  name: 'Box Step-Ups (Explosive)',
  description: 'Single-leg power exercise that builds explosive push-off strength for court movement and approach shots.',
  instructions: [
    'Stand facing a sturdy box or bench (30-45 cm high).',
    'Place your right foot fully on top of the box.',
    'Drive through the right foot explosively, extending the hip and knee.',
    'At the top, drive the left knee up toward your chest.',
    'Step down with control on the left foot.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '8 each leg',
  duration: '5 min',
  muscleGroups: ['quadriceps', 'glutes', 'calves', 'hip flexors'],
  equipment: ['box or bench (30-45 cm)'],
  level: 'intermediate',
  category: 'GYM_POWER',
  tips: [
    'Do not push off the back foot -- all force from the top foot.',
    'Drive explosively up, step down with control.',
    'Add dumbbells for increased difficulty.',
    'For tennis: builds the explosive first step for chasing down balls.'
  ]
};

const agilityLadderIckyShuffles: Exercise = {
  id: 'gym-power-ladder-icky',
  name: 'Agility Ladder: Icky Shuffles',
  description: 'Fast-foot agility drill that improves foot speed, coordination, and the quick steps needed for court positioning.',
  instructions: [
    'Stand to the left of the agility ladder.',
    'Step right foot into the first square.',
    'Step left foot into the same square.',
    'Step right foot out to the right of the ladder.',
    'Step left foot into the next square.',
    'Step right foot into that square.',
    'Step left foot out to the left.',
    'Continue this in-in-out pattern through the ladder.'
  ],
  sets: 3,
  reps: '2 lengths',
  duration: '4 min',
  muscleGroups: ['calves', 'hip flexors', 'ankles', 'core'],
  equipment: ['agility ladder'],
  level: 'intermediate',
  category: 'GYM_POWER',
  tips: [
    'Speed is secondary to correct foot placement at first.',
    'Stay on the balls of your feet throughout.',
    'Keep hips low and core engaged.',
    'For tennis: develops the quick adjustment steps between split step and stroke.'
  ]
};

const agilityLadderInOut: Exercise = {
  id: 'gym-power-ladder-in-out',
  name: 'Agility Ladder: In-Out',
  description: 'Lateral agility pattern that trains the wide-narrow stance transitions common in tennis movement.',
  instructions: [
    'Stand facing the ladder at one end.',
    'Step both feet into the first square (one at a time, quickly).',
    'Step both feet out wide of the next square.',
    'Step both feet into the next square.',
    'Continue this in-out pattern through the ladder.',
    'Keep rhythm quick and consistent.'
  ],
  sets: 3,
  reps: '2 lengths',
  duration: '4 min',
  muscleGroups: ['calves', 'adductors', 'abductors', 'core'],
  equipment: ['agility ladder'],
  level: 'intermediate',
  category: 'GYM_POWER',
  tips: [
    'Light on your feet -- imagine the floor is hot.',
    'Arms should pump naturally with the movement.',
    'For tennis: trains the quick lateral adjustment steps at the baseline.'
  ]
};

const agilityLadderLateralRun: Exercise = {
  id: 'gym-power-ladder-lateral',
  name: 'Agility Ladder: Lateral Run',
  description: 'Side-facing ladder drill that trains lateral foot speed and the side-shuffle movement pattern.',
  instructions: [
    'Stand sideways to the ladder.',
    'Step the lead foot into the first square.',
    'Follow with the trailing foot into the same square.',
    'Lead foot moves to the next square immediately.',
    'Move down the entire ladder sideways.',
    'Turn around and return leading with the other foot.'
  ],
  sets: 3,
  reps: '2 lengths each direction',
  duration: '4 min',
  muscleGroups: ['calves', 'hip abductors', 'ankles'],
  equipment: ['agility ladder'],
  level: 'beginner',
  category: 'GYM_POWER',
  tips: [
    'Do not cross your feet over each other.',
    'Stay low in an athletic stance.',
    'For tennis: directly trains the side-shuffle recovery step.'
  ]
};

const agilityLadderCarioca: Exercise = {
  id: 'gym-power-ladder-carioca',
  name: 'Agility Ladder: Carioca',
  description: 'Cross-behind lateral movement pattern that develops hip mobility, coordination, and rotational agility.',
  instructions: [
    'Stand sideways to the ladder.',
    'Step the trail foot behind the lead foot into the next square.',
    'Step the lead foot laterally into the next square.',
    'Step the trail foot in front of the lead foot into the next square.',
    'Step the lead foot laterally again.',
    'Continue this behind-lateral-in front pattern down the ladder.'
  ],
  sets: 3,
  reps: '2 lengths each direction',
  duration: '4 min',
  muscleGroups: ['hip rotators', 'calves', 'core', 'adductors'],
  equipment: ['agility ladder'],
  level: 'intermediate',
  category: 'GYM_POWER',
  tips: [
    'Hips rotate but shoulders stay facing forward.',
    'This movement takes practice -- start slow.',
    'For tennis: develops the hip rotation and crossover steps used in court coverage.'
  ]
};

const agilityLadderTwoFeetEach: Exercise = {
  id: 'gym-power-ladder-two-feet',
  name: 'Agility Ladder: Two Feet Each Square',
  description: 'Quick-feet drill that builds raw foot speed and the rapid small steps used in positioning for shots.',
  instructions: [
    'Face the ladder.',
    'Step both feet (one at a time) into each square as quickly as possible.',
    'Right-left into square one, right-left into square two, etc.',
    'Pump your arms for speed.',
    'Stay on the balls of your feet.',
    'Complete the full ladder length.'
  ],
  sets: 3,
  reps: '2 lengths',
  duration: '3 min',
  muscleGroups: ['calves', 'hip flexors', 'ankles'],
  equipment: ['agility ladder'],
  level: 'beginner',
  category: 'GYM_POWER',
  tips: [
    'Speed is the goal here -- go as fast as you can with clean steps.',
    'Do not look at your feet -- use peripheral vision.',
    'For tennis: builds the quick small adjustment steps for optimal court positioning.'
  ]
};

// ============================================================
// F) HOME LOWER BODY
// ============================================================

const homeBWSquat: Exercise = {
  id: 'home-lower-bw-squat',
  name: 'Bodyweight Squat',
  description: 'Home-friendly lower body exercise that maintains leg strength when the gym is not available.',
  instructions: [
    'Stand with feet shoulder-width apart.',
    'Push hips back and bend knees to lower into a squat.',
    'Keep chest up, weight in heels.',
    'Lower until thighs are at least parallel to the floor.',
    'Drive through heels to stand.',
    'For added difficulty, pause at the bottom for 3 seconds.'
  ],
  sets: 3,
  reps: '15-20',
  duration: '4 min',
  muscleGroups: ['quadriceps', 'glutes', 'core'],
  equipment: ['none'],
  level: 'beginner',
  category: 'HOME_LOWER',
  tips: [
    'Add a 3-second pause at the bottom for intensity.',
    'Hold dumbbells for goblet squat variation at home.',
    'For tennis: maintains base leg strength between gym sessions.'
  ]
};

const homeReverseLunge: Exercise = {
  id: 'home-lower-reverse-lunge',
  name: 'Bodyweight Reverse Lunge',
  description: 'Single-leg strength exercise that can be done anywhere with no equipment.',
  instructions: [
    'Stand tall with feet together.',
    'Step one foot backward about 2-3 feet.',
    'Lower your back knee toward the floor.',
    'Keep your torso upright and front knee over ankle.',
    'Drive through the front heel to return to standing.',
    'Alternate legs.'
  ],
  sets: 3,
  reps: '12 each leg',
  duration: '5 min',
  muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
  equipment: ['dumbbells (optional)'],
  level: 'beginner',
  category: 'HOME_LOWER',
  tips: [
    'Hold dumbbells at your sides to add resistance.',
    'For tennis: maintains single-leg strength and balance.'
  ]
};

const homeRDL: Exercise = {
  id: 'home-lower-rdl',
  name: 'Single-Leg Romanian Deadlift',
  description: 'Balance-intensive posterior chain exercise. The single-leg version adds proprioception work essential for tennis.',
  instructions: [
    'Stand on one foot with a slight knee bend.',
    'Hold a dumbbell in the opposite hand (optional).',
    'Hinge at the hip, extending the free leg behind you.',
    'Lower the weight toward the floor while keeping your back flat.',
    'Return to standing by squeezing the glute.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '8 each leg',
  duration: '5 min',
  muscleGroups: ['hamstrings', 'glutes', 'core', 'ankle stabilizers'],
  equipment: ['dumbbell (optional)'],
  level: 'intermediate',
  category: 'HOME_LOWER',
  tips: [
    'Start without weight to master the balance.',
    'Your body and back leg should form a T at the bottom.',
    'For tennis: combines posterior chain strength with balance training.'
  ]
};

const homeLateralLunge: Exercise = {
  id: 'home-lower-lateral-lunge',
  name: 'Bodyweight Lateral Lunge',
  description: 'Lateral movement pattern training without equipment. Maintains the adductor and lateral strength between gym days.',
  instructions: [
    'Stand tall with feet together.',
    'Take a large step to the right.',
    'Push hips back and bend right knee, keeping left leg straight.',
    'Push off right foot to return to start.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '10 each side',
  duration: '4 min',
  muscleGroups: ['adductors', 'quadriceps', 'glutes'],
  equipment: ['none'],
  level: 'beginner',
  category: 'HOME_LOWER',
  tips: [
    'Add a dumbbell at chest height for goblet lateral lunge.',
    'For tennis: maintains the lateral movement pattern strength.'
  ]
};

const homeCalfRaises: Exercise = {
  id: 'home-lower-calf-raises',
  name: 'Calf Raises (Home)',
  description: 'Home version using a stair step. Identical benefits to gym version for Achilles health and calf strength.',
  instructions: [
    'Stand on the edge of a stair with heels hanging off.',
    'Hold the railing for balance.',
    'Rise up onto toes as high as possible (2 seconds up).',
    'Lower slowly below the step (3 seconds down).',
    'Complete straight-leg set, then repeat with knees slightly bent.'
  ],
  sets: 3,
  reps: '15 straight + 15 bent',
  duration: '5 min',
  muscleGroups: ['gastrocnemius', 'soleus'],
  equipment: ['stair step'],
  level: 'beginner',
  category: 'HOME_LOWER',
  tips: [
    'The slow lowering phase is the most important part.',
    'Do these daily for Achilles tendon health.',
    'For tennis: critical daily exercise for Achilles prehab.'
  ]
};

const homeSingleLegBalance: Exercise = {
  id: 'home-lower-single-leg-balance',
  name: 'Single-Leg Balance (Home)',
  description: 'Proprioception training that can be done while brushing teeth, waiting for coffee, or any idle moment.',
  instructions: [
    'Stand on one foot with a slight knee bend.',
    'Hold for 30-45 seconds.',
    'Progress: close your eyes.',
    'Progress further: stand on a pillow or cushion.',
    'Advanced: perform mini squats while balancing.',
    'Switch legs.'
  ],
  sets: 3,
  reps: '30-45 sec each leg',
  duration: '4 min',
  muscleGroups: ['ankle stabilizers', 'glutes', 'core'],
  equipment: ['pillow (optional)'],
  level: 'beginner',
  category: 'HOME_LOWER',
  tips: [
    'Do this while brushing teeth -- free training time.',
    'Eyes closed doubles the difficulty.',
    'For tennis: builds the proprioception for stable hitting during movement.'
  ]
};

// ============================================================
// G) HOME UPPER BODY
// ============================================================

const homePushUps: Exercise = {
  id: 'home-upper-push-ups',
  name: 'Push-Ups',
  description: 'Classic upper body pushing exercise. Builds chest, shoulder, and tricep strength for volleys and the serve follow-through.',
  instructions: [
    'Start in a high plank position with hands slightly wider than shoulders.',
    'Lower your chest toward the floor by bending your elbows.',
    'Keep your body in a straight line from head to heels.',
    'Lower until your chest nearly touches the floor.',
    'Push back up to full arm extension.',
    'Modify on knees if needed to maintain form.'
  ],
  sets: 3,
  reps: '10-15',
  duration: '4 min',
  muscleGroups: ['pectoralis', 'deltoids', 'triceps', 'core'],
  equipment: ['none'],
  level: 'beginner',
  category: 'HOME_UPPER',
  tips: [
    'Quality reps with full range of motion beat high numbers.',
    'Hands at different widths target different muscles.',
    'For tennis: builds pushing strength for volleys and net play.'
  ]
};

const homeBandRow: Exercise = {
  id: 'home-upper-band-row',
  name: 'Band Row',
  description: 'Pulling exercise using a resistance band anchored to a door. Strengthens the back muscles that decelerate the arm after strokes.',
  instructions: [
    'Anchor a band to a door handle or sturdy object at chest height.',
    'Hold both ends of the band with arms extended.',
    'Pull the band toward your chest, squeezing shoulder blades together.',
    'Hold for 1 second at full contraction.',
    'Slowly return to start.',
    'Keep elbows close to your body.'
  ],
  sets: 3,
  reps: '15',
  duration: '4 min',
  muscleGroups: ['rhomboids', 'latissimus dorsi', 'biceps', 'rear deltoids'],
  equipment: ['resistance band', 'door anchor'],
  level: 'beginner',
  category: 'HOME_UPPER',
  tips: [
    'Stand farther from anchor to increase resistance.',
    'Pull with your back, not your arms.',
    'For tennis: counterbalances the dominant pushing/pulling pattern in strokes.'
  ]
};

const homeBandExternalRotation: Exercise = {
  id: 'home-upper-band-ext-rotation',
  name: 'Band External Rotation (Home)',
  description: 'Home version of the essential rotator cuff exercise. Can be done with a door anchor or tied to a table leg.',
  instructions: [
    'Anchor a band at elbow height.',
    'Stand sideways with the affected arm closest to the anchor.',
    'Hold band with elbow at 90 degrees, tucked to your side.',
    'Rotate forearm outward away from your body.',
    'Slowly return to start (3 seconds).',
    'Complete all reps, then switch sides.'
  ],
  sets: 3,
  reps: '15 each arm',
  duration: '5 min',
  muscleGroups: ['infraspinatus', 'teres minor', 'rotator cuff'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'HOME_UPPER',
  tips: [
    'This should be done DAILY as shoulder prehab.',
    'Light resistance, high reps.',
    'For tennis: prevents the shoulder problems common in racquet sport players.'
  ]
};

const homeHKDBPress: Exercise = {
  id: 'home-upper-hk-db-press',
  name: 'Half-Kneeling DB Press (Home)',
  description: 'Home version of the half-kneeling overhead press using available dumbbells.',
  instructions: [
    'Kneel on one knee with the other foot forward.',
    'Hold a dumbbell at shoulder height on the back-knee side.',
    'Press overhead while keeping core tight.',
    'Lower with control.',
    'Complete all reps, switch sides.'
  ],
  sets: 3,
  reps: '10 each side',
  duration: '5 min',
  muscleGroups: ['deltoids', 'triceps', 'core'],
  equipment: ['dumbbell'],
  level: 'intermediate',
  category: 'HOME_UPPER',
  tips: [
    'Use whatever dumbbell weight you have at home.',
    'The half-kneeling position is the real value here.',
    'For tennis: maintains overhead strength for serves.'
  ]
};

// ============================================================
// H) HOME CORE
// ============================================================

const homePlank: Exercise = {
  id: 'home-core-plank',
  name: 'Plank (Home)',
  description: 'Home version of the front plank. No equipment needed.',
  instructions: [
    'Forearms on the floor, elbows under shoulders.',
    'Body in a straight line from head to heels.',
    'Engage core, squeeze glutes.',
    'Hold for prescribed time.',
    'Rest and repeat.'
  ],
  sets: 3,
  reps: '30-60 sec',
  duration: '4 min',
  muscleGroups: ['core', 'shoulders'],
  equipment: ['mat (optional)'],
  level: 'beginner',
  category: 'HOME_CORE',
  tips: [
    'Build up time gradually -- form always beats duration.',
    'For tennis: core stability foundation.'
  ]
};

const homePallof: Exercise = {
  id: 'home-core-pallof',
  name: 'Pallof Press (Home)',
  description: 'Home version using a resistance band anchored to a door handle.',
  instructions: [
    'Anchor band to a door handle at chest height.',
    'Stand sideways, holding band at chest.',
    'Press arms out straight, resisting the pull.',
    'Hold 2-3 seconds, return to chest.',
    'Complete all reps, switch sides.'
  ],
  sets: 3,
  reps: '10 each side',
  duration: '4 min',
  muscleGroups: ['obliques', 'transverse abdominis'],
  equipment: ['resistance band', 'door handle'],
  level: 'intermediate',
  category: 'HOME_CORE',
  tips: [
    'This replaces cable Pallof press at home.',
    'For tennis: builds the anti-rotation strength for controlled groundstrokes.'
  ]
};

const homeDeadBug: Exercise = {
  id: 'home-core-dead-bug',
  name: 'Dead Bug (Home)',
  description: 'Core stability exercise that can be done on any floor surface.',
  instructions: [
    'Lie on your back, arms toward ceiling, legs in tabletop.',
    'Press lower back into the floor.',
    'Extend right arm overhead and left leg out simultaneously.',
    'Return to start, switch sides.',
    'Keep lower back pressed down throughout.'
  ],
  sets: 3,
  reps: '8 each side',
  duration: '4 min',
  muscleGroups: ['transverse abdominis', 'rectus abdominis', 'hip flexors'],
  equipment: ['mat (optional)'],
  level: 'beginner',
  category: 'HOME_CORE',
  tips: [
    'The key is keeping your lower back flat on the floor.',
    'Go slowly for maximum benefit.',
    'For tennis: trains independent arm/leg movement with a stable core.'
  ]
};

const homeSidePlank: Exercise = {
  id: 'home-core-side-plank',
  name: 'Side Plank (Home)',
  description: 'Lateral core stability exercise for home training days.',
  instructions: [
    'Lie on your side, forearm on the floor under your shoulder.',
    'Lift hips to create a straight line.',
    'Hold for prescribed time.',
    'Switch sides.'
  ],
  sets: 3,
  reps: '20-30 sec each side',
  duration: '4 min',
  muscleGroups: ['obliques', 'hip abductors'],
  equipment: ['mat (optional)'],
  level: 'beginner',
  category: 'HOME_CORE',
  tips: [
    'Add hip dips for a dynamic variation.',
    'For tennis: lateral stability for open-stance shots.'
  ]
};

// ============================================================
// I) WARMUP
// ============================================================

const warmupLightJog: Exercise = {
  id: 'warmup-light-jog',
  name: 'Light Jog',
  description: 'Gentle cardiovascular warm-up to raise heart rate and body temperature before more intense activity.',
  instructions: [
    'Jog at a comfortable, conversational pace.',
    'Stay relaxed -- shoulders down, arms swinging naturally.',
    'Jog around the court or in a large circle.',
    'Gradually increase pace over the duration.'
  ],
  sets: 1,
  reps: '1',
  duration: '3 min',
  muscleGroups: ['cardiovascular', 'full body'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Should be easy enough to hold a conversation.',
    'The goal is to break a light sweat.'
  ]
};

const warmupHighKnees: Exercise = {
  id: 'warmup-high-knees',
  name: 'High Knees',
  description: 'Dynamic warm-up that activates hip flexors, quads, and cardiovascular system while building coordination.',
  instructions: [
    'Stand tall and jog in place.',
    'Drive your knees up to hip height with each step.',
    'Pump your arms in opposition to your legs.',
    'Stay on the balls of your feet.',
    'Maintain an upright posture.'
  ],
  sets: 2,
  reps: '20 each leg',
  duration: '1 min',
  muscleGroups: ['hip flexors', 'quadriceps', 'calves', 'core'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Focus on height of knees, not speed.',
    'Land softly on the balls of your feet.'
  ]
};

const warmupButtKicks: Exercise = {
  id: 'warmup-butt-kicks',
  name: 'Butt Kicks',
  description: 'Dynamic warm-up targeting the hamstrings and warming up the knee flexion pattern.',
  instructions: [
    'Jog in place or moving forward.',
    'Kick your heels up toward your glutes with each step.',
    'Keep your knees pointing down, not forward.',
    'Pump arms naturally.',
    'Stay on the balls of your feet.'
  ],
  sets: 2,
  reps: '20 each leg',
  duration: '1 min',
  muscleGroups: ['hamstrings', 'calves', 'quadriceps'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Try to touch your glutes with each kick.',
    'Pair with high knees for a complete warm-up.'
  ]
};

const warmupJumpRope: Exercise = {
  id: 'warmup-jump-rope',
  name: 'Jump Rope',
  description: 'Excellent tennis warm-up that activates calves, builds coordination, and warms the wrists for play.',
  instructions: [
    'Hold the rope handles at hip height.',
    'Jump with both feet, landing softly on the balls of your feet.',
    'Keep jumps small (1-2 cm off the ground).',
    'Turn the rope with wrist movement, not arms.',
    'Maintain a slight knee bend throughout.'
  ],
  sets: 1,
  reps: '1',
  duration: '2-3 min',
  muscleGroups: ['calves', 'shoulders', 'wrists', 'core'],
  equipment: ['jump rope'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Great for warming up wrists before playing.',
    'Mix in single-leg jumps and criss-crosses as you get comfortable.',
    'For tennis: warms calves for split steps and wrists for stroke production.'
  ]
};

const warmupBoxShuffles: Exercise = {
  id: 'warmup-box-shuffles',
  name: 'Box Shuffles',
  description: 'Four-direction footwork drill that warms up the lateral, forward, and backward movement patterns used in tennis.',
  instructions: [
    'Imagine a small square on the ground (about 1 meter).',
    'Start at one corner in an athletic stance.',
    'Shuffle right to the next corner.',
    'Shuffle backward to the far corner.',
    'Shuffle left to the next corner.',
    'Shuffle forward to the start.',
    'Reverse direction and repeat.'
  ],
  sets: 2,
  reps: '4 circuits each direction',
  duration: '2 min',
  muscleGroups: ['calves', 'hip abductors', 'quadriceps'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Stay in an athletic stance throughout -- knees bent, weight forward.',
    'Do not cross feet during the shuffle.',
    'For tennis: warms up all the movement directions you will use on court.'
  ]
};

const warmupWalkingLungeRotation: Exercise = {
  id: 'warmup-walking-lunge-rotation',
  name: 'Walking Lunge with Rotation',
  description: 'Dynamic stretch combining a lunge with thoracic rotation. Opens hips and mid-back simultaneously.',
  instructions: [
    'Step forward into a lunge position.',
    'Once in the lunge, rotate your torso toward the front knee.',
    'Reach the arm on the front-knee side toward the ceiling.',
    'Hold for 2 seconds.',
    'Step forward into the next lunge and rotate the other direction.',
    'Continue for prescribed reps.'
  ],
  sets: 1,
  reps: '6 each side',
  duration: '2 min',
  muscleGroups: ['hip flexors', 'thoracic spine', 'quadriceps', 'obliques'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'The rotation should come from your mid-back, not your lower back.',
    'Keep the front knee stable during rotation.',
    'For tennis: opens up the rotational range needed for groundstrokes.'
  ]
};

const warmupTinSoldiers: Exercise = {
  id: 'warmup-tin-soldiers',
  name: 'Tin Soldiers',
  description: 'Dynamic hamstring stretch performed while walking. Warms up the posterior chain for the explosive movements in tennis.',
  instructions: [
    'Walk forward and kick your right leg straight up in front of you.',
    'Reach for your toes with the opposite hand.',
    'Keep your kicking leg as straight as possible.',
    'Lower the leg and step forward.',
    'Repeat with the left leg.',
    'Maintain an upright posture throughout.'
  ],
  sets: 1,
  reps: '8 each leg',
  duration: '2 min',
  muscleGroups: ['hamstrings', 'hip flexors', 'calves'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Do not force the range -- kick as high as comfortable.',
    'The movement should be smooth, not jerky.',
    'For tennis: dynamically stretches the hamstrings before sprinting on court.'
  ]
};

const warmupSumoLunges: Exercise = {
  id: 'warmup-sumo-lunges',
  name: 'Sumo Lunges (Sumo Squat Walk)',
  description: 'Wide-stance walking squat that opens the hips and warms up the groin/adductor muscles for lateral court movement.',
  instructions: [
    'Take a wide stance with toes pointed slightly out.',
    'Lower into a sumo squat position.',
    'Staying low, step one foot toward the other.',
    'Step the other foot wide again.',
    'Walk laterally in this low, wide position.',
    'Reverse direction after several steps.'
  ],
  sets: 1,
  reps: '8 steps each direction',
  duration: '2 min',
  muscleGroups: ['adductors', 'glutes', 'quadriceps', 'hip flexors'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Stay low throughout -- do not stand up between steps.',
    'Feel the stretch in your inner thighs.',
    'For tennis: opens up the hips for wide lunges to reach balls.'
  ]
};

const warmupKneesToChest: Exercise = {
  id: 'warmup-knees-to-chest',
  name: 'Knees-to-Chest Walk',
  description: 'Dynamic hip flexor and glute activation warm-up performed while walking.',
  instructions: [
    'Walk forward, pulling your right knee to your chest with both hands.',
    'Hold for 1-2 seconds, feeling the stretch in your left glute.',
    'Step forward and pull your left knee to your chest.',
    'Rise onto the toes of the standing foot for a calf activation.',
    'Alternate sides as you walk forward.'
  ],
  sets: 1,
  reps: '8 each leg',
  duration: '2 min',
  muscleGroups: ['hip flexors', 'glutes', 'calves'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Pull the knee high into your chest for a deeper stretch.',
    'For tennis: activates glutes and stretches hip flexors before play.'
  ]
};

const warmupArmCircles: Exercise = {
  id: 'warmup-arm-circles',
  name: 'Arm Circles',
  description: 'Dynamic shoulder warm-up that progressively increases range of motion in the shoulder joints.',
  instructions: [
    'Stand with arms extended out to the sides.',
    'Make small forward circles (10 reps).',
    'Gradually increase the circle size.',
    'Make large forward circles (10 reps).',
    'Reverse direction and repeat small to large.'
  ],
  sets: 1,
  reps: '20 each direction',
  duration: '1 min',
  muscleGroups: ['deltoids', 'rotator cuff', 'trapezius'],
  equipment: ['none'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Start small and work up to full range.',
    'For tennis: prepares the shoulders for serving and overhead shots.'
  ]
};

const warmupYTW: Exercise = {
  id: 'warmup-ytw-activation',
  name: 'YTW Activation',
  description: 'Standing version of YTW raises to activate the scapular stabilizers before tennis play.',
  instructions: [
    'Stand with a slight forward lean at the hips.',
    'Y: Raise arms forward and up at 45 degrees, thumbs up. 8 reps.',
    'T: Raise arms directly out to sides, thumbs up. 8 reps.',
    'W: Bend elbows, squeeze shoulder blades back. 8 reps.',
    'Use no weight or very light dumbbells (0.5-1 kg).'
  ],
  sets: 1,
  reps: '8 each position',
  duration: '2 min',
  muscleGroups: ['lower trapezius', 'rotator cuff', 'rhomboids'],
  equipment: ['none or light dumbbells'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'This is activation, not strengthening -- keep it light.',
    'For tennis: primes the shoulder stabilizers before serving.'
  ]
};

const warmupShadowStrokes: Exercise = {
  id: 'warmup-shadow-strokes',
  name: 'Shadow Strokes',
  description: 'Simulating tennis strokes without a ball to groove technique, warm up the specific movement patterns, and mentally prepare.',
  instructions: [
    'Hold your racquet (or simulate holding one).',
    'Perform 10 forehand swings with proper footwork and follow-through.',
    'Perform 10 backhand swings with coil and extension.',
    'Perform 10 volleys with split step and punch.',
    'Perform 5 serve motions (slow and controlled).',
    'Focus on perfect technique, not speed.'
  ],
  sets: 1,
  reps: '10 each stroke',
  duration: '3 min',
  muscleGroups: ['full body', 'sport-specific'],
  equipment: ['racquet (optional)'],
  level: 'beginner',
  category: 'WARMUP',
  tips: [
    'Slow motion practice is surprisingly effective for technique.',
    'Visualize the ball as you swing.',
    'For tennis: warms up the exact movement patterns you will use.'
  ]
};

// ============================================================
// J) PREHAB SHOULDER
// ============================================================

const prehabShoulderExtRotation: Exercise = {
  id: 'prehab-shoulder-ext-rotation',
  name: 'Band External Rotation (Prehab)',
  description: 'Daily shoulder prehab protocol targeting the external rotators that protect the shoulder during serving.',
  instructions: [
    'Anchor a light band at elbow height.',
    'Stand sideways, arm closest to anchor.',
    'Elbow at 90 degrees, pinned to your side.',
    'Rotate forearm outward.',
    'Hold 2 seconds at end range.',
    'Return slowly (3 seconds).',
    'Complete set, switch sides.'
  ],
  sets: 2,
  reps: '15 each arm',
  duration: '4 min',
  muscleGroups: ['infraspinatus', 'teres minor'],
  equipment: ['light resistance band'],
  level: 'beginner',
  category: 'PREHAB_SHOULDER',
  tips: [
    'This is a DAILY exercise -- non-negotiable for tennis players.',
    'Light band, high reps, perfect form.',
    'For tennis: protects the shoulder from the demands of serving 100+ times per match.'
  ]
};

const prehabShoulderIntRotation: Exercise = {
  id: 'prehab-shoulder-int-rotation',
  name: 'Band Internal Rotation (Prehab)',
  description: 'Internal rotation prehab to maintain balance in the rotator cuff.',
  instructions: [
    'Anchor band at elbow height.',
    'Stand sideways, arm farthest from anchor.',
    'Elbow at 90 degrees, pinned to side.',
    'Rotate forearm inward across body.',
    'Return slowly.',
    'Switch sides.'
  ],
  sets: 2,
  reps: '15 each arm',
  duration: '3 min',
  muscleGroups: ['subscapularis', 'pectoralis minor'],
  equipment: ['light resistance band'],
  level: 'beginner',
  category: 'PREHAB_SHOULDER',
  tips: [
    'Pair with external rotation for balanced shoulder prehab.',
    'For tennis: maintains the internal rotation strength for serves.'
  ]
};

const prehabShoulderPullAparts: Exercise = {
  id: 'prehab-shoulder-pull-aparts',
  name: 'Band Pull-Aparts (Prehab)',
  description: 'Scapular retraction exercise for posterior shoulder health.',
  instructions: [
    'Hold a band at shoulder height with arms extended.',
    'Pull the band apart by squeezing shoulder blades.',
    'Hold 1-2 seconds at full retraction.',
    'Return slowly.',
    'Keep arms at shoulder height.'
  ],
  sets: 2,
  reps: '15',
  duration: '3 min',
  muscleGroups: ['rhomboids', 'rear deltoids', 'middle trapezius'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'PREHAB_SHOULDER',
  tips: [
    'Feel the squeeze between your shoulder blades.',
    'For tennis: counteracts the forward-shoulder posture from desk work and tennis.'
  ]
};

const prehabShoulderYTW: Exercise = {
  id: 'prehab-shoulder-ytw-prone',
  name: 'YTW Prone Raises (Prehab)',
  description: 'Prone position YTW raises for maximal scapular stabilizer activation under gravity.',
  instructions: [
    'Lie face down on a bench, bed, or the floor.',
    'Arms hanging down (if on bench) or extended on floor.',
    'Y: Raise arms at 45 degrees, thumbs up. 10 reps.',
    'T: Raise arms directly out to sides, thumbs up. 10 reps.',
    'W: Elbows bent, squeeze shoulder blades back. 10 reps.',
    'Hold each rep for 2 seconds at the top.'
  ],
  sets: 2,
  reps: '10 each position',
  duration: '5 min',
  muscleGroups: ['lower trapezius', 'rotator cuff', 'rhomboids'],
  equipment: ['bench or floor', 'light weights (optional)'],
  level: 'beginner',
  category: 'PREHAB_SHOULDER',
  tips: [
    'No weight needed -- gravity provides sufficient resistance.',
    'For tennis: builds the scapular control needed for pain-free serving.'
  ]
};

const prehabShoulderScapWallSlides: Exercise = {
  id: 'prehab-shoulder-scap-wall-slides',
  name: 'Scapular Wall Slides (Prehab)',
  description: 'Wall slides to improve overhead shoulder mobility and scapular control.',
  instructions: [
    'Stand with back flat against a wall.',
    'Press head, upper back, lower back, elbows, and wrists into the wall.',
    'Start in a goalpost position (elbows at 90 degrees).',
    'Slowly slide arms up the wall.',
    'Go only as high as you can maintain contact.',
    'Slide back down to goalpost position.'
  ],
  sets: 2,
  reps: '10',
  duration: '3 min',
  muscleGroups: ['serratus anterior', 'lower trapezius'],
  equipment: ['wall'],
  level: 'beginner',
  category: 'PREHAB_SHOULDER',
  tips: [
    'If you cannot maintain wall contact, that reveals your restriction.',
    'Progress is measured by how high you can go while maintaining contact.',
    'For tennis: improves the overhead mobility for a more fluid serve.'
  ]
};

// ============================================================
// K) PREHAB ELBOW
// ============================================================

const prehabElbowTylerTwist: Exercise = {
  id: 'prehab-elbow-tyler-twist',
  name: 'Tyler Twist FlexBar Protocol (Prehab)',
  description: 'Evidence-based eccentric exercise for treating and preventing tennis elbow using a TheraBand FlexBar.',
  instructions: [
    'Hold FlexBar in affected hand with wrist extended.',
    'Grip top with unaffected hand.',
    'Twist the bar with the unaffected hand.',
    'Bring both hands in front, arms extended.',
    'Slowly release the twist using only the affected hand (3-5 seconds).',
    'This eccentric release is the therapeutic phase.',
    'Repeat for prescribed reps, 2x daily.'
  ],
  sets: 3,
  reps: '15',
  duration: '5 min',
  muscleGroups: ['wrist extensors', 'forearm'],
  equipment: ['TheraBand FlexBar'],
  level: 'beginner',
  category: 'PREHAB_ELBOW',
  tips: [
    'Start with the red (light) FlexBar.',
    'Progress to green when 3x15 is easy and pain-free.',
    'Mild discomfort (3/10 pain) is acceptable during the exercise.',
    'For tennis: the gold-standard protocol for tennis elbow prevention and treatment.'
  ],
  videoUrl: 'https://www.youtube.com/watch?v=gsKGbqA9aNo'
};

const prehabElbowWristExtensions: Exercise = {
  id: 'prehab-elbow-wrist-ext',
  name: 'Wrist Extensions (Prehab)',
  description: 'Eccentric wrist extension exercise that strengthens the tendons most affected by tennis elbow.',
  instructions: [
    'Rest forearm on thigh or table, palm down, wrist over edge.',
    'Hold a very light dumbbell (0.5-2 kg).',
    'Use the other hand to help lift the weight up (concentric assist).',
    'Slowly lower the weight (eccentric phase) over 5 seconds.',
    'The slow lowering is the therapeutic part.',
    'Repeat for prescribed reps.'
  ],
  sets: 3,
  reps: '15',
  duration: '4 min',
  muscleGroups: ['wrist extensors'],
  equipment: ['light dumbbell (0.5-2 kg)'],
  level: 'beginner',
  category: 'PREHAB_ELBOW',
  tips: [
    'The eccentric (lowering) phase is what heals the tendon.',
    'Very light weight -- the slowness provides the stimulus.',
    'For tennis: critical for players who hit a lot of backhands.'
  ]
};

const prehabElbowWristFlexion: Exercise = {
  id: 'prehab-elbow-wrist-flexion',
  name: 'Wrist Flexion Curls (Prehab)',
  description: 'Wrist flexor strengthening to balance the forearm and protect the medial elbow.',
  instructions: [
    'Rest forearm on thigh, palm up, wrist over edge.',
    'Hold a light dumbbell.',
    'Curl the wrist upward.',
    'Lower slowly over 3 seconds.',
    'Complete prescribed reps.',
    'Switch arms.'
  ],
  sets: 3,
  reps: '15',
  duration: '3 min',
  muscleGroups: ['wrist flexors'],
  equipment: ['light dumbbell'],
  level: 'beginner',
  category: 'PREHAB_ELBOW',
  tips: [
    'Balances the extensors for overall forearm health.',
    'For tennis: supports grip strength and forearm endurance.'
  ]
};

// ============================================================
// L) PREHAB KNEE
// ============================================================

const prehabKneeWallSit: Exercise = {
  id: 'prehab-knee-wall-sit',
  name: 'Wall Sit (Prehab)',
  description: 'Isometric quad exercise that strengthens the VMO (inner quad) for knee stability without dynamic stress on the joint.',
  instructions: [
    'Stand with your back against a wall.',
    'Slide down until thighs are parallel to the floor (or as low as comfortable).',
    'Keep knees at 90 degrees, directly over ankles.',
    'Press your lower back into the wall.',
    'Hold for prescribed time.',
    'Stand up slowly to finish.'
  ],
  sets: 3,
  reps: '30-45 sec',
  duration: '4 min',
  muscleGroups: ['quadriceps', 'VMO', 'glutes'],
  equipment: ['wall'],
  level: 'beginner',
  category: 'PREHAB_KNEE',
  tips: [
    'If 90 degrees is too much, start with a higher position.',
    'Place a ball between your knees and squeeze for VMO activation.',
    'For tennis: builds the quad strength for stable, low-stance play.'
  ]
};

const prehabKneeSingleLegBalance: Exercise = {
  id: 'prehab-knee-single-leg-balance',
  name: 'Single-Leg Balance (Knee Prehab)',
  description: 'Balance exercise focused on knee stability and proprioception. Reduces ACL injury risk.',
  instructions: [
    'Stand on one foot with a slight knee bend.',
    'Keep your knee tracking over your second toe.',
    'Hold for 30-45 seconds.',
    'Progress to eyes closed.',
    'Progress to unstable surface.',
    'Switch legs.'
  ],
  sets: 3,
  reps: '30-45 sec each leg',
  duration: '4 min',
  muscleGroups: ['ankle stabilizers', 'VMO', 'hip stabilizers'],
  equipment: ['balance pad (optional)'],
  level: 'beginner',
  category: 'PREHAB_KNEE',
  tips: [
    'Focus on keeping the knee stable -- no wobbling.',
    'For tennis: builds the proprioception for safe direction changes.'
  ]
};

const prehabKneeStepDowns: Exercise = {
  id: 'prehab-knee-step-downs',
  name: 'Step-Downs',
  description: 'Controlled eccentric quad exercise that builds the deceleration strength needed to protect knees during tennis movement.',
  instructions: [
    'Stand on a low step (10-15 cm) on one foot.',
    'Slowly lower the other foot toward the floor by bending the standing knee.',
    'Tap the floor lightly with the lowering foot.',
    'Drive back up using the standing leg.',
    'Keep your knee tracking straight -- no inward collapse.',
    'Complete all reps on one leg, then switch.'
  ],
  sets: 3,
  reps: '10 each leg',
  duration: '4 min',
  muscleGroups: ['quadriceps', 'VMO', 'hip stabilizers'],
  equipment: ['low step (10-15 cm)'],
  level: 'intermediate',
  category: 'PREHAB_KNEE',
  tips: [
    'The slow lowering is the important part.',
    'Keep hips level -- do not drop the non-working hip.',
    'For tennis: builds eccentric quad strength for safe deceleration.'
  ]
};

const prehabKneeTKE: Exercise = {
  id: 'prehab-knee-tke',
  name: 'Terminal Knee Extension (TKE)',
  description: 'Band-assisted exercise that specifically targets the VMO in the last 30 degrees of knee extension. Crucial for knee tracking.',
  instructions: [
    'Loop a band behind your knee, anchored to something sturdy.',
    'Stand facing the anchor point.',
    'Start with the banded knee slightly bent (about 30 degrees).',
    'Squeeze your quad to fully straighten the knee against the band resistance.',
    'Hold for 2 seconds at full extension.',
    'Slowly release back to the slightly bent position.'
  ],
  sets: 3,
  reps: '15 each leg',
  duration: '5 min',
  muscleGroups: ['VMO', 'quadriceps'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'PREHAB_KNEE',
  tips: [
    'Focus on a strong squeeze at full extension.',
    'The VMO fires most in the last degrees of extension.',
    'For tennis: targets the exact muscle that keeps the kneecap tracking correctly.'
  ]
};

const prehabKneeClamshells: Exercise = {
  id: 'prehab-knee-clamshells',
  name: 'Clamshells',
  description: 'Hip external rotation exercise that strengthens the glute medius. Weak glute medius causes knee valgus (inward collapse) during movement.',
  instructions: [
    'Lie on your side with knees bent to 45 degrees, feet together.',
    'Keep your feet touching as you lift your top knee upward.',
    'Open like a clamshell, rotating at the hip.',
    'Hold for 2 seconds at the top.',
    'Lower with control.',
    'Complete all reps, switch sides.',
    'Add a band around the knees for more resistance.'
  ],
  sets: 3,
  reps: '15 each side',
  duration: '5 min',
  muscleGroups: ['gluteus medius', 'hip external rotators'],
  equipment: ['mat', 'mini band (optional)'],
  level: 'beginner',
  category: 'PREHAB_KNEE',
  tips: [
    'Do not roll your hips backward -- the rotation is purely at the hip joint.',
    'A mini band above the knees increases difficulty significantly.',
    'For tennis: prevents knee valgus during lunges and direction changes.'
  ]
};

// ============================================================
// M) PREHAB CALF
// ============================================================

const prehabCalfEccentricStraight: Exercise = {
  id: 'prehab-calf-eccentric-straight',
  name: 'Alfredson Eccentric Heel Drop (Straight Leg)',
  description: 'The gold-standard Achilles tendon rehabilitation protocol. Eccentric calf loading on a straight leg targets the gastrocnemius and upper Achilles.',
  instructions: [
    'Stand on the edge of a step on both feet.',
    'Rise up onto toes using both feet.',
    'Shift weight to the affected leg only.',
    'Slowly lower the heel below the step over 5 seconds.',
    'Use the other leg to help push back up (only the lowering is on one leg).',
    'Repeat for prescribed reps.',
    'Perform 2x daily as per Alfredson protocol.'
  ],
  sets: 3,
  reps: '15',
  duration: '5 min',
  muscleGroups: ['gastrocnemius', 'achilles tendon'],
  equipment: ['step or platform'],
  level: 'beginner',
  category: 'PREHAB_CALF',
  tips: [
    'The SLOW lowering (eccentric) phase is the therapeutic element.',
    'Mild discomfort is acceptable; sharp pain means stop.',
    'Both the straight-leg and bent-knee versions should be done.',
    'For tennis: essential Achilles tendon maintenance for court players over 40.'
  ]
};

const prehabCalfEccentricBent: Exercise = {
  id: 'prehab-calf-eccentric-bent',
  name: 'Alfredson Eccentric Heel Drop (Bent Knee)',
  description: 'Bent-knee version of the Alfredson protocol that targets the soleus and lower Achilles tendon.',
  instructions: [
    'Stand on the edge of a step on both feet.',
    'Bend your knees to about 20-30 degrees.',
    'Rise up onto toes using both feet.',
    'Shift weight to the affected leg.',
    'Slowly lower the heel below the step over 5 seconds, keeping knee bent.',
    'Use the other leg to help push back up.',
    'Repeat for prescribed reps.'
  ],
  sets: 3,
  reps: '15',
  duration: '5 min',
  muscleGroups: ['soleus', 'achilles tendon (lower insertion)'],
  equipment: ['step or platform'],
  level: 'beginner',
  category: 'PREHAB_CALF',
  tips: [
    'The bent knee shifts load to the soleus and lower Achilles.',
    'Both straight and bent versions should be done in each session.',
    'This is a daily protocol -- consistency is key.',
    'For tennis: targets the lower Achilles which is under highest stress during split steps.'
  ]
};

// ============================================================
// N) FOOTWORK
// ============================================================

const footworkShadowSplitStep: Exercise = {
  id: 'footwork-shadow-split-step',
  name: 'Shadow Split Steps',
  description: 'Practice the foundational split-step timing without a ball. The split step is the single most important footwork element in tennis.',
  instructions: [
    'Stand in ready position at the baseline.',
    'Perform a small hop (split step) landing on the balls of both feet.',
    'Time it as if an opponent is about to hit.',
    'From the split, push off in a random direction (left, right, forward).',
    'Recover to ready position.',
    'Repeat continuously for prescribed time.'
  ],
  sets: 3,
  reps: '30 sec continuous',
  duration: '4 min',
  muscleGroups: ['calves', 'quadriceps', 'core'],
  equipment: ['none'],
  level: 'beginner',
  category: 'FOOTWORK',
  tips: [
    'The split step is a small hop, not a big jump.',
    'Land on the balls of your feet, ready to push off.',
    'Time the landing to coincide with the opponent hitting the ball.',
    'For tennis: the foundation of all good movement on court.'
  ]
};

const footworkJumpRopeSplitStep: Exercise = {
  id: 'footwork-jump-rope-split-step',
  name: 'Jump Rope Split Step Drill',
  description: 'Combines jump rope rhythm with split step practice. Builds the calf endurance and timing for continuous split stepping during rallies.',
  instructions: [
    'Jump rope at a moderate pace for 10 jumps.',
    'On the 10th jump, perform a split step (wider landing, athletic stance).',
    'Immediately push off in a direction (simulate shot).',
    'Return to jumping.',
    'Repeat the pattern.',
    'Vary the direction of the push-off each time.'
  ],
  sets: 3,
  reps: '2 min continuous',
  duration: '8 min',
  muscleGroups: ['calves', 'ankles', 'core', 'coordination'],
  equipment: ['jump rope'],
  level: 'intermediate',
  category: 'FOOTWORK',
  tips: [
    'The split step should feel natural after jumping.',
    'Focus on a quick, reactive push-off from the split step.',
    'For tennis: builds the endurance to split step consistently throughout a match.'
  ]
};

const footwork3by3: Exercise = {
  id: 'footwork-3by3',
  name: '3-by-3 Drill',
  description: 'Structured footwork drill moving three steps in each direction. Builds the recovery pattern for baseline rallies.',
  instructions: [
    'Start in the center of the baseline in ready position.',
    'Shuffle 3 steps to the right (as if hitting a forehand).',
    'Shadow a forehand stroke.',
    'Shuffle 3 steps back to center.',
    'Shuffle 3 steps to the left (as if hitting a backhand).',
    'Shadow a backhand stroke.',
    'Shuffle 3 steps back to center.',
    'Continue for prescribed time.'
  ],
  sets: 3,
  reps: '45 sec continuous',
  duration: '5 min',
  muscleGroups: ['quadriceps', 'calves', 'hip abductors', 'core'],
  equipment: ['none', 'racquet (optional)'],
  level: 'beginner',
  category: 'FOOTWORK',
  tips: [
    'Split step at center before each direction change.',
    'Stay low in athletic stance throughout.',
    'For tennis: grooves the baseline recovery pattern.'
  ]
};

const footworkReactionSplitStep: Exercise = {
  id: 'footwork-reaction-split',
  name: 'Reaction Split Step Drill',
  description: 'Partner or audio-cued drill that practices reacting from a split step to visual or verbal cues.',
  instructions: [
    'Stand in ready position, bouncing lightly on your toes.',
    'A partner points left, right, or forward (or calls out directions).',
    'Perform a split step, then explode in the indicated direction.',
    'Take 2-3 steps and shadow a stroke.',
    'Recover to center with efficient footwork.',
    'Ready for the next call immediately.'
  ],
  sets: 3,
  reps: '10 reactions',
  duration: '5 min',
  muscleGroups: ['calves', 'quadriceps', 'hip rotators', 'core'],
  equipment: ['none'],
  level: 'intermediate',
  category: 'FOOTWORK',
  tips: [
    'React to the cue, do not anticipate.',
    'Quality of the split step matters more than speed of the sprint.',
    'For tennis: trains the reaction time from split step to first step.'
  ]
};

const footworkSideShuffle: Exercise = {
  id: 'footwork-side-shuffle',
  name: 'Side Shuffle',
  description: 'The primary lateral movement pattern in tennis. Practice maintaining low, athletic position while shuffling.',
  instructions: [
    'Start in an athletic stance, knees bent, weight on balls of feet.',
    'Push off the trailing foot to shuffle laterally.',
    'Do NOT cross your feet.',
    'Stay low throughout the shuffle.',
    'Shuffle 5-6 meters to one side.',
    'Immediately shuffle back to the starting position.',
    'Repeat continuously.'
  ],
  sets: 3,
  reps: '30 sec continuous',
  duration: '4 min',
  muscleGroups: ['quadriceps', 'hip abductors', 'calves', 'glutes'],
  equipment: ['none'],
  level: 'beginner',
  category: 'FOOTWORK',
  tips: [
    'Feet should never come closer than hip-width apart.',
    'Stay in a low, athletic stance -- do not stand up between shuffles.',
    'For tennis: the bread-and-butter movement for baseline rallies.'
  ]
};

const footworkCrossoverSprint: Exercise = {
  id: 'footwork-crossover-sprint',
  name: 'Crossover Step to Sprint',
  description: 'Trains the crossover-to-sprint transition used for wide balls. The crossover step is faster than shuffling for longer distances.',
  instructions: [
    'Start in ready position at center of baseline.',
    'Perform a split step.',
    'Cross the far foot over the near foot (crossover step).',
    'Immediately transition into a sprint to the sideline.',
    'Shadow a wide stroke.',
    'Recover to center.',
    'Alternate sides.'
  ],
  sets: 3,
  reps: '6 each side',
  duration: '5 min',
  muscleGroups: ['hip rotators', 'quadriceps', 'calves', 'glutes'],
  equipment: ['none'],
  level: 'intermediate',
  category: 'FOOTWORK',
  tips: [
    'The crossover step turns your hips toward the ball.',
    'Sprint on the outside foot, then set up for the stroke.',
    'For tennis: essential for reaching wide balls that are beyond shuffle range.'
  ]
};

const footworkCarioca: Exercise = {
  id: 'footwork-carioca',
  name: 'Carioca (Grapevine)',
  description: 'Lateral movement pattern alternating cross-front and cross-behind steps. Develops hip mobility and coordination for court movement.',
  instructions: [
    'Start moving laterally to the right.',
    'Cross your left foot behind your right.',
    'Step right foot to the right.',
    'Cross your left foot in front of your right.',
    'Step right foot to the right.',
    'Continue this alternating cross-behind, cross-in-front pattern.',
    'Reverse direction after 10-15 meters.'
  ],
  sets: 3,
  reps: '2 lengths each direction',
  duration: '4 min',
  muscleGroups: ['hip rotators', 'core', 'calves', 'adductors'],
  equipment: ['none'],
  level: 'intermediate',
  category: 'FOOTWORK',
  tips: [
    'Keep your upper body facing forward while hips rotate.',
    'Start slow and increase speed as coordination improves.',
    'For tennis: builds the hip rotation and coordination for recovery steps.'
  ]
};

const footworkHitAndRecover: Exercise = {
  id: 'footwork-hit-and-recover',
  name: 'Hit-and-Recover Drill',
  description: 'Practices the full cycle of movement: ready position, move to ball, hit, recover to center. The fundamental pattern of baseline play.',
  instructions: [
    'Start at center baseline in ready position.',
    'Split step.',
    'Move to the right (3-4 steps) and shadow a forehand.',
    'Immediately recover to center with side shuffles.',
    'Split step at center.',
    'Move to the left (3-4 steps) and shadow a backhand.',
    'Recover to center.',
    'Continue for prescribed time.'
  ],
  sets: 3,
  reps: '45 sec continuous',
  duration: '5 min',
  muscleGroups: ['full body', 'calves', 'quadriceps', 'core'],
  equipment: ['racquet (optional)'],
  level: 'intermediate',
  category: 'FOOTWORK',
  tips: [
    'The recovery to center is just as important as the movement to the ball.',
    'Split step at center every time -- this is the reset.',
    'For tennis: grooves the fundamental rally movement pattern.'
  ]
};

const footworkForwardBackward: Exercise = {
  id: 'footwork-forward-backward',
  name: 'Forward-Backward Transitions',
  description: 'Trains the forward movement for short balls and backward recovery. Critical for transitioning between defense and offense.',
  instructions: [
    'Start at the baseline in ready position.',
    'Sprint forward to the service line (simulating a short ball).',
    'Shadow a shot (approach shot or volley).',
    'Backpedal quickly to the baseline.',
    'Split step at the baseline.',
    'Sprint forward again.',
    'Continue for prescribed time.'
  ],
  sets: 3,
  reps: '30 sec continuous',
  duration: '4 min',
  muscleGroups: ['quadriceps', 'calves', 'hamstrings', 'core'],
  equipment: ['none'],
  level: 'intermediate',
  category: 'FOOTWORK',
  tips: [
    'Sprint forward explosively, backpedal with control.',
    'Stay on the balls of your feet during the backpedal.',
    'For tennis: trains the transition from baseline to net and back.'
  ]
};

const footworkApproachAndClose: Exercise = {
  id: 'footwork-approach-and-close',
  name: 'Approach and Close',
  description: 'Full approach-shot-to-volley footwork sequence. Includes the split step at the service line before the volley.',
  instructions: [
    'Start at the baseline.',
    'Sprint forward diagonally (simulating an approach shot).',
    'Shadow an approach shot at about 3/4 court.',
    'Continue forward and split step at the service line.',
    'Move forward to shadow a volley.',
    'Split step again.',
    'Shadow a closing volley at the net.',
    'Recovery jog back to baseline.'
  ],
  sets: 3,
  reps: '6 repetitions',
  duration: '5 min',
  muscleGroups: ['full body', 'calves', 'quadriceps'],
  equipment: ['racquet (optional)'],
  level: 'intermediate',
  category: 'FOOTWORK',
  tips: [
    'The split step at the service line is crucial -- it resets your movement for the volley.',
    'Move through the ball on the approach, do not stop.',
    'For tennis: the complete footwork sequence for approaching the net.'
  ]
};

// ============================================================
// O) MICRO_A - Lower Body / Balance
// ============================================================

const microACalfRaises: Exercise = {
  id: 'micro-a-calf-raises',
  name: 'Micro: Calf Raises',
  description: 'Quick calf raises that can be done at your standing desk, in the kitchen, or while waiting. Keeps calves activated throughout the work-from-home day.',
  instructions: [
    'Stand near a desk or counter for balance.',
    'Rise up onto your toes.',
    'Hold for 2 seconds at the top.',
    'Lower slowly.',
    'Repeat for 15-20 reps.'
  ],
  sets: 1,
  reps: '15-20',
  duration: '2 min',
  muscleGroups: ['calves'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_A',
  tips: [
    'Do these every time you go to the kitchen.',
    'Can do while on a phone call.'
  ]
};

const microAWallSit: Exercise = {
  id: 'micro-a-wall-sit',
  name: 'Micro: Wall Sit',
  description: 'Quick isometric quad exercise during work breaks.',
  instructions: [
    'Find a wall.',
    'Slide down to a seated position (thighs parallel to floor).',
    'Hold for 30-45 seconds.',
    'Stand up and shake out legs.'
  ],
  sets: 1,
  reps: '30-45 sec',
  duration: '1 min',
  muscleGroups: ['quadriceps', 'glutes'],
  equipment: ['wall'],
  level: 'beginner',
  category: 'MICRO_A',
  tips: [
    'Great break between meetings.',
    'Challenge: hold for the length of a song.'
  ]
};

const microASingleLeg: Exercise = {
  id: 'micro-a-single-leg',
  name: 'Micro: Single-Leg Balance',
  description: 'Stand on one leg while working at a standing desk or during any idle moment.',
  instructions: [
    'Stand on one foot.',
    'Maintain balance for 30 seconds.',
    'Switch legs.',
    'For added challenge, close your eyes.'
  ],
  sets: 1,
  reps: '30 sec each leg',
  duration: '2 min',
  muscleGroups: ['ankle stabilizers', 'core'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_A',
  tips: [
    'Do while brushing teeth or waiting for coffee.',
    'Eyes closed is the progression.'
  ]
};

const microABWSquat: Exercise = {
  id: 'micro-a-bw-squat',
  name: 'Micro: Bodyweight Squats',
  description: 'Quick set of bodyweight squats to keep legs active during the work day.',
  instructions: [
    'Stand up from your desk.',
    'Perform 15-20 bodyweight squats.',
    'Keep chest up, push hips back.',
    'Full depth if comfortable.'
  ],
  sets: 1,
  reps: '15-20',
  duration: '2 min',
  muscleGroups: ['quadriceps', 'glutes'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_A',
  tips: [
    'Set a timer to do these every 90 minutes.',
    'Counteracts the effects of prolonged sitting.'
  ]
};

const microABentKneeCalf: Exercise = {
  id: 'micro-a-bent-knee-calf',
  name: 'Micro: Bent-Knee Calf Raises',
  description: 'Bent-knee calf raises targeting the soleus during a micro-break.',
  instructions: [
    'Stand near desk for balance.',
    'Bend knees to about 20 degrees.',
    'Rise up onto toes.',
    'Hold 2 seconds.',
    'Lower slowly.',
    'Repeat 15-20 times.'
  ],
  sets: 1,
  reps: '15-20',
  duration: '2 min',
  muscleGroups: ['soleus'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_A',
  tips: [
    'Pair with straight-leg version for complete calf work.',
    'The soleus is heavily used in the tennis ready position.'
  ]
};

// ============================================================
// P) MICRO_B - Shoulder / Cuff
// ============================================================

const microBShoulderRolls: Exercise = {
  id: 'micro-b-shoulder-rolls',
  name: 'Micro: Shoulder Rolls',
  description: 'Simple shoulder mobility exercise to counteract desk posture.',
  instructions: [
    'Sit or stand tall.',
    'Roll shoulders forward in circles 10 times.',
    'Reverse and roll backward 10 times.',
    'Make the circles as big as comfortable.'
  ],
  sets: 1,
  reps: '10 each direction',
  duration: '1 min',
  muscleGroups: ['trapezius', 'deltoids'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_B',
  tips: [
    'Emphasize the backward rolls to counteract forward desk posture.',
    'Do every hour at the desk.'
  ]
};

const microBArmCircles: Exercise = {
  id: 'micro-b-arm-circles',
  name: 'Micro: Arm Circles',
  description: 'Quick shoulder warm-up and mobility exercise at the desk.',
  instructions: [
    'Extend arms out to the sides.',
    'Make small circles forward for 10 reps.',
    'Increase to medium circles for 10 reps.',
    'Reverse direction for 20 reps total.'
  ],
  sets: 1,
  reps: '20 each direction',
  duration: '1 min',
  muscleGroups: ['deltoids', 'rotator cuff'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_B',
  tips: [
    'Stand up for this one -- gives your legs a break too.',
    'Good shoulder warm-up before an impromptu hitting session.'
  ]
};

const microBDoorframeStretch: Exercise = {
  id: 'micro-b-doorframe-stretch',
  name: 'Micro: Doorframe Chest Stretch',
  description: 'Opens the chest and front shoulders, counteracting the hunched desk posture that tightens the pectorals.',
  instructions: [
    'Stand in a doorframe.',
    'Place forearms on each side of the frame at shoulder height.',
    'Lean forward through the doorway until you feel a stretch in your chest.',
    'Hold for 20-30 seconds.',
    'Adjust arm height for different fiber angles.'
  ],
  sets: 1,
  reps: '2-3 holds of 20-30 sec',
  duration: '2 min',
  muscleGroups: ['pectoralis', 'anterior deltoids'],
  equipment: ['doorframe'],
  level: 'beginner',
  category: 'MICRO_B',
  tips: [
    'Arms higher = stretches lower pec fibers.',
    'Arms lower = stretches upper pec fibers.',
    'Essential for anyone who sits at a desk.'
  ]
};

const microBBandExtRotation: Exercise = {
  id: 'micro-b-band-ext-rotation',
  name: 'Micro: Band External Rotation',
  description: 'Quick rotator cuff activation at the desk using a light band kept in your desk drawer.',
  instructions: [
    'Keep a light band at your desk.',
    'Hold with elbow at 90 degrees at your side.',
    'Rotate forearm outward.',
    'Slowly return.',
    '15 reps each arm.'
  ],
  sets: 1,
  reps: '15 each arm',
  duration: '2 min',
  muscleGroups: ['rotator cuff'],
  equipment: ['light resistance band'],
  level: 'beginner',
  category: 'MICRO_B',
  tips: [
    'Keep a band in your desk for easy access.',
    'Two minutes that protect your shoulder for years.'
  ]
};

const microBBandPullAparts: Exercise = {
  id: 'micro-b-band-pull-aparts',
  name: 'Micro: Band Pull-Aparts',
  description: 'Quick posterior shoulder activation at the desk.',
  instructions: [
    'Hold band at shoulder height, arms extended.',
    'Pull apart by squeezing shoulder blades.',
    'Hold 1 second.',
    'Return slowly.',
    '15 reps.'
  ],
  sets: 1,
  reps: '15',
  duration: '1 min',
  muscleGroups: ['rear deltoids', 'rhomboids'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'MICRO_B',
  tips: [
    'Pairs well with the doorframe stretch.',
    'Stretch the front, strengthen the back.'
  ]
};

// ============================================================
// Q) MICRO_C - Wrist / Forearm
// ============================================================

const microCWristCircles: Exercise = {
  id: 'micro-c-wrist-circles',
  name: 'Micro: Wrist Circles',
  description: 'Simple wrist mobility exercise to counteract keyboard and mouse use.',
  instructions: [
    'Extend arms in front of you.',
    'Make circles with your wrists clockwise 10 times.',
    'Reverse to counterclockwise 10 times.',
    'Make fists, then spread fingers wide between sets.'
  ],
  sets: 1,
  reps: '10 each direction',
  duration: '1 min',
  muscleGroups: ['wrist flexors', 'wrist extensors'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_C',
  tips: [
    'Do every hour when doing heavy keyboard work.',
    'Helps prevent RSI from both desk work and tennis.'
  ]
};

const microCWristStretches: Exercise = {
  id: 'micro-c-wrist-stretches',
  name: 'Micro: Wrist Stretches',
  description: 'Extension and flexion stretches for the wrist and forearm.',
  instructions: [
    'Extend your arm straight in front, palm up.',
    'Use the other hand to pull fingers downward (flexor stretch). Hold 15 sec.',
    'Flip to palm down.',
    'Pull fingers toward you (extensor stretch). Hold 15 sec.',
    'Repeat on the other arm.'
  ],
  sets: 1,
  reps: '15 sec each stretch, each arm',
  duration: '2 min',
  muscleGroups: ['wrist flexors', 'wrist extensors', 'forearm'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_C',
  tips: [
    'Gentle stretch -- no pain.',
    'Critical for tennis elbow prevention.'
  ]
};

const microCTennisBallSqueeze: Exercise = {
  id: 'micro-c-tennis-ball-squeeze',
  name: 'Micro: Tennis Ball Squeeze',
  description: 'Grip strengthening using a tennis ball kept at your desk.',
  instructions: [
    'Squeeze a tennis ball as hard as you can for 5 seconds.',
    'Release slowly over 3 seconds.',
    'Repeat 10-15 times.',
    'Switch hands.'
  ],
  sets: 1,
  reps: '10-15 each hand',
  duration: '2 min',
  muscleGroups: ['grip', 'forearm flexors'],
  equipment: ['tennis ball'],
  level: 'beginner',
  category: 'MICRO_C',
  tips: [
    'Keep a tennis ball on your desk as a reminder.',
    'Good stress reliever during tough calls.'
  ]
};

const microCFingerExtensions: Exercise = {
  id: 'micro-c-finger-extensions',
  name: 'Micro: Finger Extensions',
  description: 'Counteracts the gripping pattern by extending the fingers against resistance.',
  instructions: [
    'Place a rubber band around all five fingertips.',
    'Spread your fingers apart against the resistance.',
    'Hold for 3 seconds.',
    'Release slowly.',
    'Repeat 15 times each hand.'
  ],
  sets: 1,
  reps: '15 each hand',
  duration: '2 min',
  muscleGroups: ['finger extensors', 'forearm extensors'],
  equipment: ['rubber band'],
  level: 'beginner',
  category: 'MICRO_C',
  tips: [
    'Use multiple rubber bands for more resistance.',
    'Balances the gripping muscles for forearm health.'
  ]
};

const microCWaterBottleCurls: Exercise = {
  id: 'micro-c-water-bottle-curls',
  name: 'Micro: Water Bottle Wrist Curls',
  description: 'Quick wrist strengthening using a water bottle as weight.',
  instructions: [
    'Hold a full water bottle.',
    'Rest forearm on desk, wrist over the edge, palm up.',
    'Curl wrist up and down 15 times.',
    'Flip to palm down and repeat (wrist extensions).',
    'Switch hands.'
  ],
  sets: 1,
  reps: '15 curls + 15 extensions each hand',
  duration: '3 min',
  muscleGroups: ['wrist flexors', 'wrist extensors'],
  equipment: ['water bottle'],
  level: 'beginner',
  category: 'MICRO_C',
  tips: [
    'A 500ml water bottle weighs just enough for these small muscles.',
    'Both flexion and extension are important for balance.'
  ]
};

// ============================================================
// R) MICRO_D - Core
// ============================================================

const microDSeatedBrace: Exercise = {
  id: 'micro-d-seated-brace',
  name: 'Micro: Seated Abdominal Brace',
  description: 'Isometric core activation that can be done while sitting at your desk without anyone noticing.',
  instructions: [
    'Sit upright in your chair with feet flat on the floor.',
    'Brace your core as if someone is about to poke your stomach.',
    'Hold the brace for 10 seconds while breathing normally.',
    'Release.',
    'Repeat 10 times.'
  ],
  sets: 1,
  reps: '10 holds of 10 sec',
  duration: '2 min',
  muscleGroups: ['transverse abdominis', 'rectus abdominis'],
  equipment: ['chair'],
  level: 'beginner',
  category: 'MICRO_D',
  tips: [
    'Nobody can see you doing this -- perfect for meetings.',
    'Breathe normally while bracing.',
    'This is the same brace used during groundstrokes.'
  ]
};

const microDSeatedRotation: Exercise = {
  id: 'micro-d-seated-rotation',
  name: 'Micro: Seated Trunk Rotation',
  description: 'Gentle thoracic rotation while seated to maintain rotational mobility throughout the desk day.',
  instructions: [
    'Sit upright with feet flat on the floor.',
    'Cross arms over your chest.',
    'Rotate your torso to the right as far as comfortable.',
    'Hold for 5 seconds.',
    'Rotate to the left.',
    'Repeat 8-10 times each side.'
  ],
  sets: 1,
  reps: '8-10 each side',
  duration: '2 min',
  muscleGroups: ['obliques', 'thoracic spine'],
  equipment: ['chair'],
  level: 'beginner',
  category: 'MICRO_D',
  tips: [
    'Rotate from the mid-back, not the lower back.',
    'Keeps the thoracic spine mobile for groundstroke rotation.'
  ]
};

const microDStandingSideBends: Exercise = {
  id: 'micro-d-standing-side-bends',
  name: 'Micro: Standing Side Bends',
  description: 'Lateral trunk flexibility exercise that can be done during any standing break.',
  instructions: [
    'Stand with feet shoulder-width apart.',
    'Raise one arm overhead.',
    'Bend laterally toward the opposite side.',
    'Hold for 5 seconds.',
    'Return to center.',
    'Switch sides.',
    'Repeat 8 times each side.'
  ],
  sets: 1,
  reps: '8 each side',
  duration: '2 min',
  muscleGroups: ['obliques', 'quadratus lumborum'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_D',
  tips: [
    'Keep hips still -- the bend comes from the waist.',
    'Pairs well with the seated rotation for trunk mobility.'
  ]
};

const microDDeskPlank: Exercise = {
  id: 'micro-d-desk-plank',
  name: 'Micro: Desk Plank',
  description: 'Inclined plank using your desk as support. Lower intensity than floor plank but effective for micro-break activation.',
  instructions: [
    'Place hands on edge of desk, shoulder-width apart.',
    'Step feet back until body forms a straight line.',
    'Hold plank position for 30-45 seconds.',
    'Keep core engaged and hips level.',
    'Stand up to finish.'
  ],
  sets: 1,
  reps: '30-45 sec',
  duration: '1 min',
  muscleGroups: ['core', 'shoulders'],
  equipment: ['desk'],
  level: 'beginner',
  category: 'MICRO_D',
  tips: [
    'Make sure your desk is stable and will not slide.',
    'The farther back your feet, the harder it gets.'
  ]
};

const microDDeadBugSeated: Exercise = {
  id: 'micro-d-dead-bug-seated',
  name: 'Micro: Dead Bug / Seated Leg Extension',
  description: 'Seated core activation that mimics the dead bug pattern while sitting in your office chair.',
  instructions: [
    'Sit upright in your chair.',
    'Brace your core.',
    'Extend one leg straight out in front of you.',
    'Hold for 5 seconds.',
    'Lower and switch legs.',
    'For added difficulty, extend the opposite arm overhead simultaneously.',
    'Repeat 8 times each side.'
  ],
  sets: 1,
  reps: '8 each side',
  duration: '2 min',
  muscleGroups: ['core', 'hip flexors', 'quadriceps'],
  equipment: ['chair'],
  level: 'beginner',
  category: 'MICRO_D',
  tips: [
    'The arm extension makes it more like a true dead bug.',
    'Keep your back straight against the chair.'
  ]
};

// ============================================================
// S) MICRO_E - Mobility
// ============================================================

const microEHipCircles: Exercise = {
  id: 'micro-e-hip-circles',
  name: 'Micro: Hip Circles',
  description: 'Standing hip mobility exercise to counteract sitting and maintain hip range of motion for court movement.',
  instructions: [
    'Stand on one foot (hold desk for balance if needed).',
    'Make large circles with the free leg from the hip.',
    'Circle forward 10 times.',
    'Circle backward 10 times.',
    'Switch legs.'
  ],
  sets: 1,
  reps: '10 each direction, each leg',
  duration: '2 min',
  muscleGroups: ['hip flexors', 'hip rotators', 'glutes'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_E',
  tips: [
    'Make the circles as big as possible.',
    'This also doubles as a balance exercise.'
  ]
};

const microEReverseLunge: Exercise = {
  id: 'micro-e-reverse-lunge',
  name: 'Micro: Bodyweight Reverse Lunge',
  description: 'Quick hip flexor stretch and leg activation during work breaks.',
  instructions: [
    'Stand up from your desk.',
    'Step one foot back into a lunge.',
    'Lower until back knee nearly touches the floor.',
    'Drive through front heel to stand.',
    'Alternate legs for 6 reps each.'
  ],
  sets: 1,
  reps: '6 each leg',
  duration: '2 min',
  muscleGroups: ['hip flexors', 'quadriceps', 'glutes'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_E',
  tips: [
    'Opens hip flexors that get tight from sitting.',
    'Quick and effective work break.'
  ]
};

const microEAnkleCircles: Exercise = {
  id: 'micro-e-ankle-circles',
  name: 'Micro: Ankle Circles',
  description: 'Ankle mobility exercise to maintain the range of motion needed for split steps and direction changes.',
  instructions: [
    'Sit or stand with one foot lifted.',
    'Make circles with your ankle clockwise 10 times.',
    'Reverse to counterclockwise 10 times.',
    'Switch feet.'
  ],
  sets: 1,
  reps: '10 each direction, each foot',
  duration: '2 min',
  muscleGroups: ['ankle stabilizers', 'calves'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_E',
  tips: [
    'Especially important if you have had ankle sprains.',
    'Can be done under the desk while working.'
  ]
};

const microEThoracicRotation: Exercise = {
  id: 'micro-e-thoracic-rotation',
  name: 'Micro: Thoracic Rotation',
  description: 'Open-book stretch to maintain thoracic mobility for groundstroke rotation.',
  instructions: [
    'Sit sideways on your chair or lie on your side.',
    'If seated: place one hand behind your head.',
    'Rotate your upper body open toward the ceiling.',
    'Follow your elbow with your eyes.',
    'Hold the open position for 5 seconds.',
    'Return to start.',
    'Repeat 8 times each side.'
  ],
  sets: 1,
  reps: '8 each side',
  duration: '2 min',
  muscleGroups: ['thoracic spine', 'obliques', 'intercostals'],
  equipment: ['none'],
  level: 'beginner',
  category: 'MICRO_E',
  tips: [
    'The rotation should come from the mid-back.',
    'This mobility directly affects groundstroke power.'
  ]
};

const microECalfStretch: Exercise = {
  id: 'micro-e-calf-stretch',
  name: 'Micro: Calf Stretch',
  description: 'Standing calf and Achilles stretch to maintain flexibility during the desk day.',
  instructions: [
    'Stand facing a wall, hands on the wall.',
    'Step one foot back about 2-3 feet.',
    'Keep the back leg straight, heel on the floor.',
    'Lean into the wall until you feel a stretch in the back calf.',
    'Hold for 20-30 seconds.',
    'Bend the back knee slightly for a soleus stretch.',
    'Hold for 20-30 seconds.',
    'Switch legs.'
  ],
  sets: 1,
  reps: '20-30 sec straight + 20-30 sec bent, each leg',
  duration: '3 min',
  muscleGroups: ['gastrocnemius', 'soleus', 'achilles tendon'],
  equipment: ['wall'],
  level: 'beginner',
  category: 'MICRO_E',
  tips: [
    'Do both straight-leg and bent-knee versions.',
    'Essential for Achilles health in tennis players over 40.'
  ]
};

// ============================================================
// P) FLEXIBILITY - Hip Openers
// ============================================================

const flex9090HipSwitch: Exercise = {
  id: 'flex-hip-90-90-switch',
  name: '90/90 Hip Switch',
  description: 'Sit with both legs at 90-degree angles and rotate between internal and external rotation. Excellent for desk workers with tight hips — opens up the hip capsule for better court movement and stroke rotation.',
  instructions: [
    'Sit on the floor with your right leg in front, knee bent to 90 degrees, shin parallel to your torso.',
    'Position your left leg to the side, also bent at 90 degrees, shin pointing behind you.',
    'Your right hip is in external rotation, left hip in internal rotation.',
    'Keeping your torso upright, lift both knees and rotate to switch sides.',
    'Now your left leg is in front (external rotation) and right leg is behind (internal rotation).',
    'Control the transition — do not just flop over.',
    'Repeat for prescribed reps, alternating sides each time.'
  ],
  sets: 3,
  reps: '8 per side',
  duration: '5 min',
  muscleGroups: ['hip flexors', 'hip external rotators', 'glutes', 'piriformis'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'If you cannot sit upright, place your hands behind you for support.',
    'The goal is smooth transitions — start slow and increase speed as mobility improves.',
    'For desk workers: this directly counteracts the hip tightness from prolonged sitting.',
    'For tennis: open hips allow deeper lunges and better rotation through groundstrokes.'
  ]
};

const flexDeepSquatHold: Exercise = {
  id: 'flex-hip-deep-squat-hold',
  name: 'Deep Squat Hold',
  description: 'Hold a deep bodyweight squat with elbows pushing knees out. This primal resting position opens hips, stretches the ankles, and decompresses the lower back — all critical for desk workers.',
  instructions: [
    'Stand with feet slightly wider than shoulder width, toes turned out 15-30 degrees.',
    'Lower into a deep squat, going as low as you can.',
    'Place your elbows on the insides of your knees.',
    'Press your elbows outward against your knees to open the hips.',
    'Keep your chest up and back as straight as possible.',
    'Hold for prescribed time, breathing deeply.',
    'If heels lift, place a small wedge or rolled towel under them.'
  ],
  sets: 3,
  reps: '30 sec hold',
  duration: '3 min',
  muscleGroups: ['hip flexors', 'adductors', 'ankles', 'lower back', 'glutes'],
  equipment: ['none'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Hold onto a doorframe or pole if you cannot balance.',
    'Heels lifting is normal at first — ankle mobility will improve over time.',
    'Breathe deeply and try to relax into the position.',
    'For desk workers: the antidote to sitting in a chair all day.',
    'For tennis: builds the low base position needed for effective returns and volleys.'
  ]
};

const flexPigeonStretch: Exercise = {
  id: 'flex-hip-pigeon-stretch',
  name: 'Pigeon Stretch',
  description: 'A deep hip opener that targets the piriformis and glute medius. From a push-up position, bring one knee forward to stretch the external rotators of the hip.',
  instructions: [
    'Start in a push-up or plank position.',
    'Bring your right knee forward toward your right wrist.',
    'Place your right shin on the floor, angled slightly toward your left hip.',
    'Slide your left leg straight back behind you.',
    'Lower your hips toward the floor.',
    'Keep your hips square — do not let one hip drop.',
    'Hold for 60 seconds, breathing deeply into the stretch.',
    'Switch sides.'
  ],
  sets: 1,
  reps: '60 sec per side',
  duration: '3 min',
  muscleGroups: ['piriformis', 'glute medius', 'hip external rotators', 'hip flexors'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Place a pillow under your hip if the stretch is too intense.',
    'The front shin does not need to be parallel to your chest — angle it as needed.',
    'Focus on keeping hips square to the ground.',
    'For desk workers: directly stretches the muscles that tighten from sitting.',
    'For tennis: hip mobility allows deeper, more stable lunges on court.'
  ]
};

const flexHipFlexorLungeStretch: Exercise = {
  id: 'flex-hip-flexor-lunge-stretch',
  name: 'Hip Flexor Lunge Stretch',
  description: 'Kneeling lunge with rear knee on the ground, leaning forward to stretch the hip flexors. Critical for anyone who sits for long periods — tight hip flexors cause lower back pain and limit court movement.',
  instructions: [
    'Kneel on your left knee with your right foot forward in a lunge position.',
    'Place a pad or towel under your left knee for comfort.',
    'Keep your torso upright and core engaged.',
    'Gently shift your weight forward, deepening the stretch in the left hip flexor.',
    'You should feel a deep stretch in the front of your left hip.',
    'For more stretch, squeeze your left glute.',
    'Hold for 30 seconds, then switch sides.'
  ],
  sets: 3,
  reps: '30 sec per side',
  duration: '4 min',
  muscleGroups: ['hip flexors', 'psoas', 'rectus femoris', 'quadriceps'],
  equipment: ['mat', 'knee pad (optional)'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Squeezing the rear glute intensifies the hip flexor stretch through reciprocal inhibition.',
    'Do not lean forward from the waist — the lean comes from the hips.',
    'For desk workers: the number one stretch you should do daily if you sit for hours.',
    'For tennis: unlocks hip extension for longer, more powerful strides on court.'
  ]
};

const flexFigure4Stretch: Exercise = {
  id: 'flex-hip-figure-4-stretch',
  name: 'Figure-4 Stretch',
  description: 'Lying on your back, cross one ankle over the opposite knee and pull through to stretch the glutes and piriformis. A gentler alternative to pigeon stretch.',
  instructions: [
    'Lie on your back with both knees bent, feet flat on the floor.',
    'Cross your right ankle over your left knee, creating a "figure 4" shape.',
    'Reach both hands behind your left thigh (or in front of the left shin).',
    'Pull your left knee toward your chest.',
    'You should feel a deep stretch in your right glute and outer hip.',
    'Keep your head and shoulders relaxed on the floor.',
    'Hold for 30 seconds, then switch sides.'
  ],
  sets: 1,
  reps: '30 sec per side',
  duration: '2 min',
  muscleGroups: ['piriformis', 'gluteus medius', 'hip external rotators'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Flex the crossed foot to protect the knee.',
    'If you cannot reach behind your thigh, use a towel or strap.',
    'Great to do in bed before sleeping.',
    'For tennis: releases glute tightness from lateral court movement.'
  ]
};

// ============================================================
// P) FLEXIBILITY - Thoracic Spine Mobility
// ============================================================

const flexThoracicRotation: Exercise = {
  id: 'flex-thoracic-rotation',
  name: 'Thoracic Rotation (Side-Lying)',
  description: 'Side-lying rotation drill that opens the thoracic spine. Critical for desk workers whose mid-back locks up, and for tennis players who need rotation for groundstrokes and serves.',
  instructions: [
    'Lie on your left side with knees stacked and bent to 90 degrees.',
    'Extend both arms in front of you at shoulder height, palms together.',
    'Keeping your knees stacked and together, slowly open your right arm.',
    'Rotate your right arm and torso to the right, reaching toward the floor behind you.',
    'Follow your hand with your eyes.',
    'Hold for 2 seconds when you reach your end range.',
    'Return slowly to the starting position.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '8 per side',
  duration: '5 min',
  muscleGroups: ['thoracic spine', 'obliques', 'pectorals', 'rhomboids'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Keep knees together and pressed down — the rotation should come from the mid-back.',
    'Exhale as you rotate open — this allows more range.',
    'For desk workers: directly counters the locked-up thoracic spine from computer work.',
    'For tennis: thoracic rotation is the engine of your forehand and serve.'
  ],
  videoUrl: 'https://www.youtube.com/watch?v=iovhifyipsU'
};

const flexCatCow: Exercise = {
  id: 'flex-thoracic-cat-cow',
  name: 'Cat-Cow',
  description: 'On hands and knees, alternate between arching (cow) and rounding (cat) the back. Simple but effective spinal mobility exercise that warms up the entire spine.',
  instructions: [
    'Start on hands and knees with wrists under shoulders and knees under hips.',
    'Cow: Inhale and drop your belly toward the floor, lifting your head and tailbone.',
    'Let your back arch naturally — do not force the range.',
    'Cat: Exhale and round your spine toward the ceiling, tucking chin to chest.',
    'Push the floor away with your hands to maximize the rounding.',
    'Flow smoothly between the two positions.',
    'Move with your breath — inhale to cow, exhale to cat.'
  ],
  sets: 2,
  reps: '10',
  duration: '3 min',
  muscleGroups: ['thoracic spine', 'lumbar spine', 'abdominals', 'erector spinae'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Move slowly and feel each segment of the spine articulate.',
    'The movement should feel fluid, not jerky.',
    'Great to do first thing in the morning after sleeping.',
    'For desk workers: resets the spine after hours of sitting in one position.',
    'For tennis: warms up the spine for rotational demands of play.'
  ]
};

const flexThreadTheNeedle: Exercise = {
  id: 'flex-thoracic-thread-the-needle',
  name: 'Thread the Needle',
  description: 'On hands and knees, reach one arm under your body and rotate the thoracic spine. Excellent for improving rotational mobility in the mid-back.',
  instructions: [
    'Start on hands and knees, hands under shoulders, knees under hips.',
    'Lift your right arm out to the side.',
    'Reach your right arm under your left arm, threading it through.',
    'Lower your right shoulder and temple to the floor.',
    'You should feel a stretch in your right shoulder and mid-back.',
    'Hold for 2 seconds, then reverse — reach the right arm to the ceiling.',
    'Rotate through your mid-back to open up as far as you can.',
    'Repeat for prescribed reps, then switch sides.'
  ],
  sets: 3,
  reps: '8 per side',
  duration: '5 min',
  muscleGroups: ['thoracic spine', 'rhomboids', 'rear deltoids', 'obliques'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'The rotation should come from your mid-back, not your lower back or hips.',
    'Keep your hips stacked over your knees throughout.',
    'Exhale as you thread through, inhale as you open up.',
    'For desk workers: unlocks the rotation that gets locked from sitting hunched.',
    'For tennis: directly improves the rotational range for forehands and backhands.'
  ]
};

const flexBookOpener: Exercise = {
  id: 'flex-thoracic-book-opener',
  name: 'Book Opener',
  description: 'Side-lying stretch where you open your top arm overhead and to the other side, like opening a book. Stretches the chest and thoracic spine simultaneously.',
  instructions: [
    'Lie on your left side with knees bent and stacked, arms extended in front at shoulder height.',
    'Keeping your knees together and pressing down, begin to lift your right arm.',
    'Sweep your right arm up overhead in a large arc.',
    'Continue the arc until your right arm reaches the floor on the other side (or as far as possible).',
    'Both shoulders should ideally touch the floor.',
    'Hold for 2 seconds, then sweep the arm back to the starting position.',
    'Complete all reps, then switch sides.'
  ],
  sets: 3,
  reps: '8 per side',
  duration: '5 min',
  muscleGroups: ['thoracic spine', 'pectorals', 'anterior deltoids', 'obliques'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Follow your moving hand with your eyes throughout.',
    'The knees must stay pressed together — this isolates the thoracic rotation.',
    'Breathe out as you open up.',
    'For desk workers: opens the chest that collapses from computer work.',
    'For tennis: improves the backswing range for serves and groundstrokes.'
  ]
};

const flexThoracicExtFoamRoller: Exercise = {
  id: 'flex-thoracic-extension-foam-roller',
  name: 'Thoracic Extension on Foam Roller',
  description: 'Lie back on a foam roller placed at mid-back level and extend over it. Directly mobilizes the thoracic spine into extension — the opposite of the hunched desk posture.',
  instructions: [
    'Place a foam roller on the floor horizontally.',
    'Sit on the floor and position the roller behind you at mid-back level.',
    'Lie back over the roller with your hands supporting your head.',
    'Keep your feet flat on the floor and knees bent.',
    'Allow your upper back to extend over the roller.',
    'Hold for 2 seconds at the bottom of the extension.',
    'Crunch back up slightly, then extend again.',
    'Move the roller up or down to target different segments of the thoracic spine.'
  ],
  sets: 2,
  reps: '10',
  duration: '4 min',
  muscleGroups: ['thoracic spine', 'erector spinae', 'abdominals'],
  equipment: ['foam roller'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Do not extend over the lower back — keep the roller at mid-back only.',
    'Support your head to avoid neck strain.',
    'You may hear some pops — this is normal thoracic joint cavitation.',
    'For desk workers: the single best exercise to undo desk posture.',
    'For tennis: thoracic extension is needed for the trophy position in the serve.'
  ]
};

// ============================================================
// P) FLEXIBILITY - Shoulder Mobility
// ============================================================

const flexWallAngels: Exercise = {
  id: 'flex-shoulder-wall-angels',
  name: 'Wall Angels',
  description: 'Back against the wall, slide arms up and down keeping contact. Reveals and improves shoulder mobility restrictions while strengthening the postural muscles of the upper back.',
  instructions: [
    'Stand with your back flat against a wall.',
    'Press your head, upper back, lower back, elbows, and wrists into the wall.',
    'Start with arms in a "goalpost" position — elbows at 90 degrees, level with shoulders.',
    'Slowly slide your arms up the wall, maintaining contact with elbows and wrists.',
    'Go as high as you can while keeping contact with the wall.',
    'Slowly slide back down to the goalpost position.',
    'Focus on keeping your lower back pressed into the wall throughout.'
  ],
  sets: 3,
  reps: '10',
  duration: '4 min',
  muscleGroups: ['lower trapezius', 'serratus anterior', 'rotator cuff', 'rhomboids'],
  equipment: ['wall'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Maintaining wall contact is more important than reaching high.',
    'If your lower back arches off the wall, you are going too high.',
    'This exercise reveals shoulder mobility restrictions — track your progress.',
    'For desk workers: strengthens the muscles that pull shoulders back.',
    'For tennis: improves overhead range of motion for serving.'
  ]
};

const flexCrossBodyShoulderStretch: Exercise = {
  id: 'flex-shoulder-cross-body',
  name: 'Cross-Body Shoulder Stretch',
  description: 'Pull one arm across your chest with the other hand to stretch the posterior shoulder and upper back. Simple but effective for releasing tension from desk work and tennis.',
  instructions: [
    'Stand or sit tall with good posture.',
    'Extend your right arm straight across your chest at shoulder height.',
    'Use your left hand to pull your right arm closer to your body.',
    'Pull at the upper arm (above the elbow), not the forearm.',
    'You should feel a stretch in the back of your right shoulder.',
    'Hold for 30 seconds.',
    'Switch arms.'
  ],
  sets: 1,
  reps: '30 sec per side',
  duration: '2 min',
  muscleGroups: ['posterior deltoid', 'infraspinatus', 'rhomboids'],
  equipment: ['none'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Keep the stretched arm straight for a deeper stretch.',
    'Do not shrug your shoulders — keep them relaxed.',
    'Breathe normally throughout.',
    'For tennis: releases the posterior shoulder tightness from repetitive hitting.'
  ]
};

const flexOverheadLatStretch: Exercise = {
  id: 'flex-shoulder-overhead-lat-stretch',
  name: 'Overhead Lat Stretch',
  description: 'Grab a doorframe or pole overhead and lean away to stretch the lats and side body. Opens up the overhead range needed for serving.',
  instructions: [
    'Stand next to a doorframe, pole, or sturdy object.',
    'Reach your right arm up and grab the frame at the highest comfortable point.',
    'Step your feet away from the frame, keeping your arm extended.',
    'Lean your hips away from the frame to create a side-body stretch.',
    'You should feel a deep stretch along your right lat and side.',
    'Hold for 30 seconds.',
    'Switch sides.'
  ],
  sets: 1,
  reps: '30 sec per side',
  duration: '2 min',
  muscleGroups: ['latissimus dorsi', 'teres major', 'obliques', 'intercostals'],
  equipment: ['doorframe or pole'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'The further you step away, the deeper the stretch.',
    'Keep your core slightly engaged to avoid over-arching your back.',
    'Breathe into the stretched side to deepen the stretch.',
    'For tennis: lat flexibility is critical for a fluid, full-range serve motion.'
  ]
};

const flexSleeperStretch: Exercise = {
  id: 'flex-shoulder-sleeper-stretch',
  name: 'Sleeper Stretch',
  description: 'Lying on your side with arm at 90 degrees, gently push your hand toward the floor to stretch the posterior shoulder capsule. Important for maintaining internal rotation in the dominant shoulder.',
  instructions: [
    'Lie on your right side with your right arm extended in front at shoulder height.',
    'Bend your right elbow to 90 degrees so your forearm points toward the ceiling.',
    'Use your left hand to gently push your right hand toward the floor.',
    'You should feel a stretch in the back of your right shoulder.',
    'Do not force it — gentle pressure is sufficient.',
    'Hold for 30 seconds.',
    'Switch sides.'
  ],
  sets: 1,
  reps: '30 sec per side',
  duration: '2 min',
  muscleGroups: ['posterior shoulder capsule', 'infraspinatus', 'teres minor'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Be very gentle — the posterior capsule can be sensitive.',
    'If you feel a pinch in the front of the shoulder, reduce pressure.',
    'Tennis players often have a very tight dominant posterior shoulder.',
    'For tennis: maintains the internal rotation range needed for serving and ground strokes.'
  ]
};

// ============================================================
// P) FLEXIBILITY - Hamstring & Calf
// ============================================================

const flexStandingHamstringStretch: Exercise = {
  id: 'flex-hamstring-standing-stretch',
  name: 'Standing Hamstring Stretch on Step',
  description: 'Elevate one foot on a step or bench and hinge forward to stretch the hamstrings. A safe, controlled way to improve hamstring flexibility for desk workers and tennis players.',
  instructions: [
    'Stand in front of a step, bench, or low chair.',
    'Place your right heel on the step with your leg straight.',
    'Keep your standing leg slightly bent for stability.',
    'Hinge forward at the hips with a flat back — do not round.',
    'Reach toward your toes, feeling the stretch in the back of your right thigh.',
    'Hold for 30 seconds.',
    'Switch legs.'
  ],
  sets: 1,
  reps: '30 sec per side',
  duration: '2 min',
  muscleGroups: ['hamstrings', 'calves', 'lower back'],
  equipment: ['step or bench'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Keep your back flat — hinge from the hips, not the waist.',
    'A slight knee bend on the elevated leg is fine if hamstrings are very tight.',
    'Do not bounce — hold a steady stretch.',
    'For tennis: flexible hamstrings reduce strain risk during explosive sprints on court.'
  ]
};

const flexDownwardDog: Exercise = {
  id: 'flex-hamstring-downward-dog',
  name: 'Downward Dog',
  description: 'Classic yoga pose forming an inverted V shape. Stretches the entire posterior chain — calves, hamstrings, and shoulders — while building upper body endurance.',
  instructions: [
    'Start on hands and knees.',
    'Tuck your toes under and lift your hips up and back.',
    'Straighten your arms and legs to form an inverted V shape.',
    'Push your heels toward the floor (they do not need to touch).',
    'Press your chest toward your thighs.',
    'Keep your head between your upper arms.',
    'Hold for prescribed time, pedaling your feet if desired.'
  ],
  sets: 3,
  reps: '30 sec hold',
  duration: '3 min',
  muscleGroups: ['hamstrings', 'calves', 'shoulders', 'lats', 'upper back'],
  equipment: ['mat'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Bend your knees slightly if your hamstrings are very tight.',
    'Focus on lengthening the spine rather than straightening the legs.',
    '"Pedal" your feet — alternately bending each knee — to warm up the calves.',
    'For tennis: stretches the entire posterior chain that powers explosive movement.'
  ]
};

const flexWorldsGreatestStretch: Exercise = {
  id: 'flex-hamstring-worlds-greatest-stretch',
  name: 'World\'s Greatest Stretch',
  description: 'A comprehensive lunge + rotation + hamstring extension combo that stretches nearly every major muscle group in one fluid sequence. Called "the world\'s greatest" for good reason.',
  instructions: [
    'Step your right foot forward into a deep lunge.',
    'Place both hands on the floor inside your right foot.',
    'Drop your left elbow toward the floor (inside your right foot) to stretch the hip.',
    'Rotate your right arm to the ceiling, following with your eyes.',
    'Hold for 2 seconds.',
    'Place both hands down, straighten your front leg to stretch the hamstring.',
    'Hold for 2 seconds.',
    'Return to standing and repeat on the other side.'
  ],
  sets: 3,
  reps: '5 per side',
  duration: '5 min',
  muscleGroups: ['hip flexors', 'hamstrings', 'thoracic spine', 'adductors', 'glutes', 'calves'],
  equipment: ['none'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'This is a dynamic stretch — move through the positions with control.',
    'Each rep should take about 8-10 seconds per side.',
    'Perfect as a warm-up or stand-alone mobility routine.',
    'For desk workers: hits every area that tightens from sitting.',
    'For tennis: the ultimate pre-match mobility exercise.'
  ]
};

// ============================================================
// P) FLEXIBILITY - Full Routines
// ============================================================

const flexDeskWorkerRoutine: Exercise = {
  id: 'flex-routine-desk-worker',
  name: '10-Minute Desk Worker Flexibility Routine',
  description: 'A complete flexibility routine combining hip flexor stretch, thoracic rotation, cat-cow, wall angels, and standing hamstring stretch. Perfect for evening sessions on work-from-home days.',
  instructions: [
    'Hip Flexor Lunge Stretch: 30 sec per side (1 min total).',
    'Cat-Cow: 10 reps, slow and controlled (1.5 min).',
    'Thoracic Rotation (Side-Lying): 8 per side (2 min).',
    'Wall Angels: 10 reps, maintaining wall contact (1.5 min).',
    'Standing Hamstring Stretch: 30 sec per side (1 min).',
    'Deep Squat Hold: 30 sec (0.5 min).',
    'Figure-4 Stretch: 30 sec per side (1 min).',
    'Repeat any tight areas with remaining time (1.5 min).'
  ],
  sets: 1,
  reps: '1 circuit',
  duration: '10 min',
  muscleGroups: ['hip flexors', 'thoracic spine', 'hamstrings', 'shoulders', 'glutes'],
  equipment: ['mat', 'wall'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Do this routine every evening on work-from-home days.',
    'Play relaxing music or a podcast to make it a habit.',
    'Focus on breathing deeply throughout each stretch.',
    'Even 5 minutes is better than skipping it — do the hip flexor stretch and thoracic rotation at minimum.',
    'For tennis: maintaining flexibility prevents the accumulated stiffness that leads to injury.'
  ]
};

const flexPreTennisMobility: Exercise = {
  id: 'flex-routine-pre-tennis',
  name: '5-Minute Pre-Tennis Mobility',
  description: 'Quick mobility sequence before hitting: hip circles, thoracic rotation, leg swings, and ankle circles. Gets the joints moving through full range before the dynamic warm-up.',
  instructions: [
    'Hip Circles: 10 circles each direction, each leg (1 min).',
    'Thoracic Rotation: 5 per side, standing with arms crossed (1 min).',
    'Forward/Back Leg Swings: 10 each leg (1 min).',
    'Side-to-Side Leg Swings: 10 each leg (1 min).',
    'Ankle Circles: 10 each direction, each foot (0.5 min).',
    'Wrist Circles: 10 each direction (0.5 min).'
  ],
  sets: 1,
  reps: '1 circuit',
  duration: '5 min',
  muscleGroups: ['hips', 'thoracic spine', 'hamstrings', 'hip flexors', 'ankles', 'wrists'],
  equipment: ['none'],
  level: 'beginner',
  category: 'FLEXIBILITY',
  tips: [
    'Do this BEFORE the dynamic warm-up (jogging, high knees, etc.).',
    'The goal is joint mobility, not stretching — keep everything moving.',
    'Hold onto a fence or net post for balance during leg swings.',
    'This prepares your joints for the warm-up, which prepares your muscles for play.',
    'For tennis: reduces injury risk by ensuring joints are moving freely before loading them.'
  ]
};

// ============================================================
// Q) GYM UPPER BODY - Strength with Flexibility Preservation
// ============================================================

const turkishGetUp: Exercise = {
  id: 'gym-upper-turkish-getup',
  name: 'Turkish Get-Up (Lightweight)',
  description: 'Full-body exercise that builds shoulder stability, core strength, and hip mobility simultaneously. The Turkish get-up moves through multiple positions that develop mobility under load — the perfect exercise for building strength without losing flexibility.',
  instructions: [
    'Lie on your back holding a light kettlebell (or dumbbell) in your right hand, arm extended toward the ceiling.',
    'Bend your right knee with foot flat on the floor. Left leg extended at 45 degrees.',
    'Roll onto your left elbow, keeping the weight locked out overhead.',
    'Push up to your left hand.',
    'Lift your hips off the floor into a bridge.',
    'Sweep your left leg under your body to a kneeling position.',
    'From the kneeling position, stand up while keeping the weight overhead.',
    'Reverse every step to return to lying down.',
    'Keep your eyes on the weight throughout the entire movement.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '3 each side',
  duration: '8 min',
  muscleGroups: ['shoulders', 'core', 'hip flexors', 'glutes', 'triceps', 'full body'],
  equipment: ['kettlebell', 'dumbbell'],
  level: 'intermediate',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Start with no weight or a shoe balanced on your fist to learn the pattern.',
    'This is about quality of movement, not heavy weight — use 4-8 kg.',
    'Each rep should take 30-45 seconds — slow is better.',
    'The TGU builds shoulder stability through a full range of motion — preserving flexibility.',
    'For tennis: develops the overhead stability for serves while maintaining full shoulder mobility.'
  ]
};

const facePullsBand: Exercise = {
  id: 'gym-upper-face-pulls-band',
  name: 'Face Pulls (Resistance Band)',
  description: 'Rear delt and rotator cuff exercise that counteracts the forward-shoulder posture from desk work. Face pulls strengthen the muscles that pull shoulders back and externally rotate — critical for both posture and shoulder health.',
  instructions: [
    'Attach a band at head height to a pole or door anchor.',
    'Grip both ends of the band with palms facing down.',
    'Step back to create tension in the band.',
    'Pull the band toward your face, separating your hands.',
    'As you pull, rotate your hands outward so your thumbs point behind you.',
    'Finish with your hands beside your ears, elbows high.',
    'Squeeze your shoulder blades together at the end position.',
    'Return slowly to start.'
  ],
  sets: 3,
  reps: '15-20',
  duration: '5 min',
  muscleGroups: ['rear deltoids', 'rotator cuff', 'rhomboids', 'middle trapezius'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'GYM_UPPER_BODY',
  tips: [
    'The external rotation at the end is the most important part — do not skip it.',
    'Think about making your hands race your elbows backward — hands should win.',
    'Light resistance, high reps — this is about muscle activation, not heavy loading.',
    'Can be done every training day — even on rest days.',
    'For desk workers: the best exercise for undoing forward-rounded shoulders.',
    'For tennis: strengthens the posterior shoulder for deceleration after serves and overheads.'
  ]
};

const bandDislocates: Exercise = {
  id: 'gym-upper-band-dislocates',
  name: 'Band Dislocates (Shoulder Pass-Throughs)',
  description: 'Hold a band with a wide grip and pass it from in front of your body to behind your back in a continuous arc. Develops full shoulder range of motion under light resistance — mobility and strength combined.',
  instructions: [
    'Hold a resistance band with a wide overhand grip in front of your thighs.',
    'Keep your arms straight throughout the entire movement.',
    'Slowly raise the band overhead in a wide arc.',
    'Continue the arc until the band passes behind your head and touches your lower back.',
    'Reverse the movement to return to the starting position.',
    'Keep the movement smooth and controlled — no jerking.',
    'Gradually narrow your grip over weeks as mobility improves.'
  ],
  sets: 3,
  reps: '10',
  duration: '4 min',
  muscleGroups: ['deltoids', 'rotator cuff', 'pectorals', 'rhomboids', 'lats'],
  equipment: ['resistance band'],
  level: 'beginner',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Start with a very wide grip and light band — this should feel like a gentle stretch.',
    'If any part of the arc hurts, widen your grip or use a lighter band.',
    'Do not arch your back as the band passes overhead.',
    'Great as a daily warm-up before any upper body training.',
    'For tennis: ensures full overhead range for serving while keeping the shoulder healthy.'
  ]
};

const bottomsUpKBPress: Exercise = {
  id: 'gym-upper-bottoms-up-kb-press',
  name: 'Bottoms-Up Kettlebell Press',
  description: 'Press a kettlebell overhead while holding it upside down (bottom up). The instability forces maximal shoulder stabilizer engagement and rotator cuff activation — building strength through the full range while demanding control and mobility.',
  instructions: [
    'Clean a light kettlebell to the rack position (bottom up — handle in your hand, bell pointing to ceiling).',
    'Grip the handle as tightly as possible to stabilize the bell.',
    'Brace your core and squeeze the opposite fist.',
    'Slowly press the kettlebell overhead, keeping the bell balanced.',
    'Lock out with the bicep by your ear.',
    'Lower slowly back to the rack position.',
    'The bell will wobble — that is the point. Your stabilizers are working overtime.',
    'Complete all reps on one side, then switch.'
  ],
  sets: 3,
  reps: '6-8 each arm',
  duration: '5 min',
  muscleGroups: ['deltoids', 'rotator cuff', 'triceps', 'core', 'grip'],
  equipment: ['kettlebell'],
  level: 'intermediate',
  category: 'GYM_UPPER_BODY',
  tips: [
    'Use a much lighter kettlebell than you would for a normal press — 6-10 kg.',
    'The crush grip required fires up all the stabilizers in the shoulder.',
    'If the bell keeps falling, go lighter — control is the goal.',
    'Stand on one leg for an additional stability challenge.',
    'For tennis: builds the kind of shoulder stability that protects against injury during serves.'
  ]
};

// ============================================================
// EXPORTS - Organized by Category
// ============================================================

export const gymLowerBodyExercises: Exercise[] = [
  gobletSquat,
  reverseLunge,
  romanianDeadlift,
  lateralLunge,
  calfRaises,
  singleLegBalance
];

export const gymCoreExercises: Exercise[] = [
  frontPlank,
  sidePlank,
  pallofPress,
  plankShoulderTaps,
  medBallRotationalThrow,
  medBallOverheadSlam,
  russianTwist,
  deadBug
];

export const gymUpperBodyExercises: Exercise[] = [
  externalRotationBand,
  internalRotationBand,
  bandPullAparts,
  ytwShoulder,
  scapularWallControl,
  resistedPullDowns,
  halfKneelingDBPress,
  singleArmChestPress,
  renegadeRow,
  turkishGetUp,
  facePullsBand,
  bandDislocates,
  bottomsUpKBPress
];

export const gymWristForearmExercises: Exercise[] = [
  wristCurls,
  wristExtensions,
  gripBallSqueeze,
  farmersWalk,
  tylerTwistFlexBar
];

export const gymPowerExercises: Exercise[] = [
  skaterHops,
  boxStepUps,
  agilityLadderIckyShuffles,
  agilityLadderInOut,
  agilityLadderLateralRun,
  agilityLadderCarioca,
  agilityLadderTwoFeetEach
];

export const homeLowerExercises: Exercise[] = [
  homeBWSquat,
  homeReverseLunge,
  homeRDL,
  homeLateralLunge,
  homeCalfRaises,
  homeSingleLegBalance
];

export const homeUpperExercises: Exercise[] = [
  homePushUps,
  homeBandRow,
  homeBandExternalRotation,
  homeHKDBPress
];

export const homeCoreExercises: Exercise[] = [
  homePlank,
  homePallof,
  homeDeadBug,
  homeSidePlank
];

export const warmupExercises: Exercise[] = [
  warmupLightJog,
  warmupHighKnees,
  warmupButtKicks,
  warmupJumpRope,
  warmupBoxShuffles,
  warmupWalkingLungeRotation,
  warmupTinSoldiers,
  warmupSumoLunges,
  warmupKneesToChest,
  warmupArmCircles,
  warmupYTW,
  warmupShadowStrokes
];

export const prehabShoulderExercises: Exercise[] = [
  prehabShoulderExtRotation,
  prehabShoulderIntRotation,
  prehabShoulderPullAparts,
  prehabShoulderYTW,
  prehabShoulderScapWallSlides
];

export const prehabElbowExercises: Exercise[] = [
  prehabElbowTylerTwist,
  prehabElbowWristExtensions,
  prehabElbowWristFlexion
];

export const prehabKneeExercises: Exercise[] = [
  prehabKneeWallSit,
  prehabKneeSingleLegBalance,
  prehabKneeStepDowns,
  prehabKneeTKE,
  prehabKneeClamshells
];

export const prehabCalfExercises: Exercise[] = [
  prehabCalfEccentricStraight,
  prehabCalfEccentricBent
];

export const footworkExercises: Exercise[] = [
  footworkShadowSplitStep,
  footworkJumpRopeSplitStep,
  footwork3by3,
  footworkReactionSplitStep,
  footworkSideShuffle,
  footworkCrossoverSprint,
  footworkCarioca,
  footworkHitAndRecover,
  footworkForwardBackward,
  footworkApproachAndClose
];

export const microAExercises: Exercise[] = [
  microACalfRaises,
  microAWallSit,
  microASingleLeg,
  microABWSquat,
  microABentKneeCalf
];

export const microBExercises: Exercise[] = [
  microBShoulderRolls,
  microBArmCircles,
  microBDoorframeStretch,
  microBBandExtRotation,
  microBBandPullAparts
];

export const microCExercises: Exercise[] = [
  microCWristCircles,
  microCWristStretches,
  microCTennisBallSqueeze,
  microCFingerExtensions,
  microCWaterBottleCurls
];

export const microDExercises: Exercise[] = [
  microDSeatedBrace,
  microDSeatedRotation,
  microDStandingSideBends,
  microDDeskPlank,
  microDDeadBugSeated
];

export const microEExercises: Exercise[] = [
  microEHipCircles,
  microEReverseLunge,
  microEAnkleCircles,
  microEThoracicRotation,
  microECalfStretch
];

export const flexibilityExercises: Exercise[] = [
  flex9090HipSwitch,
  flexDeepSquatHold,
  flexPigeonStretch,
  flexHipFlexorLungeStretch,
  flexFigure4Stretch,
  flexThoracicRotation,
  flexCatCow,
  flexThreadTheNeedle,
  flexBookOpener,
  flexThoracicExtFoamRoller,
  flexWallAngels,
  flexCrossBodyShoulderStretch,
  flexOverheadLatStretch,
  flexSleeperStretch,
  flexStandingHamstringStretch,
  flexDownwardDog,
  flexWorldsGreatestStretch,
  flexDeskWorkerRoutine,
  flexPreTennisMobility
];

/** All exercises in the system, flat array */
export const allExercises: Exercise[] = [
  ...gymLowerBodyExercises,
  ...gymCoreExercises,
  ...gymUpperBodyExercises,
  ...gymWristForearmExercises,
  ...gymPowerExercises,
  ...homeLowerExercises,
  ...homeUpperExercises,
  ...homeCoreExercises,
  ...warmupExercises,
  ...prehabShoulderExercises,
  ...prehabElbowExercises,
  ...prehabKneeExercises,
  ...prehabCalfExercises,
  ...footworkExercises,
  ...microAExercises,
  ...microBExercises,
  ...microCExercises,
  ...microDExercises,
  ...microEExercises,
  ...flexibilityExercises
];

/** Exercises grouped by category */
export const exercisesByCategory: Record<string, Exercise[]> = {
  GYM_LOWER_BODY: gymLowerBodyExercises,
  GYM_CORE: gymCoreExercises,
  GYM_UPPER_BODY: gymUpperBodyExercises,
  GYM_WRIST_FOREARM: gymWristForearmExercises,
  GYM_POWER: gymPowerExercises,
  HOME_LOWER: homeLowerExercises,
  HOME_UPPER: homeUpperExercises,
  HOME_CORE: homeCoreExercises,
  WARMUP: warmupExercises,
  PREHAB_SHOULDER: prehabShoulderExercises,
  PREHAB_ELBOW: prehabElbowExercises,
  PREHAB_KNEE: prehabKneeExercises,
  PREHAB_CALF: prehabCalfExercises,
  FOOTWORK: footworkExercises,
  MICRO_A: microAExercises,
  MICRO_B: microBExercises,
  MICRO_C: microCExercises,
  MICRO_D: microDExercises,
  MICRO_E: microEExercises,
  FLEXIBILITY: flexibilityExercises
};

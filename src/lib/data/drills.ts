import type { Drill } from './types';

// ============================================================
// A) WALL DRILLS
// ============================================================

const wallBallBounce: Drill = {
  id: 'wall-ball-bounce',
  name: 'Ball Bounce Control',
  description: 'Foundation wall drill that develops soft hands and racquet face control. Start every wall session with this to calibrate touch.',
  instructions: [
    'Stand 2-3 meters from the wall.',
    'Bounce the ball off the wall with gentle forehand taps.',
    'Keep the ball below shoulder height on the wall.',
    'Focus on controlling the bounce height and direction.',
    'Count consecutive controlled hits as your score.',
    'Progress: alternate forehand and backhand after every hit.'
  ],
  duration: '3 min',
  category: 'WALL_DRILLS',
  level: 'beginner',
  focus: ['racquet control', 'soft hands', 'consistency'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'This is about control, not power.',
    'If the ball goes above shoulder height, you are hitting too hard.',
    'Great way to start any wall session -- calibrates your touch.'
  ]
};

const wallMiniCourtVolleys: Drill = {
  id: 'wall-mini-court-volleys',
  name: 'Mini Court Wall Volleys',
  description: 'Stand close to the wall and practice rapid-fire volleys with a continental grip. Develops quick hands and reflexes.',
  instructions: [
    'Stand 1.5-2 meters from the wall.',
    'Use a continental grip.',
    'Hit continuous volleys alternating forehand and backhand.',
    'Keep the ball in a tight zone on the wall.',
    'Focus on punching forward, not swinging.',
    'Count consecutive volleys without losing control.'
  ],
  duration: '3 min',
  category: 'WALL_DRILLS',
  level: 'beginner',
  focus: ['volley technique', 'reflexes', 'continental grip', 'hand speed'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'Continental grip is essential -- do not switch grips.',
    'Punch through the ball, keep the wrist firm.',
    'The closer you stand, the faster you need to react.',
    'Goal: 30+ consecutive volleys.'
  ]
};

const wallHandToss: Drill = {
  id: 'wall-hand-toss',
  name: 'Hand Toss Volley',
  description: 'Toss the ball against the wall with one hand and volley the return with the racquet. Practices the volley from a realistic incoming angle.',
  instructions: [
    'Stand 3 meters from the wall.',
    'Toss the ball against the wall with your non-racquet hand.',
    'As it bounces back, hit a volley.',
    'Vary the toss angle: left, right, high, low.',
    'Use continental grip throughout.',
    'Practice both forehand and backhand volleys.'
  ],
  duration: '5 min',
  category: 'WALL_DRILLS',
  level: 'beginner',
  focus: ['volley preparation', 'split step', 'reaction time'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'Toss to different spots to simulate varied incoming shots.',
    'Split step before each volley.',
    'Focus on getting the racquet face open and in front of you.'
  ]
};

const wallFirstVolley: Drill = {
  id: 'wall-first-volley',
  name: 'First Volley Wall Drill',
  description: 'Practice the first volley (transition volley) by hitting from mid-court distance. Simulates the approach-to-volley transition.',
  instructions: [
    'Stand 4-5 meters from the wall.',
    'Hit the ball against the wall with a groundstroke-like feed.',
    'Move forward and hit a volley (first volley).',
    'The wall return comes faster from this distance -- be ready.',
    'Practice stepping forward through the volley.',
    'Recover to starting position and repeat.'
  ],
  duration: '5 min',
  category: 'WALL_DRILLS',
  level: 'intermediate',
  focus: ['transition volley', 'forward movement', 'net approach'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'The first volley is often a low volley -- practice hitting up over the net height.',
    'Step forward as you hit -- do not reach.',
    'Continental grip, open racquet face, firm wrist.'
  ]
};

const wallGroundToVolley: Drill = {
  id: 'wall-ground-to-volley',
  name: 'Ground-to-Volley Transition',
  description: 'Alternate between groundstrokes and volleys against the wall. Builds the ability to switch between baseline and net play seamlessly.',
  instructions: [
    'Start 4 meters from the wall.',
    'Hit 3 groundstrokes (letting the ball bounce).',
    'On the 4th ball, move forward and take it as a volley.',
    'Hit 2-3 volleys from closer distance.',
    'Back up and restart with groundstrokes.',
    'Practice the grip change between groundstrokes and volleys.'
  ],
  duration: '5 min',
  category: 'WALL_DRILLS',
  level: 'intermediate',
  focus: ['transition play', 'grip change', 'movement', 'versatility'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'The grip change from semi-western to continental must become automatic.',
    'Move forward with purpose -- do not drift.',
    'This drill simulates the tactical pattern of constructing from the baseline then finishing at net.'
  ]
};

const wallBackhandSlice: Drill = {
  id: 'wall-backhand-slice',
  name: 'Backhand Slice Wall Drill',
  description: 'Practice the slice backhand against the wall. The wall provides rapid feedback on slice depth and control.',
  instructions: [
    'Stand 3-4 meters from the wall.',
    'Hit continuous backhand slices with a continental grip.',
    'Focus on the high-to-low racquet path.',
    'Keep the ball low on the wall (simulating keeping the slice low over the net).',
    'Open the racquet face slightly for underspin.',
    'Count consecutive clean slices.'
  ],
  duration: '5 min',
  category: 'WALL_DRILLS',
  level: 'intermediate',
  focus: ['backhand slice', 'touch', 'continental grip', 'underspin'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'The slice should feel like you are cutting under the ball.',
    'Follow through forward, not just down.',
    'Low contact on the wall = low ball over the net in a match.'
  ]
};

const wallReflexVolley: Drill = {
  id: 'wall-reflex-volley',
  name: 'Reflex Volley Drill',
  description: 'Stand very close to the wall for ultra-fast reflex volleys. Develops the reaction time for net exchanges in doubles.',
  instructions: [
    'Stand 1 meter from the wall.',
    'Hit the ball gently to start a rally.',
    'React as fast as possible to keep the ball going.',
    'Use compact, punch volleys -- no backswing.',
    'Alternate forehand and backhand sides.',
    'Try to maintain a 30-second rally.'
  ],
  duration: '3 min',
  category: 'WALL_DRILLS',
  level: 'advanced',
  focus: ['reflexes', 'hand speed', 'volley reactions', 'doubles skills'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'This will feel chaotic at first -- that is normal.',
    'Minimal racquet movement -- just redirect the ball.',
    'Critical for doubles reflex volleys at the net.'
  ]
};

const wallContinuousRally: Drill = {
  id: 'wall-continuous-rally',
  name: 'Continuous Rally Volley',
  description: 'Sustained wall rally combining volleys at varying distances. Builds stamina and consistency in volley technique.',
  instructions: [
    'Start 2 meters from the wall.',
    'Rally continuously with volleys.',
    'Gradually move closer (increase speed) then farther back (more control needed).',
    'Alternate between forehand and backhand.',
    'Maintain continental grip throughout.',
    'Goal: 50 consecutive clean volleys.'
  ],
  duration: '5 min',
  category: 'WALL_DRILLS',
  level: 'intermediate',
  focus: ['volley consistency', 'endurance', 'control'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'Moving closer tests reflexes; farther back tests control.',
    'If you lose control, move farther back.',
    'Time yourself to build volley stamina.'
  ]
};

const wallServeAndSecond: Drill = {
  id: 'wall-serve-and-second',
  name: 'Serve and Second Ball',
  description: 'Hit a serve-like motion into the wall and play the return as a second shot. Practices serve+1 without needing a court.',
  instructions: [
    'Stand 5-6 meters from the wall.',
    'Use a modified serve motion to hit the ball at the wall (aim high).',
    'The ball bounces back at you -- take the return as your "second shot".',
    'This second shot simulates the serve+1 in a match.',
    'Practice attacking the return with a forehand or approach.',
    'Vary serve placement: left side of wall, right side, center.'
  ],
  duration: '5 min',
  category: 'WALL_DRILLS',
  level: 'intermediate',
  focus: ['serve+1', 'second ball attack', 'transition'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'The serve does not need to be full power -- focus on the transition.',
    'Train your eyes to immediately track the return after serving.',
    'This is one of the best solo drills for serve+1 pattern practice.'
  ]
};

const wallShadowFootwork: Drill = {
  id: 'wall-shadow-footwork',
  name: 'Shadow Footwork at the Wall',
  description: 'Combine wall hitting with deliberate footwork patterns. Focus on split steps, positioning, and recovery.',
  instructions: [
    'Stand 3-4 meters from the wall.',
    'Hit the ball and immediately recover to a ready position with split step.',
    'Move laterally (left or right) before hitting the next ball.',
    'Practice the full movement cycle: ready, move, set, hit, recover.',
    'Alternate between moving left and right.',
    'Add forward/backward movement for approach and recovery practice.'
  ],
  duration: '5 min',
  category: 'WALL_DRILLS',
  level: 'intermediate',
  focus: ['footwork', 'recovery', 'split step', 'court movement'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'The recovery step is the most important part of this drill.',
    'Every shot should start with a split step.',
    'Simulate match-like movement, not just standing and hitting.'
  ]
};

// ============================================================
// B) PARTNER PATTERN DRILLS
// ============================================================

const partnerFigure8: Drill = {
  id: 'partner-figure-8',
  name: 'Figure 8 Pattern',
  description: 'Cross-court rally where both players alternate hitting to each other\'s forehand and backhand in a figure-8 pattern. Develops consistency and directional control.',
  instructions: [
    'Player A hits cross-court forehand to Player B\'s backhand.',
    'Player B hits cross-court backhand to Player A\'s forehand.',
    'This creates a figure-8 ball path pattern.',
    'Rally cooperatively for 20-30 balls.',
    'Then switch: Player A starts with backhand cross-court.',
    'Focus on depth and consistency over power.'
  ],
  duration: '10 min',
  category: 'PARTNER_PATTERN',
  level: 'intermediate',
  focus: ['cross-court consistency', 'directional control', 'rally patterns'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'This is a cooperative drill -- keep the rally going.',
    'Aim for 20+ consecutive balls in the pattern.',
    'This pattern is the foundation of match play construction.',
    'Focus on getting good depth on every ball.'
  ]
};

const partner31: Drill = {
  id: 'partner-3-1',
  name: '3-1 Pattern',
  description: 'Hit 3 cross-court shots then 1 down-the-line. The most fundamental attacking pattern in singles tennis.',
  instructions: [
    'Both players rally cross-court.',
    'After 3 cross-court shots, one player hits down-the-line.',
    'The other player retrieves and the pattern resets.',
    'Take turns being the attacker (the one who goes down the line).',
    'The DTL shot should be decisive -- hit it with purpose.',
    'After the DTL, the point becomes open play.'
  ],
  duration: '12 min',
  category: 'PARTNER_PATTERN',
  level: 'intermediate',
  focus: ['pattern play', 'DTL attack', 'court opening', 'decision making'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The 3 cross-courts should move your opponent wider each time.',
    'The DTL should go to the OPEN court.',
    'This is the Control-Hurt-Finish framework in action.',
    'Quality of the setup (3 CC) determines the quality of the DTL.'
  ]
};

const partnerCCToOpen: Drill = {
  id: 'partner-cc-to-open',
  name: 'Cross-Court to Open Court',
  description: 'Rally cross-court and when you get a short ball, attack down the line to the open court. Trains opportunistic pattern recognition.',
  instructions: [
    'Rally cross-court cooperatively.',
    'When one player receives a ball inside the service line, attack DTL.',
    'The attacking player should step inside the baseline for the short ball.',
    'The DTL attack should be hit with topspin and purpose.',
    'After the DTL, play the point out.',
    'Reset and start a new rally cross-court.'
  ],
  duration: '12 min',
  category: 'PARTNER_PATTERN',
  level: 'intermediate',
  focus: ['short ball recognition', 'open court attack', 'transition from rally to attack'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The trigger is a ball landing short (inside the service line).',
    'Step in to the ball -- do not wait for it to come to you.',
    'The DTL goes to the open court because you have been rallying CC.',
    'This is the most common attacking opportunity in singles.'
  ]
};

const partner221: Drill = {
  id: 'partner-2-2-1',
  name: '2-2-1 Pattern',
  description: 'Hit 2 to one side, 2 to the other, then 1 aggressive shot. Builds the ability to move opponents before attacking.',
  instructions: [
    'Start with 2 cross-court forehands.',
    'Then hit 2 cross-court backhands.',
    'On the 5th shot, hit an aggressive down-the-line attack.',
    'The goal is to make your opponent run side-to-side before the final attack.',
    'After the attack, play the point out.',
    'Switch roles between attacker and defender.'
  ],
  duration: '12 min',
  category: 'PARTNER_PATTERN',
  level: 'advanced',
  focus: ['pattern construction', 'opponent movement', 'aggressive finishing'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The 4 setup shots should have good depth to push the opponent back.',
    'Each pair of shots to one side should move the opponent wider.',
    'The 5th shot is the kill shot -- take time and hit with conviction.',
    'This pattern works especially well against slower opponents.'
  ]
};

const partnerInsideOutFH: Drill = {
  id: 'partner-inside-out-fh',
  name: 'Inside-Out Forehand Progression',
  description: 'Practice the inside-out forehand by running around your backhand. One of the most effective aggressive patterns for club players.',
  instructions: [
    'Partner feeds balls to your backhand side.',
    'Run around the ball and hit an inside-out forehand to the ad court.',
    'Start with cooperative feeds and work up to more challenging ones.',
    'Focus on proper footwork: pivot, crossover, set up, hit.',
    'After 10 inside-out forehands, hit one inside-in (DTL) to keep opponent honest.',
    'Recovery is crucial -- get back to center after each shot.'
  ],
  duration: '10 min',
  category: 'PARTNER_PATTERN',
  level: 'intermediate',
  focus: ['inside-out forehand', 'footwork', 'forehand weapon', 'court positioning'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The key is getting far enough around the ball to hit a full forehand.',
    'Use open stance for quicker recovery.',
    'Mix in inside-in (DTL) to be unpredictable.',
    'This is one of the biggest weapons for KNLTB 5-level players.'
  ]
};

// ============================================================
// C) PARTNER APPROACH DRILLS
// ============================================================

const partnerShortBallAttack: Drill = {
  id: 'partner-short-ball-attack',
  name: 'Short Ball Attack',
  description: 'Partner feeds short balls and you practice attacking them with an approach shot and closing to the net.',
  instructions: [
    'Partner feeds a short ball (inside the service line).',
    'Sprint forward to the ball.',
    'Hit an approach shot (90% down the line, topspin).',
    'Continue forward and split step at the service line.',
    'Partner hits a passing shot -- you hit the volley.',
    'Reset and repeat.',
    'Practice approaching from both forehand and backhand sides.'
  ],
  duration: '10 min',
  category: 'PARTNER_APPROACH',
  level: 'intermediate',
  focus: ['approach shot', 'net approach', 'transition play', 'volley finishing'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'Approach down the line 90% of the time -- this reduces the passing angle.',
    'Do not stop after the approach -- continue forward to the net.',
    'The split step at the service line is essential for reacting to the pass.',
    'Hit the approach with depth -- a short approach is easy to pass.'
  ]
};

const partnerRallyApproachVolley: Drill = {
  id: 'partner-rally-approach-volley',
  name: 'Rally-to-Approach-to-Volley',
  description: 'Full sequence: rally from the baseline, wait for the short ball, approach, volley, put away. The complete attacking sequence.',
  instructions: [
    'Start with a cross-court rally.',
    'When a short ball comes, hit an approach shot down the line.',
    'Continue to the net with a split step.',
    'Volley the pass attempt.',
    'If the point continues, close to the net for a put-away volley.',
    'Play full points starting from the first short ball opportunity.',
    'Alternate who is attacking.'
  ],
  duration: '15 min',
  category: 'PARTNER_APPROACH',
  level: 'intermediate',
  focus: ['full approach sequence', 'pattern recognition', 'net finishing'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'Recognition of the short ball is the first skill -- practice seeing it early.',
    'The approach-split-volley sequence should feel like one fluid movement.',
    'If you get passed, analyze whether your approach was too short or poorly placed.'
  ]
};

const partnerTwoTouchFinish: Drill = {
  id: 'partner-two-touch-finish',
  name: 'Two-Touch Finish',
  description: 'After approaching the net, you have 2 volleys maximum to win the point. Develops aggressive net finishing.',
  instructions: [
    'Partner feeds a short ball.',
    'Hit your approach shot.',
    'You have a maximum of 2 more touches (volleys/overhead) to win the point.',
    'If you cannot win in 2 touches, the point goes to your opponent.',
    'This forces you to be aggressive and decisive at net.',
    'Keep score: point for winner within 2, point for opponent if not.'
  ],
  duration: '10 min',
  category: 'PARTNER_APPROACH',
  level: 'intermediate',
  focus: ['aggressive net play', 'volley placement', 'point finishing'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The first volley should set up the second -- hit it deep.',
    'The second volley should be the winner -- hit to the open court.',
    'If you need more than 2 volleys, your approach or first volley placement needs work.'
  ]
};

const partnerApproachDirection: Drill = {
  id: 'partner-approach-direction',
  name: 'Approach Shot Direction Drill',
  description: 'Practice hitting approach shots to different targets and observing which direction produces the best results.',
  instructions: [
    'Partner feeds short balls from various positions.',
    'Round 1: Hit every approach down the line (10 balls).',
    'Round 2: Hit every approach cross-court (10 balls).',
    'Round 3: Hit every approach to the opponent\'s weaker side (10 balls).',
    'After each approach, play the point out.',
    'Track which direction produces the most winning volleys.'
  ],
  duration: '15 min',
  category: 'PARTNER_APPROACH',
  level: 'intermediate',
  focus: ['approach shot direction', 'tactical awareness', 'passing angle reduction'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'Down-the-line approaches reduce the passing angle the most.',
    'Cross-court approaches can wrong-foot opponents but leave more passing angle.',
    'Approaching to the weaker side (usually backhand) produces more errors.'
  ]
};

// ============================================================
// D) PARTNER SERVE DRILLS
// ============================================================

const partnerWideServeOpenFH: Drill = {
  id: 'partner-wide-serve-open-fh',
  name: 'Wide Serve + Open Court Forehand',
  description: 'Serve wide to pull the opponent off court, then attack the open court with a forehand. The most effective serve+1 pattern in the deuce court.',
  instructions: [
    'Serve wide in the deuce court (slice or flat).',
    'The return will likely come back to the middle or cross-court.',
    'Move to hit an inside-out or inside-in forehand to the open court.',
    'The open court is the ad side of the court.',
    'Practice the serve-to-forehand transition movement.',
    'Play 10 points, all starting with a wide serve.'
  ],
  duration: '10 min',
  category: 'PARTNER_SERVE',
  level: 'intermediate',
  focus: ['serve+1', 'wide serve', 'open court attack', 'forehand weapon'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The wider the serve, the more open the court becomes.',
    'Do not wait for the return -- move toward the forehand side immediately.',
    'This pattern wins more free points than any other at the club level.',
    'Slice serves are effective for moving the receiver wide.'
  ]
};

const partnerTServeInsideOutFH: Drill = {
  id: 'partner-t-serve-inside-out-fh',
  name: 'T Serve + Inside-Out Forehand',
  description: 'Serve to the T to jam the opponent, then hit an inside-out forehand. Effective in both deuce and ad courts.',
  instructions: [
    'Serve to the T (center of the service box).',
    'The T serve limits the return angle.',
    'Returns often come back to the middle -- run around for an inside-out forehand.',
    'Hit the inside-out forehand deep to the ad court.',
    'Practice reading the return direction after the T serve.',
    'Play 10 points from the T serve starting position.'
  ],
  duration: '10 min',
  category: 'PARTNER_SERVE',
  level: 'intermediate',
  focus: ['serve+1', 'T serve', 'inside-out forehand', 'court control'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The T serve keeps the returner in the middle, giving you the whole court to attack.',
    'In the ad court, the T serve targets the backhand.',
    'The inside-out forehand from the middle is a devastating weapon.'
  ]
};

const partnerBodyServeAttack: Drill = {
  id: 'partner-body-serve-attack',
  name: 'Body Serve + Attack',
  description: 'Serve at the opponent\'s body to jam them, producing a weak return that you can attack. Underused but highly effective pattern.',
  instructions: [
    'Serve directly at the opponent\'s body (hip area).',
    'Body serves are hard to return with pace or angle.',
    'The return will typically be short and weak.',
    'Attack the weak return aggressively to either side.',
    'Practice both flat and kick body serves.',
    'Play 10 points starting with body serves.'
  ],
  duration: '10 min',
  category: 'PARTNER_SERVE',
  level: 'intermediate',
  focus: ['body serve', 'jamming returns', 'attacking weak returns'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The body serve is the most underused serve at the club level.',
    'Opponents must move out of the way to hit -- this causes late contact.',
    'Even a moderate-speed body serve is effective because of the awkward position.',
    'Follow up aggressively -- the return will be weak.'
  ]
};

const partnerKickServeApproach: Drill = {
  id: 'partner-kick-serve-approach',
  name: 'Kick Serve + Approach',
  description: 'Hit a heavy kick serve that bounces high, then approach the net on the weak return. The kick-and-come-in pattern.',
  instructions: [
    'Hit a kick serve with heavy topspin (brush up the back of the ball).',
    'The high bounce forces the returner to hit from an awkward height.',
    'Move inside the baseline after the serve.',
    'If the return is weak, approach the net and finish with a volley.',
    'If the return is strong, stay back and rally.',
    'Practice the read: approach on weak returns, stay back on strong ones.'
  ],
  duration: '10 min',
  category: 'PARTNER_SERVE',
  level: 'advanced',
  focus: ['kick serve', 'serve and volley light', 'net approach', 'read and react'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The kick serve is your best weapon for generating weak returns.',
    'You do not have to commit to the net -- read the return first.',
    'A high-bouncing kick serve to the backhand is particularly effective.',
    'This is "serve and volley lite" -- approach only on weak returns.'
  ]
};

const partnerServe1Decision: Drill = {
  id: 'partner-serve-1-decision',
  name: 'Serve+1 Decision Making',
  description: 'Practice reading the return and making the right decision for the serve+1 shot. The most important tactical drill for singles.',
  instructions: [
    'Serve from the deuce or ad court.',
    'After the serve, read the return and decide:',
    '- Weak return? Attack aggressively to the open court.',
    '- Deep return? Play a solid rally ball and wait for the next opportunity.',
    '- Short return? Approach the net.',
    'Play 10 points focusing only on the quality of your serve+1 decision.',
    'After each point, assess: was my decision correct?'
  ],
  duration: '15 min',
  category: 'PARTNER_SERVE',
  level: 'intermediate',
  focus: ['serve+1 decision making', 'tactical awareness', 'reading returns', 'shot selection'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The serve+1 is the most important shot pattern in tennis.',
    'A good decision on a moderate shot beats a great shot on a bad decision.',
    'Track your decisions: how many times did you choose correctly?',
    'This is the single highest-leverage improvement area for club players.'
  ]
};

// ============================================================
// E) PARTNER RETURN DRILLS
// ============================================================

const partnerDeepCCReturn: Drill = {
  id: 'partner-deep-cc-return',
  name: 'Deep Cross-Court Return',
  description: 'Practice returning serve deep cross-court -- the highest-percentage return in tennis. Focus on depth and consistency over aggression.',
  instructions: [
    'Partner serves from the deuce and ad courts.',
    'Return every serve deep cross-court.',
    'Target the back 1/3 of the court.',
    'Use a compact swing -- no big backswing.',
    'Focus on getting the ball back deep and in play.',
    'Track: how many returns land in the back 1/3?'
  ],
  duration: '10 min',
  category: 'PARTNER_RETURN',
  level: 'intermediate',
  focus: ['return of serve', 'deep returns', 'consistency', 'high percentage tennis'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'Deep cross-court return is the safest and most effective return.',
    'A compact backswing with good timing beats a big swing every time.',
    'Split step just before the serve is hit.',
    'On second serves, step inside the baseline and take the ball early.'
  ]
};

const partnerChipAndCharge: Drill = {
  id: 'partner-chip-and-charge',
  name: 'Chip and Charge Return',
  description: 'Slice the return and follow it to the net. An aggressive return tactic, especially effective against second serves.',
  instructions: [
    'Partner hits second serves (or slower first serves).',
    'Slice the return deep (chip) with a continental grip.',
    'Immediately follow the return forward to the net (charge).',
    'Split step at the service line.',
    'Volley the next ball.',
    'Practice from both deuce and ad courts.',
    'Use this primarily against second serves.'
  ],
  duration: '10 min',
  category: 'PARTNER_RETURN',
  level: 'intermediate',
  focus: ['chip and charge', 'net rushing', 'slice return', 'aggressive returns'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The chip should be deep and low -- slice keeps the ball low.',
    'Do not wait to see where the chip goes -- start moving forward immediately.',
    'This is devastating against weak second serves.',
    'In doubles, this is a standard tactic for the returning team.'
  ]
};

const partnerReturnAggression: Drill = {
  id: 'partner-return-aggression',
  name: 'Return + Immediate Aggression',
  description: 'Hit an aggressive return and immediately look to attack on the next ball. Builds a proactive return mindset.',
  instructions: [
    'Partner serves.',
    'Hit an aggressive return (not reckless -- controlled aggression).',
    'Immediately move inside the baseline looking for the next ball.',
    'If the serve+1 is weak, attack it.',
    'If the serve+1 is strong, recover and rally.',
    'Play 10 points: score bonus points for winners within 3 shots of the return.'
  ],
  duration: '10 min',
  category: 'PARTNER_RETURN',
  level: 'advanced',
  focus: ['aggressive returning', 'return+1', 'taking initiative', 'offensive tennis'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'Aggression on the return means early contact and offensive placement, not just power.',
    'Step inside the baseline after the return to take time away from the server.',
    'This is how you pressure weaker servers.',
    'The return+1 (your second shot) is as important as the return itself.'
  ]
};

// ============================================================
// F) BACKHAND DRILLS
// ============================================================

const bhShortSwingServiceBox: Drill = {
  id: 'bh-short-swing-service-box',
  name: 'Short Swing Service Box Rally',
  description: 'Rally backhands in the service boxes with abbreviated swings. Isolates the contact zone and teaches clean ball-striking without relying on a big swing.',
  instructions: [
    'Both players stand at the service line.',
    'Rally backhand to backhand, keeping balls in the service box.',
    'Use a shortened swing -- focus on clean contact.',
    'The racquet should not go past your body on the backswing.',
    'Keep the ball low over the net.',
    'Count consecutive balls in the service box.'
  ],
  duration: '5 min',
  category: 'BACKHAND_DRILLS',
  level: 'beginner',
  focus: ['backhand contact point', 'clean hitting', 'control', 'feel'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'This drill eliminates the backswing as a source of error.',
    'Focus on the feel of a clean hit in the center of the strings.',
    'If you can control the ball with a short swing, the full swing will be better too.'
  ]
};

const bhLiftBallUp: Drill = {
  id: 'bh-lift-ball-up',
  name: 'Lift the Ball Up',
  description: 'Focus on the low-to-high swing path of the topspin backhand. Drop the racquet head below the ball and brush up.',
  instructions: [
    'Partner feeds balls to your backhand side.',
    'Drop the racquet head below the ball before contact.',
    'Swing from low to high, brushing up the back of the ball.',
    'Exaggerate the upward swing path.',
    'The ball should arc high over the net with topspin.',
    'Focus on the "lifting" sensation.',
    'Do 30 balls focusing purely on the upward swing path.'
  ],
  duration: '8 min',
  category: 'BACKHAND_DRILLS',
  level: 'beginner',
  focus: ['topspin production', 'low-to-high swing path', 'backhand mechanics'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'If the ball is not rotating, your swing is too flat.',
    'The racquet drop should be natural, not forced.',
    'Think about brushing UP the back of the ball, not hitting THROUGH it.',
    'For one-handed backhand: the wrist leads, not the elbow.'
  ]
};

const bhAlleyRally: Drill = {
  id: 'bh-alley-rally',
  name: 'Alley Rally',
  description: 'Rally backhands targeting only the doubles alley. Develops directional control and DTL backhand accuracy.',
  instructions: [
    'Both players stand on the same side of the court.',
    'Rally backhands targeting the doubles alley.',
    'Only balls landing in the alley count.',
    'This drill forces precise directional control.',
    'Keep score: most alley hits out of 20 balls wins.',
    'This develops the DTL backhand needed for pattern play.'
  ],
  duration: '8 min',
  category: 'BACKHAND_DRILLS',
  level: 'intermediate',
  focus: ['directional control', 'DTL backhand', 'precision', 'target practice'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The alley is only 1.37m wide -- this demands accuracy.',
    'Aim is more important than power here.',
    'This drill builds the DTL backhand that opens up the 3-1 pattern.'
  ]
};

const bhCCServiceLine: Drill = {
  id: 'bh-cc-service-line',
  name: 'Cross-Court from Service Line',
  description: 'Rally backhands cross-court from the service line to develop angle and topspin. The shorter distance makes errors more forgiving.',
  instructions: [
    'Both players stand at the service line.',
    'Rally backhands cross-court only.',
    'Focus on creating angle with the cross-court shot.',
    'Keep the ball below net height on your side.',
    'Use topspin to bring the ball down.',
    'Gradually increase pace as consistency improves.'
  ],
  duration: '8 min',
  category: 'BACKHAND_DRILLS',
  level: 'beginner',
  focus: ['cross-court angle', 'topspin', 'consistency', 'short court control'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The cross-court backhand is the most important defensive shot in singles.',
    'Consistent cross-court backhands keep you in every rally.',
    'Start at the service line to build confidence before moving to baseline.'
  ]
};

const bhBrushDrill: Drill = {
  id: 'bh-brush-drill',
  name: 'Brush Drill',
  description: 'Exaggerate the brushing motion on the backhand to develop heavy topspin. Focuses on the racquet-ball interaction at contact.',
  instructions: [
    'Partner feeds balls at a moderate pace to your backhand.',
    'Instead of hitting through the ball, focus on BRUSHING up the back of it.',
    'Exaggerate the upward motion -- aim for maximum spin.',
    'The ball should arc high over the net and drop sharply.',
    'Listen for the brushing sound at contact.',
    'Do 20 balls focusing purely on the spin production.'
  ],
  duration: '8 min',
  category: 'BACKHAND_DRILLS',
  level: 'intermediate',
  focus: ['heavy topspin', 'racquet brush', 'spin production', 'backhand weapon'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'You should hear a distinct brushing sound at contact.',
    'The ball should bounce higher than usual on the other side.',
    'Heavy topspin backhands are a weapon on clay courts.',
    'Think about accelerating UP at contact, not just through.'
  ]
};

const bhMiniCourtTopspin: Drill = {
  id: 'bh-mini-court-topspin',
  name: 'Mini-Court Topspin Backhand',
  description: 'Rally with topspin backhands in a mini-court (service boxes). Develops spin and control in a forgiving space.',
  instructions: [
    'Both players stand inside the service line.',
    'Rally using only topspin backhands.',
    'All balls must bounce in the service box.',
    'Focus on generating topspin to keep the ball short.',
    'Use a full (but controlled) backhand motion.',
    'Count consecutive topspin backhands in the service box.'
  ],
  duration: '5 min',
  category: 'BACKHAND_DRILLS',
  level: 'beginner',
  focus: ['topspin control', 'feel', 'spin mastery', 'touch'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'This is harder than it sounds -- topspin wants to go deep.',
    'You need to manage spin rate and swing speed.',
    'If you can control topspin in the service box, you can control it anywhere.'
  ]
};

const bhWallBackhands: Drill = {
  id: 'bh-wall-backhands',
  name: 'Wall Backhands',
  description: 'Continuous backhand practice against a wall. The wall provides rapid repetitions for grooving the backhand technique.',
  instructions: [
    'Stand 3-4 meters from a wall.',
    'Hit continuous backhands against the wall.',
    'Focus on the coil-drop-extend sequence.',
    'Keep the ball at a consistent height on the wall.',
    'Count consecutive clean backhands.',
    'Practice both topspin and slice.',
    'Aim for 30+ consecutive backhands.'
  ],
  duration: '5 min',
  category: 'BACKHAND_DRILLS',
  level: 'beginner',
  focus: ['backhand repetition', 'technique grooving', 'consistency'],
  equipment: ['racquet', 'ball', 'wall'],
  partnerRequired: false,
  tips: [
    'The wall gives you more repetitions in 5 minutes than 30 minutes of rallying.',
    'Focus on one technical element at a time.',
    'Great for building backhand confidence when you cannot get on court.'
  ]
};

const bhPointPlayBHOnly: Drill = {
  id: 'bh-point-play-bh-only',
  name: 'Point Play: Backhand Only',
  description: 'Play points using only backhands. Forces you to build points and win with your backhand. Removes the forehand crutch.',
  instructions: [
    'Play regular points but both players can only use backhands.',
    'Every shot must be a backhand (topspin or slice).',
    'Serve can be normal, but after the serve, backhands only.',
    'Play a set or first to 10 points.',
    'This forces you to find ways to win with the backhand.',
    'Notice how your backhand improves when it is the only option.'
  ],
  duration: '15 min',
  category: 'BACKHAND_DRILLS',
  level: 'intermediate',
  focus: ['backhand confidence', 'backhand point construction', 'removing forehand dependence'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'This is one of the most effective drills for developing a reliable backhand.',
    'You will discover backhand angles you never knew you had.',
    'Many club players avoid the backhand -- this drill eliminates that habit.',
    'The slice backhand counts as a backhand.'
  ]
};

// ============================================================
// G) FOREHAND DRILLS
// ============================================================

const fhNewGripRally: Drill = {
  id: 'fh-new-grip-rally',
  name: 'New Grip Rally (100 Balls)',
  description: 'If transitioning to a modern semi-western grip, dedicate extended rally time with the new grip. 100 ball rally to build muscle memory.',
  instructions: [
    'Set the semi-western grip before starting.',
    'Rally forehands cooperatively with a partner.',
    'Do NOT switch back to the old grip, no matter what.',
    'Accept that the first 50 balls may feel awkward.',
    'Focus on the new grip becoming natural.',
    'Count to 100 total forehands.',
    'Journal how the grip feels at ball 25, 50, 75, and 100.'
  ],
  duration: '15 min',
  category: 'FOREHAND_DRILLS',
  level: 'intermediate',
  focus: ['grip transition', 'muscle memory', 'modern forehand', 'commitment to change'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The first sessions with a new grip will feel terrible -- this is normal.',
    'Commit to at least 2 weeks before judging the new grip.',
    'The semi-western grip naturally produces more topspin.',
    'Do this drill every hitting session during the grip transition period.'
  ]
};

const fhUnitTurnShadow: Drill = {
  id: 'fh-unit-turn-shadow',
  name: 'Unit Turn Shadow Drill',
  description: 'Practice the unit turn (shoulder rotation) that initiates the forehand. The most important part of forehand preparation.',
  instructions: [
    'Stand in ready position.',
    'On a cue (partner call, self-timed), perform the unit turn:',
    '- Turn shoulders 90 degrees so your non-dominant shoulder faces the net.',
    '- Keep the racquet in front of you -- it turns WITH the shoulders.',
    '- Do NOT take the racquet back separately.',
    'Hold the coiled position for 2 seconds.',
    'Return to ready position.',
    'Repeat 30 times.'
  ],
  duration: '5 min',
  category: 'FOREHAND_DRILLS',
  level: 'beginner',
  focus: ['unit turn', 'preparation', 'shoulder rotation', 'coil'],
  equipment: ['racquet'],
  partnerRequired: false,
  tips: [
    'The unit turn replaces the arm-only backswing.',
    'Your racquet should not go behind your body during the unit turn.',
    'The unit turn loads the kinetic chain for power.',
    'This single change transforms a choppy forehand into a fluid modern stroke.'
  ]
};

const fhServiceBoxTopspin: Drill = {
  id: 'fh-service-box-topspin',
  name: 'Service Box Topspin Rally',
  description: 'Rally forehands with topspin in the service box. Develops spin feel and control at close range before extending to full court.',
  instructions: [
    'Both players stand at the service line.',
    'Rally with topspin forehands only.',
    'All balls must land in the service box.',
    'Focus on the low-to-high swing path.',
    'Gradually increase spin as control improves.',
    'Count consecutive topspin forehands in the service box.'
  ],
  duration: '8 min',
  category: 'FOREHAND_DRILLS',
  level: 'beginner',
  focus: ['topspin development', 'feel', 'control', 'short court mastery'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'If transitioning to a modern forehand, start here before going full court.',
    'The ability to control topspin in a small space is the foundation.',
    'Listen for the brushing sound at contact.'
  ]
};

const fh34CourtTopspin: Drill = {
  id: 'fh-34-court-topspin',
  name: '3/4 Court Topspin Forehand',
  description: 'Rally from 3/4 court depth, focusing on generating topspin with depth. The bridge between mini-court and full-court play.',
  instructions: [
    'Both players stand at 3/4 court (between service line and baseline).',
    'Rally with topspin forehands.',
    'Focus on getting good net clearance with spin.',
    'Aim for the ball to land between the service line and baseline.',
    'Gradually increase power while maintaining spin.',
    'When 20 consecutive balls land with good depth, move to full baseline.'
  ],
  duration: '10 min',
  category: 'FOREHAND_DRILLS',
  level: 'intermediate',
  focus: ['topspin depth', 'progressive distance', 'building power with spin'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'This is the critical middle step in developing a modern forehand.',
    'Add power gradually -- spin first, then power.',
    'Net clearance should be 2-4 feet with heavy topspin.'
  ]
};

const fhWindshieldWiper: Drill = {
  id: 'fh-windshield-wiper',
  name: 'Windshield Wiper Exaggeration',
  description: 'Exaggerate the windshield wiper follow-through to develop the pronation that creates heavy topspin on the modern forehand.',
  instructions: [
    'Partner feeds moderate-pace balls to your forehand.',
    'After contact, exaggerate the windshield wiper motion:',
    '- Pronate the forearm so the racquet wraps around to your non-dominant side.',
    '- The racquet face should end up pointing to the ground on your left (for right-handers).',
    'The finish should feel like you are wiping a windshield.',
    'Focus on the feeling, not where the ball goes initially.',
    'Do 30 balls focusing purely on the wiper finish.'
  ],
  duration: '8 min',
  category: 'FOREHAND_DRILLS',
  level: 'intermediate',
  focus: ['windshield wiper finish', 'topspin production', 'forearm pronation', 'modern forehand'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The wiper creates the heavy topspin that defines the modern forehand.',
    'Start with gentle feeds and exaggerate the motion.',
    'The ball may go all over the place initially -- focus on the motion, not placement.',
    'This is a feel drill -- once you feel the wiper, it becomes natural.'
  ]
};

const fhOpenStancePower: Drill = {
  id: 'fh-open-stance-power',
  name: 'Open Stance Power Drill',
  description: 'Practice the open-stance forehand specifically for power generation. Develops hip rotation as the primary power source.',
  instructions: [
    'Partner feeds moderately paced balls to your forehand.',
    'Set up in an open stance (facing the net, right foot back for right-handers).',
    'Load your weight onto the back foot during the unit turn.',
    'Drive the hips forward and rotate explosively.',
    'The power comes from the hip rotation, not the arm.',
    'Follow through with the windshield wiper finish.',
    'Practice 30 open-stance forehands focusing on hip-driven power.'
  ],
  duration: '10 min',
  category: 'FOREHAND_DRILLS',
  level: 'intermediate',
  focus: ['open stance', 'hip rotation', 'power generation', 'modern forehand mechanics'],
  equipment: ['racquets', 'balls', 'court'],
  partnerRequired: true,
  tips: [
    'The open stance is more efficient for returning to center after wide balls.',
    'Power sequence: load back foot -> rotate hips -> trunk follows -> arm follows -> wiper.',
    'If you feel the power in your arm, you are doing it wrong.',
    'The hip rotation should feel like you are throwing your hip at the ball.'
  ]
};

// ============================================================
// H) CONDITIONING DRILLS
// ============================================================

const conditioningXDrill: Drill = {
  id: 'conditioning-x-drill',
  name: 'X Drill',
  description: 'Four-corner sprint drill that simulates the diagonal movement patterns in tennis. High-intensity conditioning with sport-specific movement.',
  instructions: [
    'Set up 4 cones in a rectangle (the corners of the service box work well).',
    'Start at the bottom-left cone.',
    'Sprint diagonally to the top-right cone.',
    'Side shuffle to the top-left cone.',
    'Sprint diagonally to the bottom-right cone.',
    'Side shuffle back to the start.',
    'This traces an X pattern.',
    'Rest 30 seconds between repetitions.'
  ],
  duration: '10 min',
  category: 'CONDITIONING',
  level: 'intermediate',
  focus: ['speed', 'agility', 'direction changes', 'tennis-specific conditioning'],
  equipment: ['4 cones or markers'],
  partnerRequired: false,
  tips: [
    'Sprint the diagonals, shuffle the straight lines.',
    'Touch each cone with your hand as you arrive.',
    'Keep hips low during the shuffles.',
    'This replicates the movement patterns of a rally.'
  ]
};

const conditioningLateralBurns: Drill = {
  id: 'conditioning-lateral-burns',
  name: 'Lateral Burns',
  description: 'Continuous side-to-side shuffles between the singles sidelines. Builds lateral endurance specific to baseline tennis.',
  instructions: [
    'Start at one singles sideline.',
    'Side shuffle to the other singles sideline.',
    'Touch the line with your hand.',
    'Immediately shuffle back.',
    'Continue for 30 seconds without stopping.',
    'Rest 30 seconds.',
    'Repeat for prescribed sets.'
  ],
  duration: '8 min',
  category: 'CONDITIONING',
  level: 'intermediate',
  focus: ['lateral endurance', 'side-to-side speed', 'baseline movement stamina'],
  equipment: ['court or marked area'],
  partnerRequired: false,
  tips: [
    'Stay low throughout -- do not stand up between shuffles.',
    'The burn in your quads and hips is the point -- push through it.',
    'This builds the specific endurance for long baseline rallies.'
  ]
};

const conditioningSuicides: Drill = {
  id: 'conditioning-forward-lateral-suicides',
  name: 'Forward-Lateral Suicides',
  description: 'Sprint to progressive lines on the court and back, combining forward sprints with lateral shuffles. Ultimate tennis conditioning drill.',
  instructions: [
    'Start at the baseline.',
    'Sprint to the service line, touch it, sprint back.',
    'Sprint to the net, touch it, sprint back.',
    'Sprint to the far service line, touch it, sprint back.',
    'Sprint to the far baseline, touch it, sprint back.',
    'On the way back each time, use side shuffles instead of turning.',
    'Rest 1 minute between sets.'
  ],
  duration: '10 min',
  category: 'CONDITIONING',
  level: 'advanced',
  focus: ['cardiovascular conditioning', 'speed endurance', 'recovery', 'mental toughness'],
  equipment: ['court'],
  partnerRequired: false,
  tips: [
    'This is brutal but extremely effective for match fitness.',
    'Sprint forward, shuffle backward for safety.',
    'The fatigue in later sets simulates late-match pressure.',
    'Start with 3 sets, build to 5.'
  ]
};

// ============================================================
// EXPORTS
// ============================================================

export const wallDrills: Drill[] = [
  wallBallBounce,
  wallMiniCourtVolleys,
  wallHandToss,
  wallFirstVolley,
  wallGroundToVolley,
  wallBackhandSlice,
  wallReflexVolley,
  wallContinuousRally,
  wallServeAndSecond,
  wallShadowFootwork
];

export const partnerPatternDrills: Drill[] = [
  partnerFigure8,
  partner31,
  partnerCCToOpen,
  partner221,
  partnerInsideOutFH
];

export const partnerApproachDrills: Drill[] = [
  partnerShortBallAttack,
  partnerRallyApproachVolley,
  partnerTwoTouchFinish,
  partnerApproachDirection
];

export const partnerServeDrills: Drill[] = [
  partnerWideServeOpenFH,
  partnerTServeInsideOutFH,
  partnerBodyServeAttack,
  partnerKickServeApproach,
  partnerServe1Decision
];

export const partnerReturnDrills: Drill[] = [
  partnerDeepCCReturn,
  partnerChipAndCharge,
  partnerReturnAggression
];

export const backhandDrills: Drill[] = [
  bhShortSwingServiceBox,
  bhLiftBallUp,
  bhAlleyRally,
  bhCCServiceLine,
  bhBrushDrill,
  bhMiniCourtTopspin,
  bhWallBackhands,
  bhPointPlayBHOnly
];

export const forehandDrills: Drill[] = [
  fhNewGripRally,
  fhUnitTurnShadow,
  fhServiceBoxTopspin,
  fh34CourtTopspin,
  fhWindshieldWiper,
  fhOpenStancePower
];

export const conditioningDrills: Drill[] = [
  conditioningXDrill,
  conditioningLateralBurns,
  conditioningSuicides
];

/** All drills in the system, flat array */
export const allDrills: Drill[] = [
  ...wallDrills,
  ...partnerPatternDrills,
  ...partnerApproachDrills,
  ...partnerServeDrills,
  ...partnerReturnDrills,
  ...backhandDrills,
  ...forehandDrills,
  ...conditioningDrills
];

/** Drills grouped by category */
export const drillsByCategory: Record<string, Drill[]> = {
  WALL_DRILLS: wallDrills,
  PARTNER_PATTERN: partnerPatternDrills,
  PARTNER_APPROACH: partnerApproachDrills,
  PARTNER_SERVE: partnerServeDrills,
  PARTNER_RETURN: partnerReturnDrills,
  BACKHAND_DRILLS: backhandDrills,
  FOREHAND_DRILLS: forehandDrills,
  CONDITIONING: conditioningDrills
};

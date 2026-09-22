// ===== PERSONALIZED PLAN GENERATOR =====

// Exercise library organized by movement pattern and goal focus
const EXERCISE_LIB = {
  push: {
    beginner: [
      { name: 'Push-Ups', sets: '2-3', reps: '10-15', rest: '45 sec', notes: 'Keep core tight, chest to floor' },
      { name: 'Dumbbell Chest Press', sets: '2-3', reps: '10-12', rest: '60 sec', notes: 'Control the weight down' },
      { name: 'Overhead Dumbbell Press', sets: '2-3', reps: '10-12', rest: '60 sec', notes: 'Don\'t arch your back' },
      { name: 'Dumbbell Lateral Raise', sets: '2', reps: '12-15', rest: '45 sec', notes: 'Lead with elbows, light weight' },
      { name: 'Tricep Dips (bench)', sets: '2', reps: '10-12', rest: '45 sec', notes: 'Use a bench or chair' }
    ],
    intermediate: [
      { name: 'Barbell Bench Press', sets: '3-4', reps: '8-10', rest: '90 sec', notes: 'Feet flat, slight arch' },
      { name: 'Incline Dumbbell Press', sets: '3', reps: '8-10', rest: '75 sec', notes: '30-45 degree incline' },
      { name: 'Standing Overhead Press', sets: '3-4', reps: '6-8', rest: '90 sec', notes: 'Core braced, press straight up' },
      { name: 'Dumbbell Lateral Raise', sets: '3', reps: '10-12', rest: '45 sec', notes: 'Slight bend in elbows' },
      { name: 'Tricep Rope Pushdown', sets: '3', reps: '10-12', rest: '45 sec', notes: 'Keep elbows tucked' }
    ],
    advanced: [
      { name: 'Barbell Bench Press', sets: '4-5', reps: '5-8', rest: '2-3 min', notes: 'Full range, pause at bottom' },
      { name: 'Weighted Dips', sets: '3-4', reps: '6-10', rest: '90 sec', notes: 'Lean forward for chest' },
      { name: 'Standing Overhead Press', sets: '4', reps: '5-8', rest: '2 min', notes: 'Strict form, no leg drive' },
      { name: 'Incline Barbell Press', sets: '3-4', reps: '6-8', rest: '90 sec', notes: 'Focus on upper chest' },
      { name: 'Skull Crushers', sets: '3', reps: '8-10', rest: '60 sec', notes: 'Lower to forehead, extend' }
    ]
  },
  pull: {
    beginner: [
      { name: 'Inverted Row (or Band Row)', sets: '2-3', reps: '10-12', rest: '45 sec', notes: 'Pull chest to bar, squeeze shoulder blades' },
      { name: 'Dumbbell Bent Over Row', sets: '2-3', reps: '10-12', rest: '60 sec', notes: 'Flat back, pull to hip' },
      { name: 'Lat Pulldown (or Band Pulldown)', sets: '2-3', reps: '10-12', rest: '60 sec', notes: 'Pull to upper chest, squeeze lats' },
      { name: 'Face Pulls (band or cable)', sets: '2-3', reps: '12-15', rest: '45 sec', notes: 'Pull to face, external rotation' },
      { name: 'Dumbbell Bicep Curl', sets: '2', reps: '10-12', rest: '45 sec', notes: 'No swinging, control the lowering' }
    ],
    intermediate: [
      { name: 'Pull-Ups (or Assisted)', sets: '3-4', reps: '6-10', rest: '90 sec', notes: 'Full hang, pull to upper chest' },
      { name: 'Barbell Bent Over Row', sets: '3-4', reps: '8-10', rest: '90 sec', notes: 'Flat back, pull to lower chest' },
      { name: 'Seated Cable Row', sets: '3', reps: '10-12', rest: '60 sec', notes: 'Squeeze shoulder blades together' },
      { name: 'Single Arm Dumbbell Row', sets: '3', reps: '8-10 each', rest: '60 sec', notes: 'Brace on bench, pull to hip' },
      { name: 'Barbell Bicep Curl', sets: '3', reps: '8-10', rest: '60 sec', notes: 'Strict, no momentum' }
    ],
    advanced: [
      { name: 'Weighted Pull-Ups', sets: '4-5', reps: '5-8', rest: '2 min', notes: 'Full range, controlled descent' },
      { name: 'Barbell Bent Over Row', sets: '4-5', reps: '6-8', rest: '2 min', notes: 'Heavy, strict form' },
      { name: 'Chest Supported Row', sets: '3-4', reps: '8-10', rest: '90 sec', notes: 'No lower back strain' },
      { name: 'Straight Arm Pulldown', sets: '3', reps: '12-15', rest: '45 sec', notes: 'Focus on lats, no elbow bend' },
      { name: 'Hammer Curls', sets: '3-4', reps: '8-10', rest: '60 sec', notes: 'Palms facing each other' }
    ]
  },
  legs: {
    beginner: [
      { name: 'Goblet Squat', sets: '2-3', reps: '10-15', rest: '60 sec', notes: 'Hold one dumbbell at chest, squat deep' },
      { name: 'Reverse Lunges', sets: '2-3', reps: '10-12 each leg', rest: '45 sec', notes: 'Step back, keep front knee behind toe' },
      { name: 'Dumbbell RDL', sets: '2-3', reps: '10-12', rest: '60 sec', notes: 'Soft knees, hinge at hips, feel stretch' },
      { name: 'Step-Ups', sets: '2', reps: '10-12 each leg', rest: '45 sec', notes: 'Use a bench or box, drive through heel' },
      { name: 'Calf Raises', sets: '2-3', reps: '15-20', rest: '30 sec', notes: 'Full stretch at bottom, squeeze at top' }
    ],
    intermediate: [
      { name: 'Barbell Back Squat', sets: '3-4', reps: '8-10', rest: '90 sec', notes: 'Depth below parallel, chest up' },
      { name: 'Romanian Deadlift', sets: '3-4', reps: '8-10', rest: '90 sec', notes: 'Bar close to legs, hinge at hips' },
      { name: 'Walking Lunges', sets: '3', reps: '10-12 each leg', rest: '60 sec', notes: 'Long strides, control descent' },
      { name: 'Leg Press', sets: '3', reps: '10-12', rest: '90 sec', notes: 'Don\'t lock out, keep lower back flat' },
      { name: 'Lying Leg Curl', sets: '3', reps: '10-12', rest: '60 sec', notes: 'Controlled, squeeze at top' }
    ],
    advanced: [
      { name: 'Barbell Back Squat', sets: '4-5', reps: '5-8', rest: '2-3 min', notes: 'Heavy, full depth, controlled' },
      { name: 'Deadlift', sets: '3-5', reps: '3-6', rest: '2-3 min', notes: 'Flat back, drive through floor' },
      { name: 'Bulgarian Split Squat', sets: '3-4', reps: '8-10 each leg', rest: '90 sec', notes: 'Back foot elevated, torso slightly forward' },
      { name: 'Hack Squat or Leg Press', sets: '3-4', reps: '8-10', rest: '90 sec', notes: 'Deep range, no knee lockout' },
      { name: 'Leg Curl + Leg Extension Superset', sets: '3', reps: '10-12', rest: '60 sec', notes: 'No rest between, 90 sec after pair' }
    ]
  },
  core: {
    beginner: [
      { name: 'Plank', sets: '2-3', reps: '20-40 sec', rest: '30 sec', notes: 'Straight line, don\'t sag hips' },
      { name: 'Dead Bug', sets: '2-3', reps: '8-10 each side', rest: '30 sec', notes: 'Lower back pressed into floor' },
      { name: 'Bird Dog', sets: '2-3', reps: '8-10 each side', rest: '30 sec', notes: 'Extend opposite arm and leg' },
      { name: 'Side Plank', sets: '2', reps: '20-30 sec each side', rest: '30 sec', notes: 'Hips lifted, straight line' }
    ],
    intermediate: [
      { name: 'Plank with Shoulder Tap', sets: '3', reps: '10-12 taps each side', rest: '30 sec', notes: 'Keep hips still while tapping' },
      { name: 'Hanging Knee Raise', sets: '3', reps: '10-15', rest: '45 sec', notes: 'Controlled, no swinging' },
      { name: 'Russian Twist', sets: '3', reps: '12-15 each side', rest: '45 sec', notes: 'Feet elevated, control rotation' },
      { name: 'Cable Crunch', sets: '3', reps: '12-15', rest: '45 sec', notes: 'Crunch rib cage to pelvis, not hip flex' }
    ],
    advanced: [
      { name: 'Hanging Leg Raise', sets: '3-4', reps: '8-12', rest: '60 sec', notes: 'Raise to parallel or above, controlled' },
      { name: 'Ab Wheel Rollout', sets: '3', reps: '8-12', rest: '60 sec', notes: 'Don\'t let hips sag, roll out as far as you can' },
      { name: 'Weighted Plank', sets: '3', reps: '30-60 sec', rest: '45 sec', notes: 'Plate on back, maintain form' },
      { name: 'Decline Crunch', sets: '3-4', reps: '12-15', rest: '45 sec', notes: 'Emphasis on lower abs' }
    ]
  },
  conditioning: {
    beginner: [
      { name: 'Jumping Jacks', sets: '2-3', reps: '30-45 sec', rest: '30 sec', notes: 'Keep a steady rhythm' },
      { name: 'High Knees (slow)', sets: '2-3', reps: '20-30 sec', rest: '30 sec', notes: 'Lift knees to waist height' },
      { name: 'Jump Rope (or simulated)', sets: '2-3', reps: '30-45 sec', rest: '30 sec', notes: 'Light bounces, wrists not arms' },
      { name: 'Mountain Climbers (slow)', sets: '2', reps: '20-30 sec', rest: '30 sec', notes: 'Drive knees, keep hips down' }
    ],
    intermediate: [
      { name: 'Burpees', sets: '3', reps: '10-15', rest: '60 sec', notes: 'Full extension, chest to floor' },
      { name: 'Jump Rope', sets: '3', reps: '60 sec', rest: '30 sec', notes: 'Fast pace, variations if possible' },
      { name: 'Mountain Climbers', sets: '3', reps: '30-45 sec', rest: '30 sec', notes: 'Fast and controlled' },
      { name: 'Box Jumps', sets: '3', reps: '8-10', rest: '60 sec', notes: 'Land soft, step down (don\'t jump down)' }
    ],
    advanced: [
      { name: 'Burpee Broad Jumps', sets: '3-4', reps: '8-12', rest: '90 sec', notes: 'Burpee into a broad jump forward' },
      { name: 'Sprint Intervals (treadmill or field)', sets: '4-6', reps: '30 sec sprint / 60 sec rest', rest: '60 sec', notes: 'Max effort sprints' },
      { name: 'Box Jumps + Step Down + Repeat', sets: '4', reps: '10-12', rest: '60 sec', notes: 'Explosive up, controlled down' },
      { name: 'Kettlebell Swings', sets: '4', reps: '15-20', rest: '60 sec', notes: 'Hip hinge, snap at top, arms just guide' }
    ]
  }
};

// Goal-based configuration: which categories to emphasize, rep ranges, rest periods
const GOAL_CONFIG = {
  muscle_gain: {
    name: 'Muscle Gain',
    description: 'A hypertrophy-focused program designed to build lean muscle mass. Moderate to high volume with controlled rest periods to maximize growth.',
    split: { push: 2, pull: 2, legs: 2, core: 1, conditioning: 1 },
    repRange: '8-12',
    restStyle: '60-90 sec',
    notes: 'Focus on progressive overload. Try to add weight or reps each week. Eat in a slight calorie surplus with 0.7-1g protein per lb of bodyweight.'
  },
  fat_loss: {
    name: 'Fat Loss',
    description: 'A high-energy program to burn fat and reveal your hard-earned muscle. Higher reps, shorter rest, and conditioning work to keep your heart rate up.',
    split: { push: 2, pull: 2, legs: 2, core: 2, conditioning: 2 },
    repRange: '12-20',
    restStyle: '30-45 sec',
    notes: 'Pair this with a calorie deficit. Prioritize protein (0.7-1g per lb) to preserve muscle while losing fat. Stay consistent — results compound over weeks.'
  },
  strength: {
    name: 'Strength',
    description: 'A strength-building program focused on moving heavy weight with perfect form. Lower reps, heavier loads, and long rest to recover for the next heavy set.',
    split: { push: 2, pull: 2, legs: 2, core: 1, conditioning: 0 },
    repRange: '3-6',
    restStyle: '2-3 min',
    notes: 'This is a strength program — the weight should feel heavy by the last rep. Track your lifts and aim to add weight regularly. Warm up thoroughly before heavy sets.'
  },
  sports_performance: {
    name: 'Sports Performance',
    description: 'Built for athletes who need strength, speed, and power on the field. Combines heavy lifting with plyometrics and conditioning to make you faster and more explosive.',
    split: { push: 2, pull: 2, legs: 3, core: 2, conditioning: 2 },
    repRange: '3-8 (strength) / 6-10 (power)',
    restStyle: '90 sec - 2 min (strength) / 60 sec (conditioning)',
    notes: 'Do your speed and plyometric work first when you\'re fresh. Lift heavy but prioritize form — you\'re training to perform, not just to lift.'
  },
  general_fitness: {
    name: 'General Fitness',
    description: 'A balanced program that keeps you strong, mobile, and healthy. Full-body workouts covering all major movement patterns with a mix of strength and conditioning.',
    split: { push: 2, pull: 2, legs: 2, core: 2, conditioning: 2 },
    repRange: '10-15',
    restStyle: '45-75 sec',
    notes: 'The goal here is consistency and longevity. Show up, do the work, and you\'ll stay strong and feel great. Add variety to keep it interesting.'
  }
};

// Injury modifications: exercises to avoid or substitute
const INJURY_GUIDANCE = {
  knee: {
    avoid: ['Jump Rope', 'Box Jumps', 'Burpees', 'Jump Squats', 'Lunges (deep)', 'Leg Extension'],
    modify: 'Reduce depth on squats and lunges. Focus on hip-dominant movements (RDLs, glute bridges). Use cycling or swimming for conditioning instead of high-impact work.',
    substitute: 'Swap jumping exercises for low-impact cardio (bike, rower, elliptical). Replace deep lunges with step-ups or glute bridges.'
  },
  back: {
    avoid: ['Deadlift', 'Heavy Squats', 'Standing Overhead Press', 'Burpees', 'Box Jumps', 'Kettlebell Swings'],
    modify: 'Avoid heavy spinal loading. Use chest-supported rows instead of bent-over rows. Use goblet squats or leg press instead of back squats. Focus on core bracing and mobility work.',
    substitute: 'Swap barbell back squat for goblet squat or leg press. Swap deadlift for hip thrusts or dumbbell RDL (light). Swap standing OHP for seated dumbbell press.'
  },
  shoulder: {
    avoid: ['Overhead Press', 'Bench Press (wide grip)', 'Pull-Ups (full range)', 'Dips', 'Skull Crushers', 'Face Pulls (if painful)'],
    modify: 'Avoid overhead and heavy pressing movements. Use neutral grip options. Focus on lower body and core work. Use landmine presses as an alternative to overhead work.',
    substitute: 'Swap overhead press for landmine press or lateral raise (light). Swap bench press for dumbbell press (neutral grip, shallower range). Swap pull-ups for lat pulldowns (neutral grip).'
  },
  general: {
    avoid: [],
    modify: 'Listen to your body. If an exercise causes sharp pain, stop and substitute. Focus on pain-free ranges of motion. Consider working with a physical therapist for persistent issues.',
    substitute: 'Any painful exercise should be swapped for a pain-free alternative that targets the same movement pattern.'
  }
};

function generatePlan(answers) {
  const {
    height, weight, goal, targetWeight, experience, daysPerWeek, injuries, equipment
  } = answers;

  const goalConfig = GOAL_CONFIG[goal] || GOAL_CONFIG.general_fitness;
  const expLevel = ['beginner', 'intermediate', 'advanced'].includes(experience) ? experience : 'intermediate';

  // Parse injuries
  const injuryList = injuries ? injuries.split(',').map(i => i.trim().toLowerCase()) : [];
  const hasInjury = injuryList.some(i => INJURY_GUIDANCE[i] || INJURY_GUIDANCE.general);

  // Build the plan
  const plan = {
    name: `Custom Plan — ${goalConfig.name}`,
    description: goalConfig.description,
    memberGoal: goal,
    memberWeight: weight,
    targetWeight: targetWeight || null,
    experienceLevel: expLevel,
    daysPerWeek: daysPerWeek || 3,
    createdAt: new Date().toISOString(),
    guidelines: goalConfig.notes,
    injuryNotes: hasInjury ? getInjuryNotes(injuryList) : null,
    weeks: buildWeeks(goalConfig, expLevel, daysPerWeek, injuryList, equipment)
  };

  return plan;
}

function getInjuryNotes(injuryList) {
  const notes = [];
  injuryList.forEach(injury => {
    const guidance = INJURY_GUIDANCE[injury] || INJURY_GUIDANCE.general;
    if (guidance.avoid && guidance.avoid.length > 0) {
      notes.push(`⚠️ Avoid: ${guidance.avoid.join(', ')}`);
    }
    if (guidance.modify) {
      notes.push(`💡 ${guidance.modify}`);
    }
  });
  return notes.join('\n\n');
}

function buildWeeks(goalConfig, expLevel, daysPerWeek, injuries, equipment) {
  const maxDays = Math.min(daysPerWeek, 6);
  const weeks = [];

  // Build day templates based on split
  const dayTemplates = buildDayTemplates(goalConfig.split, expLevel, injuries, equipment);

  // Assign days of the week
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (let d = 0; d < maxDays; d++) {
    const template = dayTemplates[d % dayTemplates.length];
    const exercises = selectExercises(template.categories, expLevel, injuries, equipment);
    weeks.push({
      day: dayNames[d],
      focus: template.focus,
      categories: template.categories,
      exercises: exercises,
      estimatedTime: estimateTime(exercises)
    });
  }

  return weeks;
}

function buildDayTemplates(split, expLevel, injuries, equipment) {
  // Build a rotating schedule based on the split ratios
  const templates = [];
  const totalSlots = Object.values(split).reduce((a, b) => a + b, 0);

  let categoryIndex = 0;
  const categories = Object.keys(split);

  for (let i = 0; i < totalSlots; i++) {
    const cat = categories[categoryIndex % categories.length];
    const isLastOfCategory = (i + 1) % split[cat] === 0 || i === totalSlots - 1;

    if (cat === 'push') templates.push({ categories: ['push'], focus: isLastOfCategory ? 'Upper Body Push' : 'Push' });
    else if (cat === 'pull') templates.push({ categories: ['pull'], focus: isLastOfCategory ? 'Upper Body Pull' : 'Pull' });
    else if (cat === 'legs') templates.push({ categories: ['legs'], focus: isLastOfCategory ? 'Lower Body' : 'Legs' });
    else if (cat === 'core') templates.push({ categories: ['core', 'conditioning'], focus: 'Core + Conditioning' });
    else if (cat === 'conditioning') templates.push({ categories: ['conditioning'], focus: 'Conditioning & Cardio' });

    if (isLastOfCategory) categoryIndex++;
  }

  return templates;
}

function selectExercises(categories, expLevel, injuries, equipment) {
  const allExercises = [];
  const injuryList = injuries || [];

  categories.forEach(cat => {
    const lib = EXERCISE_LIB[cat];
    if (!lib) return;

    const levelExercises = lib[expLevel] || lib.intermediate;
    if (!levelExercises) return;

    // Filter out exercises that conflict with injuries
    const filtered = levelExercises.filter(ex => {
      if (equipment === 'home' && isGymOnlyExercise(ex.name)) return false;
      return !hasInjuryConflict(ex.name, injuryList);
    });

    // Take 2-4 exercises per category depending on category
    const count = cat === 'conditioning' ? 2 : (cat === 'core' ? 2 : Math.min(3, filtered.length));
    for (let i = 0; i < count && i < filtered.length; i++) {
      allExercises.push(filtered[i]);
    }
  });

  return allExercises;
}

function isGymOnlyExercise(name) {
  const gymOnly = ['Barbell', 'Cable', 'Lat Pulldown', 'Leg Press', 'Leg Curl', 'Leg Extension',
    'Chest Supported', 'Hack Squat', 'Seated', 'Machine', 'Rope', 'Straight Arm Pulldown'];
  return gymOnly.some(g => name.includes(g));
}

function hasInjuryConflict(exerciseName, injuries) {
  if (!injuries || injuries.length === 0) return false;
  const lower = exerciseName.toLowerCase();
  for (const injury of injuries) {
    const guidance = INJURY_GUIDANCE[injury];
    if (!guidance) continue;
    if (guidance.avoid) {
      for (const avoid of guidance.avoid) {
        if (lower.includes(avoid.toLowerCase())) return true;
      }
    }
  }
  return false;
}

function estimateTime(exercises) {
  if (!exercises || exercises.length === 0) return '15-20 min';
  const sets = exercises.reduce((sum, ex) => {
    const s = parseInt(ex.sets) || 3;
    return sum + s;
  }, 0);
  const avgRest = 60; // seconds average
  const workTime = sets * 45; // ~45 sec per set
  const restTime = (sets - 1) * avgRest;
  const totalSec = workTime + restTime;
  const totalMin = Math.ceil(totalSec / 60);
  return `${totalMin}-${totalMin + 5} min`;
}

// ===== NEW ENDPOINTS =====

// Generate a personalized plan for a member
app.post('/api/workouts/generate', (req, res) => {
  const data = loadData();
  const { memberId, answers } = req.body;

  if (!memberId || !answers) {
    return res.status(400).json({ error: 'memberId and answers required' });
  }

  const member = data.members.find(m => m.id === memberId);
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }

  // Generate the plan
  const plan = generatePlan(answers);

  // Save to member's plans
  if (!member.plans) member.plans = [];
  const planId = 'plan-' + genId();
  plan.id = planId;
  member.plans.push(plan);

  // Also create workout entries for each day
  if (!member.workouts) member.workouts = [];
  plan.weeks.forEach((week, idx) => {
    const workout = {
      id: 'wp-' + planId + '-' + idx,
      name: `${plan.name} — ${week.day}`,
      description: week.focus + ' | ' + plan.description.substring(0, 100) + '...',
      exercises: week.exercises.map(e => ({ ...e, done: false })),
      assignedAt: new Date().toISOString(),
      planId: planId,
      day: week.day,
      focus: week.focus
    };
    member.workouts.push(workout);
  });

  saveData(data);

  res.json({
    plan: plan,
    workoutsCreated: plan.weeks.length,
    message: `Your custom ${plan.name} plan has been created with ${plan.weeks.length} daily workouts.`
  });
});

// Get a member's personalized plans
app.get('/api/members/:id/plans', (req, res) => {
  const data = loadData();
  const member = data.members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member.plans || []);
});

// Get a single plan
app.get('/api/plans/:id', (req, res) => {
  const data = loadData();
  for (const m of data.members) {
    const plan = (m.plans || []).find(p => p.id === req.params.id);
    if (plan) return res.json(plan);
  }
  res.status(404).json({ error: 'Plan not found' });
});

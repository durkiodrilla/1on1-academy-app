const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;
const DATA_FILE = path.join(__dirname, 'data.json');
const ADMIN_KEY = 'render-1on1-academy-2026-admin';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== DATA HELPERS =====
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) { console.error('Data load error:', e.message); }
  return { members: [], workouts: [], schedule: [], bookings: [] };
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) { console.error('Data save error:', e.message); }
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function sanitizePhone(p) {
  return (p || '').replace(/\D/g, '');
}

// ===== AUTH =====
app.post('/api/auth/member/login', (req, res) => {
  const { phone, pin } = req.body;
  const data = loadData();
  const phoneClean = sanitizePhone(phone);
  const member = data.members.find(m => sanitizePhone(m.phone) === phoneClean && m.pin === pin);
  if (member) {
    res.json({ member: { id: member.id, name: member.name, phone: member.phone, membership: member.membership } });
  } else {
    res.status(401).json({ error: 'Invalid phone or PIN' });
  }
});

app.post('/api/auth/admin/login', (req, res) => {
  const { adminKey } = req.body;
  if (adminKey === ADMIN_KEY) {
    res.json({ admin: { key: adminKey } });
  } else {
    res.status(401).json({ error: 'Invalid admin key' });
  }
});

// ===== MEMBERS =====
app.get('/api/members', (req, res) => {
  const data = loadData();
  res.json(data.members);
});

app.post('/api/members', (req, res) => {
  const data = loadData();
  const { name, phone, pin, membership } = req.body;
  if (!name || !phone || !pin) {
    return res.status(400).json({ error: 'Name, phone, and PIN required' });
  }
  if (!/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: 'PIN must be 4 digits' });
  }
  if (data.members.some(m => sanitizePhone(m.phone) === sanitizePhone(phone))) {
    return res.status(400).json({ error: 'Phone already registered' });
  }
  const member = { id: genId(), name, phone: sanitizePhone(phone), pin, membership: membership || 'Gym Member', createdAt: new Date().toISOString() };
  data.members.push(member);
  saveData(data);
  res.json(member);
});

app.get('/api/members/:id', (req, res) => {
  const data = loadData();
  const m = data.members.find(x => x.id === req.params.id);
  if (m) res.json(m); else res.status(404).json({ error: 'Not found' });
});

app.put('/api/members/:id', (req, res) => {
  const data = loadData();
  const idx = data.members.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const m = data.members[idx];
  if (req.body.name !== undefined) m.name = req.body.name;
  if (req.body.phone !== undefined) m.phone = sanitizePhone(req.body.phone);
  if (req.body.pin !== undefined) m.pin = req.body.pin;
  if (req.body.membership !== undefined) m.membership = req.body.membership;
  saveData(data);
  res.json(m);
});

app.delete('/api/members/:id', (req, res) => {
  const data = loadData();
  const idx = data.members.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.members.splice(idx, 1);
  saveData(data);
  res.json({ ok: true });
});

app.get('/api/members/:id/workouts', (req, res) => {
  const data = loadData();
  const m = data.members.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  res.json(m.workouts || []);
});

app.post('/api/members/:id/workouts', (req, res) => {
  const data = loadData();
  const m = data.members.find(x => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  const { workoutId, exercises, name, description } = req.body;

  let workout;
  if (workoutId) {
    const src = data.workouts.find(x => x.id === workoutId);
    if (!src) return res.status(404).json({ error: 'Workout not found' });
    workout = { id: genId(), name: name || src.name, description: description || src.description, exercises: src.exercises ? src.exercises.map(e => ({ ...e, done: false })) : [], assignedAt: new Date().toISOString() };
  } else if (exercises && exercises.length > 0) {
    workout = { id: genId(), name: name || 'My Workout', description: description || '', exercises: exercises.map(e => ({ ...e, done: false })), assignedAt: new Date().toISOString() };
  } else {
    return res.status(400).json({ error: 'Provide workoutId or exercises' });
  }

  if (!m.workouts) m.workouts = [];
  m.workouts.push(workout);
  saveData(data);
  res.json(workout);
});

// ===== WORKOUTS =====
app.get('/api/workouts', (req, res) => {
  const data = loadData();
  res.json(data.workouts.filter(w => !w.memberId));
});

app.get('/api/workouts/all', (req, res) => {
  const data = loadData();
  res.json(data.workouts);
});

app.post('/api/workouts', (req, res) => {
  const data = loadData();
  const { name, description, exercises } = req.body;
  if (!name || !exercises || exercises.length === 0) {
    return res.status(400).json({ error: 'Name and exercises required' });
  }
  const workout = { id: genId(), name, description: description || '', exercises: exercises.map(e => ({ ...e, done: false })), memberId: null, createdAt: new Date().toISOString() };
  data.workouts.push(workout);
  saveData(data);
  res.json(workout);
});

app.get('/api/workouts/:id', (req, res) => {
  const data = loadData();
  const w = data.workouts.find(x => x.id === req.params.id);
  if (w) res.json(w); else res.status(404).json({ error: 'Not found' });
});

app.put('/api/workouts/:id', (req, res) => {
  const data = loadData();
  const idx = data.workouts.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const w = data.workouts[idx];
  if (req.body.name !== undefined) w.name = req.body.name;
  if (req.body.description !== undefined) w.description = req.body.description;
  if (req.body.exercises !== undefined) w.exercises = req.body.exercises;
  saveData(data);
  res.json(w);
});

app.delete('/api/workouts/:id', (req, res) => {
  const data = loadData();
  const idx = data.workouts.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.workouts.splice(idx, 1);
  saveData(data);
  res.json({ ok: true });
});

// ===== SCHEDULE =====
app.get('/api/schedule', (req, res) => {
  const data = loadData();
  res.json(data.schedule);
});

app.post('/api/schedule', (req, res) => {
  const data = loadData();
  const { day, time, program, description, spots } = req.body;
  if (!day || !time || !program) {
    return res.status(400).json({ error: 'Day, time, and program required' });
  }
  const slot = { id: genId(), day, time, program, description: description || '', spots: spots || 1, booked: 0, createdAt: new Date().toISOString() };
  data.schedule.push(slot);
  saveData(data);
  res.json(slot);
});

app.get('/api/schedule/:id', (req, res) => {
  const data = loadData();
  const s = data.schedule.find(x => x.id === req.params.id);
  if (s) res.json(s); else res.status(404).json({ error: 'Not found' });
});

app.put('/api/schedule/:id', (req, res) => {
  const data = loadData();
  const idx = data.schedule.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const s = data.schedule[idx];
  if (req.body.day !== undefined) s.day = req.body.day;
  if (req.body.time !== undefined) s.time = req.body.time;
  if (req.body.program !== undefined) s.program = req.body.program;
  if (req.body.description !== undefined) s.description = req.body.description;
  if (req.body.spots !== undefined) s.spots = req.body.spots;
  saveData(data);
  res.json(s);
});

app.delete('/api/schedule/:id', (req, res) => {
  const data = loadData();
  const idx = data.schedule.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.schedule.splice(idx, 1);
  saveData(data);
  res.json({ ok: true });
});

// ===== BOOKINGS =====
app.get('/api/bookings', (req, res) => {
  const data = loadData();
  const memberId = req.query.memberId;
  let bookings = data.bookings;
  if (memberId) bookings = bookings.filter(b => b.memberId === memberId);
  res.json(bookings);
});

app.get('/api/bookings/admin', (req, res) => {
  const data = loadData();
  res.json(data.bookings);
});

app.post('/api/bookings', (req, res) => {
  const data = loadData();
  const { scheduleId, memberId, memberName, memberPhone } = req.body;
  const slot = data.schedule ? data.schedule.find(x => x.id === scheduleId) : null;
  if (!slot) return res.status(404).json({ error: 'Slot not found' });
  if ((slot.booked || 0) >= (slot.spots || 1)) {
    return res.status(400).json({ error: 'Slot is full' });
  }
  if (!memberId || !memberName) {
    return res.status(400).json({ error: 'Member info required' });
  }
  const booking = { id: genId(), scheduleId, memberId, memberName, memberPhone, day: slot.day, time: slot.time, program: slot.program, bookedAt: new Date().toISOString() };
  data.bookings.push(booking);
  slot.booked = (slot.booked || 0) + 1;
  saveData(data);
  res.json(booking);
});

// ===== SEED DATA (first run) =====
const data = loadData();
if (data.members.length === 0) {
  data.members = [
    { id: 'demo-member', name: 'Demo Member', phone: '8055502427', pin: '1234', membership: 'Gym Member', createdAt: new Date().toISOString() }
  ];
}
if (data.workouts.length === 0) {
  data.workouts = [
    { id: 'demo-workout', name: 'Full Body - Week 1', description: 'Foundational full body workout', exercises: [
      { id: 'ex1', name: 'Barbell Squat', sets: '3', reps: '8-10', rest: '90 sec', done: false },
      { id: 'ex2', name: 'Bench Press', sets: '3', reps: '8-10', rest: '90 sec', done: false },
      { id: 'ex3', name: 'Bent Over Row', sets: '3', reps: '10-12', rest: '60 sec', done: false },
      { id: 'ex4', name: 'Plank', sets: '3', reps: '30-45 sec', rest: '30 sec', done: false }
    ], memberId: null, createdAt: new Date().toISOString() },
    { id: 'demo-speed', name: 'Speed & Agility', description: 'Speed, footwork, and change of direction', exercises: [
      { id: 'ex5', name: 'High Knees', sets: '3', reps: '20 yards', rest: '45 sec', done: false },
      { id: 'ex6', name: 'Lateral Shuffle', sets: '3', reps: '15 yards each', rest: '45 sec', done: false },
      { id: 'ex7', name: 'Box Jumps', sets: '4', reps: '5', rest: '60 sec', done: false },
      { id: 'ex8', name: '5-10-5 Pro Agility', sets: '3', reps: '2 reps each direction', rest: '60 sec', done: false }
    ], memberId: null, createdAt: new Date().toISOString() }
  ];
}
if (data.schedule.length === 0) {
  data.schedule = [
    { id: 'slot1', day: 'Monday', time: '4:00 PM - 5:00 PM', program: 'Small Group Training', description: 'Speed and strength for all athletes', spots: 1, booked: 0, createdAt: new Date().toISOString() },
    { id: 'slot2', day: 'Wednesday', time: '4:00 PM - 5:00 PM', program: 'Small Group Training', description: 'Speed and strength for all athletes', spots: 1, booked: 0, createdAt: new Date().toISOString() },
    { id: 'slot3', day: 'Friday', time: '4:00 PM - 5:00 PM', program: 'Small Group Training', description: 'Speed and strength for all athletes', spots: 1, booked: 0, createdAt: new Date().toISOString() }
  ];
}
saveData(data);

// ===== START =====
app.listen(PORT, () => {
  console.log('1 on 1 Academy app running on port ' + PORT);
  console.log('Admin key: ' + ADMIN_KEY);
});

// Health check for Render
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const notes = [
  { id: 1, title: "Buy groceries", content: "Milk, eggs, bread, coffee" },
  { id: 2, title: "Call plumber", content: "Fix the leaking kitchen sink" },
  { id: 3, title: "Finish report", content: "Q3 sales summary due Friday" },
  { id: 4, title: "Team meeting", content: "Discuss project roadmap at 2pm" },
  { id: 5, title: "Read book", content: "Continue reading 'Atomic Habits'" },
  { id: 6, title: "Plan trip", content: "Look into flights for December" },
  { id: 7, title: "Gym session", content: "Leg day - squats and deadlifts" },
  { id: 8, title: "Water plants", content: "Don't forget the balcony ones" },
];

function getGrid() {
  return notes;
}

module.exports = getGrid();

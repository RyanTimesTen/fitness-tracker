const session = {
  workouts: [],
  addWorkout(workout) {
    this.workouts.push(workout);
  },
  presetWorkouts: [
    {
      id: 'overhead',
      display: 'Overhead Press',
    },
    {
      id: 'bench',
      display: 'Bench Press',
    },
    {
      id: 'chinups',
      display: 'Chinups',
    },
    {
      id: 'barbell-rows',
      display: 'Barbell Rows',
    },
    {
      id: 'pullups',
      display: 'Pullups',
    },
    {
      id: 'squats',
      display: 'Squats',
    },
    {
      id: 'deadlift',
      display: 'Deadlift',
    },
  ],
};

export default session;

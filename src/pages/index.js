import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import WorkoutManager from '../WorkoutManager';

const IndexPage = () => (
  <Layout>
    <h3>Your Current Session</h3>
    {WorkoutManager.workouts.map(workout => (
      <p key={workout.id}>
        {workout.display}&#58; {workout.weight}
      </p>
    ))}
    <Link to="/new-workout">Add a workout</Link>
  </Layout>
);

export default IndexPage;

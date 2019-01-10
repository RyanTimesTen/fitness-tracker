import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import WorkoutManager from '../WorkoutManager'

function createNewWorkout(workout) {
  console.log(workout)
}

const IndexPage = () => (
  <Layout>
    <h3>Your Current Session</h3>
    {WorkoutManager.workouts.map(
      workout =>
        <p key={workout.id}>{workout.display}&#58; {workout.weight}</p>
    )}
    <Link to="/new-workout">Add a workout</Link>
    {/*<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>*/}
      {/*<Image />*/}
    {/*</div>*/}
    {/*<Link to="/page-2/">Go to page 2</Link>*/}
  </Layout>
)

export default IndexPage

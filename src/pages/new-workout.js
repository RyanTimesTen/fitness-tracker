import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import WorkoutManager from '../WorkoutManager';

const NewWorkoutPage = () => (
  <Layout>
    <h3>Sup, add a new workout bb</h3>
    {renderPresetWorkouts()}
  </Layout>
);

function renderPresetWorkouts() {
  return WorkoutManager.presetWorkouts.map(workout => (
    <Workout key={workout.id} {...workout} />
  ));
}

function Workout({ id, display }) {
  const [showInput, setShowInput] = useState(false);
  const [weight, setWeight] = useState('');

  function handleSubmit(event) {
    event.stopPropagation();

    WorkoutManager.addWorkout({ id, display, weight });
    navigate('/');
  }

  return (
    <div
      style={{
        padding: '1rem',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow:
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      }}
      onClick={() => setShowInput(!showInput)}
    >
      <span style={{ fontSize: '1.25rem' }}>{display}</span>
      {showInput && (
        <div>
          <label htmlFor="lift-value" style={{ fontSize: '1rem' }}>
            How much did you lift?
          </label>
          <br />
          <input
            autoFocus
            type="number"
            value={weight}
            onClick={e => e.stopPropagation()}
            onChange={e => setWeight(e.target.value)}
            name="lift-value"
            style={{ border: '2px solid black' }}
          />
          <button
            style={{
              border: '2px solid green',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              float: 'right',
              color: 'green',
            }}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default NewWorkoutPage;

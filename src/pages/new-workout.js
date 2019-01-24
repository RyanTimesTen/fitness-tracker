import React, { useState } from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import WorkoutManager from '../WorkoutManager';

function SetInput({ id, display }) {
  const [weight, setWeight] = useState('');

  function handleSubmit(event) {
    event.stopPropagation();

    WorkoutManager.addWorkout({ id, display, weight });
    navigate('/');
  }

  return (
    <div>
      <label htmlFor="lift-value" style={{ fontSize: '1rem' }}>
        How much did you lift?
      </label>
      <br />
      <input
        autoFocus
        type="number"
        value={weight}
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
  );
}

function Workout({ id, display }) {
  const [showInput, setShowInput] = useState(false);

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
      {showInput && <SetInput id={id} display={display} />}
    </div>
  );
}

function mapDisplayToId(display) {
  return display.replace(/\s/, '_').toLowerCase();
}

function renderPresetWorkouts() {
  return WorkoutManager.presetWorkouts.map(workout => (
    <Workout key={workout.id} {...workout} />
  ));
}

function NewWorkoutPage() {
  const [display, setDisplay] = useState('');
  const [weight, setWeight] = useState('');

  function createNewWorkout() {
    WorkoutManager.addWorkout({
      id: mapDisplayToId(display),
      display,
      weight,
    });
    navigate('/');
  }

  return (
    <Layout>
      <h3>Sup, add a new workout bb</h3>
      {renderPresetWorkouts()}
      <div>
        <label htmlFor="new-workout-name" style={{ fontSize: 20 }}>
          Enter a new workout
        </label>
        <br />
        <input
          type="text"
          value={display}
          onChange={e => setDisplay(e.target.value)}
          name="new-workout-name"
          placeholder="Ex. Overhead Press"
          style={{ border: '2px solid black' }}
        />
      </div>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <label htmlFor="lift-value" style={{ fontSize: 20 }}>
          How much did you lift?
        </label>
        <br />
        <input
          type="number"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          name="lift-value"
          style={{ border: '2px solid black' }}
        />
      </div>
      <button
        style={{
          border: '2px solid blue',
          background: 'blue',
          color: 'white',
        }}
        onClick={createNewWorkout}
      >
        Submit
      </button>
    </Layout>
  );
}

export default NewWorkoutPage;

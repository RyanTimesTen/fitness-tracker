import React from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/layout'
import WorkoutManager from '../WorkoutManager'

class Workout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInput: false,
      weight: ''
    }

    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleWeightInput = this.handleWeightInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCardClick() {
    this.setState({ showInput: !this.state.showInput })
  }

  handleWeightInput(event) {
    event.stopPropagation()

    this.setState({ weight: event.target.value })
  }

  handleSubmit(event) {
    event.stopPropagation()

    const { id, display } = this.props
    const { weight } = this.state
    WorkoutManager.addWorkout({ id, display, weight })
    navigate('/')
  }

  render() {
    return (
      <div
        style={{
          padding: '1rem',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
        onClick={this.handleCardClick}
      >
        <span style={{ fontSize: '1.25rem' }}>{this.props.display}</span>
        {this.state.showInput &&
        <div>
          <label
            htmlFor="lift-value"
            style={{ fontSize: '1rem' }}
          >
            How much did you lift?
          </label>
          <br/>
          <input
            autoFocus
            type="number"
            name="lift-value"
            value={this.state.weight}
            onClick={this.handleWeightInput}
            onChange={this.handleWeightInput}
            style={{ border: '2px solid black' }}
          />
            <button
              style={{
                border: '2px solid green',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                float: 'right',
                color: 'green'
              }}
              onClick={this.handleSubmit}
            >
              Add
            </button>
        </div>}

      </div>
    )
  }
}

function mapDisplayToId(display) {
  return display.replace(/\s/, '_').toLowerCase()
}

class NewWorkoutPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      workout: {
        display: '',
        weight: ''
      }
    }

    this._handleTitleChange = this._handleTitleChange.bind(this)
    this._handleValueChange = this._handleValueChange.bind(this)
    this._createNewWorkout = this._createNewWorkout.bind(this)
  }

  _handleTitleChange(event) {
    this.setState({
      workout: {
        ...this.state.workout,
        display: event.target.value
      }
    })
  }

  _handleValueChange(event) {
    this.setState({
      workout: {
        ...this.state.workout,
        weight: event.target.value
      }
    })
  }

  _createNewWorkout() {
    const { workout } = this.state;
    workout.id = mapDisplayToId(this.state.workout.display)
    WorkoutManager.addWorkout(workout)
    navigate('/')
  }

  renderPresetWorkouts() {
    return (
      WorkoutManager.presetWorkouts.map(
        workout => <Workout key={workout.id} {...workout} />
      )
    )
  }

  render() {
    return (
      <Layout>
        <h3>Sup, add a new workout bb</h3>
        {this.renderPresetWorkouts()}
        <div>
          <label
            htmlFor="new-workout-name"
            style={{ fontSize: 20 }}
          >
            Enter a new workout
          </label>
          <br/>
          <input
            type="text"
            name="new-workout-name"
            value={this.state.workout.display}
            onChange={this._handleTitleChange}
            placeholder="Ex. Overhead Press"
            style={{ border: '2px solid black' }}
          />
        </div>
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          <label
            htmlFor="lift-value"
            style={{ fontSize: 20 }}
          >
            How much did you lift?
          </label>
          <br/>
          <input
            type="number"
            name="lift-value"
            value={this.state.workout.weight}
            onChange={this._handleValueChange}
            style={{ border: '2px solid black' }}
          />
        </div>
        <button
          style={{
            border: '2px solid blue',
            background: 'blue',
            color: 'white'
          }}
          onClick={this._createNewWorkout}
        >
          Submit
        </button>
      </Layout>
    )
  }
}

export default NewWorkoutPage

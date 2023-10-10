import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutForm from '../components/WorkoutForm'
import WorkoutDetails from '../components/WorkoutDetails'

const Home = () => {
  const { user } = useAuthContext()
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }
    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
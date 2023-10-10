import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // remove workouts from context
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
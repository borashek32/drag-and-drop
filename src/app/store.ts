import { configureStore } from '@reduxjs/toolkit'
import {usersReducer} from "../components/users/users.slice"

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
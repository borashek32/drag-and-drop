import {UserType} from "./users.types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"


const slice = createSlice({
  name: 'users',
  initialState: {
    users: [
      {id: 1, name: 'user 1', isMentor: false},
      {id: 2, name: 'user 2', isMentor: false},
      {id: 3, name: 'user 3', isMentor: false},
      {id: 4, name: 'user 4', isMentor: false},
      {id: 5, name: 'user 5', isMentor: false},
      {id: 6, name: 'user 6', isMentor: false}
    ] as UserType[]
  },
  reducers: {
    setDropToMentors: (state, action: PayloadAction<{ userId: number }>) => {
      const index = state.users.findIndex((user: UserType) => user?.id === action.payload.userId)
      if (index !== -1) state.users[index].isMentor = true
    },
    setDropToUsers: (state, action: PayloadAction<{ userId: number }>) => {
      const index = state.users.findIndex((user: UserType) => user?.id === action.payload.userId)
      if (index !== -1) state.users[index].isMentor = false
    }
  }
})

export const usersReducer = slice.reducer
export const usersActions = slice.actions
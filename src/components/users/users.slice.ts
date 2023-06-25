import {UserType} from "./users.types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"


const slice = createSlice({
  name: 'users',
  initialState: {
    users: [
      {id: 1, name: 'Nataly', isMentor: false},
      {id: 2, name: 'Polina', isMentor: false},
      {id: 3, name: 'Igor', isMentor: false},
      {id: 4, name: 'Vadim', isMentor: false},
      {id: 5, name: 'Olga', isMentor: false},
      {id: 6, name: 'Petr', isMentor: false}
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
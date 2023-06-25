import styles from "../../app/style.module.css"
import React, {FC} from "react"
import {useDispatch, useSelector} from "react-redux"
import {UserType} from "./users.types"
import {RootState} from "../../app/store"
import {usersActions} from "./users.slice"
import {Alert, Stack} from "@mui/material"


export const Users: FC = () => {

  const users = useSelector<RootState, UserType[]>((state) => state.users.users)
  const dispatch = useDispatch()

  const dragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData('userId', id.toString())
  }

  const dragInProgress = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const dragToMentors = (e: React.DragEvent<HTMLDivElement>) => {
    const droppedUserId = e.dataTransfer.getData('userId')
    dispatch(usersActions.setDropToMentors({userId: Number(droppedUserId)}))
  }

  const dragToUsers = (e: React.DragEvent<HTMLDivElement>) => {
    const droppedUserId = e.dataTransfer.getData('userId')
    dispatch(usersActions.setDropToUsers({userId: Number(droppedUserId)}))
  }

  return (
    <Stack spacing={{xs: 1, sm: 3}} direction="row" useFlexGap flexWrap="wrap">
      <div
        className={styles.dropBox}
        onDragOver={(e) => dragInProgress(e)}
        onDrop={(e) => dragToUsers(e)}
      >
        <h1 className={styles.title}>Users</h1>
        {users &&
          users.map((user) => (!user.isMentor
              ? (<Alert severity="success"
                        className={styles.userContainer}
                        onDragStart={(e) => dragStart(e, user.id)}
                        key={user.id}
                        draggable>
                {user.name}
              </Alert>)
              : ''
          ))}
      </div>

      <div
        className={styles.dropBox}
        onDragOver={(e) => dragInProgress(e)}
        onDrop={(e) => dragToMentors(e)}
      >
        <h1 className={styles.title}>Mentors</h1>
        {users &&
          users.map((user) => (user.isMentor
              ? (<Alert severity={'info'}
                        className={styles.userContainer}
                        onDragStart={(e) => dragStart(e, user.id)}
                        key={user.id}
                        draggable>
                        {user.name}
              </Alert>)
              : ''
          ))}
      </div>
    </Stack>
  )
}
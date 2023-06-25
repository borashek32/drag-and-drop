import styles from "../../app/style.module.css"
import React, {FC} from "react"
import {useDispatch, useSelector} from "react-redux"
import {UserType} from "./users.types"
import {RootState} from "../../app/store"
import {usersActions} from "./users.slice"


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
    dispatch(usersActions.setDropToMentors({ userId: Number(droppedUserId) }))
  }

  const dragToUsers = (e: React.DragEvent<HTMLDivElement>) => {
    const droppedUserId = e.dataTransfer.getData('userId')
    dispatch(usersActions.setDropToUsers({ userId: Number(droppedUserId) }))
  }

  return (
    <>
      <div
        className={styles.dropBox}
        onDragOver={(e) => dragInProgress(e)}
        onDrop={(e) => dragToUsers(e)}
      >
        {users &&
          users.map((user) => (!user.isMentor
              ? (<div className={styles.userContainer}
                       onDragStart={(e) => dragStart(e, user.id)}
                       key={user.id}
                       draggable>
                {user.name}
              </div>)
              : ''
          ))}
      </div>

      <div
        className={styles.dropBox}
        onDragOver={(e) => dragInProgress(e)}
        onDrop={(e) => dragToMentors(e)}
      >
        {users &&
          users.map((user) => (user.isMentor
              ? (<div className={styles.userContainer}
                      onDragStart={(e) => dragStart(e, user.id)}
                      key={user.id}
                      draggable>
                {user.name}
              </div>)
              : ''
          ))}
      </div>
    </>
  )
}
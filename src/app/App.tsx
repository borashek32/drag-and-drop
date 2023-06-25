import React from "react"
import styles from './style.module.css'
import {Users} from "../components/users/Users"


const App = () => {

  return (
    <div className={styles.container}>
      <Users />
    </div>
  )
}

export default App
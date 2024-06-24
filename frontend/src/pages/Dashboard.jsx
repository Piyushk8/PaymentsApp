import React from 'react'
import  Appbar  from '../components/Appbar'
import  Balance  from '../components/Balance'

import {Users} from '../components/User'
function Dashboard() {
  return (
    <div>
      <Appbar>
      </Appbar>
      {/* <Balance/> */}
      <Users/>
      {/* <User></User> */}
    </div>
  )
}

export default Dashboard

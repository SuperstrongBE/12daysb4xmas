'use client'
import { apiCoreUseStoreActions } from "@12daysb4xmas/store"

export default function Home() {

  const  {connect}  = apiCoreUseStoreActions(state=>state.auth)

  return (
    <main >
      <button onClick={()=>connect()}>
        Connect proton
      </button>
    </main>
  )
}

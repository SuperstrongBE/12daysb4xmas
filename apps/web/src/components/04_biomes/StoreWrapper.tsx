'use client'
import { StoreProvider, configureStore } from "store"
import { ReactNode } from "react"

const store = configureStore({
  authConfig: {
    protonEndpoints:process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS!.split(',')
  }
})

interface StoreWrapperProps {

  children:ReactNode

} 

export const StoreWrapper: React.FunctionComponent<StoreWrapperProps> = ({children}) => {
  
  return <StoreProvider store={store}>{ children }</StoreProvider>

}
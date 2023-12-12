'use client'
import { StoreProvider, configureStore } from "store"
import { ReactNode } from "react"

const store = configureStore({
  authConfig: {
    protonEndpoints: process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS!.split(','),
    appName:process.env.NEXT_PUBLIC_PROTON_APP_NAME!,
    requestedAccount:process.env.NEXT_PUBLIC_PROTON_REQUEST_ACCOUNT!
    
  }
})

interface StoreWrapperProps {

  children:ReactNode

} 

export const StoreWrapper: React.FunctionComponent<StoreWrapperProps> = ({children}) => {
  
  return <StoreProvider store={store}>{ children }</StoreProvider>

}
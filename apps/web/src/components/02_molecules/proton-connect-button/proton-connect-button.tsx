import { HTMLAttributes } from "react"
import { LinkSession } from "store"

type XprConnectButtonProps = HTMLAttributes<HTMLButtonElement> & {
  session?: LinkSession | null,
  avatar?: string,
  onAction:()=>void

}
export const XprConnectButton: React.FunctionComponent<XprConnectButtonProps> = ({session,avatar,onAction,onClick,...rest}) => {
  return (
    (session ? (
      <button onClick={()=>onAction()} className="btn twelvedays rounded-full pl-0 h-auto font-dm-display">
      
        <p>Gift me now Santa!</p>
    </button>
    ) : (
      <button onClick={onClick} className="btn twelvedays rounded-full h-auto ">
      <p>Connect WebAuth</p>
    </button>
    ) )
  )
}
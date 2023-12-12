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
      <button onClick={()=>onAction()} className="btn btn-primary rounded-full pl-0 h-auto ">
      <div className="avatar flex flex-row flex-auto">
        <div className="w-12 rounded-full flex-shrink-0 flex-grow-0 m-1">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
        <p>Gift me now Santa!</p>
    </button>
    ) : (
      <button onClick={onClick} className="btn btn-primary rounded-full h-auto ">
      <p>Connect WebAuth</p>
    </button>
    ) )
  )
}
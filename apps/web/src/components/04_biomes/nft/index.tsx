'use client'
import { XprConnectButton } from "@/components/02_molecules/proton-connect-button/proton-connect-button"
import { generateMintAction } from "@/utils/actions"
import { ITemplate } from "atomicassets/build/API/Explorer/Objects"
import Image from "next/image"
import { HTMLAttributes, useCallback } from "react"
import { apiCoreUseStoreActions, apiCoreUseStoreState } from "store"

type NFTLayoutProps = HTMLAttributes<HTMLDivElement> & {
  template: ITemplate,
  ipfsResolver:string
}
export const NFTLayout: React.FunctionComponent<NFTLayoutProps> = ({ipfsResolver,template,...rest}) => { 

  const { session } = apiCoreUseStoreState(state => state.auth.data);
  const { connect } = apiCoreUseStoreActions(state => state.auth);
  const claimActionTransact = useCallback(() => {
    if (!session) return;
    const actions = [
      generateMintAction(session?.auth.actor.toString()!, '12daysb4xmas')
    ];
    session.transact({ actions: actions }).then((res) => {
      console.log(res)
    })

  },[session])
  return <div {...rest}>
    <div>
    <Image
      alt={template.immutable_data.title}
      src={`${ipfsResolver}/${template.immutable_data.image}`} 
      width={200}
      height={200}
    ></Image>
    </div>
    <div>
      {template.immutable_data.title}
      {template.immutable_data.description}
      
    </div>
    <XprConnectButton onClick={() => { connect() }} onAction={() => {
      claimActionTransact()
    }} session={session}/>
  </div>

}
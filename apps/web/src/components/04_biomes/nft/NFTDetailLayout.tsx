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
export const NFTLayout: React.FunctionComponent<NFTLayoutProps> = ({ipfsResolver,template,className,...rest}) => { 

  const { session } = apiCoreUseStoreState(state => state.auth.data);
  const { connect } = apiCoreUseStoreActions(state => state.auth);

  const openSuccessDialog = useCallback(() => { 
    if (document) { 
      const modal = document.getElementById('my_modal_1');
      if (modal) { 
        modal.showModal()
      }
    } 
  },[])

  const claimActionTransact = useCallback(() => {
    if (!session) return;
    const actions = [
      generateMintAction(session?.auth.actor.toString()!, '12daysb4xmas')
    ];
    session.transact({ actions: actions }).then((res) => {
      if (res.processed && res.processed.id) { 

        openSuccessDialog();

      }
      console.log(res)
    })

  }, [openSuccessDialog, session])
  
  

  return <div className={`container mx-auto grid md:grid-cols-2 sm:grid-cols-1 gap-24 ${className}`} {...rest}>

    <div className="relative aspect-square box with-frame">
      <video autoPlay muted loop src={`${ipfsResolver}/${template.immutable_data.video}`}></video>
    </div>
    
    <div className="grid grid-cols-1 gap-6 content-center grid-rows-[repeat(3,min-content)]">
    <Image
      alt={'Not cash headline'}
      src={`/left_headline.png`} 
      width={343}
      height={154}
    ></Image>
      {template.immutable_data.name}
      <p className="leading-6">{template.immutable_data.desc}</p>
      {/* <p className="leading-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisi nisi, aliquet id justo eu, tempus sagittis metus. Sed tincidunt, tortor quis posuere finibus, justo orci euismod velit, id dignissim est neque imperdiet ex.</p> */}
      <XprConnectButton onClick={() => { connect() }} onAction={() => {
      claimActionTransact()
    }} session={session}/>
    </div>
    <dialog id="my_modal_1" className="modal overflow-visible">
      <div className="modal-box grid grid-cols-1 gap-4 overflow-visible" style={{justifyItems:'center'}}>
        <div className="avatar" style={{marginTop:"-4em"}}>
          <div className="w-24 rounded-full avatar-twelvedays flex justify-center">
            <p className="text-7xl">🎅</p>
          </div>
        </div>
        
        <p className="py-4 text-center">Oh oh oh, Congrats! You&lsquo;ve claimed the NFT, hold on to it tight or gift it to a friend.</p>
        <div className="modal-action w-full">
          <form method="dialog" className="w-full">
            <button className="btn twelvedays w-full rounded-full pl-0 h-auto font-dm-display ">Close</button>
          </form>
    </div>
  </div>
</dialog>
  </div>

}
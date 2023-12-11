'use client'
import { ITemplate } from "atomicassets/build/API/Explorer/Objects"
import Image from "next/image"
import { HTMLAttributes } from "react"

type NFTLayoutProps = HTMLAttributes<HTMLDivElement> & {
  template: ITemplate,
  ipfsResolver:string
}
export const NFTLayout: React.FunctionComponent<NFTLayoutProps> = ({ipfsResolver,template,...rest}) => { 

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
      <button>Mint it !</button>
    </div>
    
  </div>

}
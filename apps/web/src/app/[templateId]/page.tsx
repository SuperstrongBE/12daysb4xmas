
import { NFTLayout } from "@/components/04_biomes/nft/NFTDetailLayout";
import { ExplorerApi } from "atomicassets";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";
import Image from "next/image";
import { cache } from 'react'

const getItem = cache(async (templateId: string):Promise<ITemplate> => {
  const api = new ExplorerApi(process.env.ATOMIC_ENDPOINT!, "atomicassets", { fetch: fetch as any, });
  return api.getTemplate('12daysb4xmas',templateId)
  
})

type NFTPageProps = {
  params: {
    templateId:string  
  }
  
}

export default async function NFTPage({params}:NFTPageProps) {
  
  const data = await getItem(params.templateId);
  return (
    <main className="grid grid-cols-1 gap-8 py-8" >
      <div className="container grid pt-12 ">
        <Image alt="Metal Pay logo" src="/brand_logo.png" width={210} height={36}></Image>
      </div>
      <NFTLayout template={data} ipfsResolver={process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}></NFTLayout>
      <div className="container divider"></div> 
      <div className="container grid justify-items-center grid-col-1 gap-8">
        <Image alt="Metallicus logo" src="/footer_brand_logo.png" width={130} height={34}></Image>
        <p className="text-center text-xs">
          Metal Pay is a service of Metallicus, Inc., a licensed provider of money transfer services (NMLS ID: 2057807).
          All money transmission is provided by Metallicus, Inc. pursuant to Metallicus, Inc.’s licenses. © 2023 Metallicus, Inc. License issued to Metallicus by the Louisiana Office of Financial Institutions does not cover the exchange or transmission of virtual currency. All money transmission is provided by Metallicus, Inc. pursuant to Metallicus, Inc.'s licenses and/or the applicable law depending on the jurisdiction
        </p>
      </div> 
    </main>
  )
}

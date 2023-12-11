
import { NFTLayout } from "@/components/04_biomes/nft";
import { ExplorerApi } from "atomicassets";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";
import { cache } from 'react'

export const getItem = cache(async (templateId: string):Promise<ITemplate> => {
  const api = new ExplorerApi(process.env.NEXT_PUBLIC_ATOMIC_ENDPOINT, "atomicassets", { fetch });
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
    <main >
      {params.templateId}
      <NFTLayout template={data} ipfsResolver={process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}></NFTLayout>
    </main>
  )
}

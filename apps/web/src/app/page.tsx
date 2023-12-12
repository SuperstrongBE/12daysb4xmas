import { Claimable, NFTGrid } from "@/components/04_biomes/nft/NFTGrid";
import { TimedTemplate } from "@/interfaces/timed-template";
import { Api, JsonRpc } from "@proton/js";
import { ExplorerApi } from "atomicassets";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";
import { cache } from "react"

const json = new JsonRpc(process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS?.split(',')!)

const api = new Api({
  rpc:json
})

const aaApi = new ExplorerApi(process.env.ATOMIC_ENDPOINT!, "atomicassets", { fetch: fetch as any, });
  
const getClaimables = cache(async (): Promise<TimedTemplate[]> => {
  
  console.log(process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS?.split(',')!)

  const apiResult = await api.rpc.get_table_rows({
    json: true,
    code: '12daysb4xmas',
    scope: '12daysb4xmas',
    table: 'claimables',
    limit: 100
  })

  
  const templateIds = apiResult.rows.map((row) => {
    return row.templateId
  })
  
  const claimables = apiResult.rows.map((row) => {
    return row as Claimable
  })

  const templates = await  aaApi.getTemplates({ ids: templateIds.join(',') })
  const timedTemplates: TimedTemplate[] = templates.reduce((prev: TimedTemplate[], current: ITemplate) => {
    const foundClaimable = claimables.find((claimable)=>claimable.templateId.toString() == current.template_id)
    if (foundClaimable) prev.push({...current,activeStartTime:foundClaimable.activeStartTime,activeEndTime:foundClaimable.activeEndTime});
    return prev

  },[])

  return timedTemplates.sort((a,b)=>parseInt(a.template_id) -parseInt(b.template_id) );

  
})

export default async function Home() {

  const data = await getClaimables()
  console.log(data)
  return (
    <main >
      <div className="container mx-auto">
        <NFTGrid timedAssets={data}></NFTGrid>
      </div>
    </main>
  )
}

import { TimedTemplate } from "@/interfaces/timed-template";
import { isActiveRightNow } from "@/utils/timed-assets";
import { HTMLAttributes } from "react"

export interface Claimable {
  templateId: number;
  collectionName: string;
  activeStartTime: number;
  activeEndTime: number;
}

type NFTGridProps = HTMLAttributes<HTMLDivElement> & {
  timedAssets:TimedTemplate[]
}


export const NFTGrid: React.FunctionComponent<NFTGridProps> = ({ timedAssets }) => {
  
  
  
  return (
  <div className="grid grid-cols-4 gap-4">
    {
        timedAssets.map((timedAsset, index) => {
          const isActive = isActiveRightNow(timedAsset.activeStartTime, timedAsset.activeEndTime);
          return (
            <div className={`card shadow-xl relative ${isActive ? 'bg-secondary col-span-2' : 'bg-base-100'}`} key={index}>
              <div className="card-body">
                  <h2 className="card-title">{timedAsset.immutable_data.name}</h2>
                  <span className="card-title absolute bottom-0 left-0 text-7xl opacity-10">{index + 1}</span>
                  { isActiveRightNow(timedAsset.activeStartTime,timedAsset.activeEndTime) && <div className="badge absolute right-4">Active</div> }
                <p>{timedAsset.immutable_data.description}</p>
              </div>
            </div>
          )

      })
    }
  </div>)

}
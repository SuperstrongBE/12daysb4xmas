import { ITemplate } from "atomicassets/build/API/Explorer/Objects";

export type TimedTemplate = ITemplate & {
    activeStartTime: number;
    activeEndTime: number;
  
}
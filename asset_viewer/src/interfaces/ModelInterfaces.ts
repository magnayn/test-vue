import {
  MetaScene
} from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";

export interface Coordinate {
    x: number,
    y: number,
    z: number
  }
  
  export interface Cutplane {
    upper: number,
    lower: number
  }
  
  export interface BirdsEye {
    boxScale: number
  }
  
  export interface ModelInfo {
    metaScene?: MetaScene;
    assetDBClient:any;
    
    id: String,
    modelId: String,
    floorList: any,
    xktUrl: string,
  
    scaleRes: number,
    elevationScale: number,
  
    startPos: Coordinate,
    min: Coordinate,
    cen: Coordinate,
    max: Coordinate,
    partsCount: number,
  
    cutPlane: Cutplane,
    defaultObject: String,
  
    focusRange: number,
  
    birdsEye: BirdsEye
  }



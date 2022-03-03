import { ModelType, Coordinate } from "@/interfaces/ModelInterfaces";

export interface AssetDBClientOptions {
    baseUrl: string;
    token?: string;
    tenantId?: string;
}

export default class AssetDBClient {

    options: AssetDBClientOptions;

    constructor(options: AssetDBClientOptions) {
        this.options = options
    }

    async fetchModel(id: string, scope: string):Promise<ModelType> {

        const requestHeaders = new Headers({
            'Authorization': this.options.token ? `Bearer ${this.options.token}` : "",
            'x-tenant-id': `${this.options.tenantId}`,
        });

        const response = await fetch(
            `${this.options.baseUrl}/FindView/?bimobjectid=${id}&scope=${scope}`, {
            headers: requestHeaders
        }
        );

        var data = await response.json();
        data.assetDBClient = this;
        return data;
    }

    async fetchXkt(xkt: string):Promise<ModelType>{
        console.log("FetchXKT " + xkt);
        
        var data:ModelType = {
            assetDBClient: undefined,
            id: "",
            modelId: "",
            floorList: undefined,
            xktUrl: xkt,
            scaleRes: 0,
            elevationScale: 0,
            startPos: {x:0,y:0,z:0},
            min: {x:0,y:0,z:0},
            cen: {x:0,y:0,z:0},
            max: {x:0,y:0,z:0},
            partsCount: 1,
            cutPlane: {lower:0, upper:0},
            defaultObject: "",
            focusRange: 0,
            birdsEye: {boxScale: 1.0}
        }

        data.assetDBClient = this;
        return data;
    }

    getXKTUrlFor(x:string) {
        return x;
    }
}
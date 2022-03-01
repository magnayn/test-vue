
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

    async fetchModel(id: string, scope: string) {

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

    getXKTUrlFor(x:string) {
        return x;
    }
}
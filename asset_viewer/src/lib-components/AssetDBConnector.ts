
export interface AssetDBClientOptions {
    baseUrl: string;
    token?: string;
}

export default class AssetDBClient {

    options: AssetDBClientOptions;

    constructor(options: AssetDBClientOptions) {
        this.options = options
    }

    async fetchModel(id: string) {

        const requestHeaders = new Headers({
            'Authorization': this.options.token ? `Bearer ${this.options.token}` : ""
        });

        const response = await fetch(
            `${this.options.baseUrl}/api/v1/asset/model/${id}`, {
            headers: requestHeaders
        }
        );

        var data = await response.json();
        data.assetDBClient = this;
        return data;
    }

    getXKTUrlFor(id: string) {
        return `${this.options.baseUrl}/api/v1/asset/xkt/REQ-${id}.xkt`;
    }
}
import axios, { AxiosInstance } from "axios";
import { HttpResponse } from "./HttpResponse";

interface RequestParams {
	query?: Record<string, string>,
	headers?: Record<string, string>,
	// body?: Record<string, string>,
}
 export class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ baseURL: 'https://api.unsplash.com' });
  }
	
	private makeHeaders(headers?:Record<string, string>): Record<string, string>{
		return {
			...headers,
			'Authorization': `Client-ID 0gREHHpKtS4RX00cFzeeAtq5UrhL5uTVTMBLOaKi4MA`
		};
	}

	async get<T>(url: string, params?:RequestParams): Promise<HttpResponse<T>> {
    const response = await this.instance.get<T>(url, {
			headers: this.makeHeaders(params?.headers),
			params: params?.query,
		});

		return new HttpResponse<T>(
			response.status,
			response.data,
		);
  }
}


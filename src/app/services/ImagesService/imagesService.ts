import Toast from "react-native-toast-message";
import { HttpClient } from "../../config/httpClient";
import { ImageObject, ImagesResponse } from "../../entities/ImageResponse";

interface FetchParams {
	queryParams?: Record<string, string>;
}

export class ImagesService {
	constructor(private readonly httpClient: HttpClient) {}

	async fetch(params: FetchParams): Promise<ImageObject[]> {
		try {
			const response = await this.httpClient.get<ImagesResponse>('/search/photos', {
				query: params.queryParams,
			});

			if(response.status == 200){
				const results = response.data?.results || [];

				return results;
			}
			return [];
		} catch (e){
			Toast.show({
				type: 'error',
				text1: 'Não foi encontrado nenhuma imagem',
			})
			return [];
		}
	}

	async fetchRandomPhotos(): Promise<ImageObject[]>{
		try {
			const response = await this.httpClient.get<ImageObject[]>('/photos/random', {
				query: {
					count: '20',
				}
			});

			if(response.status == 200){
				return response.data || [];
			}

			return [];
		} catch(e) {
			Toast.show({
				type: 'error',
				text1: 'Não foi encontrado nenhuma imagem'
			})

			return []
		}
	}
}
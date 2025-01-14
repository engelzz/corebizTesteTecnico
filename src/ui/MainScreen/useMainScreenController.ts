import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HttpClient } from "../../app/config/httpClient";
import { ImageObject } from "../../app/entities/ImageResponse";
import { ImagesService } from "../../app/services/ImagesService/imagesService";

export function useMainScreenController() {
	const imageService = new ImagesService(new HttpClient());
	const [query, setQuery] = useState<string>("");
	const [photos, setPhotos] = useState<ImageObject[]>([]);

	const { isFetching, fetchNextPage, refetch } = useInfiniteQuery({
		queryKey: ["photos"],
		staleTime: 600000, // 10 minutos para que as imagens não sofram alterações
		queryFn: async ({ pageParam = 1 }) => {
			if (query) {
				const data = await imageService.fetch({
					queryParams: {
						query,
						page: pageParam,
					},
				})
				setPhotos((prevState) => [...prevState, ...data]);
			} else {
				const data = await imageService.fetchRandomPhotos();
				if(data != null){
					setPhotos(data);
				}
			}

			return pageParam;
		},
		getNextPageParam: (lastPage) => {
			return lastPage + 1;
		},
	});

	const resetPhotos = () => {
		setPhotos([]);
	};

	return {
		query,
		setQuery,
		photos,
		fetchNextPage,
		refetch,
		resetPhotos,
	};
}

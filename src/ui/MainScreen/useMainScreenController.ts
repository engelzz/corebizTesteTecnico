import {
  useNavigation
} from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { z } from 'zod';
import { getImages } from '../../app/services/GetImagesService/getImageService';
import { searchImages } from "../../app/services/SearchImagesService/searchImagesService";

const PhotosProps = z.object({
  id: z.string(),
  urls: z.object({
    small: z.string()
  }),
  user: z.object({
    name: z.string(),
    bio: z.string(),
    portifolio_url: z.string(),
    location: z.string()
  }),
  description: z.string().optional(),
  alt_description: z.string().optional(),
  asset_type: z.string(),
  likes: z.number()
})

type FormData = z.infer<typeof PhotosProps>;


export function useMainScreenController () {
    const [query, setQuery] = useState<string>('');
    const [photos, setPhotos] = useState<FormData[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const navigation = useNavigation();

    const { isFetching } = useQuery({
      queryKey: ['photos'],
      queryFn: async () => {
        const data = await getImages();
        setPhotos(data);
        return data;
      },
    })
  
    const handleSearch = async () => {
      setLoading(true);
      const results = await searchImages(query, page);
      setPhotos(results);
      setLoading(false);
    };

    const handleRefecth = async () => {
      const nextPage = page + 1;
      setLoading(true);

      const data = await searchImages(query, nextPage);

      if (data) {
        setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
        setPage(nextPage);
      }

      setLoading(false);
    };
  
    return {
        query,
        setQuery,
        photos,
        isFetching,
        handleSearch,
        navigation,
        handleRefecth
    }
}
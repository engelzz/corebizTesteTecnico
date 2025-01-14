import { HttpClient } from "../src/app/config/httpClient";
import { ImagesService } from "../src/app/services/ImagesService/imagesService";

// Mocking the HttpClient class
jest.mock('../src/app/config/httpClient');

describe('ImagesService', () => {
	let imagesService: ImagesService;
	let httpClientMock: jest.Mocked<HttpClient>;

	beforeEach(() => {
		httpClientMock = new HttpClient() as jest.Mocked<HttpClient>;
		imagesService = new ImagesService(httpClientMock);
	});

	describe('fetch', () => {
		it('should fetch images successfully', async () => {
			const mockResponse = {
				status: 200,
				data: {
					results: [
						{
							id: '123',
							alt_description: 'A beautiful mountain',
							url: 'https://example.com/mountain.jpg',
						},
					],
				},
			};

			httpClientMock.get.mockResolvedValue(mockResponse);

			const images = await imagesService.fetch({ queryParams: { query: 'mountain' } });

			expect(images).toEqual(mockResponse.data.results);
			expect(httpClientMock.get).toHaveBeenCalledWith('/search/photos', {
				query: { query: 'mountain' },
			});
		});

		it('should return an empty array if the API call fails', async () => {
			httpClientMock.get.mockRejectedValue(new Error('API error'));

			const images = await imagesService.fetch({ queryParams: { query: 'mountain' } });

			expect(images).toEqual([]);
		});
	});

	describe('fetchRandomPhotos', () => {
		it('should fetch random images successfully', async () => {
			const mockResponse = [
				{
					id: '123',
					alt_description: 'A random image',
					urls: 'https://example.com/random.jpg',
				},
			];

			httpClientMock.get.mockResolvedValue({
				status: 200,
				data: mockResponse,
			});

			const randomImages = await imagesService.fetchRandomPhotos();

			expect(randomImages).toEqual(mockResponse);
			expect(httpClientMock.get).toHaveBeenCalledWith('/photos/random', {
				query: {
					count: '20',
				},
			});
		});

		it('should return an empty array if the random API call fails', async () => {
			httpClientMock.get.mockRejectedValue(new Error('API error'));

			const randomImages = await imagesService.fetchRandomPhotos();

			expect(randomImages).toEqual([]);
		});
	});
});

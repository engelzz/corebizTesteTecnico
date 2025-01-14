export interface ImagesResponse {
	total: number
  total_pages: 7
  results: ImageObject[]
}

export interface ImageObject {
  id: string
  likes: number
  description: string
	alt_description: string
	asset_type: string
  user: User
	location: Location
  urls: Urls
}

export interface User {
  name: string
  bio: string
	social: social
}

export interface ProfileImage {
  small: string
}

export interface Location {
  name: string
}

export interface social {
  portfolio_url: string
  instagram_username: string
}

export interface Urls {
  small: string
}

export class ImageEntity {
	constructor(params: ImageObject) {
		Object.assign(this, params);
	}
}
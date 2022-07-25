export interface Game {
  id: number
  slug: string  
  background_image: string
  name: string
  released: string
  metacritic_url: string
  description: string
  metacritic: number
  genres: Genre[]
  parent_platforms: ParentPlatform[]
  ratings: Rating[]
  screenshots: Screenshots[]
  trailers: Trailer[]
  publishers: Publishers[]
}

interface Publishers {
  name: string
}

interface Trailer {
  id: number
  name: string
  preview: string
  data: {
    max: string
  }
}

interface Rating {
  id: number
  title: string
  count: number
  percent: number
}

interface ParentPlatform {
  platform: {
    id: number
    name: string
    slug: string
  }
}

interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}

interface Screenshots {
  image: string;
}

export interface APIResponse < T > {
  results: Array < T > ;
}

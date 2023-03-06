type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type Menu = { name: string; price: string };
export type Store = {
  nid: number;
  name: string;
  description: string;
  season: number;
  episode: number;
  coordinates: Coordinates;
  images: string[];
  characteristic: string;
  foodKind: string;
  address: string;
  phone: string;
  menus: Menu[];
};

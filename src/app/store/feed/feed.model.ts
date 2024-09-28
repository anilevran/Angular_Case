export interface Feed {
    id: string;
    title: string;
    images: { base64: string }[];
    storeInfo: { id: string,minOrderPrice: number,geoLocation: {latitude: number,longitude: number}};
    distance: number
  }
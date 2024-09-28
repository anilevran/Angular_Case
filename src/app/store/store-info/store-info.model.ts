import { Feed } from '@store/feed/feed.model';

export interface StoreInfo {
  storeInfoDetail: {
    id: string;
    name: string;
    workingHours: {
      day: number;
      open: string;
      close: string;
      closed: boolean;
    }[];
    properties: {
      delivery: boolean
    }
  };
  feedInfo: Feed
}

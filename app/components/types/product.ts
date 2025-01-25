export type Product = {
  id: string;
  name: string;
  breed: string;
  image: string;
  price: number;
  location: string;
  isAuction: boolean;
  timeLeft?: string;
  currentBid?: number;
  seller: {
    name: string;
    verified: boolean;
    avatar?: string;
  };
};

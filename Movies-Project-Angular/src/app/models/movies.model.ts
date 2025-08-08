export interface Movie {
  _id: string;
  title: string;
  genre: string;
  releaseDate: Date | string;
  description: string;
  imageUrl: string;
  createdBy: string ;
  likes?: string[];
}
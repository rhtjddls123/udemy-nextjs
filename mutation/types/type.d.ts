interface PostType {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: number;
}

interface NewPostType {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
}

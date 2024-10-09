import axios from "axios";

interface Room {
  _id: string;
  title: string;
  description: string;
  privacy: string;
  adminId: string;
  members: string[];
  createdAt: string;
}

export async function getRoomByTitle(title: string): Promise<Room | null> {
  try {
    const response = await axios.get<Room>(`/api/rooms/get/${title}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching room by title (${title}):`, error);
    return null;
  }
}

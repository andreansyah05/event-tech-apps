import axios from "axios";

export class EventHandlerApi {
  async getAllEvent() {
    try {
      const response = await axios.get("/api/users/events");
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }

  async getAllEventBySearch(searchString: string) {
    try {
      const response = await axios.get(
        `/api/users/search-events?search=${searchString}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }

  async geEventById(eventId: number) {
    try {
      const response = await axios.get(`/api/users/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.log("Error fetch events", error);
      return [];
    }
  }
}

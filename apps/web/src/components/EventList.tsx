import { EventCardProps } from "@/models/models";
import EventCard from "./EventCard";
import { useRouter } from "next/router";
import Button from "./Button";

interface EvenListProps {
  eventData: EventCardProps[];
  onClick?: () => void;
}

function EventList({ eventData, onClick }: EvenListProps) {
  const router = useRouter();
  function redirectToDetail(eventId: number) {
    router.push(`/event/${eventId}`);
  }
  return (
    <div>
      <p className="text-sm text-gray-500 font-medium mb-6">
        {eventData.length} Event found
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 lg:gap-4">
        {eventData.map((event: EventCardProps, index) => {
          return (
            <EventCard
              event_description=""
              event_id={event.event_id}
              key={index}
              event_name={event.event_name}
              category_name={event.category_name}
              event_price={event.event_price}
              event_start_date={event.event_start_date}
              event_end_date={event.event_end_date}
              event_image={event.event_image}
              event_capacity={event.event_capacity}
              is_online={event.is_online}
              is_paid={event.is_paid}
              onClick={() => {
                redirectToDetail(event.event_id as number);
              }}
            />
          );
        })}
      </div>
      <div className="w-full py-8 flex justify-center">
        <Button
          isButton={true}
          text="Load More"
          width="w-fit"
          type="primary"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default EventList;

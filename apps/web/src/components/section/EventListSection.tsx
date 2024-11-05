import { Suspense } from "react";
import { EventHandlerApi } from "@/utils/eventHandler";
import { EventCardProps } from "@/models/models";
import React, { useEffect, useRef, useState } from "react";
import InputField from "../InputField";
// import EventCard from "../EventCard";
import EventList from "../EventList";
import EventListLoading from "../loading/EventList.loading";

function EventListSection() {
  const eventHandlerApi = new EventHandlerApi(); // Initialize event handler API
  const [inputSearch, setInputSearch] = useState<string>("");
  const [eventData, setEventData] = useState<EventCardProps[]>([]);
  const isInitialRender = useRef<boolean>(true); // Check if its already be render or not
  const [isLoading, setIsLoading] = useState(true); // Track data loading state
  const [error, setError] = useState<string | null>(null); // Track potential errors

  // Handle Input Search (Debounced)
  function handleInputSearch(newValue: string) {
    setInputSearch(newValue); // Update state first
  }

  // Handler Searching Event
  async function handlerSearchingEvent(inputSearch: string) {
    if (inputSearch === "") {
      const response = await eventHandlerApi.getAllEvent();
      setEventData(response.data);
    } else {
      try {
        setIsLoading(true); // set loading to true
        const response = await eventHandlerApi.getAllEventBySearch(inputSearch);
        setEventData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  // Handle Fetching Data
  async function handleGetAllEvent() {
    try {
      setIsLoading(true); // set loading to true
      const response = await eventHandlerApi.getAllEvent();
      setEventData(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Check the status of render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      handleGetAllEvent();
    } else {
      const timeoutId = setTimeout(() => {
        handlerSearchingEvent(inputSearch);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [inputSearch]);

  return (
    <section id="productSection" className="px-4 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[325px_1fr]">
        {/* SEARCH INPUT */}
        <div className="max-w-96">
          <h2 className="text-gray-950 text-2xl font-bold mb-6 lg:text-3xl lg:mb-10">
            EXPLORE OUR EVENT
          </h2>
          <InputField
            id="searchProduct"
            onChange={handleInputSearch}
            type="text"
            value={inputSearch}
            placeholder="Search any events"
          />
        </div>

        {/* LIST DATA */}
        <Suspense fallback={<EventListLoading />}>
          {isLoading ? (
            <EventListLoading />
          ) : (
            <EventList eventData={eventData} />
          )}
        </Suspense>
      </div>
    </section>
  );
}

export default EventListSection;

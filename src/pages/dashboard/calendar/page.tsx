// src/pages/CalendarPage.tsx
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Section from "@/components/ui/section";
import "@/styles/calendar.css";
import { Button } from "@/components/ui/button";
import { Calendar1Icon, FlagIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DatesSetArg } from "@fullcalendar/core";
import { useGetCalendarQuery } from "@/features/events/eventsApiSlice";

export function CreateEventModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        {/* Your form inputs go here */}
        <Button onClick={() => onOpenChange(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}

export function ViewEventModal({
  event,
  onClose,
}: {
  event: any;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event?.title || "Event Details"}</DialogTitle>
        </DialogHeader>
        <p>Start: {event?.start?.toLocaleString()}</p>
        <p>End: {event?.end?.toLocaleString()}</p>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}

const EventItem = () => (
  <div className="flex gap-4.5">
    <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
    <div>
      <p className="leading-3 mb-3">Today, 00:15 - 00:30</p>
      <p className="font-medium">Advanced Programming lecture</p>
    </div>
  </div>
);

const CalendarPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [params, setParams] = useState<{ year: number; month?: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { data: days = [], isLoading } = useGetCalendarQuery(params, {
    skip: !params.year,
  });

  const events = days.flatMap((d) =>
    d.events.map((e) => ({
      id: e.id,
      title: e.name,
      start: e.startDate,
      end: e.endDate,
      className: e.fromMoodle ? "event-moodle" : "event-local",
    }))
  );

  function onDatesSet(arg: DatesSetArg) {
    const viewType = arg.view.type;
    const year = arg.start.getFullYear();
    let month: number | undefined;

    if (viewType === "dayGridMonth") {
      month = arg.start.getMonth() + 1;
    }

    setParams({ year, month });
  }

  const headerToolbar = isLoading
    ? { center: "title" }
    : {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,listYear",
      };

  return (
    <Section
      variant="large"
      className="bg-brand-gray-bluish pt-[75px] pb-[60px] h-full flex-grow"
    >
      <div className="flex gap-10">
        <div className="w-90 flex flex-col gap-6">
          <Button
            className="w-full shadow-md text-xl h-14 px-9"
            onClick={() => setCreateModalOpen(true)}
          >
            <PlusIcon /> <span>Create event</span>
          </Button>

          <Card className="pt-0 gap-0">
            <CardHeader className="rounded-t-lg py-5 flex gap-5 bg-brand-gray-light">
              <Calendar1Icon />
              <span className="font-semibold">Upcoming events</span>
            </CardHeader>
            <CardContent className="pt-9 flex flex-col gap-7">
              <EventItem />
              <EventItem />
              <EventItem />
            </CardContent>
          </Card>

          <Card className="pt-0 gap-0">
            <CardHeader className="rounded-t-lg py-5 flex gap-5 bg-brand-gray-light">
              <FlagIcon />
              <span className="font-semibold">Categories</span>
            </CardHeader>
            <CardContent className="flex flex-col">
              {["University", "Clubs", "Meetings", "Holidays"].map(
                (cat, index) => (
                  <div
                    key={cat}
                    className={cn(
                      "flex gap-4 items-center py-4",
                      index !== 3 && "border-b"
                    )}
                  >
                    <Checkbox className="w-5 h-5" />
                    <p className="text-lg">{cat}</p>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 bg-white p-6 rounded-md relative">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView={params.month ? "dayGridMonth" : "listYear"}
            headerToolbar={headerToolbar}
            events={events}
            datesSet={onDatesSet}
            eventClick={(info) => setSelectedEvent(info.event)}
          />

          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      <CreateEventModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <ViewEventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </Section>
  );
};

export default CalendarPage;

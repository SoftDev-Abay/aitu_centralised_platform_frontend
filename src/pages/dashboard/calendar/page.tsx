// src/pages/CalendarPage.tsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Section from "@/components/ui/section";
import "@/styles/calendar.css"; // import this for custom styling
import { Button } from "@/components/ui/button";
import { Calendar1Icon, Circle, FlagIcon, PlusIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const EventItem = () => {
  return (
    <div className="flex gap-4.5 ">
      <div className="w-2.5 h-2.5 rounded-full bg-blue-400 "></div>
      <div>
        <p className="leading-3 mb-3">Today, 00:15 - 00:30</p>
        <p className="font-medium">Advanced Proggramming lecture</p>
      </div>
    </div>
  );
};

const CalendarPage = () => {
  return (
    <Section
      variant="large"
      className=" bg-brand-gray-bluish pt-[75px] pb-[60px] h-full flex-grow"
    >
      <h1 className="font-semibold text-[40px] mb-6">Calendar</h1>

      <div className=" flex gap-10">
        <div className="w-90 flex flex-col gap-6">
          <Button className="w-full shadow-md text-xl h-14 px-9">
            <PlusIcon />
            <span>Create event</span>
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
            <CardContent className=" flex flex-col ">
              <div className="flex gap-4 items-center border-b py-4">
                <Checkbox className="w-5 h-5" />
                <p className="text-lg">University</p>
              </div>
              <div className="flex gap-4 items-center border-b py-4">
                <Checkbox className="w-5 h-5" />
                <p className="text-lg">Clubs</p>
              </div>
              <div className="flex gap-4 items-center border-b py-4">
                <Checkbox className="w-5 h-5" />
                <p className="text-lg">Meetings</p>
              </div>
              <div className="flex gap-4 items-center py-4">
                <Checkbox className="w-5 h-5" />
                <p className="text-lg">Holidays</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 bg-white p-6 rounded-md  ">
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={[
              {
                title: "Team Sync",
                start: "2025-06-03T10:00:00",
                end: "2025-06-03T11:00:00",
                className: "fc-event-brand",
              },
              {
                title: "Design Review",
                start: "2025-06-05T14:00:00",
                end: "2025-06-05T15:00:00",
                className: "fc-event-brand",
              },
              {
                title: "Hackathon",
                start: "2025-06-07T09:00:00",
                end: "2025-06-07T18:00:00",
                className: "fc-event-brand",
              },
            ]}
          />
        </div>
      </div>
    </Section>
  );
};

export default CalendarPage;

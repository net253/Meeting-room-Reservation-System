import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import th from "date-fns/locale/th";
import { format, parse, startOfWeek, getDay } from "date-fns";

const locales = {
  th: th,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MyCalendar({ information }) {
  const eventList = [];
  information.map((data, i) => {
    const user = data.name;
    const rooms = data.rooms;
    const start = data.datetimeUse.slice(0, 19).split(" ");
    const end = data.datetimeReturn.slice(0, 19).split(" ");
    const arrStart = start[0].split("-").concat(start[1].split(":"));
    const arrEnd = end[0].split("-").concat(end[1].split(":"));
    eventList.push({
      title: user + " " + rooms,
      start: new Date(
        arrStart[0],
        arrStart[1] - 1,
        arrStart[2],
        arrStart[3],
        arrStart[4],
        arrStart[5]
      ),
      end: new Date(
        arrEnd[0],
        arrEnd[1] - 1,
        arrEnd[2],
        arrEnd[3],
        arrEnd[4],
        arrEnd[5]
      ),
      desc: rooms,
    });
  });

  // console.log(eventList);

  return (
    <>
      <div>
        <Calendar
          popup
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "65vh" }}
          eventPropGetter={(event) => {
            const backgroundColor =
              event.desc ==
              "ห้องประชุม นิคมพัฒนา ตู้ CTN ชั้น 1 ประตู 1 (8 ที่นั่ง)"
                ? "#00ff44"
                : event.desc ==
                  "ห้องประชุม บ้านฉาง ตู้ CTN ชั้น 1 ประตู 1 (10 ที่นั่ง)"
                ? "#ffdd00"
                : event.desc ==
                  "ห้องประชุม บ้านบ้านค่าย ตู้ CTN ชั้น 1 ประตู 1 (10 ที่นั่ง)"
                ? "#006aff"
                : event.desc ==
                  "ห้องประชุม เมืองระยอง ตู้ CTN ชั้น 2 ประตู 1 (20 ที่นั่ง)"
                ? "#d400ff"
                : event.desc == "ห้องประชุม B12 ชั้น 2 (11 ที่นั่ง)"
                ? "#6be585"
                : "#fdbb2d";
            return { style: { backgroundColor } };
          }}
          views={["month", "week", "day"]}
          defaultView={"week"}
        />
      </div>
    </>
  );
}

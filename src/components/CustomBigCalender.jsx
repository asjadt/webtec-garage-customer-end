import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { generateYearlyRepeatingEvents } from "../utils/generateYearlyRepeatingEvents";

const localizer = momentLocalizer(moment);

export const CustomBigCalender = ({
  events,
  onSelectSlot,
  onSelecting,
  onDoubleClickEvent,
  onDrillDown,
  onKeyPressEvent,
  onNavigate,
  onRangeChange,
  onSelectEvent,
  onShowMore,
  defaultView = "month",
}) => (
  <div className="h-[90vh] md:h-screen">
    <Calendar
      localizer={localizer}
      events={events.flatMap(generateYearlyRepeatingEvents)}
      startAccessor="start"
      endAccessor="end"
      onSelectSlot={onSelectSlot}
      onSelecting={onSelecting}
      onDoubleClickEvent={onDoubleClickEvent}
      onDrillDown={onDrillDown}
      onKeyPressEvent={onKeyPressEvent}
      onNavigate={onNavigate}
      onRangeChange={onRangeChange}
      onSelectEvent={onSelectEvent}
      onShowMore={onShowMore}
      selectable
      defaultView={defaultView}
    />
  </div>
);

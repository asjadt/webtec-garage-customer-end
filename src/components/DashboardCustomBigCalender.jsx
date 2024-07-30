import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { generateYearlyRepeatingEvents } from "../utils/generateYearlyRepeatingEvents";

const localizer = momentLocalizer(moment);

export const DashboardCustomBigCalender = ({
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
  views = [["month", "week", "day"]],
}) => (
  <div className="h-full">
    <Calendar
      localizer={localizer}
      events={events.flatMap(generateYearlyRepeatingEvents)}
      startAccessor="start"
      endAccessor="end"
      onSelectSlot={onSelectSlot}
      onSelecting={onSelecting}
      onDoubleClickEvent={onDoubleClickEvent}
      onDrillDown={onDrillDown}
      views={views}
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

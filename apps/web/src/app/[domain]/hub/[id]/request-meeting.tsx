import type { CalendarDate } from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getLocalTimeZone,
  getWeeksInMonth,
  today,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

import type { Ent } from "@knowingly/backend/convex/types";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
import { Modal, ModalContent, ModalTrigger } from "@knowingly/ui/modal";

import { Calendar } from "~/components/request-meeting/calendar";
import { FormPanel } from "~/components/request-meeting/form-panel";
import { LeftPanel } from "~/components/request-meeting/left-panel";
import { RightPanel } from "~/components/request-meeting/right-panel";

export const RequestMeeting = ({ creator }: { creator: Ent<"users"> }) => {
  const router = useRouter();
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const slotParam = searchParams.get("slot");

  const [timeZone, setTimeZone] = React.useState("Europe/Stockholm");
  const [date, setDate] = React.useState(today(getLocalTimeZone()));
  const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
    date,
  );

  const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set(
      "date",
      date.toDate(timeZone).toISOString().split("T")[0] ?? "",
    );
    router.push(url.toString());
  };

  const handleChangeAvailableTime = (time: string) => {
    const timeValue = time.split(":").join(" ");

    const match = /^(\d{1,2}) (\d{2})([ap]m)?$/i.exec(timeValue);
    if (!match) {
      console.error("Invalid time format");
      return null;
    }

    let hours = Number.parseInt(match[1] ?? "");
    const minutes = Number.parseInt(match[2] ?? "");
    const isPM = match[3] && match[3].toLowerCase() === "pm";

    if (isPM && (hours < 1 || hours > 12)) {
      console.error("Time out of range (1-12) in 12-hour format");
      return null;
    }

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const currentDate = date.toDate(timeZone);
    currentDate.setHours(hours, minutes);

    const url = new URL(window.location.href);
    url.searchParams.set("slot", currentDate.toISOString());
    router.push(url.toString());
  };

  const showForm = !!dateParam && !!slotParam;
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button size="sm" variant="ringHover">
          <Icons.calendarEvent className="mr-2 h-5 w-5" />
          Request meeting
        </Button>
      </ModalTrigger>
      <ModalContent className="min-w-fit">
        <div className="bg-gray-1 mx-auto w-full max-w-max rounded-md px-8 py-6">
          <div className="flex gap-6">
            <LeftPanel
              showForm={showForm}
              timeZone={timeZone}
              setTimeZone={setTimeZone}
              name={creator.name}
            />
            {!showForm ? (
              <>
                <Calendar
                  minValue={today(getLocalTimeZone())}
                  defaultValue={today(getLocalTimeZone())}
                  value={date}
                  onChange={handleChangeDate}
                  onFocusChange={(focused) => setFocusedDate(focused)}
                />
                <RightPanel
                  {...{
                    date,
                    timeZone,
                    weeksInMonth,
                    handleChangeAvailableTime,
                  }}
                />
              </>
            ) : (
              <FormPanel creator={creator} />
            )}
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

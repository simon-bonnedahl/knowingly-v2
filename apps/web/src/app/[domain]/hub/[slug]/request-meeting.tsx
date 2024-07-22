import { Ent } from "@knowingly/backend/convex/types"
import { Button } from "@knowingly/ui/button"
import {
    Modal,
    ModalBody,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTrigger,
  } from "@knowingly/ui/modal"
import { Icons } from "~/components/icons"


import {
	type CalendarDate,
	getLocalTimeZone,
	getWeeksInMonth,
	today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { LeftPanel } from "~/components/request-meeting/left-panel"
import { Calendar } from "~/components/request-meeting/calendar"
import { RightPanel } from "~/components/request-meeting/right-panel"
import { FormPanel } from "~/components/request-meeting/form-panel"

export const RequestMeeting = ({creator} : {creator : Ent<"users">}) => {

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
			date.toDate(timeZone).toISOString().split("T")[0],
		);
		router.push(url.toString());
	};

	const handleChangeAvailableTime = (time: string) => {
		const timeValue = time.split(":").join(" ");

		const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
		if (!match) {
			console.error("Invalid time format");
			return null;
		}

		let hours = Number.parseInt(match[1]);
		const minutes = Number.parseInt(match[2]);
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
    return(
        <Modal>
      <ModalTrigger asChild>
      <Button size="sm" variant="ringHover" >
          <Icons.calendarEvent className="h-5 w-5 mr-2"/>
          Request meeting
        </Button>
      </ModalTrigger>
      <ModalContent className="min-w-fit">
      <div className="w-full bg-gray-1 px-8 py-6 rounded-md max-w-max mx-auto">
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
							{...{ date, timeZone, weeksInMonth, handleChangeAvailableTime }}
						/>
					</>
				) : (
					<FormPanel creator={creator} date={date.toDate(timeZone)} />
				)}
			</div>
		</div>
      </ModalContent>
    </Modal>
    )
}
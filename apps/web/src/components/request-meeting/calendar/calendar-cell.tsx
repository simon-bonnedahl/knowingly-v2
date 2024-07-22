import {
	type CalendarDate,
	getLocalTimeZone,
	isSameMonth,
	isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import { useRef } from "react";
import { cn } from "~/lib/utils";

export function CalendarCell({
	state,
	date,
	currentMonth,
}: {
	state: CalendarState;
	date: CalendarDate;
	currentMonth: CalendarDate;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
		useCalendarCell({ date }, state, ref);

	const isOutsideMonth = !isSameMonth(currentMonth, date);

	const isDateToday = isToday(date, getLocalTimeZone());

	const { focusProps, isFocusVisible } = useFocusRing();

	return (
		<td
			{...cellProps}
			className={cn("py-0.5 relative px-0.5", isFocusVisible ? "z-10" : "z-0")}
		>
			<div
				{...mergeProps(buttonProps, focusProps)}
				ref={ref}
				hidden={isOutsideMonth}
				className="size-14 outline-none group rounded-md"
			>
				<div
					className={cn(
						"size-full rounded-md flex items-center justify-center",
						"text-gray-12 text-sm font-semibold",
						isDisabled
							? "cursor-default"
							: "cursor-pointer bg-primary/30",
						// Focus ring, visible while the cell has keyboard focus.
						isFocusVisible &&
							"ring-1 group-focus:z-2 ring-primary ring-offset-1",
						// Darker selection background for the start and end.
						isSelected && "bg-primary text-primary-foreground",
						// Hover state for non-selected cells.
						!isSelected && !isDisabled && "hover:ring-2 hover:ring-primary",
						// isDateToday && "bg-gray-1 text-primary ring-0 ring-offset-0",
					)}
				>
					{formattedDate}
					{isDateToday && (
						<div
							className={cn(
								"absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
								isSelected && "bg-primary-foreground",
							)}
						/>
					)}
				</div>
			</div>
		</td>
	);
}

"use client";
import { Icons } from "@knowingly/icons"
import { cn } from "@knowingly/ui"
import { Button } from "@knowingly/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover"
import { Calendar } from "@knowingly/ui/calendar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { addDays, format, subDays } from "date-fns"



export const DateFilter = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (date?.from) newSearchParams.set('startDate', format(date.from, 'yyyy-MM-dd'))
    if (date?.to) newSearchParams.set('endDate', format(date.to, 'yyyy-MM-dd'))
    router.push(`/analytics?${newSearchParams.toString()}`)
  }

  useEffect(() => {
    applyFilters()
    }
    , [date])


    return(
        <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full md:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Icons.calendarEvent className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="p-3 border-t border-border">
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setDate({ from: subDays(new Date(), 7), to: new Date() })}
            >
              Last 7 days
            </Button>
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setDate({ from: subDays(new Date(), 30), to: new Date() })}
            >
              Last 30 days
            </Button>
            <Button
              variant="outline"
              onClick={() => setDate({ from: subDays(new Date(), 90), to: new Date() })}
            >
              Last 90 days
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
}
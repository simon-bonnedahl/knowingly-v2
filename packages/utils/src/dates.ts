export function formatDate(
    date: Date | string | number,
    opts: Intl.DateTimeFormatOptions = {}
  ) {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date))
  }
  
export function formatTime(
    date: Date | string | number,
    opts: Intl.DateTimeFormatOptions = {}
  ) {
    return new Intl.DateTimeFormat("en-US", {
      hour12: opts.hour12 ?? false,
      hour: opts.hour ?? "numeric",
      minute: opts.minute ?? "numeric",
      ...opts,
    }).format(new Date(date))
  }
  export function formatCountdown(
    date: Date | string | number,
    opts: Intl.DateTimeFormatOptions = {}
  ) {
    const timeDiff = new Date(date).getTime() - Date.now()
    if(timeDiff < 0) {
      // days/hours/minutes  ago
      const days = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24))
      if(days >= 1) return days + " days ago"
      const hours = Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      if(hours >= 1) return hours + " hours ago"
      const minutes = Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60)) / (1000 * 60))
      if(minutes >= 1) return minutes + " mins ago"


    }else {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      if(days >= 1) return "In " + days + " days"
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      if(hours >= 1) return "In " + hours + " hours"
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      if(minutes >= 1) return "In " + minutes + " mins"

    }
  
  
  
  }
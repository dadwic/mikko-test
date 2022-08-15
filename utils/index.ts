// Check day is weekend
export const isWeekend = (day: string) => ["Sunday", "Saturday"].includes(day);

// SWR fetcher
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { isWeekend } from "utils";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PaymentDate } from "interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // CSV file rows
  let rows: string[] = [];
  let result: PaymentDate[] = [];
  // Get year int from query param
  const csv: boolean = Boolean(req.query.export as string) || false;
  // Get current year int and selected year form query param
  const currentYear = new Date().getFullYear();
  const yearInt: number = Number(req.query.y as string) || currentYear;
  const isThisYear: boolean = currentYear === yearInt;
  // Get current month of year
  const monthInt: number = moment(isThisYear ? [] : [yearInt]).month();

  // Add columns to csv file
  if (csv) rows.push("ID,Month,Salary Payment Date,Bonus Payment Date");

  for (let index = monthInt; index < 12; ++index) {
    const endOfMonth = moment([yearInt, index]).endOf("month");
    const _15OfMonth = moment([yearInt, index]).endOf("month").add(15, "days");

    const salaryDate = isWeekend(endOfMonth.format("dddd"))
      ? endOfMonth.add(1, "weeks").startOf("isoWeek") // isoWeek starts Monday
      : endOfMonth;

    const bonusDate = isWeekend(_15OfMonth.format("dddd"))
      ? _15OfMonth.add(1, "weeks").startOf("isoWeek") // isoWeek starts Monday
      : _15OfMonth;

    const obj = {
      id: uuidv4(),
      month: moment.months(index),
      salaryPaymentDate: salaryDate.format("ddd - MM/DD/YYYY"),
      bonusPaymentDate: bonusDate.format("ddd - MM/DD/YYYY"),
    };
    result.push(obj);
    // Add new record to csv file
    rows.push(Object.values(obj).join());
  }

  // Export CSV|JSON
  if (csv) {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=export.csv");
    res.status(200).end(rows.join("\n"));
  } else res.status(200).json(result);
}

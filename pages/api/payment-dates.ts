import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PaymentDate } from "interfaces";

const isWeekend = (d: string) => ["Sunday", "Saturday"].includes(d);

let data: string = `id,month,salaryPaymentDate,bonusPaymentDate\n`;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let result: PaymentDate[] = [];
  // Get year int from query param
  const csv: boolean = Boolean(req.query.export as string) || false;
  // Get current year int and selected year form query param
  const currentYear = new Date().getFullYear();
  const yearInt: number = Number(req.query.y as string) || currentYear;
  const isThisYear: boolean = currentYear === yearInt;
  // Get current month of year
  const monthInt: number = moment(isThisYear ? [] : [yearInt]).month();

  for (let index = monthInt; index < 12; ++index) {
    const endOfMonth = moment([yearInt, index]).endOf("month");
    const _15OfMonth = moment([yearInt, index]).endOf("month").add(15, "days");

    const salaryPaymentDate = isWeekend(endOfMonth.format("dddd"))
      ? endOfMonth.add(1, "weeks").startOf("isoWeek").unix() // isoWeek starts Monday
      : endOfMonth.unix();

    const bonusPaymentDate = isWeekend(_15OfMonth.format("dddd"))
      ? _15OfMonth.add(1, "weeks").startOf("isoWeek").unix() // isoWeek starts Monday
      : _15OfMonth.unix();

    const obj = {
      id: uuidv4(),
      month: moment.months(index),
      salaryPaymentDate,
      bonusPaymentDate,
    };
    result.push(obj);
    // Add new row to csv file
    data += `\n${Object.values(obj).join()}`;
  }

  // Export CSV|JSON
  if (csv) {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=export.csv");
    res.status(200).end(data);
  } else res.status(200).json(result);
}

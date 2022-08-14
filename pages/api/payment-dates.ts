import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PaymentDate } from "interfaces";

const isWeekend = (d: string) => ["Sunday", "Saturday"].includes(d);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let result: PaymentDate[] = [];
  // Get year int from query param
  const year: string = (req.query.y as string) || "2022";
  const yearInt: number = parseInt(year);
  // Get current month int
  const monthInt: number = moment().month();

  for (let index = monthInt; index < 12; ++index) {
    const endOfMonth = moment([yearInt, index]).endOf("month");
    const _15OfMonth = moment([yearInt, index]).endOf("month").add(15, "days");

    const salaryPaymentDate = isWeekend(endOfMonth.format("dddd"))
      ? endOfMonth.add(1, "weeks").startOf("isoWeek").unix() // isoWeek starts Monday
      : endOfMonth.unix();

    const bonusPaymentDate = isWeekend(_15OfMonth.format("dddd"))
      ? _15OfMonth.add(1, "weeks").startOf("isoWeek").unix() // isoWeek starts Monday
      : _15OfMonth.unix();

    result.push({
      id: uuidv4(),
      month: moment.months(index),
      salaryPaymentDate,
      bonusPaymentDate,
    });
  }
  // Get data from your database
  res.status(200).json(result);
}

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PaymentDate } from "../../interfaces";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  let result: PaymentDate[] = [];
  const monthInt = new Date().getMonth();

  for (let index = monthInt; index < 12; ++index) {
    const endOfMonth = moment([2022, index]).endOf("month");
    const isWeekend = ["Sunday", "Saturday"].includes(
      endOfMonth.format("dddd")
    );

    const salaryPaymentDate = isWeekend
      ? endOfMonth.add(1, "weeks").startOf("isoWeek").unix() // isoWeek starts Monday
      : endOfMonth.unix();

    result.push({
      id: uuidv4(),
      month: moment.months(index),
      salaryPaymentDate,
      bonusPaymentDate: 1657046064,
    });
  }
  // Get data from your database
  res.status(200).json(result);
}

import type { NextApiRequest, NextApiResponse } from "next";
import type { PaymentDate } from "../../interfaces";

// Fake users data
const users: PaymentDate[] = [
  {
    id: 1,
    month: "February",
    salaryPaymentDate: 1644777264,
    bonusPaymentDate: 1645554864,
  },
  {
    id: 2,
    month: "September",
    salaryPaymentDate: 1663007664,
    bonusPaymentDate: 1664044464,
  },
  {
    id: 3,
    month: "July",
    salaryPaymentDate: 1656700464,
    bonusPaymentDate: 1657046064,
  },
];

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json(users);
}

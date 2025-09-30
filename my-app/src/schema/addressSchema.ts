import * as zod from "zod";

const cities = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Port Said",
  "Suez",
  "Luxor",
  "Aswan",
  "Mansoura",
  "Tanta",
  "Zagazig",
  "Ismailia",
  "Fayoum",
  "Minya",
  "Assiut",
  "Sohag",
  "Qena",
  "Beni Suef",
  "Hurghada",
  "Sharm El Sheikh"
] as const;

export const scheme = zod.object({
  name: zod
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  details: zod
    .string()
    .nonempty("Details are required")
    .min(3, "Details must be at least 3 characters long")
    .max(100, "Details must be at most 100 characters long"),
  phone: zod
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^01[0125][0-9]{8}$/,
      "Please enter a valid Egyptian mobile number (e.g., 01012345678)."
    ),
  city: zod.enum(cities),
});
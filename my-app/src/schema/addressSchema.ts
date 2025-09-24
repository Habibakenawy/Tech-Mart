import * as zod from "zod";

export const scheme = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name  must be at most 20 characters long"),
    details: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(100, "Name  must be at most 100 characters long"),
    phone: zod
      .string()
      .nonempty()
      .regex(
        /^01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian mobile number (e.g., 01012345678 or +201012345678)."
      ),
    city: zod.enum([
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
  ], {
    required_error: "City is required",
    invalid_type_error: "Please select a valid Egyptian city"
  }),

  });
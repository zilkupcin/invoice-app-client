import Joi from "joi";

// Invoice Validation
export const invoiceValidation = (data) => {
  const itemSchema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
  }).unknown(true);

  const invoiceSchema = Joi.object({
    streetAddress: Joi.string().min(6).required(),
    city: Joi.string().min(2).required(),
    postCode: Joi.string().min(2).required(),
    country: Joi.string().min(6).required(),
    clientName: Joi.string().min(2).required(),
    clientEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    clientStreetAddress: Joi.string().min(6).required(),
    clientCity: Joi.string().min(2).required(),
    clientPostCode: Joi.string().min(2).required(),
    clientCountry: Joi.string().min(6).required(),
    date: Joi.date().required(),
    paymentTerms: Joi.string()
      .valid("net_1", "net_7", "net_14", "net_30")
      .required(),
    projectDescription: Joi.string().min(6).required(),
    status: Joi.string().valid("draft", "pending", "paid").required(),
    items: Joi.array().min(1).items(itemSchema),
  }).unknown(true);

  return invoiceSchema.validate(data, { abortEarly: false });
};

export const itemValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
  }).unknown(true);

  return schema.validate(data);
};

import Joi from "joi";

const validationSchemas = {
  toolSchema: Joi.object({
    tool_name: Joi.string().alphanum().min(4).max(45).required(),
    tool_serial: Joi.string().alphanum().max(45),
    part_number: Joi.string().alphanum().min(3).max(45).required(),
    tool_quantity: Joi.number().positive().integer().required(),
    tool_has_half_life: Joi.boolean(),
    tool_half_life_quantity: Joi.number().positive().integer(),
    tool_requires_match: Joi.boolean(),
    tool_match: Joi.string().alphanum().min(3).max(45),
  }),

  machineSchema: Joi.object({
    machine_name: Joi.string().alphanum().min(3).max(45),
  }),

  manufacturerSchema: Joi.object({
    manufacturer_name: Joi.string().alphanum().min(4).max(45),
    manufacturer_website: Joi.string(),
    manufacturer_vendor: Joi.string().alphanum().min(4).max(45),
  }),

  quantitySchema: Joi.object({
    quantity_requested: Joi.number().positive().integer(),
    quantity_minimum: Joi.number().positive().integer(),
  }),

  toolTypeSchema: Joi.object({
    tool_type: Joi.string().alphanum().min(4).max(45),
  }),

  maxSharpenSchema: Joi.object({
    times_sharpened: Joi.number().positive().integer(),
    max_sharpen_amount: Joi.number().positive().integer(),
  }),
};

export default validationSchemas;

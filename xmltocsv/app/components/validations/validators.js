import Joi from "joi";

const validationSchemas = {
  toolSchema: Joi.object({
    tool_name: Joi.string().min(4).max(45).required().allow(' '),
    tool_serial: Joi.string().max(45),
    part_number: Joi.string().min(3).max(45).required().allow(' '),
    tool_quantity: Joi.number().positive().integer().required(),
    tool_has_half_life: Joi.boolean(),
    tool_half_life_quantity: Joi.number().positive().integer(),
    tool_requires_match: Joi.boolean(),
    tool_match: Joi.string().min(3).max(45).allow(' '),
  }),

  machineSchema: Joi.object({
    machine_name: Joi.string().min(3).max(45).allow(' '),
  }),

  manufacturerSchema: Joi.object({
    manufacturer_name: Joi.string().min(4).max(45).allow(' '),
    manufacturer_website: Joi.string(),
    manufacturer_vendor: Joi.string().min(4).max(45).allow(' '),
  }),

  quantitySchema: Joi.object({
    quantity_requested: Joi.number().positive().integer(),
    quantity_minimum: Joi.number().positive().integer(),
  }),

  toolTypeSchema: Joi.object({
    tool_type: Joi.string().min(4).max(45).allow(' '),
  }),

  maxSharpenSchema: Joi.object({
    times_sharpened: Joi.number().positive().integer(),
    max_sharpen_amount: Joi.number().positive().integer(),
  }),
};

export default validationSchemas;
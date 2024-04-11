import { Joi, Segments, celebrate } from "celebrate";

export const loginSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(1),
  }),
});

export const RegisterSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(1),
    userName: Joi.string().required().min(1),
  }),
});

export const IdParamSchema = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required().min(1),
  },
});

export const ProductQuerySchema = celebrate({
  [Segments.QUERY]: {
    isLatest: Joi.boolean().optional(),
  },
});

export const ProductCreateSchema = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required().min(1),
    description: Joi.string().min(1),
    price: Joi.number().required(),
  }),
});

import * as joi from 'joi';
import { LoginData } from '../types/LoginData';

export default class ValidationUtils {
  public static validateLoginSchema(data: LoginData): joi.ValidationResult {
    const schema = joi
      .object({
        email: joi.string().empty('').email().required(),
        password: joi.string().empty('').min(6).required(),
      })
      .messages({
        'any.required': 'All fields must be filled',
        'any.empty': 'All fields must be filled',
        'string.email': 'Invalid email or password',
        'string.min': 'Invalid email or password',
      });
    return schema.validate(data);
  }
}

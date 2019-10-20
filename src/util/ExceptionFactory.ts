import { BadRequestException, ValidationError } from '@nestjs/common';

export const exceptionFactory = (validationErrors: ValidationError[]) => {
  const errors = validationErrors.map((error: ValidationError) => {
    const property = error.property;
    let message;
    for (const [key, value] of Object.entries(error.constraints)) {
      if (key === 'isNotEmpty') {
        message = value;
        break;
      }
      if (key === 'length') {
        message = value;
        break;
      }
      if (key === 'minLength') {
        message = value;
        break;
      }
      if (key === 'maxLength') {
        message = value;
        break;
      }
      if (key === 'isEmail') {
        message = value;
        break;
      }
      if (key === 'isBoolean') {
        message = value;
        break;
      }
      message = '';
    }
    return { property, message };
  });
  return new BadRequestException(errors);
};

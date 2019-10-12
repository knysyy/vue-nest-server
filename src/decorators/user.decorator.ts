import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }

  return null;
});

import { ZodError, ZodSchema } from 'zod';
import { Resolver, FieldValues, FieldErrors, ResolverResult } from 'react-hook-form';

export function zodResolver<T extends FieldValues>(schema: ZodSchema<T>): Resolver<T> {
  return async (values): Promise<ResolverResult<T>> => {
    try {
      const parsed = schema.parse(values);
      return {
        values: parsed,
        errors: {},
      };
    } catch (err: unknown) {
      const errors: FieldErrors<T> = {};
      if (err instanceof ZodError) {
        err.issues.forEach((e) => {
          const path = e.path.join('.') as keyof T;
          errors[path] = {
            type: e.code || 'validation',
            message: e.message,
          } as FieldErrors<T>[keyof T];
        });
      }
      return {
        values: {},
        errors,
      };
    }
  };
}

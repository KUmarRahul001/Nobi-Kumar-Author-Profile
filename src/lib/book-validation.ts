import { ZodError, ZodSchema } from 'zod';
import { Resolver, FieldValues } from 'react-hook-form';

export function zodResolver<T extends FieldValues>(schema: ZodSchema<T>): Resolver<T> {
  return async (values) => {
    try {
      const parsed = schema.parse(values);
      return {
        values: parsed,
        errors: {},
      };
    } catch (err: unknown) {
      const errors: Record<string, { type: string; message: string }> = {};
      if (err instanceof ZodError) {
        err.errors.forEach((e) => {
          const path = e.path.join('.');
          errors[path] = {
            type: e.code || 'validation',
            message: e.message,
          };
        });
      }
      return {
        values: {},
        errors,
      };
    }
  };
}

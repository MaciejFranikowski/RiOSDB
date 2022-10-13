import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import express from 'express';
import type { ExpressFunction } from '../interfaces/ExpressFunction';

type ErrorJSON = { [key: string]: string[] | ErrorJSON };

/* eslint-disable no-param-reassign */
const transformValidationErrorsToJSON = (
  errors: ValidationError[],
) => errors.reduce((p: ErrorJSON, c: ValidationError) => {
  if (!c.children || !c.children.length) {
    if (c.constraints) {
      p[c.property] = Object.keys(c.constraints).map(
        (key) => c.constraints![key],
      );
    }
  } else {
    p[c.property] = transformValidationErrorsToJSON(c.children);
  }
  return p;
}, {});
/* eslint-enable no-param-reassign */

const validationFactory = <T>(
  metadataKey: symbol,
  model: { new (...args: any[]): T },
  source: 'body' | 'query',
) => (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<ExpressFunction>,
  ) => {
    Reflect.defineMetadata(metadataKey, model, target, propertyName);

    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function validateData(
      ...args: [express.Request, express.Response]
    ) {
      const [req, res] = args;
      const metadata = Reflect.getOwnMetadata(
        metadataKey,
        target,
        propertyName,
      );
      const errors = await validate(plainToInstance(metadata, req[source]));

      if (errors.length > 0) {
        return res.status(400).json(transformValidationErrorsToJSON(errors));
      }
      return method?.apply(this, [req, res]);
    };
  };

export const ValidateQuery = (dto: any): any => validationFactory(Symbol('validate-query'), dto, 'query');
export const ValidateBody = (dto: any): any => validationFactory(Symbol('validate-body'), dto, 'body');

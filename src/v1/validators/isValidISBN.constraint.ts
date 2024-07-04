import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'isValidISBN', async: false })
@Injectable()
export class IsValidISBN implements ValidatorConstraintInterface {
  async validate(isbn: string, args: ValidationArguments) {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        return response.data.totalItems > 0;
      } catch (error) {
        return false;
      }
  }

  defaultMessage(args: ValidationArguments) {
    return 'ISBN não é válido!';
  }
}
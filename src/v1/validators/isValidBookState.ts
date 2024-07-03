import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsValidBookState', async: false })
export class IsValidBookState implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        return value === 'AVAILABLE' || value === 'UNAVAILABLE';
    }

    defaultMessage(args: ValidationArguments) {
        return 'O status do livro deve ser "AVAILABLE" ou "UNAVAILABLE"';
    }
}
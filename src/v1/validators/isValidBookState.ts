import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsValidBookState', async: false })
export class IsValidBookState implements ValidatorConstraintInterface {
    validate(value: number, args: ValidationArguments) {
        return value === 0 || value === 1;
    }

    defaultMessage(args: ValidationArguments) {
        return 'O status do livro deve ser 0 (DISPONIVEL) ou 1 (INDISPONIVEL)';
    }
}
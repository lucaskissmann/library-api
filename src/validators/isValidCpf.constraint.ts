import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isCPF', async: true })
@Injectable()
export class IsValidCPF implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        if (typeof value !== 'string') {
        return false;
        }

        const cpf = value.replace(/[^\d]+/g, '');
        if (cpf.length !== 11) {
        return false;
        }

		return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'CPF inválido';
    }
}

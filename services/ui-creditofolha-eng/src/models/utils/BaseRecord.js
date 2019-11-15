// @flow
// eslint-disable-next-line no-unused-vars
import { Record, RecordInstance } from 'immutable'
import moment from 'moment'

declare class IBaseRecord<O: Object = Object> extends RecordInstance<O> {
  [key: $Keys<O>]: $Values<O>;
  constructor(v: $Shape<O>): this | void;

  getFormatedDate(field: $Keys<O>, format: string): string | '-';
  getFormatedCurrency(field: $Keys<O> | number): string;
  getFormatedPercent(field: $Keys<O> | number, abs?: boolean): string;
  getFormatedPhone(field: $Keys<O>): ?string;
}

function BaseRecord<O: Object = Object>(defaultValues: O, name: string): Class<IBaseRecord<O>> {
  return class extends ((Record<O>(defaultValues, name): any): Class<IBaseRecord<O>>) {
    getFormatedDate(field: $Keys<O>, format: string = 'DD/MM/YYYY'): string | '-' {
      if (this.get(field)) {
        return moment(this.get(field), 'YYYY-MM-DD').format(format)
      }
      return '-'
    }

    getFormatedCurrency(field: $Keys<O> | number): string {
      const monetaryValue: number = typeof field === 'string'
        ? Number.parseFloat(this.get<$Keys<O>>(field))
        : field
      return monetaryValue.toLocaleString('pt-BR', {
        currency: 'BRL',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: 'currency',
      })
    }

    getFormatedPercent(field: $Keys<O> | number, abs: boolean = true): string {
      const fractionaryValue: number = typeof field === 'string'
        ? Number.parseFloat(this.get<$Keys<O>>(field))
        : field
      return (abs ? fractionaryValue : (fractionaryValue / 100)).toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: 'percent',
      })
    }

    getFormatedPhone(field: $Keys<O>): ?string {
      let number = this.get(field)

      if (/^\+55/.test(number)) {
        number = number.slice(3)
      }

      if (!number) {
        return null
      }

      return number.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '($1) $2 $3 $4')
    }
  }
}

export default BaseRecord

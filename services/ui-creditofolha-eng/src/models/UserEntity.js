import { get } from 'lodash'
import * as MODULES from 'constants/entity'
import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  permissoes: [],
  entidade_tipo: '',
  entidade_id: null,
  entidade_nome: '',
  identificador: '',
}

export default class UserEntity extends BaseRecord(defaultValues, UserEntity) {
  constructor(values) {
    const isEmployee = get(values, 'entidade_tipo', '') === MODULES.EMPLOYEE
    const entityName = isEmployee && get(values, 'entidade_nome', '').match(/(\[\w*\])/g)

    super({
      ...values,
      entidade_nome: isEmployee && entityName && entityName.length > 0
        ? entityName[0].replace(/(\[|\])/g, '')
        : values.entidade_nome,
    })
  }
}

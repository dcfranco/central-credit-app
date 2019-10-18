import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  authenticated: false,
  access: null,
  refresh: null,
  refreshTokenPromise: null,
  errors: null,
}

export default class Auth extends BaseRecord(defaultValues, Auth) {
  constructor(values) {
    super({
      ...values,
    })
  }
}

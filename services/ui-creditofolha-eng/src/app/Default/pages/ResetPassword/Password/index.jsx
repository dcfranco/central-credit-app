// @flow
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable'
import zxcvbn from 'zxcvbn'
import Button from 'components/Button'
import PasswordStrength from 'components/PasswordStrength'
import PasswordTips from 'components/PasswordTips'
import { registerAsyncRequest } from 'default/actions/register'
import { required, weakPassword, passwordsMatch } from 'form/validators'
import { CleanTemplate } from 'templates'
import { RemoveRedEyeOutlined } from '@material-ui/icons'

import ReduxFormInputBuilder from 'components/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/ReduxFormInput/builders/InputAddonBuilder'

import type { TResetPasswordProps } from 'default/types'

const formName = 'resetPasswordPassword'
const selector = formValueSelector(formName)
const { Content, HeaderTitle, Footer } = CleanTemplate

const InputAddon = InputAddonBuilder()
  .rightPosition()
  .renderMethod(() => (
    <div className='icon-right-addon'>
      <RemoveRedEyeOutlined />
    </div>
  ))
  .build()

const ReduxFormInputWithAddon = ReduxFormInputBuilder()
  .rightAddon(InputAddon)
  .build()

type TResetPasswordFormProps = {
  ...TResetPasswordProps,
  handleSubmit: Function,
  invalid: boolean,
}
const ResetPasswordForm = (
  { handleSubmit, entity: { pages }, invalid }: TResetPasswordFormProps
) => {
  const [scoreDescription, setScoreDescription] = useState([])
  const [isPasswordEyeActive, togglePasswordEyeActive] = useState()

  const password = useSelector(state => selector(state, 'password'))
  useEffect(() => {
    if (!password) {
      setScoreDescription([])
      return
    }
    const { score } = zxcvbn(password.substr(0, 100))
    if (score <= 2) {
      setScoreDescription([30, 'danger', 'Senha Fraca'])
    } else if (score === 3) {
      setScoreDescription([65, 'warning', 'Senha Boa'])
    } else {
      setScoreDescription([100, 'primary', 'Senha Forte'])
    }
  }, [password])

  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    const { state } = location
    if (!state || !state.token) {
      history.push(pages.RESET_PASSWORD.INDEX)
    }
  }, [])

  const dispatch = useDispatch()
  const onSubmit = async (values) => {
    const response = await dispatch(registerAsyncRequest(values.get('email_cpf')))
    if (response) {
      history.push(pages.REGISTRATION.SUCCESS)
    }
  }

  return (
    <Content>
      <HeaderTitle>
        Recuperar Senha
      </HeaderTitle>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className='row'>
          <div className='col-12'>
            <Field
              label='Senha'
              type={ isPasswordEyeActive === 'password' ? 'text' : 'password' }
              name='password'
              id='password'
              component={ ReduxFormInputWithAddon }
              onRightAddonClick={
                ({ name }) => togglePasswordEyeActive(isPasswordEyeActive === name ? false : name)
              }
              validate={ [required, weakPassword(scoreDescription[0])] }
            />
            <PasswordTips />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Field
              label='Confirmar'
              type={ isPasswordEyeActive === 'confirm' ? 'text' : 'password' }
              name='confirm'
              id='ipt_register_confirm'
              component={ ReduxFormInputWithAddon }
              onRightAddonClick={
                ({ name }) => togglePasswordEyeActive(isPasswordEyeActive === name ? false : name)
              }
              validate={ [required, passwordsMatch] }
            />
          </div>
        </div>
        <PasswordStrength score={ scoreDescription }>
          Digite uma senha segura
        </PasswordStrength>
        <Footer>
          <Button className='btn btn-primary mt-2 mt-md-0 w-100 w-md-auto' disabled={ invalid }>Enviar</Button>
        </Footer>
      </form>
    </Content>
  )
}

export default reduxForm({
  form: formName,
})(ResetPasswordForm)

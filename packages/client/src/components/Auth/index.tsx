import { Paper } from '@mui/material'
import React, { FC } from 'react'
import { IAuthData } from './types'
import AuthForm from './AuthForm'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'

interface IProps {
  data: IAuthData
}

const Auth: FC<IProps> = ({ data }) => {
  const { title, formData, footerInfo } = data

  return (
    <Paper
      variant="outlined"
      sx={{
        m: { xs: 2 },
        p: { xs: 2, md: 3 },
        maxWidth: '520px',
        width: '100%',
      }}>
      <AuthHeader title={title} />

      <AuthForm formData={formData} />

      {footerInfo && <AuthFooter footerInfo={footerInfo} />}
    </Paper>
  )
}

export default Auth

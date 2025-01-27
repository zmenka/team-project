import { redirect } from 'react-router-dom'
import { IUser } from '../../utils/scripts/api/types'

const redirectLoader = (user: IUser | null | undefined) =>
  user ? redirect('/') : null

export default redirectLoader

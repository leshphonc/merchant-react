import React from 'react'
import { Route } from 'react-router-dom'
import BasicInformation from './basicInformation'
import ModifyPhone from './modify/phone'
import ModifyEmail from './modify/email'

export default () => {
  return (
    <React.Fragment>
      <Route path="/setting/basicInformation" exact component={BasicInformation} />
      <Route path="/setting/basicInformation/modifyPhone" component={ModifyPhone} />
      <Route path="/setting/basicInformation/modifyEmail" component={ModifyEmail} />
    </React.Fragment>
  )
}

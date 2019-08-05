import React from 'react'
import { Route } from 'react-router-dom'
import BasicInformation from './basicInformation'
import ModifyPhone from './modify/phone'
import ModifyEmail from './modify/email'
import ModifyDescription from './modify/description'
import ModifyPicture from './modify/picture'
import ModifyDetail from './modify/detail'

export default () => (
  <React.Fragment>
    <Route path="/setting/basicInformation" exact component={BasicInformation} />
    <Route path="/setting/basicInformation/modifyPhone" component={ModifyPhone} />
    <Route path="/setting/basicInformation/modifyEmail" component={ModifyEmail} />
    <Route path="/setting/basicInformation/modifyDescription" component={ModifyDescription} />
    <Route path="/setting/basicInformation/modifyPicture" component={ModifyPicture} />
    <Route path="/setting/basicInformation/modifyDetail" component={ModifyDetail} />
  </React.Fragment>
)

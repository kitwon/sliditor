import { combineReducers } from '@reduxjs/toolkit'
import setting from './modules/setting'
import pages from './modules/pages'

// const rootReducers = {
//   setting: setting.reducer,
//   pages: pages.reducer
// }
const rootReducers = combineReducers({
  [setting.name]: setting.reducer,
  [pages.name]: pages.reducer
})

export default rootReducers

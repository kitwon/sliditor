import { combineReducers } from '@reduxjs/toolkit'
import setting from './modules/setting'
import pages from './modules/pages'

// const rootReducers = {
//   setting: setting.reducer,
//   pages: pages.reducer
// }
const rootReducers = combineReducers({
  setting: setting.reducer,
  pages: pages.reducer
})

export default rootReducers

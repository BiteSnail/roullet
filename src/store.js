import { configureStore } from '@reduxjs/toolkit'
import fieldSlice from './features/fields/fieldSlice'
import selectSlice from './features/fields/selectSlice'

export default configureStore({
  reducer: {
    field: fieldSlice,
    select: selectSlice,
  },
})
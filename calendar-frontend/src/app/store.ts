import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../features/events/eventsSlice';
import goalsReducer from '../features/goals/goalsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    goals: goalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

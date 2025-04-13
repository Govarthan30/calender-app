import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { EventItem } from '../../types';

const baseURL = 'http://localhost:5000';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get<EventItem[]>(`${baseURL}/events`);
  return res.data;
});

export const addEvent = createAsyncThunk('events/addEvent', async (event: EventItem) => {
  const res = await axios.post<EventItem>(`${baseURL}/events`, event);
  return res.data;
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id: string) => {
  await axios.delete(`${baseURL}/events/${id}`);
  return id;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: [] as EventItem[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (_, action) => action.payload)
      .addCase(addEvent.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        return state.filter(e => e._id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;

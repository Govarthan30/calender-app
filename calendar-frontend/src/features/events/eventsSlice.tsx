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

export const updateEvent = createAsyncThunk('events/updateEvent', async ({ id, start, end }: { id: string; start: string; end: string }) => {
  const res = await axios.put<EventItem>(`${baseURL}/events/${id}`, { start, end });
  return res.data;
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id: string) => {
  const res = await axios.delete(`${baseURL}/events/${id}`);
  return res.data.deletedEvent._id;
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
      .addCase(updateEvent.fulfilled, (state, action) => {
        return state.map((e) => (e._id === action.payload._id ? action.payload : e));
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        return state.filter(e => e._id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;

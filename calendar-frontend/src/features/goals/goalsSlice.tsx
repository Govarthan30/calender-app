import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Goal } from '../../types';

const baseURL = 'http://localhost:5000';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const res = await axios.get<Goal[]>(`${baseURL}/goals`);
  return res.data;
});

export const addGoal = createAsyncThunk('goals/addGoal', async (goal: Goal) => {
  const res = await axios.post<Goal>(`${baseURL}/goals`, goal);
  return res.data;
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState: [] as Goal[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.fulfilled, (_, action) => action.payload)
      .addCase(addGoal.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default goalsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id: string) => {
  const res = await axios.delete(`${baseURL}/goals/${id}`);
  return res.data.deletedGoal._id;
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
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        return state.filter(goal => goal._id !== action.payload);
      });
  },
});

export default goalsSlice.reducer;

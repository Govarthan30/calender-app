import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals, addGoal } from './goalsSlice';
import { RootState, AppDispatch } from '../../app/store';
import { Goal } from '../../types';

export default function Goals() {
  const dispatch = useDispatch<AppDispatch>();
  const goals = useSelector((state: RootState) => state.goals);

  const [newGoal, setNewGoal] = useState<Goal>({
    name: '',
    color: '#007bff',
    tasks: [],
  });

  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setNewGoal({ ...newGoal, tasks: [...newGoal.tasks, taskInput.trim()] });
      setTaskInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name.trim()) return;
    dispatch(addGoal(newGoal));
    setNewGoal({ name: '', color: '#007bff', tasks: [] });
  };

  return (
    <div>
      <h2>Goals</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Goal name"
          value={newGoal.name}
          onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
          required
        />
        <input
          type="color"
          value={newGoal.color}
          onChange={(e) => setNewGoal({ ...newGoal, color: e.target.value })}
        />
        <div>
          <input
            placeholder="Add task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="button" onClick={handleAddTask}>+ Task</button>
        </div>
        <ul>
          {newGoal.tasks.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
        <button type="submit">Add Goal</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        {goals.map((goal) => (
          <div key={goal._id} style={{ border: `2px solid ${goal.color}`, padding: '10px', marginBottom: '10px' }}>
            <h3>{goal.name}</h3>
            <ul>
              {goal.tasks.map((task, idx) => (
                <li key={idx}>- {task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

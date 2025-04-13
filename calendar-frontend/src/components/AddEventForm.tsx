import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../features/events/eventsSlice';
import { AppDispatch } from '../app/store';
import { EventItem } from '../types';

export default function AddEventForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<EventItem>({
    title: '',
    category: 'work',
    start: '',
    end: '',
    color: '#000000',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addEvent(form));
    setForm({ title: '', category: 'work', start: '', end: '', color: '#000000' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="work">Work</option>
        <option value="exercise">Exercise</option>
        <option value="eating">Eating</option>
        <option value="relax">Relax</option>
        <option value="family">Family</option>
        <option value="social">Social</option>
      </select>
      <input type="datetime-local" name="start" value={form.start} onChange={handleChange} required />
      <input type="datetime-local" name="end" value={form.end} onChange={handleChange} required />
      <input type="color" name="color" value={form.color} onChange={handleChange} />
      <button type="submit">Add Event</button>
    </form>
  );
}

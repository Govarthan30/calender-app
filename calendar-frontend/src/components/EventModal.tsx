import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../features/events/eventsSlice';
import { AppDispatch } from '../app/store';
import { EventItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  defaultDate?: string | null;
  onDelete: (id: string) => void;
}

export default function EventModal({ isOpen, onClose, event, defaultDate, onDelete }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<EventItem>({
    title: '',
    category: 'work',
    start: defaultDate || '',
    end: '',
    color: '#3788d8',
  });

  useEffect(() => {
    if (event) setForm(event);
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (event?._id) {
      dispatch(updateEvent({ ...form, id: event._id }));
    } else {
      dispatch(addEvent(form));
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Event Modal">
      <h2>{event ? 'Edit' : 'Create'} Event</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="work">Work</option>
        <option value="exercise">Exercise</option>
        <option value="eating">Eating</option>
        <option value="relax">Relax</option>
        <option value="family">Family</option>
        <option value="social">Social</option>
      </select>
      <input type="datetime-local" name="start" value={form.start} onChange={handleChange} />
      <input type="datetime-local" name="end" value={form.end} onChange={handleChange} />
      <input type="color" name="color" value={form.color} onChange={handleChange} />
      <button onClick={handleSubmit}>Save</button>
      {event?._id && <button onClick={() => onDelete(event._id!)}>Delete</button>}
    </Modal>
  );
}

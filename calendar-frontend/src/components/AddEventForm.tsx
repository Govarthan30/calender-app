import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addEvent } from '../features/events/eventsSlice';
import { EventItem } from '../types';
import Modal from './Modal';

interface AddEventFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string;
}

export default function AddEventForm({ isOpen, onClose, defaultDate }: AddEventFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Partial<EventItem>>({
    title: '',
    category: 'work',
    start: defaultDate || new Date().toISOString(),
    end: new Date(new Date().getTime() + 60 * 60000).toISOString(),
    color: '#4f46e5',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.start && formData.end) {
      dispatch(addEvent(formData as EventItem));
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Event">
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="meeting">Meeting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="start">Start Time</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={formData.start?.slice(0, 16)}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end">End Time</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={formData.end?.slice(0, 16)}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button">
            Add Event
          </button>
        </div>
      </form>
    </Modal>
  );
}

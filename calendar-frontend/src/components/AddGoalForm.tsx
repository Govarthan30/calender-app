import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { addGoal } from '../features/goals/goalsSlice';
import { Goal } from '../types';
import Modal from './Modal';

interface AddGoalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddGoalForm({ isOpen, onClose }: AddGoalFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Partial<Goal>>({
    name: '',
    color: '#4f46e5',
    tasks: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.tasks?.length) {
      dispatch(addGoal(formData as Goal));
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (index: number, value: string) => {
    setFormData(prev => {
      const newTasks = [...(prev.tasks || [])];
      newTasks[index] = value;
      return { ...prev, tasks: newTasks };
    });
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...(prev.tasks || []), ''],
    }));
  };

  const removeTask = (index: number) => {
    setFormData(prev => {
      const newTasks = [...(prev.tasks || [])];
      newTasks.splice(index, 1);
      return { ...prev, tasks: newTasks };
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Goal">
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label htmlFor="name">Goal Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter goal name"
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

        <div className="form-group">
          <label>Tasks</label>
          <div className="tasks-list">
            {formData.tasks?.map((task, index) => (
              <div key={index} className="task-input-group">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder={`Task ${index + 1}`}
                  required
                />
                {formData.tasks && formData.tasks.length > 1 && (
                  <button
                    type="button"
                    className="remove-task"
                    onClick={() => removeTask(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-task" onClick={addTask}>
              + Add Task
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button">
            Add Goal
          </button>
        </div>
      </form>
    </Modal>
  );
} 
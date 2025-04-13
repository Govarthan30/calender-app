import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, deleteEvent } from './eventsSlice';
import { RootState, AppDispatch } from '../../app/store';

export default function Events() {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      <h2>Events</h2>
      {events.map((e) => (
        <div key={e._id} style={{ border: `2px solid ${e.color}`, padding: '10px', margin: '5px' }}>
          <p><strong>{e.title}</strong> ({e.category})</p>
          <p>{new Date(e.start).toLocaleString()} - {new Date(e.end).toLocaleString()}</p>
          <button onClick={() => e._id && dispatch(deleteEvent(e._id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

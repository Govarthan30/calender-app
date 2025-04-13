import AddEventForm from './components/AddEventForm';
import Events from './features/events/Events';
import Goals from './features/goals/Goals';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🗓️ Calendar App</h1>
      <AddEventForm />
      <Events />
      <hr style={{ margin: '2rem 0' }} />
      <Goals />
    </div>
  );
}

export default App;

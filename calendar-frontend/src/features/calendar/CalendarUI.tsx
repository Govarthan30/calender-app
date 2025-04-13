import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchEvents, updateEvent, deleteEvent, addEvent } from '../events/eventsSlice';
import { fetchGoals, deleteGoal } from '../goals/goalsSlice';
import EventModal from '../../components/EventModal';
import AddEventForm from '../../components/AddEventForm';
import AddGoalForm from '../../components/AddGoalForm';
import DeveloperCredits from '../../components/DeveloperCredits';
import { EventItem, Goal } from '../../types';

export default function CalendarUI() {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events);
  const goals = useSelector((state: RootState) => state.goals);

  const [modalOpen, setModalOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [dragTask, setDragTask] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(true);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleTaskDragStart = (task: string) => setDragTask(task);

  const handleDateReceive = (info: { dateStr: string; date: Date }) => {
    if (dragTask && activeGoal) {
      const newEvent: EventItem = {
        title: dragTask,
        category: 'work',
        start: info.dateStr,
        end: new Date(new Date(info.date).getTime() + 30 * 60000).toISOString(),
        color: activeGoal.color,
      };
      dispatch(addEvent(newEvent));
      setDragTask(null);
    }
  };

  const handleGoalClick = (goal: Goal) => {
    setActiveGoal(goal);
    setIsGoalsExpanded(true);
  };

  const handleCloseGoals = () => {
    setActiveGoal(null);
    setIsGoalsExpanded(false);
  };

  const handleDeleteGoal = (goalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this goal?')) {
      dispatch(deleteGoal(goalId));
      if (activeGoal?._id === goalId) {
        handleCloseGoals();
      }
    }
  };

  const handleDeleteEvent = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(eventId));
      setModalOpen(false);
    }
  };

  const handleEventDelete = (id: string) => {
    dispatch(deleteEvent(id));
    setModalOpen(false);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-sidebar">
        <div className="sidebar-header">
          <h3>Goals</h3>
          <div className="header-actions">
            <button className="button" onClick={() => setShowGoalForm(true)}>
              + Add Goal
            </button>
            {activeGoal && (
              <button className="button-secondary" onClick={handleCloseGoals}>
                Close
              </button>
            )}
          </div>
        </div>
        
        <div className="goals-list">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className={`goal-item ${activeGoal?._id === goal._id ? 'active' : ''}`}
              onClick={() => handleGoalClick(goal)}
              style={{ borderLeft: `5px solid ${goal.color}` }}
            >
              <span>{goal.name}</span>
              <button 
                className="delete-button"
                onClick={(e) => handleDeleteGoal(goal._id!, e)}
                title="Delete goal"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {activeGoal && isGoalsExpanded && (
          <div className="tasks-section">
            <div className="tasks-header">
              <h4>Tasks</h4>
              <button className="close-tasks" onClick={handleCloseGoals}>×</button>
            </div>
            <div className="tasks-list">
              {activeGoal.tasks.map((task, i) => (
                <div
                  key={i}
                  className="task-item"
                  draggable
                  onDragStart={() => handleTaskDragStart(task)}
                  style={{ background: activeGoal.color }}
                >
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="calendar-main">
        <div className="calendar-header">
          <h2>Calendar</h2>
          <button className="button" onClick={() => setShowEventForm(true)}>
            + Add Event
          </button>
        </div>
        
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable
          droppable
          selectable
          events={events.map((e) => ({
            id: e._id,
            title: e.title,
            start: e.start,
            end: e.end,
            backgroundColor: e.color,
            extendedProps: { category: e.category },
          }))}
          dateClick={(arg) => {
            setClickedDate(arg.dateStr);
            setSelectedEvent(null);
            setModalOpen(true);
          }}
          eventClick={(arg) => {
            const e = arg.event;
            setSelectedEvent({
              _id: e.id,
              title: e.title,
              category: e.extendedProps.category,
              start: e.startStr,
              end: e.endStr,
              color: e.backgroundColor,
            });
            setModalOpen(true);
          }}
          eventDrop={(arg) => {
            dispatch(updateEvent({ id: arg.event.id, start: arg.event.startStr, end: arg.event.endStr }));
          }}
          eventResize={(arg) => {
            dispatch(updateEvent({ id: arg.event.id, start: arg.event.startStr, end: arg.event.endStr }));
          }}
          drop={handleDateReceive}
          height="auto"
          eventContent={(eventInfo) => (
            <div className="event-content">
              <span>{eventInfo.event.title}</span>
              <button 
                className="delete-button"
                onClick={(e) => handleDeleteEvent(eventInfo.event.id, e)}
                title="Delete event"
              >
                ×
              </button>
            </div>
          )}
        />
      </div>

      {showEventForm && (
        <AddEventForm
          isOpen={showEventForm}
          onClose={() => setShowEventForm(false)}
          defaultDate={clickedDate || undefined}
        />
      )}

      {showGoalForm && (
        <AddGoalForm
          isOpen={showGoalForm}
          onClose={() => setShowGoalForm(false)}
        />
      )}

      {modalOpen && (
        <EventModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          event={selectedEvent}
          defaultDate={clickedDate || undefined}
          onDelete={handleEventDelete}
        />
      )}

      <DeveloperCredits />
    </div>
  );
}

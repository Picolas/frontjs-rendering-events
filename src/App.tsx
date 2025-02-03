import './assets/css/App.css';
import { Calendar } from "./components/calendar/calendar";
import { EventProvider } from './contexts/event-context';

function App() {
  return (
    <div className="App">
      <EventProvider>
        <Calendar />
      </EventProvider>
    </div>
  );
}

export default App;

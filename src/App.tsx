import './assets/css/App.css';
import { Calendar } from "./components/Calendar/Calendar";
import { EventProvider } from './contexts/EventContext';

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

import './App.css';
import Todo from './todo';

function App() {
  return (
    <div className="App">
      <div style={{height: 'auto'}}> 
        <h1 className="heading"> todos </h1>
        <Todo />
      </div>
    </div>
  );
}

export default App;

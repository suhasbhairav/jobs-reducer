import React, {useState, useReducer} from "react";
import './App.css';

function App() {

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');  

  const addNewJob = e => {
    e.preventDefault();


    const job = {
      id: Date.now(),
      jobTitle,
      jobDescription
    }

    setJobTitle('');
    setJobDescription('');
    dispatch({type: "add", payload: job});
  };

  const initialState = [{
    id: Date.now(),
    jobTitle: "Software Engineer",
    jobDescription: "Code everyday!!"
  }];

  function reducer(state, action){
    switch(action.type){
      case 'add':
        return [...state, action.payload];
      case 'delete':
        return state.filter(job => {
          return job.id !== action.payload.id;
        });
      default:
        return new Error("Not a valid op!");
    };
  };


  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <h1>Jobs Reducer</h1>

      <form onSubmit={addNewJob}>
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
        <input type="text" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
        <button type="submit">Add a Job</button>
      </form>
      <ul>
      {state.map(job => {
        return (
          <div>
        <li key={job.id}>
          {job.jobTitle} --- {job.jobDescription}
        </li>
        <button onClick={() => dispatch({type: "delete", payload: {id: job.id}})}>Delete</button>
        </div>
      ); })}
    </ul>
    </div>
  );
}

export default App;

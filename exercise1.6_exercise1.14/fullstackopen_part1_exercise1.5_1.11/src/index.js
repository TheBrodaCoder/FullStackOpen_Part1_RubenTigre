import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Vote = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return (
    <tr>
      <td>
        <p>
          <span style={{fontWeight: 'bold', color: 'gray'}}>{props.text}:</span>   
        </p>
      </td>
      <td>
        <p>
          {props.value}
        </p>
      </td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div style={{display: 'inline-flex'}}>
        <Vote text='Good' handleClick={() => setGood(good + 1)}/>
        <Vote text='Neutral' handleClick={() => setNeutral(neutral + 1)}/>
        <Vote text='Bad' handleClick={() => setBad(bad + 1)}/>
      </div>
      <h1>Statistics</h1>
      {(good === 0 && neutral===0 && bad===0)
        ?
        (
        <p>No feedback given</p>
        )
        :
        (
        <div>
          <table>
            <tbody>
              <Statistics text='Neutral' value={neutral}/>
              <Statistics text='Bad' value={bad}/>
              <Statistics text='Total' value={good + neutral + bad}/>
              <Statistics text='average' value={good === 0 ? 0 : (good * 1 + bad * -1)/(good+neutral+bad)}/>
              <Statistics text='Positive' value={good === 0 ? 0 : ((good /( good + neutral + bad)) * 100 + '%')}/>
            </tbody>
          </table>
          
          
          
        </div>
        )
      }
      </div> 
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

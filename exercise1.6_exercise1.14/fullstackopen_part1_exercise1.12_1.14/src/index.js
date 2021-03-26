import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const JokeButton = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  let newValue = value + 1;
  return () => setValue(newValue); // update the state to force render
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [scores, setScores] = useState(Array.from(props.anecdotes).fill(0));
  const forceUpdate = useForceUpdate();
  

  const handleAnecdote = () => {
    let ranNum = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(ranNum);
  }

  const handleVote = () => {
    let newScores = scores;
    newScores[selected] = scores[selected] + 1;
    setScores(newScores);
    forceUpdate();
  }

  return (
    <div>
      {console.log(scores)}
      {props.anecdotes[selected]}
      <br/>
      {scores[selected]}
      <br/>
      <JokeButton text='get new joke' handleClick={() => handleAnecdote()}/>
      <JokeButton text='vote this joke' handleClick={() => handleVote()}/>
      <h1>Most voted anecdote</h1>
      {props.anecdotes[scores.indexOf(Math.max.apply(Math, scores))]}

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>,
  document.getElementById('root')
);

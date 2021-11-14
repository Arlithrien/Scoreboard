
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';


const PLAYERS = [
  {
    name: "jane doe",
    score: 8,
    pct: 100,
    id:1, 
  // },
  // {
  //   name: "john deer",
  //   score: 6,
  //   id: 2,
  // },
  // {
  //   name: "bob smith",
  //   score: 7,
  //   id:3,
  }
  
];

let nextID = PLAYERS.length + 1;




const Title = (props) => (
<div className="title">
  <h1>{props.title1}</h1>
  
  <h2>{props.title2}</h2>
</div>
);

  
// Ppopulates the scores section with a table of entries
function EntryList(props) {
return (   
    <tr>
      <td>{props.name}</td>
      <LowScore score={props.score} />
      <LowPercentage pct={props.pct}/>
    </tr>
);
}

// populates score in red if below 5, otherwise black
function LowScore(props) {
let scoreColor = false;
let score = props.score;
scoreColor = score < 5 ? scoreColor=true : scoreColor=false
return( 
  <td style={{color: scoreColor ? 'red' : 'black'}}>
    {score}
  </td>   
);  
}

// This component creates the form input for our player list
class AddScoreForm extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    name: "",
    score: 0,
  }
  this.onChange = this.onChange.bind(this)
  this.onSubmit = this.onSubmit.bind(this)
}

onSubmit = (e) => {
  e.preventDefault();
  this.props.onAdd(this.state.name, this.state.score)
  this.setState({ name: "", score: "", pct: ""})
}

onChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState(values => ({...values, [name]: value}))  
}

render () {
  return (
    <div className="add-score-form"> 
      <form className="submission" onSubmit={this.onSubmit}>
        <label >Name: 
          <input type="text" name="name" value={this.state.name || ""} onChange={this.onChange} 
            placeholder="Enter Name" required={true}/>
        </label>
        <br/>
        <label> Score: 
          <input  type="number" name="score" value={this.state.score || ""} onChange={this.onChange}
            placeholder="Enter Score (0-10)" min="0" max="10"/>
        </label>
        <br/>
        <button type="submit" value="Submit">Add Score</button>
      </form>
    </div>
  );
}
}

// this function returns the max score, and is a child of the stats component
function HighScore(props) {
// to find max score, array is sorted by score, from highest to lowest, with index 0 being the max score
// creates a shallow copy of the array that can be sorted without disturbing the original array
let temp=[...props.players];
temp.sort((a, b) => b.score - a.score);
let highscore = temp[0].score;
//alternative idea: could also sort original array and re-sort by ID after
return (
  <>
    {" " +  highscore }
  </>  
);
}

// styles percentages below 50% purple, otherwise black. Rounds to 2 decimals.
function LowPercentage (props) {

let score = props.score;
let pct = props.pct;
let pctColor = false;

pctColor = pct < 50 ? pctColor=true : pctColor=false
return( 

  <td style={{ color: pctColor ? 'purple' : 'black'}}>
    {pct.toFixed(2) + "%"}
  </td>
);  
}

// stats component in lower portion of app display extra stats for the user
function Stats(props) {
let totalEntries = " " + props.players.length;

return (
  <div> 
    <h2>Stats</h2>
    Total Entries: 
    {totalEntries}<br/>
    High Score: 
    <HighScore players={props.players}/>
  </div>
);
}
 

class App extends React.Component {
constructor(props){
  super(props)
  
  this.state = {
    players: this.props.initialPlayers
  }
  this.onPlayerAdd = this.onPlayerAdd.bind(this)  
}

//function that adds new player input to array, triggering a state update
onPlayerAdd(name, score, pct) {
  this.state.players.push({
    name: name,
    score: score,
    pct: pct,
    id: nextID,
  })
  nextID +=1;
  this.setState(this.state);
}

render () {
  // Iterates player array comparing scores, returns player object with highest score
  //let max = 0;
  // let prev,current;
  let max = this.state.players.reduce(function(prev, current) {
    if(+current.score > +prev.score){
      return current;
    }
    else {
      return prev;
    }
  })
  // console.log('max', max.score);
  let player = PLAYERS;
  const playerItems = this.state.players.map((player) => {
    return (
        <EntryList 
          name={ player.name } 
          score = { player.score } 
          pct = { player.score / max.score *100} 
          key={ player.id }
        />    
           
    );  
  })
  
  
  return (
    <div className="box">
      <Title title1="Scores" title2= "Add New Score" className="title"/>
      <div className="middleContainer">
        <div className="players">
          <table className="table">
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>% of Max</th>
            </tr>
              {playerItems}
          </table>
        </div>
        <div className="form">
          <AddScoreForm onAdd={this.onPlayerAdd}/>
        </div>
      </div>
      <div className="stats">
      <Stats players= {this.state.players}/> 
      </div>
    </div>   
  );
}
}



// Local array "PLAYERS" defined as prop(erty) "initialPlayers" of main App component
ReactDOM.render(<App  initialPlayers={PLAYERS} />,
document.getElementById("root"))

export default App;

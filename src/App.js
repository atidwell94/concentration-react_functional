import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Status from './components/Status';

const imagePath = './Cards/';

// method definitions are all arrow or anonymous functions
const fillImages = () => {
  let images = Array(20).fill(null);
  let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
  let suits = ['h', 's'];
  let index = 0;
  for (let value = 0; value < values.length; value++) {
    for (let suit = 0; suit < suits.length; suit++) {
      images[index] = "card" + values[value] + suits[suit] + ".jpg";
      index++;
    }
  }
  return images;
}

const shuffleImages = (images) => {
  for (let i = 0; i < images.length; i++) {
    let rnd = Math.floor(Math.random() * images.length);
    [images[i], images[rnd]] = [images[rnd], images[i]];
  }
}

const fillAndShuffle = () => {
  let localImages = fillImages();
  shuffleImages(localImages);
  return localImages;
}

// pass parameters because setting state is asynchronous
const isMatch = (firstPick, secondPick, images) => {
  if (images[firstPick].substr(4, 1) ===
    images[secondPick].subtr(4, 1))
    return true;
  else
    return false;
}

function App() {
  // OTHER OPTION:
  // let localImages = fillImages();
  // shuffleImages(localImages);
  // const [images, setImages] = useState(localImages);
  // --------------------------------------------------

  const [matches, setMatches] = useState(0);
  const [tries, setTries] = useState(0);
  // could initialize localImages with a function fillAndShuffle

  const [images, setImages] = useState(fillAndShuffle);
  // could have used 2 different state variables here
  // used an object because the picks are generally manipulated as a pair
  const [picks, setPicks] = useState({first: -1, second: -1});

  // pass pick parameters becasue setting state is asynchronous
  // the other 3 parameters are "documentation that the function uses the
  // in a perfect world, this function would return a value rather than
  // the event handler should edit state
  const checkCards = (firstPick, secondPick, images, tries, matches) => {
    setTries(tries + 1);
    if (isMatch(firstPick, secondPick, images)) {
      setMatches(matches + 1);
      // let localImages = [...images];
      images[firstPick] = null;
      images[secondPick] = null;
      setImages(images);
    }
    setPicks({first: -1, second: -1});
  }

  renderCard = (i) => {
    const image = (images[i] === null) ? 'none' :
      ((picks.first === i || picks.second === i) ?
        'url(' + imagePath + images[i] + ')' :
        'url(' + imagePath + 'black_back.jpg)');
    const enabled = (images[i] !== null &&
      (i !== picks.first && i !== picks.second) &&
      (picks.first === -1 || picks.second === -1) &&
      (matches < 10)) ? true : false;
    const eventHandler = (enabled) ? handleClick : () => { };
    const cursor = (enabled) ? "pointer" : "none";
    const style = {
      backgroundImage: image,
      cursor: cursor
    }
  }

  handleClick = (event) => {
    //console.log(event.target.id);
    const index = parseInt(event.target.id);
    let localPicks = {...picks};
    if (picks.first === -1) {
      localPicks.first = index;
    }
    else {
      localPicks.second = index;
      setPicks(localPicks);
      setTimeout(checkCards, 2000, localPicks.first, localPicks.second, localImages, tries, matches);
    }
  }
}



render = () => {
  let status = (this.state.matches < 10) ?
    'Matches: ' + this.state.matches + " Tries: " + this.state.tries :
    "Congratulations!  You found all 10 matches in " + this.state.tries + " tries!";

  return (
    <div id="top" className="container pt-5">
      <div className="container" id="board">
        <Status status={status}/>
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
          {this.renderCard(4)}
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
          {this.renderCard(8)}
          {this.renderCard(9)}
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(10)}
          {this.renderCard(11)}
          {this.renderCard(12)}
          {this.renderCard(13)}
          {this.renderCard(14)}
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          {this.renderCard(15)}
          {this.renderCard(16)}
          {this.renderCard(17)}
          {this.renderCard(18)}
          {this.renderCard(19)}
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

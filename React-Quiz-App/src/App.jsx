import { useState , useEffect} from 'react'
import FlascardList from './components/FlashcardList.jsx';
import './App.css'
import axios from 'axios';

const apiURL = 'https://opentdb.com/api.php?amount=10'

function App() {
  const [flashcards, setFlashcards] = useState(Sample_Flashcards);

  useEffect(() => { 
    axios.get('https://opentdb.com/api.php?amount=10')
      .then(res => { 
        setFlashcards(res.data.results.map((questionItem, index) => { 
          const answer = decodestring(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => decodestring(a)), answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodestring(questionItem.question),
            answer: answer,
            options: options.sort(()=> Math.random - 0.5)
          }
        }))
        console.log(res.data)
      })
  }, [])

  function decodestring(str) { 
    const text = document.createElement('textarea');
    text.innerHTML = str;
    return text.value;
  }

  return (
    <div className='container'>
      <FlascardList flashcards={flashcards} />
    </div>
  )
}

const Sample_Flashcards = [
  {
  id: 1,
  question: "What is this?",
  answer: "card",
  options: [
    "card",
    "not card",
    "flash",
    "gg mate"
  ]
  },
  {
  id: 2,
  question: "What is your name?",
  answer: "how would I know man",
  options: [
    "how would I know man",
    "karen",
    "flash",
    "drewki"
  ]
  }
]

export default App

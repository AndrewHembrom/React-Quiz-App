import { useState , useEffect , useRef} from 'react'
import FlascardList from './components/FlashcardList.jsx';
import './App.css'
import axios from 'axios';

const apiURL = 'https://opentdb.com/api.php?amount=10'

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  },[])

  useEffect(() => { 
    
  }, [])

  function decodestring(str) { 
    const text = document.createElement('textarea');
    text.innerHTML = str;
    return text.value;
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
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
   }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="amount">Number Of Questions</label>
          <input type='number' id='amount' min={1} step={1} defaultValue={10} ref={amountEl}></input>
        </div>
        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>
      </form>
      <div className='container'>
        <FlascardList flashcards={flashcards} />
      </div>
    </>
  )
}

export default App

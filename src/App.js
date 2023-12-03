import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  const [languages,setLanguages] = useState([])
  const [to, setTo] = useState("hi");
  const [from, setFrom] = useState("none");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const options = {
      headers: {
        'x-rapidapi-key': '652ee3ffb7msh9d819b4680e6370p109f18jsn7dadd0a2348b',
        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
        'x-rapidapi-ua': 'RapidAPI-Playground',
      }
    };

  useEffect(()=>{
    axios.get('https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0',options).then(res => res.data.translation).then(res=>{
      // console.log(res);
      const tempLanguages = [];
      Object.keys(res).forEach(code => {
        tempLanguages.push({
          code,
          name: res[code].name,
        })
      })
      setLanguages(tempLanguages)
      // console.log(tempLanguages);
    })
  },[options])

  const handleToChange = e => {
    setTo(e.target.value);
  }

  const handleFromChange = e => {
    setFrom(e.target.value);
  }

  const handleInputChange = e => {
    setInput(e.target.value)
    axios.post(`https://microsoft-translator-text.p.rapidapi.com/Detect?api-version=3.0`, [{Text: e.target.value}], options).then(res => res.data[0].language).then(res => {
      setFrom(res);
    })
    console.log("Chnage");
    
  }

  const handleTranslate = () => {
    axios.post(`https://microsoft-translator-text.p.rapidapi.com/translate?to=${to}&api-version=3.0`, [{Text: input}], options).then(res => res.data[0].translations[0].text).then(res => {
      setOutput(res);
    })
  }

  return (
    <div className="App">

    <div className='selectLanguageContainer'>
      From
      <select value={from} onChange={handleFromChange}>
        <option value="none">Detect Language</option>
        {languages.map(language => <option value={language.code}>{language.name}</option>)}
      </select>

    To

   <select value={to} onChange={handleToChange} >
     {languages.map(language => <option value={language.code}>{language.name}</option>)}
   </select>
   </div>

   {/* for text area input */}
  <div>
    <textarea cols ="50" rows ="8" value={input} onChange={handleInputChange}></textarea>
   </div>
{/* for text area for output */}
   <div>
    <textarea cols ="50" rows ="8" value={output}></textarea>
   </div>
   <div>
    <button onClick={handleTranslate}>Translate</button>
   </div>


    </div>

  );
}

export default App;

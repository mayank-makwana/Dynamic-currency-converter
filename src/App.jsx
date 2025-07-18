import './App.css'
import logo from './assets/Logo.gif';
import swap from './assets/swap_icon.gif'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LoadingSpinner from './component/LoadingSpinner';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromOption, setFromOption] = useState('USD')
  const [toOption, setToOption] = useState('INR')
  const [currencyAPIData, setCurrencyAPIData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const amountRef = useRef(null);

  const API_KEY = 'da0ba58ff8598e7f2bbeb6a8';
  const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${URL}${fromOption}`)
    .then(response => setCurrencyAPIData(response.data))
    .catch((error) => {
      console.log(error)
    })
    .finally(() => 
      setIsLoading(false)      
    )
  }, [])

  useEffect(() => {
    amountRef?.current?.focus()
  }, [isLoading])

  useEffect(() => {
      if (currencyAPIData.conversion_rates) {
        axios.get(`${URL}${fromOption}`)
        .then(resp => setCurrencyAPIData(resp.data))
        .catch((error) => {
        console.log(error)
        })
      }
      amountRef?.current?.focus()
  }, [fromOption])

  const handleChange = e => {
    const {name, value} = e.target;
    switch(name) {
      case 'amount':
        setAmount(value);
        break;

      case 'fromCurrency':
        setFromOption(value);
        break;

      case 'toCurrency': 
        setToOption(value);
        break;
    }
  }

  const swapHandle = () => {
    setFromOption(toOption)
    setToOption(fromOption)
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && <div className="card">
        <img src={logo} alt="Currency exchange logo" />
        <h1>Currency Converter</h1>
        <div className="currencyExchangeFields">
          <div className="input_container">
            <label className='input_label'>Amount:</label>
            <input type='number' name="amount" className='input_field' ref={amountRef} value={amount} onChange={handleChange} />
          </div>

          <div className="input_container">
            <label className='input_label'>From Currency:</label>
            <select className='input_field' name='fromCurrency' value={fromOption} onChange={handleChange}>
              {currencyAPIData.conversion_rates && Object.keys(currencyAPIData?.conversion_rates).map((val, ind) => {
                return (
                  <option key={ind}>{val}</option>
                )
              })}
          </select>
          </div>
          <button className='swapButton' onClick={swapHandle}><img src={swap} alt="swap_icon" /></button>
          <div className="input_container">
            <label className='input_label' >To Currency:</label>
            <select className='input_field' name='toCurrency' value={toOption} onChange={handleChange}>
              {currencyAPIData.conversion_rates && Object.keys(currencyAPIData?.conversion_rates).map((val, ind) => {
                return (
                  <option key={ind}>{val}</option>
                )
              })}
          </select>
          </div>
      </div>
      <div className="output">
        <h2>Converted Amount: <b>{currencyAPIData?.conversion_rates && currencyAPIData?.conversion_rates[toOption] * amount + ' ' + toOption}</b></h2>
      </div>
      </div>}
    </>
  )
}

export default App

store.jsx

import  {create} from 'zustand';

export const useCounterStore = create((set) => ({
    count: 0,
    subtract : () =>set((state) =>({count:state.count - 1})),
    increment : () =>set((state) =>({count:state.count + 1})),
    incrementAsync : () => setTimeout(() => set((state) => ({count: state.count + 1})), 3000),
}));

/**************************************************************************************/

app.jsx

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useCounterStore } from './store'
import React, { useEffect } from 'react';
import './App.css'


const logCount=()=>{
  const count1 = useCounterStore.getState().count;
  console.log(count1, 'paa japhiyaan');
}

const logCount2=()=>{
  useCounterStore.setState({count: 10});
};

function App() {
  const count = useCounterStore((state) => state.count);
  const subtract = useCounterStore((state) => state.subtract);
  const increment = useCounterStore((state) => state.increment);
  const incrementAsync = useCounterStore((state) => state.incrementAsync);

  // not a good practice const {count}= useCounterStore((state) => state);
  // because the component has to listen all the changes in the store thus get what it needs only


  useEffect(() => {
    logCount();
    logCount2();
  }, []);

    return (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={subtract}>
            Decrement
          </button>
          <h2>{count}</h2>
          <button onClick={incrementAsync}>
            Increment
            </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    )
  }


export default App;

/*******************************************************************************************************/

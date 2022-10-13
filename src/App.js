import React, { useState } from "react";

import Header from "./Header";
import Main from "./Main";
import styled, { ThemeProvider } from "styled-components";
import NewThingBanner from "./NewThingBanner";

const Container = styled.div`
  position: fixed;
  display: grid;
  height: 100vh;
  height: fill-available;
  width: 100%;
  grid-template-rows: 64px 130px auto;
`;

const THEMES = {
  dark: {
    background: "#3e3e3e",
    selectedBackground: "#333",
    text: "#fff",
    itemColor: "#fff",
    newItemColor: "#fff",
    categoryColor: "#fff",
    headerFilter: "brightness(0) invert(1)"
  },
  light: {
    background: "#fff",
    selectedBackground: "#f4f2f2",
    text: "#333",
    itemColor: "#243b6b",
    newItemColor: "#536388",
    categoryColor: "#929db6",
    headerFilter: "none"
  }
};

const App = () => {
  const [things, setThings] =  useLocalStorage("ja-fix:db", []);
  const [darkTheme, setDarkTheme] =  useLocalStorage("ja-fix:theme", false);
  
  
  return (
    <ThemeProvider theme={THEMES[darkTheme ? 'dark' : 'light']}>
    <Container>
      <Header onToggleDarkTheme={() => setDarkTheme(!darkTheme)} />
      <NewThingBanner onNewThing={t => setThings([...things, t])}/>
      <Main 
      things={things} 
      onNewThingDone={(thingId, thingDone) => 
        setThings([...things.map(t2 => {
          if(t2.id !== thingId){
            return t2;
          }
          return {...t2, when: [...t2.when, thingDone]};
        })
      ])
      }
      onRemoveThing={id => {
        if(!window.confirm('Tem certeza que deseja excluir?')){
          return;
        }
        setThings([...things.filter(t2 => t2.id !== id)]);
      }}
      />
    </Container>
    </ThemeProvider>
  );
};
//HOOK PARA LOCAL STORAGE(SUBSTITUI O REACT_STORAGE_HOOKS)
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default App;
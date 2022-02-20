import { RootState } from "./store";

export const loadStateFromStorage = () => {
  try {
    const state = localStorage.getItem("appState");
    if (state === null) {
      return;
    }

    return JSON.parse(state);
  } catch (err) {
    console.log("Local  Storage load error:", err);
    return;
  }
};

export const saveStateToStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.log("Local  Storage save error:", err);
  }
};

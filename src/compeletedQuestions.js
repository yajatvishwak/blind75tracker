import { writable } from 'svelte/store';
export const completedQuestions = writable(localStorage.getItem("selected") ||[]);

completedQuestions.subscribe(val => {
    
    localStorage.setItem("selected", val)
})


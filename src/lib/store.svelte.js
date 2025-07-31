import { LocalStorage } from './storage.svelte';

// all state will go in here - has to be an object for default value?
export let tasks = new LocalStorage('tasks', []);

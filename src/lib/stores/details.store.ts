import { writable } from 'svelte/store';

export const DetailsStore = writable({
  brand: "",
  header: "",
  subheader: "",
  description: "",
  copyrightText: "",
  email: "",
});

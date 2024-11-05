import { writable } from 'svelte/store';

interface WSStore {
    status: status_codes;
    data: number[];
}

type status_codes = "disconnected" | "loading" | "connected";

const initialState: WSStore = {
    status: "disconnected",
    data: []
};

export const wsStore = writable<WSStore>(initialState);
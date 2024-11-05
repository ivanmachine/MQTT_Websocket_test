import { writable } from 'svelte/store';

interface WSStore {
    status: status_codes;
    data: DataPoint[];
}

type status_codes = "disconnected" | "loading" | "connected";

interface DataPoint {
    timestamp: string;
    value: string;
}

const initialState: WSStore = {
    status: "disconnected",
    data: []
};

export const wsStore = writable<WSStore>(initialState);
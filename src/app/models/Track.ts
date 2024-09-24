import { Note } from "./Note";
import { Sound } from "./Sound";

export interface Track {
    notes: Note[];
    sound?: Sound;
}

export interface IEvent {
  id: string;
  storyId: string;
  title: string;
  characters: string[];
  places: string[];
  items: string[];
  chapter: number;
  storylineOrder: number;
  storyline: number;
  date: string;
  notes: string;
}

import marked from 'marked';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import { IStory } from '@/app/story/IStory';
import { IEvent } from '@/app/event/IEvent';
import { ICharacter } from '@/app/character/ICharacter';
import { IPlace } from '@/app/place/IPlace';
import { IItem } from '@/app/item/IItem';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const getDocumentTitle = (story: IStory) => `# ${story.title}\n\n`;

const getAbstract = (story: IStory) => `## Abstract\n\n${story.abstract}\n\n`;

const getStory = (story: IStory, events: IEvent[], getCharacterById: any) => {
  let text = `## Story\n\n`;

  events.forEach((e: IEvent) => {
    text += `### ${e.title} *(${
      e ? new Date(e.date).toDateString() : 'no date information'
    })*\n\n**Characters**: ${e.characters
      .map((characterId: string) => getCharacterById(characterId).name)
      .join(', ')}\n\n${e.notes}\n\n`;
  });

  return text + '\n\n';
};

const getCharacterList = (characters: ICharacter[]) => {
  let text = `## Characters\n\n`;

  characters.forEach((character: ICharacter) => {
    text += '### ' + character.name + '\n\n';
    text += 'Birthday: ' + new Date(character.birthday).toDateString() + '\n';
    text += 'Address: ' + character.address + '\n';
    text += 'Eye color: ' + character.eyeColor + '\n';
    text += 'Hair color: ' + character.hairColor + '\n';
    text += 'Skin color: ' + character.skinColor + '\n';
    text += 'Height: ' + character.height + '\n';
    text += 'Weight: ' + character.weight + '\n\n';
    text += '**Characteristics**\n' + character.characteristics + '\n';
    text += '**Social Profile**\n' + character.socialProfile + '\n';
    text += '**Psychological Profile**\n' + character.psychologicalProfile + '\n\n';
  });

  return text + '\n\n';
};

const getPlaceList = (places: IPlace[]) => {
  let text = `## Places\n\n`;

  places.forEach((place: IPlace) => {
    text += '### ' + place.name + '\n\n';
    text += 'Type: ' + place.type + '\n';
    text += 'Location: ' + place.location + '\n';
    text += '**Notes**\n' + place.notes + '\n\n';
  });

  return text + '\n\n';
};

const getItemList = (items: IItem[]) => {
  let text = `## Items\n\n`;

  items.forEach((item: IItem) => {
    text += '### ' + item.name + '\n\n';
    text += 'Type: ' + item.type + '\n';
    text += 'Location: ' + item.location + '\n';
    text += '**Notes**\n' + item.notes + '\n\n';
  });

  return text + '\n\n';
};

export const ExportToDocx = (
  story: IStory,
  events: IEvent[],
  getCharacterById: any,
  characters: ICharacter[],
  places: IPlace[],
  items: IItem[],
) => {
  let text = getDocumentTitle(story);

  text += getAbstract(story);
  text += getStory(story, events, getCharacterById);
  text += getCharacterList(characters);
  text += getPlaceList(places);
  text += getItemList(items);

  const html = `<!DOCTYPE html><html><body>${(marked as any)(text)}</body></html>`;
  const converted = htmlDocx.asBlob(html);
  saveAs(converted, `${story.title}.docx`);
};

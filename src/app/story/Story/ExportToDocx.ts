import marked from 'marked';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import { IStory } from '@/app/story/IStory';
import { IEvent } from '@/app/event/IEvent';
import { ICharacter } from '@/app/character/ICharacter';

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

/* istanbul ignore next */
const getDocumentTitle = (story: IStory) => `# ${story.title}\n\n`;
/* istanbul ignore next */
const getAbstract = (story: IStory) => `## Abstract\n\n${story.abstract}\n\n`;
/* istanbul ignore next */
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
/* istanbul ignore next */
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

/* istanbul ignore next */
export const ExportToDocx = (story: IStory, events: IEvent[], getCharacterById: any, characters: ICharacter[]) => {
  let text = getDocumentTitle(story);

  text += getAbstract(story);
  text += getStory(story, events, getCharacterById);
  text += getCharacterList(characters);

  const html = `<!DOCTYPE html><html><body>${(marked as any)(text)}</body></html>`;
  const converted = htmlDocx.asBlob(html);
  saveAs(converted, `${story.title}.docx`);
};

export const noteSymbol = Symbol("note");

export function createNote(title, description) {
  return {
    [noteSymbol]: true,
    title,
    description,
  };
}

import { getCollection, type CollectionEntry } from 'astro:content';
export type NameEntry = CollectionEntry<'names'>;
export const getNames = async () => (await getCollection('names')).sort((a, b) => a.data.number - b.data.number);

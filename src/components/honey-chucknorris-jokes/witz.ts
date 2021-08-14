/**
 * Interne Abbildung der Response von https://api.chucknorris.io/jokes/random
 *
 * Mapping:
 * id -> id
 * icon_url -> imgurl
 * url -> website
 * value -> text
 *
 */
export interface Witz {
  id: string;
  imgurl: string;
  website: string;
  text: string;
}

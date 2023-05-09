import axios from 'axios';

const KEY = '34287533-73b6140ff373420767809a55e';
const BASE_URL = 'https://pixabay.com/api/';

export class Api {
  constructor() {
    this._query = '';
    this.page = 1;
  }

  async fetch(loadMore) {
    loadMore ? (this.page += 1) : (this.page = 1);

    const url = `${BASE_URL}?q=${this._query}&page=${this.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const res = await axios(url);

    return res.data.hits;
  }

  get query() {
    return this._query;
  }

  set query(newQuery) {
    this._query = newQuery;
  }
}

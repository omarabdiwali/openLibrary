import React from 'react';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import Books from './displayBooks';

export default class BestSellers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiKey: process.env.REACT_APP_NYT_API_KEY, books: '' };
  }

  async componentDidMount() {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${this.state.apiKey}`;
    const response = await fetch(url);
    let data = await response.json();
    data = data.results.books;

    this.setState({ books: data });
  }

  render() {
    return (
      <div>
        {!this.state.books ? (
          <center>
            <Spinner />
          </center>
        ) : (
          <SimpleGrid columns={window.innerWidth > 800 ? 4 : window.innerWidth > 500 ? 2 : 1}>
            {this.state.books.map((book, i) => {
              return <Books book={book} type={'nyt'} key={i} />;
            })}
          </SimpleGrid>
        )}
      </div>
    );
  }
}

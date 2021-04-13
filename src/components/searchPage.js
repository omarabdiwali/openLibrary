import React, { useEffect, useState } from 'react';
import { Heading, Input, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { AiOutlineHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Search from './displaySearch.js';

export default function SearchPage(props) {
  const { book } = props.match.params;
  const title = book.replace(/\+/g, ' ');
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
  const history = useHistory();

  function onClick(e) {
    e.preventDefault();
    let woSpace = search.replace(/ /g, '');
    if (!search || !woSpace) {
      setSearch('');
    } else {
      let searchVal = search.replace(/ /g, '+');
      history.push(`/books/${searchVal}`);
    }
  }

  function onChange(e) {
    setSearch(e.target.value);
  }

  function homePage() {
    history.push('/');
  }

  useEffect(() => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=20&orderBy=relevance&key=${apiKey}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => setBooks(data.items))
      .catch(err => console.error(err));
  }, [title, apiKey]);

  return (
    <div>
      <IconButton
        icon={<AiOutlineHome />}
        onClick={homePage}
        style={{ margin: 17 }}
      />
      <center style={{ paddingTop: '3%' }}>
        <form onSubmit={onClick}>
          <Input
            placeholder="Search"
            onChange={onChange}
            value={search}
            style={{ width: '80%', marginBottom: '5%' }}
          ></Input>
          <IconButton
            onClick={onClick}
            icon={<SearchIcon />}
            style={{ marginLeft: '1%', width: '8%' }}
            isRound={true}
          />
        </form>
      </center>
      <center>
        <Heading as="h2" size="2xl" style={{ paddingBottom: '6%' }}>
          Search results for '{title}'
        </Heading>
      </center>
      <Search data={books} />
    </div>
  );
}
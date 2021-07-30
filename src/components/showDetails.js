import React from 'react';
import { Spinner, Heading, Text, Input, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

export default function Details(props) {
  const { isbn } = props.match.params;
  const [book, setBook] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [authors, setAuthors] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [search, setSearch] = React.useState('');
  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
  const history = useHistory();

  React.useEffect(() => {
    if (isIsbn(isbn)) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`;
      fetch(url).then(resp => resp.json()).then(data => {
        setBook(data.items[0].volumeInfo ?? "N/A");
        setLoading(false);
        setAuthors(authorsFunc(data.items[0].volumeInfo.authors) ?? "");
      }).catch(err => console.error(err));
    }
    else {
      const url = `https://www.googleapis.com/books/v1/volumes/${isbn}?key=${apiKey}`;
      fetch(url).then(resp => resp.json()).then(data => {
        setBook( data.volumeInfo ?? "N/A");
        setLoading(false);
        setDescription(removeHTML(data.volumeInfo.description));
        setAuthors(authorsFunc(data.volumeInfo.authors));
      })
    }
  }, [apiKey, isbn])

  function isIsbn(code) {
    return code.length === 10;
  }
  function authorsFunc(data) {
    return data.join(', ');
  }
  function removeHTML(data) {
    let change = data.replace(/(<([^>]+)>)/gi, ' ');
    change = change.replace("'", '').replace("'", '');
    return change;
  }
  function onClick(e) {
    e.preventDefault();
    let woSpace = search.replace(/ /g, "");
    if (!search || !woSpace) {
      setSearch("");
    }
    else {
      let searchVal = search.replace(/ /g, "+");
      history.push(`/books/${searchVal}`);
    }
  }
  function homePage() {
    history.push('/');
  }
  function onChange(e) {
    setSearch(e.target.value)
  }
  function wordCount(title) {
    if (title.match(/ /gi)) {
      return title.match(/ /gi).length + 1;
    }
    else {
      return 1;
    }
  }

  return (
    loading ? (
      <center>
        <Spinner style={{position: "absolute", top: "50%"}} />
      </center>
    ) : (
      <div>
        <IconButton
          icon={<AiOutlineHome />}
          onClick={homePage}
          style={{ margin: 17 }}
        />
      <center>
        <form onSubmit={onClick}>
          <Input placeholder="Search" onChange={onChange} value={search} style={{ width: "80%", marginBottom: "5%" }}></Input>
          <IconButton onClick={onClick} icon={<SearchIcon />} style={{ marginLeft: "1%", width: "8%" }} isRound={true} />
        </form>
      </center>
      <div>
        {book.title ? (
          <div className="max-w-5xl mx-auto shadow-2xl rounded-lg px-4 my-10">
            <div className="flex flex-row">
              <div className="mx-10 my-10">
                  <img
                  className="rounded-lg"
                  src={book.imageLinks.thumbnail ?? 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'}
                  alt='https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'
                ></img>
              </div>
              <div className="m-10">
                <Heading style={{ alignItems: 'center' }} size={wordCount(book.title) > 7 ? "lg" : wordCount(book.title) > 5 ? "xl" : "2xl"}>
                  {book.title}
                </Heading>
                <Text fontSize="2xl" style={{ paddingTop: '2%' }}>
                  By: {authors}
                </Text>
              </div>  
            </div>
            <div className="py-10 max-w-3xl mx-auto">
              {description.length > 0
                ? description
                : book.description}    
            </div>
          </div>
        ) : (
          <center>
            <Heading className="mx-auto">
              Data for this book is not available.
            </Heading>
          </center>
        )}
        </div>
    </div>
  ));
}
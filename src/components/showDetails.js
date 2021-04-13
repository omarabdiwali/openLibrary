import React from 'react';
import { Spinner, Heading, Text, Input, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { withRouter } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

class Details extends React.Component {
  constructor(props) {
    super(props);
    const { isbn } = props.match.params;
    this.state = {
      apiKey: 'AIzaSyADRfQjG7z55-JtGAq-o72lCOR43LGuRa4',
      book: '',
      loading: true,
      isbn: isbn,
      description: '',
      authors: '',
      search: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.homePage = this.homePage.bind(this);
  }

  async componentDidMount() {
    if (this.isIsbn(this.state.isbn)) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.isbn}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      this.setState({
        book: data.items ? data.items[0].volumeInfo : 'N/A',
        loading: false,
        authors: data.items
          ? this.authors(data.items[0].volumeInfo.authors)
          : '',
      });
    } else {
      const url = `https://www.googleapis.com/books/v1/volumes/${this.state.isbn}?key=${this.state.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      this.setState({
        book: data.volumeInfo ? data.volumeInfo : 'N/A',
        loading: false,
      });
      this.setState({
        description: this.removeHTML(data.volumeInfo.description),
        authors: this.authors(data.volumeInfo.authors),
      });

    }
  }

  onClick(e) {
    e.preventDefault();
    let woSpace = this.state.search.replace(/ /g, "");
    
    if (!this.state.search || !woSpace) {
      this.setState({search: ""});
    }

    else {
      let searchVal = this.state.search.replace(/ /g, "+");
      this.props.history.push(`/books/${searchVal}`);
    }
  }

  homePage() {
    this.props.history.push('/');
  }

  onChange(e) {
    this.setState({ search: e.target.value });
  }

  removeHTML(data) {
    let change = data.replace(/(<([^>]+)>)/gi, ' ');
    change = change.replace("'", '').replace("'", '');
    return change;
  }

  authors(data) {
    return data.join(', ');
  }

  isIsbn(id) {
    return id.length === 10;
  }

  wordCount(title) {
    if (title.match(/ /gi)) {
      return title.match(/ /gi).length + 1;
    }
    else {
      return 1;
    }
  }

  render() {
    return this.state.loading ? (
      <center>
        <Spinner style={{position: "absolute", top: "50%"}} />
      </center>
    ) : (
        <div>
          <IconButton
            icon={<AiOutlineHome />}
            onClick={this.homePage}
            style={{ margin: 17 }}
          />
        <center>
          <form onSubmit={this.onClick}>
            <Input placeholder="Search" onChange={this.onChange} value={this.state.search} style={{ width: "80%", marginBottom: "5%" }}></Input>
            <IconButton onClick={this.onClick} icon={<SearchIcon />} style={{ marginLeft: "1%", width: "8%" }} isRound={true} />
          </form>
        </center>
        <div>
          {this.state.book.title ? (
            <div className="max-w-5xl mx-auto shadow-2xl rounded-lg px-4 my-10">
              <div className="flex flex-row">
                <div className="mx-10 my-10">
                    <img
                    className="rounded-lg"
                    src={this.state.book.imageLinks.thumbnail}
                    alt={
                      'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'
                    }
                  ></img>
                </div>
                <div className="m-10">
                  <Heading style={{ alignItems: 'center' }} size={this.wordCount(this.state.book.title) > 7 ? "lg" : this.wordCount(this.state.book.title) > 5 ? "xl" : "2xl"}>
                    {this.state.book.title}
                  </Heading>
                  <Text fontSize="2xl" style={{ paddingTop: '2%' }}>
                    By: {this.state.authors}
                  </Text>
                </div>  
              </div>
              <div className="py-10 max-w-3xl mx-auto">
                {this.state.description.length > 0
                  ? this.state.description
                  : this.state.book.description}    
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
    );
  }
}

export default withRouter(Details);
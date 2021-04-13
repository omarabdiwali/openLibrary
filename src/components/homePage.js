import React, { useState } from 'react';
import { Input, IconButton, Heading } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons";
import { useHistory } from 'react-router-dom';
import BestSellers from './displayBestSellers';

export default function HomePage() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  function onChange(e) {
    setSearch(e.target.value);
  };

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

  return (
    <div>
      <center style={{ paddingTop: "3%" }}>
        <form onSubmit={onClick}>
          <Input placeholder="Search" onChange={onChange} value={search} style={{ width: "80%", marginBottom: "5%" }}></Input>
          <IconButton onClick={onClick} icon={<SearchIcon />} style={{ marginLeft: "1%", width: "8%" }} isRound={true} />
        </form>
      </center>
      <center>
        <Heading as="h2" size="3xl" style={{ paddingBottom: "6%" }}>NYT - Best Sellers</Heading>
      </center>
      <BestSellers />
    </div>
  )
}
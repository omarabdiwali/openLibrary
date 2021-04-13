import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Books from './displayBooks';

export default function Search({ data }) {
  return (
    <SimpleGrid columns={window.innerWidth > 800 ? 4 : window.innerWidth > 500 ? 2 : 1}>
      {data.map((book, i) => {
        return (<Books book={book} type={"google"} key={i} />)
      })}
    </SimpleGrid>
  )
}
import React, { useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Books from './displayBooks';

export default function Search({ data }) {
  const [size, setSize] = useState(window.innerWidth > 800 ? 4 : window.innerWidth > 500 ? 2 : 1);

  window.addEventListener('resize', () => {
    window.innerWidth > 800 ? setSize(4) : window.innerWidth > 500 ? setSize(2) : setSize(1);
  })

  return (
    <SimpleGrid columns={size}>
      {data.map((book, i) => {
        return (<Books book={book} type={"google"} key={i} />)
      })}
    </SimpleGrid>
  )
}
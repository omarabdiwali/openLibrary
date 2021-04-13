import React from 'react';
import { Center, Image, Box, Badge, LinkBox } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function Books({ book, type }) {

  let ratings = type === "nyt" ? "" : book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0;
  let reviewers = type === "nyt" ? "" : book.volumeInfo.ratingsCount ? book.volumeInfo.ratingsCount : 0;
  let title = type === "nyt" ? book.title : book.volumeInfo.title;
  let image = type === "nyt" ? book.book_image : book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg";
  let littleData = type === "nyt" ? `#${book.rank}` : book.volumeInfo.printType ? book.volumeInfo.printType : "N/A";
  let published = type === "nyt" ? "" : book.volumeInfo.publishedDate;
  let review = type === "nyt" ? "" : `${reviewers} reviewers.`
  let isbn = type === "nyt" ? book.primary_isbn10 : book.id;

  function getAuthors() {
    if (type === "nyt") {
      return book.author;
    }
    else {
      return book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "N/A"
    }
  }

  return (
    <LinkBox as="article" maxW="xs" borderWidth="1px" rounded="md" borderRadius="md" overflow="hidden" m="4">
      <Link to={`/${isbn}`}>
      <Center style={{ paddingTop: "6%" }}>
        <Image src={image} alt={title} style={{ width: 128, height: 198, aspectRatio: "auto 128 / 198", borderRadius: "10px" }} />
      </Center>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {littleData}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {published}
          </Box>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {title}
        </Box>
        <Box>
          By: {getAuthors()}
        </Box>
        <Box d="flex" mt="2" alignItems="center">
          {type === "nyt" ? `Published By: ${book.publisher}` :
            Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < ratings ? "teal.500" : "gray.300"}
                />
              ))
          }
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {review}
          </Box>
        </Box>
      </Box>
      </Link>
    </LinkBox>
  )
}
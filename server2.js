const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(
  `
  type Query {
    album(id: Int!): Album
    albums(genre: String): [Album]
  },
  type Mutation {
    updateAlbumRating(id: Int!, rating: Int!): Album
  }
  type Album {
    id: Int
    title: String
    artist: String
    year: Int
    genre: String
    url: String
    rating: Int
  }
  `
);

const albumsData = [
  {
    id: 1,
    title: "Assume Form",
    artist: "James Blake",
    year: 2016,
    genre: "Indie Electronic",
    url:
      "https://open.spotify.com/album/23dKNZpiadggKHrQgHLi3L?si=VnGZeV9FScSOAQi_vdoW5g",
    rating: 9
  },
  {
    id: 2,
    title: "Pink Moon",
    artist: "Nick Drake",
    year: 1971,
    genre: "Acoustic",
    url:
      "https://open.spotify.com/album/7KyvfoQhqlNLPNb98yY0pf?si=-cchZiKERVCuLqYzXfC18Q",
    rating: 10
  },
  {
    id: 3,
    title: "pom pom",
    artist: "Ariel Pink",
    year: 2014,
    genre: "Indie Electronic",
    url:
      "https://open.spotify.com/album/4UhaqAS8V23KozB3dzLMax?si=cNVdCh3pTfKVKxnJxGLHtw",
    rating: 8
  }
];

const getAlbum = args => {
  const id = args.id;
  return albumsData.filter(album => album.id === id)[0];
};

const getAlbums = args => {
  if (args.genre) {
    const genre = args.genre;
    return albumsData.filter(album => album.genre === genre);
  } else {
    return albumsData;
  }
};

const updateAlbumRating = ({ id, rating }) => {
  albumsData.map(album => {
    if (album.id === id) {
      album.rating = rating;
      return album;
    }
  });
  return albumsData.filter(album => album.id === id)[0];
};

const root = {
  album: getAlbum,
  albums: getAlbums,
  updateAlbumRating: updateAlbumRating
};

const app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log("Express GraphQL server now listening on port 4000")
);

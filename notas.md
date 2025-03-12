Script SQL para inicialiar la BB
INSERT INTO movies.films (film_id, title, release_year, director, duration, rating, poster)
VALUES
( UUID(), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 9.3, 'https://www.imdb.com/title/tt0111161/'),
( UUID(), 'The Godfather', 1972, 'Francis Ford Coppola', 175, 9.2, 'https://www.imdb.com/title/tt0068646/'),
( UUID(), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 9.0, 'https://www.imdb.com/title/tt0468569/'),
( UUID(), 'The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 8.9, 'https://www.imdb.com/title/tt0167260/'),
( UUID(), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 8.9, 'https://www.imdb.com/title/tt0110912/'),
( UUID(), 'Schindler''s List', 1993, 'Steven Spielberg', 195, 8.9, 'https://www.imdb.com/title/tt0108052/'),
( UUID(), 'The Lord of the Rings: The Fellowship of the Ring', 2001, 'Peter Jackson', 178, 8.8, 'https://www.imdb.com/title/tt0120737/'),
( UUID(), 'Forrest Gump', 1994, 'Robert Zemeckis', 142, 8.8, 'https://www.imdb.com/title/tt0109830/'),
( UUID(), 'Inception', 2010, 'Christopher Nolan', 148, 8.7, 'https://www.imdb.com/title/tt1375666/'),
( UUID(), 'The Lord of the Rings: The Two Towers', 2002, 'Peter Jackson', 179, 8.7, 'https://www.imdb.com/title/tt0167261/'),
( UUID(), 'The Matrix', 1999, 'Lana Wachowski, Lilly Wachowski', 136, 8.7, 'https://www.imdb.com/title/tt0133093/'),
( UUID(), 'Goodfellas', 1990, 'Martin Scorsese', 146, 8.7, 'https://www.imdb.com/title/tt0099685/'),
( UUID(), 'One Flew Over the Cuckoo''s Nest', 1975, 'Milos Forman', 133, 8.7, 'https://www.imdb.com/title/tt0073486/'),
( UUID(), 'Seven', 1995, 'David Fincher', 127, 8.6, 'https://www.imdb.com/title/tt0114369/'),
( UUID(), 'The Silence of the Lambs', 1991, 'Jonathan Demme', 118, 8.6, 'https://www.imdb.com/title/tt0102926/'),
( UUID(), 'The Usual Suspects', 1995, 'Bryan Singer', 106, 8.5, 'https://www.imdb.com/title/tt0114814/'),
( UUID(), 'Léon: The Professional', 1994, 'Luc Besson', 110, 8.5, 'https://www.imdb.com/title/tt0110413/'),
( UUID(), 'The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 8.5, 'https://www.imdb.com/title/tt0110357/'),
( UUID(), 'Terminator 2: Judgment Day', 1991, 'James Cameron', 137, 8.5, 'https://www.imdb.com/title/tt0103064/'),
( UUID(), 'The Green Mile', 1999, 'Frank Darabont', 189, 8.5, 'https://www.imdb.com/title/tt0120689/'),
( UUID(), 'Back to the Future', 1985, 'Robert Zemeckis', 116, 8.5, 'https://www.imdb.com/title/tt0088763/'),
( UUID(), 'American History X', 1998, 'Tony Kaye', 119, 8.5, 'https://www.imdb.com/title/tt0120586/'),
( UUID(), 'The Pianist', 2002, 'Roman Polanski', 150, 8.5, 'https://www.imdb.com/title/tt0253474/'),
( UUID(), 'Gladiator', 2000, 'Ridley Scott', 155, 8.5, 'https://www.imdb.com/title/tt0172495/'),
( UUID(), 'The Departed', 2006, 'Martin Scorsese', 151, 8.5, 'https://www.imdb.com/title/tt0407887/'),
( UUID(), 'The Prestige', 2006, 'Christopher Nolan', 130, 8.5, 'https://www.imdb.com/title/tt0482571/'),
( UUID(), 'The Intouchables', 2011, 'Olivier Nakache, Éric Toledano', 112, 8.5, 'https://www.imdb.com/title/tt1675434/');

## Campos calculados en la BBDD con Prisma

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`
},
},
},
},
})

async function main() {
/\*\*

- Example query containing the `fullName` computed field in the response
  \*/
  const user = await prisma.user.findFirst()
  }

main()

instalación de Bcript.JS
npm i bcryptjs

https://www.micvideal.es/

irene.marin@cas-trainig.com

Enviar cokie o token.

res.cookie('token', token);
res.json(this.makeResponse([response]));

leer datos de form de request.

Extension de clases
declare module 'express' {
interface Request {
user?:Payload;
}
}

HTML,CSS,Javascript,Angular, Typescript,NodeJS,Express,NestJs,Prisma, Zod, MySQL,MongoDB, Git, Github, Visual Studio Code, Postman, integración, vitest, Swagger.

    {
      "title": "The Dark Knight",
      "description": null,
      "releaseYear": 2008,
      "rating": "9",
      "director": "Christopher Nolan",
      "duration": 152,
      "poster": "https://www.imdb.com/title/tt0468569/",
      "createdAt": "2025-03-10T18:44:15.913Z",
      "updatedAt": null,
      "id": "492c3e58-fdd7-11ef-8707-825b413442ac"
    },

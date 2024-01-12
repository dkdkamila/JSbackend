# JSbackend


Detta är backend för JavaProjekt, en enkel blogg-applikation. Backend är en RESTful API skriven i JavaScript (node.js) och Express. Applikationen sköter anslutningen med MongoDB databasen i Atlas och hanterar HTTP-förfrågningar och svar. 

## Funktioner

- **Hämta alla inlägg:** Använd `/api/posts` för att hämta alla blogginlägg.
- **Skapa ett nytt inlägg:** Använd `POST /api/posts` för att skapa ett nytt blogginlägg.
- **Uppdatera ett inlägg:** Använd `PUT /api/posts/:id` för att uppdatera ett befintligt blogginlägg.
- **Ta bort ett inlägg:** Använd `DELETE /api/posts/:id` för att ta bort ett blogginlägg.

## Installera beroenden
npm install 

## Kör applikatonen
npm start 

## API Dokumentationen 

### Hämta inlägg:
GET /api/posts

### Skapa nytt inlägg 
POST /api/posts
Content-Type: application/json

{
  "title": "Nytt inlägg",
  "content": "Innehållet i det nya inlägget."
}

### Uppdatera inlägg 
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Uppdaterat inlägg",
  "content": "Uppdaterat innehåll."
}

Parametern :id måste ersättas med en giltig post ID.

### Ta bort inlägg 
DELETE /api/posts/:id

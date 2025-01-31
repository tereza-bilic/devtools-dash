# devtools-dash
## Upute za korištenje projekta
### 1. Postavljanje lokalnog okruženja
Da biste pokrenuli igru lokalno, prvo klonirajte repozitorij s GitHub-a na svoje računalo. Nakon preuzimanja, otvorite projekt u terminalu i slijedite ove korake:

Instalacija frontend ovisnosti: Otvorite folder app i pokrenite npm install kako biste instalirali sve potrebne pakete iz package.json (uključujući React, Vite, Axios i ostale biblioteke).

Instalacija backend ovisnosti: Otvorite root projekta (ili backend folder, ovisno o strukturi) i pokrenite pip install -r requirements.txt za instalaciju Python paketa navedenih u datoteci (FastAPI, SQLAlchemy, Jinja2, itd.).

### 2. Pokretanje aplikacije
Frontend server: U folderu app pokrenite npm run dev da biste startali Vite razvojni poslužitelj. Aplikacija će biti dostupna na http://localhost:5173.

Backend server: U folderu s backend kodom pokrenite uvicorn main:app --reload (ili fastapi dev main.py ako je konfigurirano) da biste aktivirali FastAPI poslužitelj. Poslužitelj će osluškivati zahtjeve na http://localhost:8000.

### 3. Pristup aplikaciji
Otvorite preglednik i idite na http://localhost:5173.

Prvi korak: Registrirajte se putem Sign Up forme unosom nadimka i lozinke. Ako već imate račun, prijavite se putem Login forme.

### 4. Navigacija kroz igru
Kategorije: Nakon prijave, prikazat će vam se dostupne kategorije (npr. Elements, Console). Klikom na kategoriju otvara se popis nivoa unutar nje.

Odabir nivoa: Odaberite željeni nivo (npr. e1, s1) klikom na njega. Nivo će se otvoriti u novom tabu preglednika kako biste zadržali glavni interfejs čistim.

### 5. Rješavanje nivoa
DevTools: Za većinu nivoa potrebno je koristiti Developer Tools (F12 ili desni klik → Ispitaj). Držite DevTools otvorenim tijekom igranja.

Cilj: Svaki nivo ima tajnu šifru od 6 znakova skrivenu u:

HTML/CSS kodu (npr. kroz skrivene elemente za kategoriju Elements),

JavaScript varijablama ili konzolnim ispisima (za Console kategoriju),

Mrežnim zahtjevima (npr. za Network nivoe),

Izvornom kodu stranice (za Sources nivoe).

Primjer: U nivou s1 (kategorija Sources) šifra može biti skrivena u komentaru JS datoteke ili globalnoj varijabli.

### 6. Završetak nivoa
Unesite pronađenu šifru u polje za unos i potvrdite je. Ako je točna, nivo će biti označen kao dovršen, a napredak će biti vidljiv na glavnoj stranici.

Ponovno igranje: Možete ponovno pokrenuti nivo da biste isprobali alternativna rješenja.

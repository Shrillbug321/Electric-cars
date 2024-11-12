[English](../README.md)
# Trasowanie samochodów elektrycznych
_Tak, takie słowo istnieje i oznacza szukanie trasy_ :)<br/><br/>
**Technologie** <br>
JavaScript + React.js, MaterialUI, Neo4J, npm

SPA do szukania tras dla elektrycznych samochodów. Pozwala znaleźć najkrótszą drogę między dwoma miastami dla konkretnego pojazdu.<br/>
Proces wyszukiwania uwzględnia zasięg pojazdu, więc jeśli jest krótki, samochód będzie potrzebował więcej postojów w miastach lub ładowarkach (trasa będzie dłuższa). <br/>
Ponadto użytkownik może dodać lub usunąć ładowarkę między miastami (bo miasta raczej się nie przemieszczają, żeby je też trzeba było modyfikować ;) ).

&copy; Łukasz Wysocki https://github.com/Lukas976 <br/>
Sebastian Dreszer (to ja!) <br/>
Styczeń — Luty 2024

**Uruchamianie**
1. Pobieramy projekt z repozytorium
2. Instalujemy Node.js (zawiera npm)
3. Idziemy do folderu z projektem
4. Otwieramy wiersz polecenia
5. Wpisujemy `npm install` aby zainstalować biblioteki
6. Wpisujemy `npm install react-scripts` aby zainstalować Reacta
7. Następnie `npm start` aby uruchomić aplikację. Domyślnie uruchamia się na `localhost:3000`
8. Baza danych jest umieszczona w chmurze, więc nie jest wymagana jej instalacja i konfiguracja (ale w darmowej wersji Neo4J Aura baza jest usuwana po 30 dniach, więc czasami jest niedostępna)

Ekran powitalny<br/>
![img.png](img.png)

Wybór samochodu<br/>
![img_1.png](img_1.png)

Wybór miast<br/>
![img_2.png](img_2.png)

Najkrótsza droga między Siedlcami a Szczecinem dla Tesli Model 3<br/>
![img_4.png](img_4.png)

Dodawanie ładowarki<br/>
![img_3.png](img_3.png)
# Strona do zarządzania przetargami 
## Identyfikacja zagadnienia biznesowego
Obecnie na rynku nie ma rozwiązania, które oferowałoby kompleksowe i proste zarządzanie przetargami o zasięgu krajowym w scentralizowany sposób. Do tej pory każda instytucja publiczna używała swojego własnego systemu, przez co poszczególnym firmom trudno było na bieżąco śledzić rynek. Nasza aplikacja ma szansę wypełnić tę lukę zapewniając ujednolicony dostęp za pomocą internetu do scentralizowanej bazy danych zawierającej aktualne przetargi. Produkt jest skierowany do instytucji publicznych i przedsiębiorstw. Dzięki niemu informacje o przetargach staną się dostępne dla szerszej grupy odbiorców, a instytucje będę korzystać z jednego wspólnego systemu. Instytucje i firmy korzystające z naszego systemu mogą zrezygnować z przestarzałych, analogowych (np. poprzez ogłoszenia w gazetach) sposobów uczestniczenia w przetargach, które dosyć często były zawodne. 

## Wymagania systemowe i funkcjonalne
Po stronie back-endu wykorzystywane jest środowisko uruchomieniowe Node.js z Express.js. Do przechowywania informacji używana jest relacyjna baza danych MySQL. Komunikacja back-endu z bazą danych odbywa się przy użyciu Sequelize - narzędzie ORM dedykowane dla Node.js. Natomiast front-end oparty jest na bibliotece React.js. 
Aplikacja jest dostępna na wszystkich popularnych systemach operacyjnych.
Nasza aplikacja opiera się na architekturze Model View Controller. 

Wymagania funkcjonalne:
- tworzenie przetargów,
- dodawanie ofert do aktywnych przetargów,
- wyświetlanie listy aktywnych i zakończonych przetargów,
- dodawanie firm i instytucji publicznych do systemu,
- podgląd złożonych ofert dla zakończonych przetargów,
- wyświetlanie podsumowań dotyczących przetargów na stronie głównej.

## Analiza zagadnienia i jego modelowanie
Baza danych opiera się na następujących encjach:
- przetargi (tenders),
- oferty (offers),
- instytucje publiczne (contracting authorities),
- firmy (companies).

![diagram_encji](https://github.com/michalprzysucha/PAI_projekt_grupowy/assets/64420379/b3e44d1a-5521-4b94-940f-2e89fd8ea335)

Atrybuty encji:
1. Tenders: reprezentują przetargi ogłoszone przez instytucje publiczne
- id, 
- name,
- startDate,
- endDate,
- description,
- budget,
- contractingAuthorityId.
2. Offers: reprezentują oferty złożone dla konkretnych przetargów przez firmy
- id, 
- submissionDate,
- price,
- tenderId,
- companyId.
3. ContractingAuthorities: reprezentują instytucje publiczne składające przetargi
- id,
- name.
4. Companies: reprezentują firmy składające oferty do danych przetargów
- id,
- name.

Encje połączone są następującymi związkami:
- instytucje jeden do wielu z przetargami,
- przetargi jeden do wielu z ofertami,
- firmy jeden do wielu z ofertami.

## Implementacja
Komunikacja klienta z serwerem odbywa się przez zapytania HTTP: POST i GET. Klient wchodząc na dany adres URL powoduje wywołanie funkcji zawartej w odpowiednim kontrolerze związanym z daną trasą. Kontroler powoduje uruchomienie odpowiedniego serwisu, którego zadaniem jest zrealizowanie danej funkcji biznesowej dla klienta na podstawie danych zwróconych przez obiekt dostępu do danych (Data Access Object).  

Podstawowymi komponentami aplikacji są:
- TenderForm,
- TendersTable,
- TenderDetalis,
- OfferForm.

TenderForm: na początku z serwera pobierana jest lista dostępnych instytucji publicznych przy pomocy asynchronicznego modelu komunikacji fetch API. Następnie generowane jest formularz, który po wypełnieniu wysyłany jest metodą POST pod konkretny URL. Przed przesłaniem danych wykonywana jest weryfikacja wpisanych wartości. 

TendersTable: na początku z serwera pobierana jest lista dostępnych aktywnych oraz zakończonych przetargów. Selekcja aktywnych i zakończonych przetargów dokonywana jest po stronie back-endu przy użyciu odpowiedniego warunku w zapytaniu Sequalize. 

| ![aktywne_przetargi](https://github.com/michalprzysucha/PAI_projekt_grupowy/assets/64420379/050093cd-85e9-41b2-892e-91e8a14ebee2) |
|:--:| 
| *Funkcja activeTenders z pliku daoTender.js* |

TenderDetails: pobiera i wyświetla dane i przetargu. W zależności od tego, czy przetarg jest aktywny czy nie wyświetlana jest odpowiednio przycisk umożliwiający złożenie nowej oferty albo lista złożonych ofert. Dodatkowo, przy aktywnych przetargach, wyświetlany jest czas do ich zakończenia.

OfferForm: komponent związany jest bezpośrednio z komponentem TenderDetails. Jest on wyświetlany po naciśnięciu przycisku złożenia oferty. Na początku komponent pobiera listę dostępnych firm, które będzie można wybrać w formularzu.

| ![formularz_oferty](https://github.com/michalprzysucha/PAI_projekt_grupowy/assets/64420379/344a7c8f-9a40-4f3e-a505-4c03b5c5028a) |
|:--:| 
| *Fragment pliku OfferForm.js* |

Menu jest częścią komponentu Layout. Dzięki zastosowaniu Outletu jest ono widoczne na każdej stronie co w znaczący sposób ułatwia nawigację po aplikacji.

Za trasowanie żądań odpowiada plik router.js.

Komponentem rozszerzającym podstawowe funkcjonalności aplikacji jest strona główna (Home.js), który zawiera podsumowania dotyczące najbardziej aktywnych przetargów, przetargów z największym budżetem i przetargi bliskie zakończeniu. 

| ![podsumowania](https://github.com/michalprzysucha/PAI_projekt_grupowy/assets/64420379/05455cbf-2777-4a83-a5d2-046c517cf8d1) |
|:--:| 
| *Fragment pliku TendersSummaries.js* |

## Podsumowanie
W wyniku pracy nad produktem udało się stworzyć aplikację do zarządzania przetargami, oferująca podstawowe funkcjonalności. W przyszłości możliwy jest dalszy rozwój aplikacji pod kątem interfejsu użytkownika oraz autoryzacji. Przetargi mogłyby definiować tylko zarejestrowane instytucje, a uczestniczyć w nich tylko zautoryzowane firmy. Aplikacja zostałaby rozbudowana o zarządzanie kontem użytkownika i pozwalająca na wgląd w historię aktywności w aplikacji. Wymagałoby to rozszerzenia modelu danych o dodatkowe encje i atrybuty.
W trakcie realizacji projektu napotkano trudności związane z zapytaniami zawierającymi funkcje agregujące w Sequalize.

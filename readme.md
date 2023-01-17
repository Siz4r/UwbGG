# UwbGG
Komunikator tekstowy w postaci aplikacji internetowej. 

# Wykorzystane technologie:
 - ### Spring/Spring Boot
 - ### React/Redux Toolkit w języku TypeScript
 - ### PostgreSQL
 - ### Docker
 - ### Java 17
 - ### NodeJS lub/i Yarn

# Uruchomienie aplikacji

- ### Baza danych
Wchodzimy do katalogu 'uwbggbackend/docker'. \
Uruchamiamy baze komenda 'docker-compose up'. \
Baza jest dostępna na porcie '5432'.

- ### Server
Musimy najpierw zbudować aplikacje
Przechodzimy do katalogu uwbggbackend i wykonujemy komende '../gradlew build'. \
Ważne aby zmienna 'JAVA_HOME' była ustawiona na Jave w wersji 17. \
Aplikacja w formacie 'jar' jest dostępna pod ścieżką 'build/libs/uwbggbackend.jar'. \
Komenda do uruchomienia aplikacji: '{path_to_java_17_JVM} -jar {path_to_jar}'. \
Serwer działa na porcie '8080'

- ### UI
Przechodzimy do katalogu uwbgg. \
Instalujemy wszystkie paczki za pomocą komendy 'npm install'.\
Następnie uruchamiamy za pomocą 'npm start'. Aplikacja jest dostępna na porcie '3000'.


# Funkcjonalności
- ### Logowanie/Rejestracja
Przy rejestracji wszystkie dane są walidowane, a nick oraz email muszą być unikalne.
Nie ma potrzeby potwierdzania emaila. Logujemy się za pomocą nick'u oraz hasła.
Autentykacja jest w postaci JWT. Po zalogowaniu użytkownik otrzymuje ACCESS_TOKEN,
który jest używany do rozpoznania użytkownika. Zwracane jest równiaż Cookie służące do 
odświeżania ACCESS_TOKEN'a. Wszystko zostało zaimplementowane z wykorzystaniem modułu
 ***Spring Security***

- ### System przyjaciół
Po zalogowaniu w prawym górnym rogu mamy pole do wyszukiwania użytkowników po ich nick'u.
Dopóki zaproszony użytkownik nie podejmie decyzji odnośnie zaproszenia nie możemy ponowić próby.
Po zaakceptowaniu zaproszenia można tworzyć pomiędzy sobą konwersacje lub dodawać
przyjaciela do już istniejących gdy posiada się odpowiednie uprawnienia na chat'ie.

- ### Konwersacje
Po naciśnięciu przycisku ***Create Conversation*** pokażemy nam się *Modal*
do tworzenia konwersacji. Możemy dodać przyjaciół oraz ustalić nazwe chat'u.
Utworzenie konwersacji skutkuje pojawieniem się jej u wszystkich uczestników
w czasie rzeczywistym. Od tego momentu można komunikować się ze sobą a twórca
konwersacji również może dodawać lub usuwać z niej użytkowników. Komunikacja 
*real time* zostało zaimplementowana dzięki ***Spring Messaging***.

# Diagramy
![database](https://user-images.githubusercontent.com/72757685/212986532-942752da-3f12-41b4-b4a6-6323d14d95b6.png)

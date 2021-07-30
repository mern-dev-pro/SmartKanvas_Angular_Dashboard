#!/bin/bash

sed -i 's/#apikey#/'"$(apikey)"'/g' ./src/environments/environment.prod.ts
sed -i 's/#DBAPI#/'"$(DBAPI)"'/g' ./src/environments/environment.prod.ts
sed -i 's/#authDomain#/'"$(authDomain)"'/g' ./src/environments/environment.prod.ts
sed -i 's/#projectId#/'"$(projectId)"'/g' ./src/environments/environment.prod.ts
sed -i 's/#storageBucket#/'"$(storageBucket)"'/g' ./src/environments/environment.prod.ts
sed -i 's/#messagingSenderId#/'"$(messagingSenderId)"'/g' ./src/environments/environment.prod.ts
sed -i 's/#measurementId#/'"$(measurementId)"'/g' ./src/environments/environment.prod.ts
sed -i 's/#url#/'"$(backendUrl)"'/g' ./src/environments/environment.prod.ts
cp ./src/environments/environment.prod.ts ./src/environments/environment.ts

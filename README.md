# expo-react-native

## Helper

* [**Guide d'utilisation fnm**](https://www.freecodecamp.org/news/fnm-fast-node-manager/)
* [**Guide de paramétrage de fnm**](https://github.com/Schniz/fnm#shell-setup)
* [**Create your first app Expo**](https://docs.expo.dev/tutorial/create-your-first-app/)

## Initialisation

1. Installation de node version LTS
```
fnm install 22

node -v
//donne v22.14.0

npm -v
//donne 10.9.2
```

Si utilisation de Bash pour l'installation / le switch de la version de Node.js il faut s'assurer d'avoir cette
ligne dans son fichier `.bashrc` présent dans le profil de l'utilisateur.
```
eval "$(fnm env --use-on-cd --shell bash)"
```

Si aucun fichier n'est présent dans le profil il faut alors s'assurer de le créer au préalable en exécutant la commande via
Powershell : `copy > ~/.bashrc`.
Cette commande va afficher un message d'erreur mais créer le fichier.

Si utilisation de Powershell pour l'installation / le switch de la version de Node.js il faut s'assurer d'avoir cette
ligne dans son fichier de profil présent dans le profil de l'utilisateur.

```
// Pour ouvrir le fichier de profil
Invoke-Item $profile

// Si ça ne fonctionne pas alors pour créer le fichier de profil
if (-not (Test-Path $profile)) { New-Item $profile -Force }

// Ligne de code à renseigner dans le fichier
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

Veillez à fermer la console pour que la configuration soit prise en compte.

2. Création du projet Expo Go

```
npx create-expo-app@latest <NOM_PROJET>

// Une fois l'installation d'Expo Go terminé
cd <NOM_PROJET>

// Démarrage d'Expo Go
npm run start
```

3. Démarrage d'Expo Go sur un périphérique extérieur

Pour visualiser son développement sur mobile ou sur tablette nous devons installer le package **expo-dev-client** en lançant
la commande `npm install expo-dev-client`.

4. Sinon à l'aide d'**Android Studio** il est possible de se créer un périphérique d'essai, mais il faut que la
virtualisation soit activé sur votre pc.

## Intégration du module pour lire les vidéos en local

Pour accéder aux fichiers en local de l'application nous allons avoir besoin de la librairie `expo-av` que nous installons
avec `npx expo install expo-av`.

Ainsi que `expo-file-system` pour accéder aux fichiers en local du périphérique sur lequel est exécuté l'app.

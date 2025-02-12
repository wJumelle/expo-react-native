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

2.

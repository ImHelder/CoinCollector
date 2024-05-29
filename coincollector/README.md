# CoinCollector

CoinCollector est une application mobile développée avec React Native qui permet aux utilisateurs de gérer et de suivre leur collection de pièces. L'application offre des fonctionnalités telles que l'ajout de nouvelles pièces, l'affichage de la liste des pièces, la visualisation de l'évolution de la valeur totale des pièces au fil du temps, ainsi que la possibilité d'initialiser et de réinitialiser la base de données.

## Fonctionnalités

- Ajout de nouvelles pièces avec des détails tels que l'année, la rareté, la quantité, la valeur, la description et une photo.
- Affichage de la liste des pièces avec leurs détails complets.
- Visualisation de l'évolution de la valeur totale des pièces au fil du temps grâce à un graphique interactif.
- Initialisation et réinitialisation de la base de données.
- Navigation par onglets pour un accès facile aux différentes fonctionnalités.

## Captures d'écran

[Insérez ici des captures d'écran de votre application]

## Prérequis

Avant de pouvoir exécuter l'application CoinCollector localement, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js (version 12 ou supérieure)
- npm (généralement installé avec Node.js)
- Expo CLI (vous pouvez l'installer en exécutant `npm install -g expo-cli`)
- Un émulateur Android ou iOS, ou un appareil physique pour exécuter l'application

## Installation

1. Clonez ce dépôt sur votre machine locale :

```
git clone https://github.com/votre-nom-utilisateur/CoinCollector.git
```

2. Accédez au répertoire du projet :

```
cd CoinCollector
```

3. Installez les dépendances du projet :

```
npm install
```

4. Lancez l'application avec Expo :

```
expo start
```

5. Utilisez l'application Expo Go sur votre appareil physique ou l'émulateur pour scanner le code QR et exécuter l'application.

## Technologies utilisées

- React Native
- Expo
- react-native-chart-kit
- @react-native-picker/picker
- expo-image-picker
- react-native-safe-area-context
- react-native-screens

## Structure du projet

- `src/components/`: Contient les composants réutilisables de l'application.
- `src/screens/`: Contient les écrans principaux de l'application.
- `src/navigation/`: Contient la configuration de la navigation.
- `src/utils/`: Contient les fonctions utilitaires et les constantes.
- `src/data/`: Contient les données de l'application (par exemple, les pièces).

## Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à CoinCollector, veuillez suivre les étapes suivantes :

1. Fork ce dépôt.
2. Créez une nouvelle branche avec un nom descriptif : `git checkout -b ma-nouvelle-fonctionnalite`.
3. Effectuez vos modifications et commitez-les : `git commit -m 'Ajouter une nouvelle fonctionnalité'`.
4. Poussez vos modifications vers votre fork : `git push origin ma-nouvelle-fonctionnalite`.
5. Ouvrez une pull request dans ce dépôt.

## Licence

[Insérez ici la licence de votre projet]

## Contact

Si vous avez des questions, des suggestions ou des commentaires, n'hésitez pas à me contacter :

- Nom : [Votre nom]
- Email : [Votre adresse e-mail]
- GitHub : [Votre nom d'utilisateur GitHub]

N'hésitez pas à personnaliser ce README en fonction des spécificités de votre projet, à ajouter des sections supplémentaires si nécessaire et à inclure des captures d'écran pour illustrer votre application.
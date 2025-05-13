# TP React Hooks - Application de Blog

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useCallback, useMemo) ainsi que la création de Hooks personnalisés à travers une application de blog simple.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks-blog.git
cd tp-react-hooks-blog
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks-blog.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter l'affichage et la recherche de posts

- [ ] 1.1 Compléter le hook `usePosts` pour récupérer les posts depuis l'API dummyjson.com
- [ ] 1.2 Implémenter le composant `PostList` pour afficher les posts
- [ ] 1.3 Ajouter la fonctionnalité de recherche par titre ou contenu dans `PostSearch`
- [ ] 1.4 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_
```
✅ 1.1 Récupération des posts avec usePosts
J'ai créé un hook personnalisé usePosts dans src/hooks/usePosts.jsx qui utilise useState et useEffect pour récupérer les posts depuis l'API https://dummyjson.com/posts. Les données sont stockées dans un état local et mises à jour lors du chargement.

✅ 1.2 Affichage des posts avec PostList
Le composant PostList (dans src/components/PostList.jsx) reçoit les données des posts via props et les affiche sous forme de liste. Chaque post montre le titre, le corps du texte, les tags et le nombre de réactions.

✅ 1.3 Recherche avec PostSearch
Le composant PostSearch permet à l'utilisateur de rechercher des posts par titre ou contenu. Lorsqu'on tape dans l'input, un état de recherche est mis à jour et filtré dynamiquement sur les posts via le hook useEffect.
```
![Screenshot 2025-05-08 210829](https://github.com/user-attachments/assets/1de69a08-6556-4783-9d7b-f8039eb12f3b)

![Screenshot 2025-04-28 181630](https://github.com/user-attachments/assets/9c3ad289-abc9-47cb-ab13-9edc3ce83e43)

![Screenshot 2025-04-28 181405](https://github.com/user-attachments/assets/8c09ce2e-4c13-48c0-a219-8ec83805ab10)

### Exercice 2 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

- [ ] 2.1 Créer le hook `useDebounce` pour optimiser la recherche
- [ ] 2.2 Créer le hook `useLocalStorage` pour persister les préférences utilisateur
- [ ] 2.3 Utiliser ces hooks dans l'application
- [ ] 2.4 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_
```
✅ 2.1 Délais avec useDebounce
J’ai créé un hook personnalisé useDebounce dans src/hooks/useDebounce.jsx pour ralentir les mises à jour d’un état. Il est utilisé dans PostSearch pour éviter trop de recherches à chaque frappe.

✅ 2.2 Sauvegarde avec useLocalStorage
Le hook useLocalStorage (dans src/hooks/useLocalStorage.jsx) permet de garder des données même après rechargement de la page. Par exemple, il peut garder le thème ou une recherche précédente.

```
![Screenshot 2025-05-08 225436](https://github.com/user-attachments/assets/ebde5cf8-785e-4b6c-a3e6-d69053112a6f)

![Screenshot 2025-05-08 211046](https://github.com/user-attachments/assets/be02c3c4-7e6a-47db-8023-8e1fe752be10)
### Exercice 3 : Optimisation et Context
#### Objectif : Gérer le thème global et optimiser les rendus

- [ ] 3.1 Créer le `ThemeContext` pour gérer le thème clair/sombre
- [ ] 3.2 Implémenter le composant `ThemeToggle`
- [ ] 3.3 Utiliser `useCallback` et `useMemo` pour optimiser les performances
- [ ] 3.4 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_
```
✅3.1 –Création du ThemeContext pour gérer le thème clair/sombre:
J’ai créé un fichier src/context/ThemeContext.jsx qui utilise React.createContext() pour centraliser la gestion du thème.
Le provider ThemeProvider utilise un hook personnalisé useLocalStorage pour mémoriser le thème (light ou dark), même après un rechargement de la page. Cela permet d’avoir un thème persistant.

✅3.2 – Implémentation du composant ThemeToggle:
Dans src/components/ThemeToggle.jsx, j’ai créé un bouton qui permet de basculer entre le thème clair et sombre.
Il utilise le hook useTheme() fourni par le contexte pour accéder à theme et toggleTheme.

✅3.3 – Optimisation avec useCallback et useMemo:
Pour éviter des re-rendus inutiles, j’ai utilisé useCallback pour mémoriser la fonction toggleTheme, afin qu’elle ne soit pas recréée à chaque rendu.
```
![Screenshot 2025-05-13 140326](https://github.com/user-attachments/assets/85e7fb73-ec9e-426c-951a-81bc8db6830e)

![Screenshot 2025-05-13 140355](https://github.com/user-attachments/assets/eb49d996-39e6-4975-818d-fd7e3e77d6fe)

# after reloading the page  :
![Screenshot 2025-05-13 140355](https://github.com/user-attachments/assets/a7df7e42-498c-421f-8a82-b08d66ae1373)

### Exercice 4 : Fonctionnalités avancées
#### Objectif : Ajouter des fonctionnalités de chargement et détail

- [ ] 4.1 Implémenter le chargement infini des posts avec `useIntersectionObserver`
- [ ] 4.2 Créer le composant `PostDetails` pour afficher les détails d'un post
- [ ] 4.3 Ajouter la fonctionnalité de filtrage par tags
- [ ] 4.4 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_
```
✅4.1 – Implémenter le chargement infini des posts avec useIntersectionObserver:
J’ai créé un hook personnalisé useIntersectionObserver(ref, callback) qui détecte lorsqu’un élément devient visible à l’écran.

✅4.2 –J’ai conçu un composant réutilisable appelé PostDetails, qui affiche les informations détaillées d’un article lorsque l’utilisateur le sélectionne. Ce composant est rendu de manière conditionnelle à partir de PostList grâce à l’état selectedPost.

✅4.3 –J’ai intégré une fonctionnalité de filtrage par tag directement dans la section de recherche.
```
![Screenshot 2025-05-13 204336](https://github.com/user-attachments/assets/1107c831-39d1-4606-904c-bc9b91901bf3)

![Screenshot 2025-05-13 191649](https://github.com/user-attachments/assets/f45b4ba9-6027-4545-9e37-02cfa9030c86)

![Screenshot 2025-05-13 193128](https://github.com/user-attachments/assets/504582a4-a024-4642-ad76-b0b949e717d7)

![Screenshot 2025-05-13 204336](https://github.com/user-attachments/assets/ebd07af0-6a80-4201-bb14-fa888bd25b74)

![Screenshot 2025-05-13 210327](https://github.com/user-attachments/assets/a9533a4b-b58c-4306-a059-c87da149ffa8)

![Screenshot 2025-05-13 210231](https://github.com/user-attachments/assets/30a68d4d-81d5-486e-9a07-d8ab0a55f2b9)



## Structure détaillée du projet

```
📁 ./
├─ 📄 README.md
├─ 📄 package.json
├─ 📁 public/
│  └─ 📄 index.html
└─ 📁 src/
   ├─ 📄 App.js               # Composant principal de l'application
   ├─ 📄 App.css              # Styles CSS de l'application
   ├─ 📁 components/
   │  ├─ 📄 PostList.js       # Liste des posts
   │  ├─ 📄 PostSearch.js     # Barre de recherche
   │  ├─ 📄 PostDetails.js    # Détails d'un post
   │  ├─ 📄 ThemeToggle.js    # Bouton pour changer de thème
   │  └─ 📄 LoadingSpinner.js # Indicateur de chargement
   ├─ 📁 hooks/
   │  ├─ 📄 usePosts.js       # Hook pour gérer les posts
   │  ├─ 📄 useDebounce.js    # Hook pour débouncer les valeurs
   │  ├─ 📄 useLocalStorage.js # Hook pour gérer le localStorage
   │  └─ 📄 useIntersectionObserver.js # Hook pour le chargement infini
   ├─ 📁 context/
   │  └─ 📄 ThemeContext.js   # Contexte pour le thème
   ├─ 📄 index.css
   └─ 📄 index.js
```

## Ressources utiles

- Documentation de l'API: [https://dummyjson.com/docs/posts](https://dummyjson.com/docs/posts)
- Documentation React Hooks: [https://fr.reactjs.org/docs/hooks-intro.html](https://fr.reactjs.org/docs/hooks-intro.html)
- Guide sur les hooks personnalisés: [https://fr.reactjs.org/docs/hooks-custom.html](https://fr.reactjs.org/docs/hooks-custom.html)

## Rendu

- Ajoutez l'URL de votre dépôt Github dans **Classroom** et envoyez la réponse dès le démarrage de votre projet.
- Les push doivent se faire au fur et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran.
- Chaque exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.

---

# Documentation de l'API dummyjson - Posts

Pour réaliser ce TP, vous utiliserez l'API dummyjson.com qui fournit des données fictives de posts de blog. Voici les points d'entrée que vous utiliserez :

## Points d'entrée API

### Récupérer tous les posts
```
GET https://dummyjson.com/posts
```

Paramètres de requête optionnels :
- `limit` : nombre de posts à récupérer (défaut: 30)
- `skip` : nombre de posts à sauter (pour la pagination)

Exemple : `https://dummyjson.com/posts?limit=10&skip=10`

### Récupérer un post spécifique
```
GET https://dummyjson.com/posts/{id}
```

Exemple : `https://dummyjson.com/posts/1`

### Rechercher des posts
```
GET https://dummyjson.com/posts/search?q={terme}
```

Exemple : `https://dummyjson.com/posts/search?q=love`

### Récupérer les posts par tag
```
GET https://dummyjson.com/posts/tag/{tag}
```

Exemple : `https://dummyjson.com/posts/tag/history`

## Format de réponse

### Liste de posts

```json
{
  "posts": [
    {
      "id": 1,
      "title": "His mother had always taught him",
      "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or whose decisions had led them astray.",
      "userId": 9,
      "tags": ["history", "american", "crime"],
      "reactions": 2
    },
    ...
  ],
  "total": 150,
  "skip": 0,
  "limit": 30
}
```

### Post unique

```json
{
  "id": 1,
  "title": "His mother had always taught him",
  "body": "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or whose decisions had led them astray.",
  "userId": 9,
  "tags": ["history", "american", "crime"],
  "reactions": 2
}
```

## Conseils d'utilisation

- Pour la pagination, utilisez les paramètres `limit` et `skip`
- Pour calculer le nombre total de pages, utilisez la formule : `Math.ceil(total / limit)`
- Pour implémenter le défilement infini, chargez plus de posts quand l'utilisateur atteint le bas de la page
- Pour la recherche, utilisez le point d'entrée `/posts/search` avec le paramètre `q`
- Vous pouvez combiner les paramètres de recherche avec les paramètres de pagination

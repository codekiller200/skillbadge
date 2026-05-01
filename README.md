# SkillBadge

Prototype SkillBadge pour le MIABE Hackathon 2026.

Le projet présente trois espaces :

- **Formateur** : création, prévisualisation et émission d'un badge.
- **Apprenant** : portfolio public avec badges et QR code.
- **Recruteur** : vérification d'un candidat et de ses badges.

## Stack

- React
- Vite
- JavaScript
- Styles inline dans le prototype fourni, avec un petit fichier global `src/styles.css`

## Lancer le projet

```bash
npm install
npm run dev
```

## Générer la version production

```bash
npm run build
```

## Structure

```text
skillbadge-code-source/
├── index.html
├── package.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── README.md
```

## Note

Le fichier `src/App.jsx` provient du fichier source fourni sous forme de `.txt`. Il a été intégré tel quel pour préserver le comportement du prototype.

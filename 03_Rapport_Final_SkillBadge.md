# RAPPORT FINAL - PROJET SKILLBADGE (BURKINA FASO)
## MIABE HACKATHON 2026 - PHASE 3

**Équipe :** BF-02
**Catégorie :** D04 — Éducation & Certification blockchain

---

## 1. INTRODUCTION ET PROBLÉMATIQUE

Au Burkina Faso, le numérique offre une voie de sortie de la précarité pour des milliers de jeunes. Chaque année, plus de **15 000 jeunes Burkinabè se forment de manière autodidacte** (YouTube, bootcamps, communautés). Ces talents développent des compétences réelles (React, Flutter, Python, Design UI/UX), mais se heurtent à un mur infranchissable sur le marché de l'emploi : l'absence de diplôme classique.

**La conséquence est double :**
- **Pour les jeunes :** Une précarité maintenue, car leurs compétences ne sont pas reconnues. Moins de 5% obtiennent des certifications officielles.
- **Pour les entreprises :** 70% des recruteurs IT au Burkina Faso déclarent peiner à évaluer les autodidactes, freinant ainsi le recrutement local et favorisant l'externalisation.

## 2. LA SOLUTION : SKILLBADGE

**SkillBadge** est un écosystème décentralisé de certification des compétences numériques. Il ne remplace pas le diplôme, il certifie la compétence brute.

Le produit s'articule autour de 3 acteurs clés :
1. **Les Émetteurs (Formateurs/Bootcamps) :** Évaluent un talent et émettent un badge on-chain (NFT ERC-721 non-transférable).
2. **Les Apprenants (Talents) :** Construisent un portfolio infalsifiable basé sur leurs compétences réelles et leur progression (Débutant, Intermédiaire, Expert).
3. **Les Recruteurs :** Scannent un QR code ou entrent un wallet pour vérifier instantanément l'authenticité des compétences.

### Pourquoi la Blockchain ?
L'usage de la blockchain (Polygon) garantit l'immutabilité et l'infalsifiabilité. Le CV traditionnel peut être embelli, un diplôme papier falsifié, mais un Smart Contract certifie de manière irréfutable l'identité de l'émetteur et du récipiendaire.

## 3. ARCHITECTURE TECHNIQUE DU MVP

Pour la Finale, notre MVP a été architecturé pour être robuste, fluide et scalable :
- **Frontend :** React 19 + Vite, optimisé par `framer-motion` pour une expérience utilisateur premium (glassmorphism, animations fluides).
- **Interface Utilisateur :** Design adaptatif 100% responsive, avec matrice de progression visuelle par domaine de compétence.
- **Web3 / Blockchain :** 
  - Réseau : **Polygon Mainnet** (choisi pour ses frais quasi nuls, ~0.002 MATIC par badge).
  - Standard : **ERC-721 (Soulbound Tokens)** — les badges ne peuvent être ni vendus ni transférés.
  - Stockage : Métadonnées hébergées sur IPFS garantissant la pérennité des données.

## 4. IMPACT SOCIAL ET ÉCONOMIQUE

Le projet adresse directement les Objectifs de Développement Durable (ODD 4, ODD 8, ODD 9).

**Chiffres de l'impact visé (Année 1) :**
- **5 000 autodidactes** certifiés dans les 12 premiers mois.
- **Réduction du temps de recrutement** pour les entreprises de 40% grâce à la vérification instantanée.
- **Hausse de 25% du taux d'employabilité** des jeunes talents burkinabè en freelance ou CDI.

En offrant une preuve de compétence vérifiable, SkillBadge transforme le marché du travail informel en un vivier de talents visibles à l'échelle internationale.

## 5. CONCLUSION ET VISION

SkillBadge n'est pas qu'un outil technique, c'est un ascenseur social. En redonnant de la valeur à la compétence plutôt qu'au parcours académique strict, nous créons un marché du talent juste et transparent au Burkina Faso, avec une ambition d'expansion rapide vers les autres pays de l'UEMOA dès 2027.

# Hybrid ESG Multi-Token Documentation

Le contrat HybridESGMultiToken utilise la norme ERC1155 pour gérer des lots de tokens avec des critères ESG (Environnemental, Social, Gouvernance) associés à chaque lot.

## Caractéristiques principales:
- **ERC1155 Standard**: Permet de gérer des tokens fongibles, semi-fongibles, et non-fongibles.
- **Critères ESG intégrés**: Attribue des scores ESG à des lots de tokens individuels.
- **Modularité et Flexibilité**: Conçu pour supporter plusieurs types et lots de tokens.

## Utilisation
- Déployez le contrat via `deployHybridESGMultiToken.js`.
- Utilisez `createBatch` pour créer un lot de tokens.
- Attribuez des scores ESG avec `setBatchESGCriteria`.
- Vérifiez les scores ESG avec `getBatchESGCriteria`. 
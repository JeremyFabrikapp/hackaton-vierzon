# Hybrid ESG Token Documentation

Le contrat HybridESGToken combine les fonctionnalités d'un token ERC20 avec une évaluation ESG personnalisée pour chaque détenteur de token. Les critères ESG impactent la réputation et la gestion des ressources des adresses dans l'écosystème.

## Caractéristiques principales:
- **ERC20 Standard**: Support complet des opérations ERC20.
- **Critères ESG intégrés**: Affecte une note ESG à chaque adresse.
- **Contrôle basé sur l'adresse**: Seul le propriétaire peut mettre à jour les critères ESG.

## Utilisation
- Déployez le contrat via `deployHybridESGToken.js`.
- Utilisez `setESGCriteria` pour attribuer ou modifier des scores ESG.
- Vérifiez les scores ESG avec `getESGCriteria`.
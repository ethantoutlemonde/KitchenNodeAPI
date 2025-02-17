# Démarrage du Projet avec Docker

Ce projet utilise **Docker** et **docker-compose** pour la configuration et l'exécution des services. Suivez les instructions ci-dessous pour lancer l'application et consulter la documentation.

---

## **1. Prérequis**

Avant de commencer, assurez-vous que les outils suivants sont installés sur votre machine :
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Vous pouvez vérifier leur installation avec les commandes suivantes :
```bash
docker --version
docker-compose --version
```

---

## **2. Lancer l'Application**

### Étapes :

1. **Ouvrez un terminal et placez-vous à la racine du projet** :
   ```bash
   cd /chemin/vers/le/projet
   ```

2. **Exécutez la commande suivante** pour lancer les conteneurs :
   ```bash
   docker-compose up -d
   ```
   L'option `-d` exécute les conteneurs en arrière-plan.

3. **Vérifiez que les services sont correctement démarrés** avec :
   ```bash
   docker ps
   ```
   Cette commande affiche les conteneurs actifs.

---

## **3. Structure du Projet**

- **/docker-compose.yml** : Fichier de configuration des conteneurs.
- **/Postman** : Ce dossier contient :
    - Les **requêtes** prêtes à l'emploi (format `.json`) que vous pouvez importer dans Postman.
    - La **documentation** des endpoints détaillant l'utilisation de chaque service.

---

## **4. Importer les Requêtes Postman**

1. **Ouvrez [Postman](https://www.postman.com/downloads/)**.
2. **Cliquez sur le bouton "Importer"**.
3. **Sélectionnez les fichiers JSON présents dans le dossier `/Postman`**.
4. Une fois importés, vous pouvez exécuter les requêtes directement dans Postman pour tester les différents endpoints.

---

## **5. Arrêter les Services**

Pour arrêter les conteneurs, exécutez la commande suivante :
```bash
docker-compose down
```
Cela éteint tous les services en cours d'exécution.

---

## **6. Ressources Supplémentaires**

- [Documentation officielle de Docker](https://docs.docker.com/)
- [Documentation officielle de Postman](https://learning.postman.com/)

Vous êtes maintenant prêt à déployer et tester l'application 🎉 !

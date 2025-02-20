CREATE TABLE USERS(
   Id_USERS COUNTER,
   Mail VARCHAR(255),
   Password VARCHAR(255),
   Nom VARCHAR(50) NOT NULL,
   Prenom VARCHAR(50) NOT NULL,
   Tel VARCHAR(15),
   Role ENUM('Bigboss', 'Admin', 'Customer', 'Preparateur', 'Livreur') NOT NULL,
   PRIMARY KEY(Id_USERS)
);

CREATE TABLE MAGASIN(
   Id_MAGASIN COUNTER,
   Nom VARCHAR(50) NOT NULL,
   Adresse VARCHAR(50),
   Ville VARCHAR(255),
   CodePostal VARCHAR(10),
   Tel VARCHAR(20),
   PRIMARY KEY(Id_MAGASIN)
);

CREATE TABLE PRODUITS(
   Id_PRODUITS COUNTER,
   Nom VARCHAR(50) NOT NULL,
   Description TEXT NOT NULL,
   Prix DECIMAL(10,2) NOT NULL,
   Image VARCHAR(255) NOT NULL,
   Disponible LOGICAL NOT NULL,
   PRIMARY KEY(Id_PRODUITS)
);

CREATE TABLE MENU(
   Id_MENU COUNTER,
   Nom VARCHAR(50) NOT NULL,
   Description TEXT NOT NULL,
   Prix DECIMAL(10,2) NOT NULL,
   Disponible LOGICAL NOT NULL,
   Image VARCHAR(255) NOT NULL,
   Id_PRODUITS INT,
   PRIMARY KEY(Id_MENU),
   FOREIGN KEY(Id_PRODUITS) REFERENCES PRODUITS(Id_PRODUITS)
);

CREATE TABLE PROMOTIONS(
   Id_PROMOTIONS COUNTER,
   Nom VARCHAR(50) NOT NULL,
   Decription TEXT NOT NULL,
   OffrePourcent DECIMAL(5,2),
   OffrePrix INT,
   Debut DATETIME NOT NULL,
   Fin DATETIME NOT NULL,
   PRIMARY KEY(Id_PROMOTIONS)
);

CREATE TABLE PANIER(
   Id_PANIER COUNTER,
   Id_USERS INT NOT NULL,
   PRIMARY KEY(Id_PANIER),
   UNIQUE(Id_USERS),
   FOREIGN KEY(Id_USERS) REFERENCES USERS(Id_USERS)
);

CREATE TABLE COMMANDES(
   Id_COMMANDES COUNTER,
   Numero INT NOT NULL,
   Adresse TEXT NOT NULL,
   Status ENUM('Paye', 'en cours de preparation', 'en cours de livaison', 'livre') NOT NULL,
   Id_PANIER INT NOT NULL,
   PRIMARY KEY(Id_COMMANDES),
   UNIQUE(Id_PANIER),
   FOREIGN KEY(Id_PANIER) REFERENCES PANIER(Id_PANIER)
);

CREATE TABLE Admin(
   Id_USERS INT,
   Id_MAGASIN INT,
   PRIMARY KEY(Id_USERS, Id_MAGASIN),
   FOREIGN KEY(Id_USERS) REFERENCES USERS(Id_USERS),
   FOREIGN KEY(Id_MAGASIN) REFERENCES MAGASIN(Id_MAGASIN)
);

CREATE TABLE POSSEDE(
   Id_MAGASIN INT,
   Id_PRODUITS INT,
   PRIMARY KEY(Id_MAGASIN, Id_PRODUITS),
   FOREIGN KEY(Id_MAGASIN) REFERENCES MAGASIN(Id_MAGASIN),
   FOREIGN KEY(Id_PRODUITS) REFERENCES PRODUITS(Id_PRODUITS)
);

CREATE TABLE PRESENT(
   Id_MAGASIN INT,
   Id_PROMOTIONS INT,
   PRIMARY KEY(Id_MAGASIN, Id_PROMOTIONS),
   FOREIGN KEY(Id_MAGASIN) REFERENCES MAGASIN(Id_MAGASIN),
   FOREIGN KEY(Id_PROMOTIONS) REFERENCES PROMOTIONS(Id_PROMOTIONS)
);

CREATE TABLE Asso_12(
   Id_MENU INT,
   Id_PANIER INT,
   PRIMARY KEY(Id_MENU, Id_PANIER),
   FOREIGN KEY(Id_MENU) REFERENCES MENU(Id_MENU),
   FOREIGN KEY(Id_PANIER) REFERENCES PANIER(Id_PANIER)
);

CREATE TABLE Asso_13(
   Id_PRODUITS INT,
   Id_PANIER INT,
   PRIMARY KEY(Id_PRODUITS, Id_PANIER),
   FOREIGN KEY(Id_PRODUITS) REFERENCES PRODUITS(Id_PRODUITS),
   FOREIGN KEY(Id_PANIER) REFERENCES PANIER(Id_PANIER)
);

CREATE TABLE CHAT(
   Id_USERS INT,
   Id_USERS_1 INT,
   Message TEXT,
   PRIMARY KEY(Id_USERS, Id_USERS_1),
   FOREIGN KEY(Id_USERS) REFERENCES USERS(Id_USERS),
   FOREIGN KEY(Id_USERS_1) REFERENCES USERS(Id_USERS)
);
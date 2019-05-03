-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 03 Mai 2019 à 11:38
-- Version du serveur :  5.7.25-0ubuntu0.16.04.2
-- Version de PHP :  7.0.33-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `tchatbox`
--

-- --------------------------------------------------------

--
-- Structure de la table `Contenu`
--

CREATE TABLE `Contenu` (
  `Id` smallint(5) NOT NULL,
  `Dialogue` varchar(1000) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Id_Auteur` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `Salle`
--

CREATE TABLE `Salle` (
  `Id` smallint(5) NOT NULL,
  `NomSalle` varchar(20) NOT NULL,
  `Id_CreateurSalle` smallint(5) NOT NULL,
  `Id_Contenu` smallint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `Id` smallint(5) NOT NULL,
  `Pseudo` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Contenu`
--
ALTER TABLE `Contenu`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Auteur` (`Id_Auteur`);

--
-- Index pour la table `Salle`
--
ALTER TABLE `Salle`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_CreateurSalle` (`Id_CreateurSalle`),
  ADD KEY `Id_Contenu` (`Id_Contenu`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Contenu`
--
ALTER TABLE `Contenu`
  MODIFY `Id` smallint(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `Salle`
--
ALTER TABLE `Salle`
  MODIFY `Id` smallint(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `Id` smallint(5) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `Contenu`
--
ALTER TABLE `Contenu`
  ADD CONSTRAINT `Contenu_ibfk_1` FOREIGN KEY (`Id_Auteur`) REFERENCES `User` (`Id`);

--
-- Contraintes pour la table `Salle`
--
ALTER TABLE `Salle`
  ADD CONSTRAINT `Salle_ibfk_1` FOREIGN KEY (`Id_CreateurSalle`) REFERENCES `User` (`Id`),
  ADD CONSTRAINT `Salle_ibfk_2` FOREIGN KEY (`Id_Contenu`) REFERENCES `Contenu` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

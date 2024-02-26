-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS Nord_Pool_Market_Scrapp;
USE Nord_Pool_Market_Scrapp;

-- Crear la tabla Areas si no existe
CREATE TABLE IF NOT EXISTS Areas (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    AreaUUID CHAR(36) UNIQUE NOT NULL,
    AreaName VARCHAR(255) NOT NULL
);

-- Crear la tabla Countries si no existe
CREATE TABLE IF NOT EXISTS Countries (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CountryUUID CHAR(36) UNIQUE NOT NULL,
    CountryCode CHAR(2) NOT NULL UNIQUE,
    CountryName VARCHAR(255) NOT NULL,
    AreaID INT NOT NULL,
    FOREIGN KEY (AreaID) REFERENCES Areas(ID)
);

-- Crear la tabla MarketData si no existe
CREATE TABLE IF NOT EXISTS MarketData (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    DataUUID CHAR(36) UNIQUE NOT NULL,
    CountryID INT NOT NULL,
    Period DATE NOT NULL,
    Market VARCHAR(255) NOT NULL,
    MaxPrice DECIMAL(10, 2) NOT NULL,
    MinPrice DECIMAL(10, 2) NOT NULL,
    MediumPrice DECIMAL(10, 2) NOT NULL,
    Open DECIMAL(10, 2) NOT NULL,
    Close DECIMAL(10, 2) NOT NULL,
    VolumeMW DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CountryID) REFERENCES Countries(ID)
);

INSERT INTO Areas (AreaUUID, AreaName) VALUES
('db5d2956-d48b-11ee-986c-842afd10ec8b', 'BALTIC'),
('db5d298a-d48b-11ee-986c-842afd10ec8b', 'UK'),
('db5d2996-d48b-11ee-986c-842afd10ec8b', 'CWE');

-- Para el área 'BALTIC'
INSERT INTO Countries (CountryUUID, CountryCode, CountryName, AreaID) VALUES
('db5d299e-d48b-11ee-986c-842afd10ec8b', 'EE', 'Estonia', (SELECT ID FROM Areas WHERE AreaName = 'BALTIC')),
('db5d29a6-d48b-11ee-986c-842afd10ec8b', 'LT', 'Lituania', (SELECT ID FROM Areas WHERE AreaName = 'BALTIC')),
('db5d29ad-d48b-11ee-986c-842afd10ec8b', 'LV', 'Latvia', (SELECT ID FROM Areas WHERE AreaName = 'BALTIC'));

-- Para el área 'UK'
INSERT INTO Countries (CountryUUID, CountryCode, CountryName, AreaID) VALUES
('db5d29b6-d48b-11ee-986c-842afd10ec8b', 'UK', 'United Kingdom', (SELECT ID FROM Areas WHERE AreaName = 'UK'));

-- Para el área 'CWE'
INSERT INTO Countries (CountryUUID, CountryCode, CountryName, AreaID) VALUES
('db5d29be-d48b-11ee-986c-842afd10ec8b', 'FR', 'France', (SELECT ID FROM Areas WHERE AreaName = 'CWE')),
('db5d29c6-d48b-11ee-986c-842afd10ec8b', 'AT', 'Austria', (SELECT ID FROM Areas WHERE AreaName = 'CWE')),
('88d4185d-d48c-11ee-986c-842afd10ec8b', 'BE', 'Belgium', (SELECT ID FROM Areas WHERE AreaName = 'CWE')),
('88d4187d-d48c-11ee-986c-842afd10ec8b', 'NL', 'Netherland', (SELECT ID FROM Areas WHERE AreaName = 'CWE')),
('88d41883-d48c-11ee-986c-842afd10ec8b', 'PL', 'Poland', (SELECT ID FROM Areas WHERE AreaName = 'CWE'));
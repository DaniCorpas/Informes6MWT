TFG DANIEL CORPAS GARCÍA

    Prerequisits:

        - Node.js (v14 o superior)
        - npm

    Instal·lació

        1. Clona o descomprimeix el projecte.
        2. Situa't a la carpeta arrel del projecte:
            cd <ruta-del-projecte>

        3. Instal·la les dependències:
            npm install

        4. Configuració de dades. Els fitxers JSON es troben a public/data/exempleX.json.
        Per defecte es carrega exemple1.json.

        5. Per seleccionar un altre fitxer, defineix la variable d'entorn DATA_INDEX abans d'arrencar:
            DATA_INDEX=2 npm run dev
        on 2 pot ser 1, 2, 3, etc.

    Execució

        1. Arrenca l'aplicació en mode desenvolupament:
            npm run dev

        2. Obre al navegador:
            http://localhost:3000 o http://<Ip_del_host>:3000

        3. Variables d'entorn
            DATA_INDEX: índex del fitxer JSON a carregar (valor per defecte: 1).
            PORT: port en què arrencarà el servidor (valor per defecte: 3000).

    Resolució de problemes

        1. Si hi ha un error en carregar el JSON:
        2. Assegura't que DATA_INDEX coincideix amb un fitxer existent a public/data.
        3. Revisa que els noms dels fitxers (exemple1.json, etc.) estiguin escrits correctament.
        4. Per resoldre errors de dependències, torna a executar:
            npm install

AUTOR

    Daniel Corpas Garcia
    Contacte: daniel.corpas.garcia@estudiantat.upc.edu
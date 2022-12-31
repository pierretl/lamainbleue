[![Netlify Status](https://api.netlify.com/api/v1/badges/18cecec5-3b70-442a-b28a-f300e48c8753/deploy-status)](https://app.netlify.com/sites/lamainbleue/deploys)

# La main bleue

Massage, yoga et art à Genève : https://www.lamainbleue.ch/

Le site est écrit en Nunjucks à l'aide [Eleventy](https://github.com/11ty/eleventy) et [Netlify](https://app.netlify.com/).

## Installation

```bash
# Cloné le dépot
git clone https://github.com/pierretl/lamainbleue.git

# On se place dans le répertoire
cd lamainbleue/

# Installer les dépendances du projet
npm install -y
```

## Build & Run

|Commande|Effet|
|--------|-----|
|`npx eleventy`|Build|
|`npx eleventy --serve`|Run + lancement serveur local|
|`npx netlify-cms-proxy-server`|Run CMS à l'adresse `<yoursiteaddress.com>/admin/`|
<h1 align="center">
🌤️ Weather Extension 🌤️
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/alfredots/weather-extension">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/alfredots/weather-extension">

  <a href="https://github.com/alfredots/weather-extension/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alfredots/weather-extension"/>
  </a>

  <a href="https://github.com/alfredots/FindHouses/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/alfredots/weather-extension"/>
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"/>
</p>

<br>

## 💻 Projeto

---

Esse projeto foi desenvolvido com o objetivo de aprender a utilização do uso de Extensões Chrome com seus recursos (LocalStorage, Context Menu, Alarms), além disso, utilização de arquitetura limpa em projetos frontend. A aplicação apresentação previsão do tempo como extensão através de badge, popup e elemento flutuante.

## 💻 Demonstração

### Popup

---

![Popup](./docs/doc-1.png)

### Mudança de temperatura (Celsius - Fahrenheit)

---

![Temperatura](./docs/doc-2.png)

### Tela de Opções

---

![Opcoes](./docs/doc-3.png)

### Adição de cidade

---

![AddCidade](./docs/doc-4.png)

### Elemento Flutuante (Content Script)

---

![Elemento](./docs/doc-5.png)

## ❗ Requisitos

---

- Você precisa instalar [Node.js](https://nodejs.org/en/download/) na versão 18 em diante.

## 🛠️ Tecnologias Utilizadas

---

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Vite](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material UI](https://chakra-ui.com/)
- [OpenWeather API](https://openweathermap.org/)

\* Para mais detalhes, veja o **[Package.json](./package.json)**

## 🎓 Aprendizados

---

- Vite
- React
- Material UI
- Shadow Dom
- Chrome Extension API
- Clean Architecture

## ⚡ Instalação

---

### Instalação Manual

Clone este repositório:

```bash
git clone
https://github.com/alfredots/weather-extension.git
cd weather-extension
```

Instale as dependências:

```bash
npm install
```

Compile o projeto:

```bash
npm run build
```

No Chrome, acesse `chrome://extensions/`.

Ative o "Modo do desenvolvedor" no canto superior direito.

Clique em "Carregar sem compactação" e selecione a pasta `build` gerada.

⚙ Uso

Depois de instalada, a extensão exibirá a previsão do tempo na interface do navegador. Certifique-se de permitir as permissões necessárias para acessar a localização.

## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

Feito com ❤️ por Alfredo Tito <img src="https://raw.githubusercontent.com/Douglasproglima/douglasproglima/master/gifs/Hi.gif" width="30px"></h2> [Entre em contato!](https://www.linkedin.com/in/alfredo-tito-837429ba/)

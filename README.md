[pt-BR]
# Node-RMTP-Stream
O Node-RMTP-Stream é uma biblioteca para NodeJS que oferece uma maneira simples de transmitir vídeos para servidores RMTP com NodeJS.

### Necessário: FFMPEG

## Instalação
```bash
npm install node-rmtp-stream
yarn install node-rmtp-stream
pnpm install node-rmtp-stream
```

## Uso
Para começar a usar a biblioteca, importe o `StreamBuilder` e crie uma nova instância fornecendo o caminho do vídeo que você deseja transmitir.
```js
const { StreamBuilder } = require('node-rmtp-stream')
const stream = new StreamBuilder('./video.mp4')
.streamLoop()
.quality('high')
.onStart(() => {
    //Função que executará ao iniciar a stream.
})
.stream('RMTP_KEY')
```

## Métodos
`.streamLoop()`
Este método define o Loop da transmissão, fazendo com que o vídeo se repita continuamente.

`.quality(level)`
Define a qualidade da transmissão. Substitua `level` por um dos seguintes valores: 'low', 'medium', 'high' ou 'best'

`.onStart(function)`
Função que o Node executará quando a transmissão iniciar.

`.onEnd(function)`
Função que o Node executará quando a transmissão terminar.

**[en-US]**


# Node-RMTP-Stream

Node-RMTP-Stream is a Node.js library that provides a simple way to stream videos to RMTP servers with NodeJS.

### Requirement: FFMPEG

## Installation
```bash
npm install node-rmtp-stream
yarn install node-rmtp-stream
pnpm install node-rmtp-stream
```

## Usage
To start using the library, import `StreamBuilder` and create a new instance by providing the path of the video you want to stream.

```javascript
const { StreamBuilder } = require('node-rmtp-stream');
const stream = new StreamBuilder('./video.mp4')
  .streamLoop()
  .quality('high')
  .onStart(() => {
    // Function to execute when the stream starts.
  })
  .stream('RMTP_KEY');
```

## Methods
`.streamLoop()`
This method sets the loop for the stream, causing the video to repeat continuously.

`.quality(level)`
Sets the quality of the stream. Replace `level` with one of the following values: 'low', 'medium', 'high', or 'best'.

`.onStart(function)`
Function that Node will execute when the stream starts.

`.onEnd(function)`
Function that Node will execute when the stream ends.

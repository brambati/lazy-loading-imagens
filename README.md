# Lazy Loading de Imagens: 3 técnicas

Código do vídeo **"Lazy Loading de Imagens"** do canal da [Digital Lift](https://digitallift.com.br).

Uma galeria com as três técnicas do vídeo, do básico ao avançado:

1. **`loading="lazy"`**: nativo, uma palavra, funciona em cerca de 97% dos browsers.
2. **LQIP + IntersectionObserver**: uma miniatura de 20 × 15 px em base64 aparece borrada na hora e faz crossfade para a imagem real quando ela termina de baixar.
3. **`srcset` + `sizes`**: o browser escolhe a versão certa da imagem hero para cada tela.

## Como rodar

HTML, CSS e JavaScript puros. Sirva a pasta com qualquer servidor estático:

```bash
npx serve .
```

Abra o DevTools → Network → filtro **Img** e role a página: as imagens só aparecem na lista quando chegam perto da tela.

## Regras que valem ouro

- A imagem **hero** nunca leva `loading="lazy"`: ela é o LCP. Use `fetchpriority="high"`.
- Toda `<img>` leva `width` e `height` (ou o container tem `aspect-ratio`) para não gerar CLS.
- O browser multiplica o valor de `sizes` pelo DPR da tela. Num celular com DPR 3, uma imagem exibida com 390 px pode pedir a versão de 1200w, e isso é o comportamento certo.

## Gerar o LQIP das suas imagens

Com Node e [sharp](https://sharp.pixelplumbing.com):

```js
import sharp from 'sharp';

const buf = await sharp('foto.jpg').resize(20, 15).webp({ quality: 40 }).toBuffer();
console.log(`data:image/webp;base64,${buf.toString('base64')}`);
```

## Arquivos

- `index.html`: hero com `srcset`/`sizes`, galeria com `loading="lazy"` e galeria com LQIP
- `style.css`: grid da galeria, blur do placeholder e crossfade
- `lazy.js`: IntersectionObserver, `new Image()` e `onload`
- `img/`: fotos em WebP e as três versões da hero (480, 800 e 1200 px)

function pontoEstaDentroDoPoligono(ponto, poligono) {
  let intersecoes = 0;
  let x = ponto[0];
  let y = ponto[1];
  const n = poligono.length;

  for (let i = 0; i < n - 1; i++) {
    let aresta = {
      ponto1: {
        x: poligono[i][0],
        y: poligono[i][1],
      },
      ponto2: {
        x: poligono[i + 1][0],
        y: poligono[i + 1][1],
      },
    };
    x1 = aresta.ponto1.x;
    x2 = aresta.ponto2.x;
    y1 = aresta.ponto1.y;
    y2 = aresta.ponto2.y;

    if (y < y1 != y < y2 && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) {
      intersecoes++;
    }
  }
  return intersecoes % 2 == 1;
}

function calculaPontoCentralDoQuadrilatero(pontos) {
  const xCentral =
    (pontos[0][0] + pontos[1][0] + pontos[2][0] + pontos[3][0]) / 4;
  const yCentral =
    (pontos[0][1] + pontos[1][1] + pontos[2][1] + pontos[3][1]) / 4;
  return [xCentral, yCentral];
}

function montaArestas(pontos) {
  const arestas = [];
  for (let i = 0; i < pontos.length; i++) {
    indexPolFechado = (i + 1) % pontos.length;
    arestas.push({
      ponto1: pontos[i],
      ponto2: pontos[indexPolFechado],
    });
  }
  return arestas;
}

function distanciaEntreArestas(aresta1, aresta2) {
  const { ponto1, ponto2 } = aresta1;
  const { ponto1: ponto3, ponto2: ponto4 } = aresta2;
  const estaVertical = ponto1[0] === ponto2[0];
  const distancia = estaVertical
    ? ponto3[0] - ponto1[0]
    : ponto3[1] - ponto1[1];
  return Math.abs(distancia);
}

function arestasTemProjecao(aresta1, aresta2) {
  const { ponto1, ponto2 } = aresta1;
  const { ponto1: ponto3, ponto2: ponto4 } = aresta2;
  const estaVertical = ponto1[0] === ponto2[0];
  const coord1 = estaVertical ? ponto1[1] : ponto1[0];
  const coord2 = estaVertical ? ponto2[1] : ponto2[0];
  const coord3 = estaVertical ? ponto3[1] : ponto3[0];
  const coord4 = estaVertical ? ponto4[1] : ponto4[0];

  return (coord1 <= coord4 && coord2 > coord4) ||
    (coord1 > coord4 && coord1 < coord3) ||
    (coord1 >= coord4 && coord2 < coord4) ||
    (coord1 < coord4 && coord1 > coord3)
    ? true
    : false;
}

function calculaMenorDistancia(pontos) {
  const arestas = montaArestas(pontos);
  let menorDistancia = Infinity;
  let aresta1 = [];
  let aresta2 = [];
  for (let i = 0; i <= arestas.length; i++) {
    for (let j = i + 2; j < arestas.length; j = j + 2) {
      const temProjecao = arestasTemProjecao(arestas[i], arestas[j]);
      if (temProjecao) {
        const pontoCentral = calculaPontoCentralDoQuadrilatero([
          arestas[i].ponto1,
          arestas[i].ponto2,
          arestas[j].ponto1,
          arestas[j].ponto2,
        ]);

        if (pontoEstaDentroDoPoligono(pontoCentral, pontos)) {
          const distancia = distanciaEntreArestas(arestas[i], arestas[j]);
          if (distancia < menorDistancia) {
            menorDistancia = distancia;
            aresta1 = arestas[i];
            aresta2 = arestas[j];
          }
        }
      }
    }
  }
  const aresta1Str = JSON.stringify(aresta1);
  const aresta2Str = JSON.stringify(aresta2);
  return `A menor distância é ${menorDistancia} entre as arestas ${aresta1Str} e ${aresta2Str}`;
}

const pontosHexagonoQuadrante1 = [
  [1, 1],
  [1, 3],
  [3, 3],
  [3, 7],
  [4, 7],
  [4, 1],
];

const pontosHexagonoQuadrante2 = [
  [-1, 1],
  [-1, 3],
  [-3, 3],
  [-3, 7],
  [-4, 7],
  [-4, 1],
];

const pontosHexagonoQuadrante3 = [
  [-1, -1],
  [-1, -3],
  [-3, -3],
  [-3, -7],
  [-4, -7],
  [-4, -1],
];

const pontosHexagonoQuadrante4 = [
  [1, -1],
  [1, -3],
  [3, -3],
  [3, -7],
  [4, -7],
  [4, -1],
];

const pontosOctogono = [
  [0, 0],
  [0, 2],
  [2, 2],
  [2, 4],
  [4, 4],
  [4, 2],
  [6, 2],
  [6, 0],
];

const pontosOctogono2 = [
  [0, 0],
  [0, 5],
  [5, 5],
  [5, 4],
  [2, 4],
  [2, 2],
  [7, 2],
  [7, 0],
];

const pontosHexadecagono = [
  [0, 0],
  [0, 3],
  [3, 3],
  [3, 9],
  [6, 9],
  [6, 12],
  [9, 12],
  [9, 8],
  [7, 8],
  [7, 7],
  [8, 7],
  [8, 6],
  [4, 6],
  [4, 3],
  [7, 3],
  [7, 0],
];

const pontosHexadecagono2 = [
  [6, 13],
  [9, 13],
  [9, 16],
  [13, 16],
  [13, 11],
  [10, 11],
  [10, 10],
  [12, 10],
  [12, 8],
  [8, 8],
  [8, 5],
  [11, 5],
  [11, 2],
  [3, 2],
  [3, 5],
  [6, 5],
];

const pontosOctadecagono = [
  [-8, -10],
  [-8, -7],
  [-6, -7],
  [-6, 10],
  [-3, 10],
  [-3, 8],
  [1, 8],
  [1, 6],
  [10, 6],
  [10, 4],
  [7, 4],
  [7, 3],
  [9, 3],
  [9, -2],
  [3, -2],
  [3, 2],
  [2, 2],
  [2, -10],
];

const resultadoHexagonoQuadrante1 = calculaMenorDistancia(
  pontosHexagonoQuadrante1
);
console.log("\n HexadecagonoQuadrante1 : \n", resultadoHexagonoQuadrante1);

const resultadoHexagonoQuadrante2 = calculaMenorDistancia(
  pontosHexagonoQuadrante2
);
console.log("\n HexadecagonoQuadrante2 : \n", resultadoHexagonoQuadrante2);

const resultadoHexagonoQuadrante3 = calculaMenorDistancia(
  pontosHexagonoQuadrante3
);
console.log("\n HexadecagonoQuadrante3 : \n", resultadoHexagonoQuadrante3);

const resultadoHexagonoQuadrante4 = calculaMenorDistancia(
  pontosHexagonoQuadrante4
);
console.log("\n HexadecagonoQuadrante4 : \n", resultadoHexagonoQuadrante4);

const resultadoOctogono = calculaMenorDistancia(pontosOctogono);
console.log("\n Octogono : \n", resultadoOctogono);

const resultadoOctogono2 = calculaMenorDistancia(pontosOctogono2);
console.log("\n Octonogo2 : \n", resultadoOctogono2);

const resultadoHexadecagono = calculaMenorDistancia(pontosHexadecagono);
console.log("\n Hexadecagono : \n", resultadoHexadecagono);

const resultadoHexadecagono2 = calculaMenorDistancia(pontosHexadecagono2);
console.log("\n Hexadecagono2 : \n", resultadoHexadecagono2);

const resultadoOctadecagono = calculaMenorDistancia(pontosOctadecagono);
console.log("\n Octadecagono : \n", resultadoOctadecagono);

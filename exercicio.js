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
    for (let j = i + 2; j < arestas.length; j++) {
      const temProjecao = arestasTemProjecao(arestas[i], arestas[j]);
      if (temProjecao) {
        const distancia = distanciaEntreArestas(arestas[i], arestas[j]);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          aresta1 = arestas[i];
          aresta2 = arestas[j];
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

const resultadoHexagonoQuadrante1 = calculaMenorDistancia(
  pontosHexagonoQuadrante1
);
console.log(resultadoHexagonoQuadrante1);
const resultadoHexagonoQuadrante2 = calculaMenorDistancia(
  pontosHexagonoQuadrante2
);
console.log(resultadoHexagonoQuadrante2);
const resultadoHexagonoQuadrante3 = calculaMenorDistancia(
  pontosHexagonoQuadrante3
);
console.log(resultadoHexagonoQuadrante3);
const resultadoHexagonoQuadrante4 = calculaMenorDistancia(
  pontosHexagonoQuadrante4
);
console.log(resultadoHexagonoQuadrante4);
const resultadoOctogono = calculaMenorDistancia(pontosOctogono);
console.log(resultadoOctogono);
const resultadoOctogono2 = calculaMenorDistancia(pontosOctogono2);
console.log(resultadoOctogono2);
const resultadoHexadecagono = calculaMenorDistancia(pontosHexadecagono);
console.log(resultadoHexadecagono);

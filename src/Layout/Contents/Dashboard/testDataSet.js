const getRandomInt = () => {
    const min = 0, max = 20;
    return Math.floor(Math.random() * (max - min)) + min;
}

export const testData = [
    {
      "id": "Application 1",
      "data": new Array(5).fill(1).map((_,ind) => ({
          x: ind + 2000,
          y: getRandomInt()
      }))
    },
    {
      "id": "Application 2",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 3",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 4",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 5",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 6",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 7",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 8",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 9",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 10",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 11",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 12",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind + 2000,
        y: getRandomInt()
    }))
    }
  ]
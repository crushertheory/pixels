/* eslint-disable no-unused-vars */
/* eslint-disable flowtype/require-valid-file-annotation */

import React, { useEffect, useState } from "react";
// import { Box } from "@material-ui/core";
import { Box, Button, Input, TextField, Typography } from '@mui/material/'

const App = (props) => {
  const rows = 6;
  const columns = 12;
  const blues = ["teal", "aqua", "skyblue"];
  const greens = ["green", "lightgreen", "lime"];
  const reds = ["red", "pink", "purple"];
  const pinks = ["pink", "PaleVioletRed", "hotpink"];
  const yellows = ["yellow", "lightyellow", "gold"];
  const oranges = ["orange", "coral", "peru"];
  const purples = ["purple", "violet", "magenta"];
  const colorArray = [blues, greens, reds, pinks, yellows, oranges, purples];
  // const [colors, setColors] = useState(blues);
  const [amountOfColors, setAmountOfColors] = useState(3);
  const [amountOfRows, setAmountOfRows] = useState(12);
  // const [amountOfRowsError, setAmountOfRowsError] = useState(null);
  const [amountOfColumns, setAmountOfColumns] = useState(12);
  const [selectedColor, setSelectedColor] = useState(null);
  const [createdGrid, setCreatedGrid] = useState(null);

  const [bunchOfGrids, setBunchOfGrids] = useState([]);
  const [canvasSize, setCanvasSize] = useState(10);
  const [pixelSize, setPixelSize] = useState(10);
  const [blackRatio, setBlackRatio] = useState(50);
  const [pixelCount, setPixelCount] = useState(40);

  const shipTemplate = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
    [1, 0, 0, 0, 0, 0, 1, 1, 2, 2],
    [1, 0, 0, 0, 0, 1, 1, 2, 2, 1],
    [1, 0, 0, 0, 1, 1, 2, 2, 2, 1],
    [1, 0, 0, 1, 1, 2, 2, 2, 1, 1],
    [1, 0, 1, 1, 2, 2, 2, 1, 1, 2],
    [1, 1, 1, 2, 2, 2, 1, 1, 2, 2],
    [1, 1, 2, 2, 2, 1, 1, 2, 2, 2],
    [1, 2, 2, 2, 1, 1, 2, 2, 2, 2],
    [1, 1, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 2, 2, 2, 0, 2, 2, 2, 1],
    [1, 0, 1, 1, 1, 2, 2, 1, 1, 2],
    [1, 0, 0, 1, 1, 2, 2, 1, 1, 2],
    [1, 0, 0, 1, 2, 1, 1, 2, 2, 2],
    [1, 0, 0, 0, 1, 2, 2, 2, 2, 2],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  ];
  const randomGhost = [
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 1, 2, 2],
    [0, 1, 2, 0, 2],
    [1, 2, 2, 0, 2],
    [1, 2, 2, 2, 2],
    [0, 1, 2, 1, 1],
    [0, 1, 2, 2, 2],
    [0, 1, 1, 1, 2],
    [0, 0, 0, 1, 1],
  ]
  let templateIndex = 0;

  const createRow2 = (colors) => {
    const row = [];
    let concurrentBlankCount = 0;
    let oddColumns = false;
    let columnCount = 0;
    if (amountOfColumns % 2 !== 0) {
      oddColumns = true;
      columnCount = (amountOfColumns / 2) - .5;
    } else {
      columnCount = amountOfColumns / 2;
    }
    for (let i = 0; i < columnCount; i++) {
      const random = Math.floor(Math.random() * 100);
      if (random > blackRatio && concurrentBlankCount < 3) {
        row.push(
          <Box
            key={i}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: 'black',
            }}
          />
        );
        concurrentBlankCount ++;
      } else {
        row.push(
          <Box
            key={i}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: colors[Math.floor(Math.random() * amountOfColors)],
            }}
          />
        );
        concurrentBlankCount = 0;
      }
    }

    let oddColumnFilled = [];
    if (oddColumns) {
      const random = Math.floor(Math.random() * 100);
      if (random > blackRatio && concurrentBlankCount < 3) {
        oddColumnFilled.push(
          <Box
            key={columnCount}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: 'black',
            }}
          />
        );
        concurrentBlankCount ++;
      } else {
        oddColumnFilled.push(
          <Box
            key={columnCount}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: colors[Math.floor(Math.random() * amountOfColors)],
            }}
          />
        );
        concurrentBlankCount = 0;
      }
    }
    const secondHalf = []
    for (let i = columnCount; i > -1; i--) {
      secondHalf.push(row[i]);
    }

    return (
      <Box display="flex" flexDirection="row">
        {row}
        {oddColumns && oddColumnFilled}
        {secondHalf}
      </Box>
    );
  };

  // const createRow = () => {
  //   const row = [];
  //   for (let i = 0; i < 10; i++) {
  //     if (shipTemplate[templateIndex][i] === 0) {
  //       row.push(
  //         <Box
  //           key={i}
  //           style={{
  //             width: 20,
  //             height: 20,
  //             backgroundColor: 'white',
  //           }}
  //         />
  //       );
  //     } 
  //     if (shipTemplate[templateIndex][i] === 1) {
  //       row.push(
  //         <Box
  //           key={i}
  //           style={{
  //             width: 20,
  //             height: 20,
  //             backgroundColor: 'black',
  //           }}
  //         />
  //       );
  //     } 
  //     if (shipTemplate[templateIndex][i] === 2) {
  //       const random = Math.floor(Math.random() * 100);
  //       if (random > 75) {
  //         row.push(
  //           <Box
  //             key={i}
  //             style={{
  //               width: 20,
  //               height: 20,
  //               backgroundColor: 'black',
  //             }}
  //           />
  //         );
  //       } else {
  //         row.push(
  //           <Box
  //             key={i}
  //             style={{
  //               width: 20,
  //               height: 20,
  //               backgroundColor: colors[Math.floor(Math.random() * 2)],
  //             }}
  //           />
  //         );
  //       }
  //     }
  //   }
  //   const secondHalf = []
  //   for (let i = 10; i > -1; i--) {
  //     secondHalf.push(row[i]);
  //   }

  //   return (
  //     <Box display="flex" flexDirection="row">
  //       {row}
  //       {secondHalf}
  //     </Box>
  //   );
  // };

  const createGrid = () => {
    const blues = ["teal", "aqua", "skyblue"];
    const greens = ["green", "lightgreen", "lime"];
    const reds = ["red", "pink", "purple"];
    const pinks = ["pink", "PaleVioletRed", "hotpink"];
    const yellows = ["yellow", "lightyellow", "gold"];
    const oranges = ["orange", "coral", "peru"];
    const purples = ["purple", "violet", "magenta"];
    const colorSetsArray = [blues, greens, reds, pinks, yellows, oranges, purples];
    const individualColorsArray = [
      "teal", 
      "aqua",
      "skyblue",
      "green",
      "lightgreen",
      "lime",
      "red",
      "pink",
      "purple",
      "PaleVioletRed",
      "hotpink",
      "yellow",
      "lightyellow",
      "gold",
      "orange",
      "coral",
      "peru",
      "purple",
      "violet",
      "magenta",
    ];
    const aiColorsArray = [
      "#FF0000", // Red
      "#00FF00", // Lime
      "#0000FF", // Blue
      "#FFFF00", // Yellow
      "#00FFFF", // Aqua
      "#FF00FF", // Fuchsia
      "#C0C0C0", // Silver
      "#808080", // Gray
      "#800000", // Maroon
      "#808000", // Olive
      "#008000", // Green
      "#800080", // Purple
      "#008080", // Teal
      "#000080", // Navy
      "#FF6347", // Tomato
      "#40E0D0", // Turquoise
      "#EE82EE", // Violet
      "#FFD700", // Gold
      "#DAA520", // GoldenRod
      "#B22222", // FireBrick
      "#FF4500", // OrangeRed
      "#2E8B57", // SeaGreen
      "#5F9EA0", // CadetBlue
      "#FF1493", // DeepPink
      "#4682B4", // SteelBlue
      "#D2691E", // Chocolate
      "#CD5C5C", // IndianRed
      "#4B0082", // Indigo
      "#F0E68C", // Khaki
      "#E6E6FA", // Lavender
      "#FF8C00", // DarkOrange
      "#9932CC", // DarkOrchid
      "#8B4513", // SaddleBrown
      "#2F4F4F", // DarkSlateGray
      "#00CED1", // DarkTurquoise
      "#9400D3", // DarkViolet
      "#FF69B4", // HotPink
      "#CD853F", // Peru
      "#D2B48C", // Tan
      "#A0522D", // Sienna
      "#ADFF2F", // GreenYellow
      "#7CFC00", // LawnGreen
      "#FFFACD", // LemonChiffon
      "#ADD8E6", // LightBlue
      "#F08080", // LightCoral
      "#E0FFFF", // LightCyan
      "#FAFAD2", // LightGoldenRodYellow
      "#90EE90", // LightGreen
      "#FFB6C1", // LightPink
      "#FFA07A", // LightSalmon
      "#20B2AA", // LightSeaGreen
      "#87CEFA", // LightSkyBlue
      "#778899", // LightSlateGray
      "#B0C4DE", // LightSteelBlue
      "#ADFF2F", // GreenYellow
      "#F0F8FF", // AliceBlue
      "#FAEBD7", // AntiqueWhite
      "#FFE4C4", // Bisque
      "#F5DEB3", // Wheat
      "#DCDCDC", // Gainsboro
      "#D0F0C0", // HoneyDew
      "#F0FFF0", // HoneyDew
      "#F0FFFF", // Azure
      "#F8F8FF", // GhostWhite
      "#FFE4E1", // MistyRose
      "#FFE4B5", // Moccasin
      "#FFDEAD", // NavajoWhite
      "#FDF5E6", // OldLace
      "#6B8E23", // OliveDrab
      "#FFA500", // Orange
      "#DA70D6", // Orchid
      "#EEE8AA", // PaleGoldenRod
      "#98FB98", // PaleGreen
      "#AFEEEE", // PaleTurquoise
      "#D87093", // PaleVioletRed
      "#FFEFD5", // PapayaWhip
      "#FFDAB9", // PeachPuff
      "#FFC0CB", // Pink
      "#DDA0DD", // Plum
      "#B0E0E6", // PowderBlue
      "#FF00FF"  // Magenta
    ];
    const hexLetters = ["A", "B", "C", "D", "E", "F"];
    const randomHexes = [];
    for (let i = 0; i < amountOfColors; i++) {
      const coinFlip = Math.floor(Math.random() * 2);
      let hex = "#";
      for (let i = 0; i < 6; i++) {
        console.log(i);
        if (coinFlip === 0) {
          if (i === 0) {
            hex +=Math.floor(Math.random() * (10 - 6 + 1) + 6);
          } else {
            hex += Math.floor(Math.random() * 10);
          }
        } else {
          hex += hexLetters[Math.floor(Math.random() * 6)];
        }
      }
      console.log(hex);
      randomHexes.push(hex);
    }

    const individualColors = [];
    const alreadyUsed = [];
    const random = Math.floor(Math.random() * colorSetsArray.length);
    for (let i = 0; i < amountOfColors; i++) {
      let randomColor = Math.floor(Math.random() * individualColorsArray.length);
      // let randomColor = Math.floor(Math.random() * aiColorsArray.length);
      while (alreadyUsed.includes(randomColor)) {
        let newRandomColor = Math.floor(Math.random() * individualColorsArray.length);
        // let newRandomColor = Math.floor(Math.random() * aiColorsArray.length);
        if (!alreadyUsed.includes(newRandomColor)) {
          randomColor = newRandomColor;
        }
      }
      // individualColors.push(individualColorsArray[randomColor]);
      individualColors.push(aiColorsArray[randomColor]);
      alreadyUsed.push(randomColor);
    }
    const grid = [];
    for (let i = 0; i < amountOfRows; i++) {
      const row = createRow2(randomHexes);
      grid.push(row);
      templateIndex++;
    }

    setCreatedGrid(
      <Box display="flex" flexDirection="column">
        {grid}
      </Box>
    );
    return (
      <Box display="flex" flexDirection="column"  padding={2}>
        {grid}
      </Box>
    );
  };

  const createBunchOfGrids = () => {
    const bunch = [];
    for (let i = 0; i < pixelCount; i++) {
      const grid = createGrid();
      bunch.push(grid);
    }
    setBunchOfGrids(bunch);
  }
    
  return (
    <Box style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      <Box 
        display={'flex'}
        flexDirection={'row'}
        height={50} 
        width={'100%'} 
        bgcolor={'white'} 
        position='fixed'
        padding={2}
        top={0}
      >
        <Button
          variant='contained'
          disabled={blackRatio >= 100}
          style={{ margin: 8 }}
          onClick={() => {
            if (blackRatio < 100) {
              setBlackRatio(blackRatio + 10)
              createGrid()
            }
          }}
          >
            Decrease Black Pixels
        </Button>
        <Box style={{ alignSelf: 'center', margin: 8 }}>
          <Typography variant="subtitle1">
            Black Pixels: {100 - blackRatio}%
          </Typography>
        </Box>
        <Button
          variant='contained'
          disabled={blackRatio <= 0}
          style={{ margin: 8 }}
          onClick={() => {
            if (blackRatio > 0) {
              setBlackRatio(blackRatio - 10)
              createGrid()
            }
          }}
        >
          Increase Black Pixels
        </Button>
        <TextField
          id="outlined-number"
          label="Rows"
          type="number"
          required
          value={amountOfRows}
          onChange={(e) => {
            setAmountOfRows(e.target.value)
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          style={{ backgroundColor: 'white', marginLeft: 8 }}
        />
        {/* {amountOfRowsError && <Box style={{ color: 'red' }}>{amountOfRowsError}</Box>} */}
        <TextField
          id="outlined-number"
          label="Columns"
          type="number"
          required
          value={amountOfColumns}
          onChange={(e) => { 
            setAmountOfColumns(e.target.value)
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          style={{ backgroundColor: 'white', marginLeft: 8 }}
        />
        <TextField
          id="outlined-number"
          label="Colors Per Sprite"
          type="number"
          required
          value={amountOfColors}
          onChange={(e) => setAmountOfColors(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          style={{ backgroundColor: 'white', marginLeft: 8 }}
        />
        <Box justifySelf={'flex-end'} style={{ marginLeft: 'auto', paddingRight: 25 }}>
          <Button
            variant='contained' 
            onClick={() => {
              // if ((amountOfRows / 2).toString().includes('.5')) {
              //   setAmountOfRowsError('Current implementation only supports even numbers of rows')
              // } else {
                // setAmountOfRowsError(null) 
                createBunchOfGrids()
              // }
            }}
            style={{ margin: 8 }}
          >
            Make Pixels
          </Button>
        </Box>
      </Box>
    <Box 
      height={'100%'} 
      width={'100%'} 
      bgcolor={'black'} 
      display={'flex'} 
      alignContent={'center'} 
      justifyContent={'center'}
      paddingTop='80px'
      >
        <Box display="flex" flexDirection='column' alignSelf='center'>
          <Box display="flex" flexDirection="row" flexWrap='wrap'>
            {/* {createdGrid} */}
            {bunchOfGrids}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;

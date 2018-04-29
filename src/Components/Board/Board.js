import React, { Component } from 'react';
import './Board.scss';
import Control from './Control/Control';
import Grid from './Grid/Grid';

class Board extends Component {
  constructor (props) {
    super(props);

    this.state = {
      minRows: 10,
      maxRows: 50,
      defaultRows: 20,
      rows: 20,
      minColumns: 10,
      maxColumns: 50,
      defaultColumns: 20,
      columns: 20,
      minSpeed: 1,
      maxSpeed: 10,
      defaultSpeed: 1,
      speed: 1,
      grid: [[]],
      cellWidth: 10,
      cellHeight: 10,
      cellGap: 2
    };
  }

  componentDidMount () {
    this._setInitialGrid();
  }

  _setRow (e) {
    let { value } = e.target;
    const { maxRows, minRows } = this.state;

    if (value < minRows) {
      value = minRows;
    } else if (value > maxRows) {
      value = maxRows;
    }

    this.setState({
      rows: parseInt(value, 10)
    }, () => {
      this._setInitialGrid();
    });
  }

  _setColumn (e) {
    let { value } = e.target;
    const { minColumns, maxColumns } = this.state;

    if (value < minColumns) {
      value = minColumns;
    } else if (value > maxColumns) {
      value = maxColumns;
    }

    this.setState({
      columns: parseInt(value, 10)
    }, () => {
      this._setInitialGrid();
    });
  }

  _setSpeed (e) {
    let { value } = e.target;
    const { minSpeed, maxSpeed } = this.state;

    if (value < minSpeed) {
      value = minSpeed;
    } else if (value > maxSpeed) {
      value = maxSpeed;
    }

    this.setState({
      speed: parseInt(value, 10)
    }, () => {
      this._setInitialGrid();
    });
  }

  _getRandomNumberBetweenRanges (start, end) {
    return Math.floor(Math.random() * end) + start;
  }

  _setRandomLiveCells (grid) {
    const rows = grid.length;
    const columns = grid[0].length;

    const maxLiveCells = (rows * columns) / 10;

    let randI = -1;
    let randJ = -1;
    for (let i = 0; i < maxLiveCells; i += 1) {
      randI = this._getRandomNumberBetweenRanges(0, rows);
      randJ = this._getRandomNumberBetweenRanges(0, columns);

      if (grid[randI][randJ] === 1) {
        i -= 1;
      }
      grid[randI][randJ] = 1;
    }

    return grid;
  }

  _getEmptyGrid () {
    const { rows, columns } = this.state;
    return Array(rows).fill(Array(columns).fill(0));
  }

  _setInitialGrid () {
    let grid = this._getEmptyGrid();
    grid = this._setRandomLiveCells(grid);

    this.setState({
      grid
    });
  }


  render () {
    const {
      minRows,
      maxRows,
      defaultRows,
      minColumns,
      maxColumns,
      defaultColumns,
      minSpeed,
      maxSpeed,
      defaultSpeed,
      grid,
      cellWidth,
      cellHeight,
      cellGap
    } = this.state;

    return (
      <div className="board">
        <Control
          minRows={minRows}
          maxRows={maxRows}
          defaultRows={defaultRows}
          minColumns={minColumns}
          maxColumns={maxColumns}
          defaultColumns={defaultColumns}
          minSpeed={minSpeed}
          maxSpeed={maxSpeed}
          defaultSpeed={defaultSpeed}
          setRow={e => this._setRow(e)}
          setColumn={e => this._setColumn(e)}
          setSpeed={e => this._setSpeed(e)}
        />
        <Grid
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          cellGap={cellGap}
          grid={grid}
        />
      </div>
    );
  }
}

export default Board;
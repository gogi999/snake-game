import React, { useState, useEffect, useRef } from 'react'
import AppHeader from './AppHeader';
import GameOver from './GameOver';
import Score from './Score';
import StartGameBtn from './StartGameBtn';
import {
    CANVAS_SIZE,
    SNAKE_COLOR,
    FOOD_COLOR,
    SNAKE_START,
    FOOD_START,
    SCALE,
    SPEED,
    DIRECTIONS
} from '../constants';
import { useInterval } from '../hooks';

const Game = () => {
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [food, setFood] = useState(FOOD_START);
    const [direction, setDirection] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    useInterval(() => gameLoop(), speed);

    const startGame = () => {
        setSnake(SNAKE_START);
        setFood(FOOD_START);
        setDirection([0, -1]);
        setSpeed(SPEED);
        setGameOver(false);
    };

    const levelUp = (snake) => {
        if (snake >= 4 && snake <= 5)
            setSpeed(285);
        if (snake === 6)
            setSpeed(270);
        if (snake === 7)
            setSpeed(260);
        if (snake === 8)
            setSpeed(250);
        if (snake === 9)
            setSpeed(240);
        if (snake === 10)
            setSpeed(230);
        if (snake === 11)
            setSpeed(220);
        if (snake > 11 && snake <= 13)
            setSpeed(210);
        if (snake > 13 && snake <= 15)
            setSpeed(205);
        if (snake > 15 && snake <= 17)
            setSpeed(200);
        if (snake > 17 && snake <= 19)
            setSpeed(195);
        if (snake > 19 && snake <= 21)
            setSpeed(185);
        if (snake > 21 && snake <= 23)
            setSpeed(180);
        if (snake > 23 && snake <= 25)
            setSpeed(170);
        if (snake > 25 && snake <= 27)
            setSpeed(160);
        if (snake > 27 )
            setSpeed(150);
    }

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
    };

    const moveSnake = ({keyCode}) => {
        if (direction[0] === 0 && direction[1] === -1)
            keyCode >= 37 && keyCode <= 39 && setDirection(DIRECTIONS[keyCode]);

        if (direction[0] === 0 && direction[1] === 1)
            (keyCode >= 39 && keyCode <= 40 && setDirection(DIRECTIONS[keyCode])) || (keyCode === 37 && setDirection(DIRECTIONS[keyCode]));
        
        if (direction[0] === 1 && direction[1] === 0)
            keyCode >= 38 && keyCode <= 40 && setDirection(DIRECTIONS[keyCode]);
        
        if (direction[0] === -1 && direction[1] === 0)
            (keyCode >= 37 && keyCode <= 38 && setDirection(DIRECTIONS[keyCode])) || (keyCode === 40 && setDirection(DIRECTIONS[keyCode]));
    }

    const createFood = () =>
        food.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

    const checkCollision = (piece, snk = snake) => {
        if (
            piece[0] * SCALE >= CANVAS_SIZE[0] ||
            piece[0] < 0 ||
            piece[1] * SCALE >= CANVAS_SIZE[1] ||
            piece[1] < 0
        )
            return true;

        for (const segment of snk) {
            if (piece[0] === segment[0] && piece[1] === segment[1])
                return true;
        }
        return false;
    };

    const checkFoodCollision = newSnake => {
        if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
            let newFood = createFood();
            while (checkCollision(newFood, newSnake)) {
                newFood = createFood();
            }
            setFood(newFood);
            return true;
        }
        return false;
    };

    const gameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + direction[0], snakeCopy[0][1] + direction[1]];
        snakeCopy.unshift(newSnakeHead);
        levelUp(snake.length);
        if (checkCollision(newSnakeHead)) endGame();
        if (!checkFoodCollision(snakeCopy)) snakeCopy.pop();
        setSnake(snakeCopy);
    };

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = SNAKE_COLOR;
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = FOOD_COLOR;
        context.fillRect(food[0], food[1], 1, 1);
    }, [snake, food, gameOver]);


    return (
        <div>
            <AppHeader />
            <br/>
            <div className="container center-align">
                {gameOver && <GameOver />}
                <br/>
                <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
                    <canvas
                        style={{border: "5px solid #9575cd"}}
                        ref={canvasRef}
                        width={`${CANVAS_SIZE[0]}px`}
                        height={`${CANVAS_SIZE[1]}px`}
                    />
                    <br/><br/>
                    <Score score={snake.length - 2} />
                    <br/><br/>
                    <StartGameBtn start={() => startGame()}/>

                </div>
            </div>
        </div>
    );
}

export default Game;

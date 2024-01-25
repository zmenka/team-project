import { useEffect, useRef } from 'react'
import './style.css'
import { getRandomInt } from './utils/getRandomInt'

function Game() {
  // Поле, на котором всё будет происходить, — тоже как бы переменная
  const ref = useRef<HTMLCanvasElement | null>(null)
  // Классическая змейка — двухмерная, сделаем такую же
  // Размер одной клеточки на поле — 16 пикселей
  const grid = 16
  // Служебная переменная, которая отвечает за скорость змейки
  let count = 0
  // А вот и сама змейка
  const snake: {
    x: number
    y: number
    dx: number
    dy: number
    cells: { x: number; y: number }[]
    maxCells: number
  } = {
    // Начальные координаты
    x: 160,
    y: 160,
    // Скорость змейки — в каждом новом кадре змейка смещается по оси Х или У. На старте будет двигаться горизонтально, поэтому скорость по игреку равна нулю.
    dx: grid,
    dy: 0,
    // Тащим за собой хвост, который пока пустой
    cells: [],
    // Стартовая длина змейки — 4 клеточки
    maxCells: 4,
  }
  // А это — еда. Представим, что это красные яблоки.
  const apple = {
    // Начальные координаты яблока
    x: 320,
    y: 320,
  }

  useEffect(() => {
    let requestId = 0
    document.addEventListener('keydown', setSnakeControllers)

    if (ref.current) {
      requestId = requestAnimationFrame(gameLoop)
    }
    return () => {
      document.removeEventListener('keydown', setSnakeControllers)
      cancelAnimationFrame(requestId)
    }
  }, [])

  function gameLoop() {
    if (!ref.current) {
      return
    }
    const canvas: HTMLCanvasElement = ref.current
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    // Дальше будет хитрая функция, которая замедляет скорость игры с 60 кадров в секунду до 15. Для этого она пропускает три кадра из четырёх, то есть срабатывает каждый четвёртый кадр игры. Было 60 кадров в секунду, станет 15.
    requestAnimationFrame(gameLoop)
    // Игровой код выполнится только один раз из четырёх, в этом и суть замедления кадров, а пока переменная count меньше четырёх, код выполняться не будет.
    if (++count < 4) {
      return
    }
    // Обнуляем переменную скорости
    count = 0
    context.clearRect(0, 0, canvas.width, canvas.height)
    moveSnake()
    checkMapEnd(canvas)
    moveSnakeBody()
    makeApple(context)
    context.fillStyle = 'yellow'
    checkCollisions(context)
  }

  function setSnakeControllers(e: KeyboardEvent) {
    if (e.code === 'ArrowLeft' && snake.dx === 0) {
      snake.dx = -grid
      snake.dy = 0
    } else if (e.code === 'ArrowUp' && snake.dy === 0) {
      snake.dy = -grid
      snake.dx = 0
    } else if (e.code === 'ArrowRight' && snake.dx === 0) {
      snake.dx = grid
      snake.dy = 0
    } else if (e.code === 'ArrowDown' && snake.dy === 0) {
      snake.dy = grid
      snake.dx = 0
    }
  }

  function moveSnake() {
    snake.x += snake.dx
    snake.y += snake.dy
  }

  function checkMapEnd(canvas: HTMLCanvasElement) {
    if (snake.x < 0) {
      snake.x = canvas.width - grid
    } else if (snake.x >= canvas.width) {
      snake.x = 0
    }
    if (snake.y < 0) {
      snake.y = canvas.height - grid
    } else if (snake.y >= canvas.height) {
      snake.y = 0
    }
  }

  function moveSnakeBody() {
    snake.cells.unshift({ x: snake.x, y: snake.y })
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop()
    }
  }

  function makeApple(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red'
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1)
  }

  function checkCollisions(context: CanvasRenderingContext2D) {
    snake.cells.forEach(function (cell, index) {
      // Чтобы создать эффект клеточек, делаем квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1)
      // Если змейка добралась до яблока...
      if (cell.x === apple.x && cell.y === apple.y) {
        // увеличиваем длину змейки
        snake.maxCells++
        // Рисуем новое яблочко
        apple.x = getRandomInt(0, 50) * grid
        apple.y = getRandomInt(0, 50) * grid
      }
      // Проверяем, не столкнулась ли змея сама с собой
      // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами
      for (let i = index + 1; i < snake.cells.length; i++) {
        // Если такие клетки есть — начинаем игру заново
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          // Задаём стартовые параметры основным переменным
          snake.x = 160
          snake.y = 160
          snake.cells = []
          snake.maxCells = 4
          snake.dx = grid
          snake.dy = 0
          // Ставим яблочко в случайное место
          apple.x = getRandomInt(0, 50) * grid
          apple.y = getRandomInt(0, 50) * grid
          break
        }
      }
    })
  }
  return (
    <div className="game-body">
      <canvas ref={ref} width="800" height="800"></canvas>
    </div>
  )
}

export default Game

let gElCanvas
let gCtx
let gCurrShape = 'rect'

function init() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // console.log('gCtx', gCtx)

    // drawLine(10, 10, 130, 230)
    // drawTriangle(50, 280)
    // drawRect(250, 50)
    // drawArc(330, 330)
    // drawText('HOLA!', gElCanvas.width / 2, gElCanvas.height / 2)

    // clearCanvas()

    // setTimeout(() => {
    //   clearCanvas()
    // }, 1000)

    // saveAndRestoreExample()
    drawImg()
    // drawTriangle(50, 280)
    // drawImg2()

    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)

    // click on canvas
}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)

    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
}

function drawTriangle(x, y) {
    gCtx.beginPath()
    // Starts a new path -> Call this method when you want to create a new path.
    gCtx.moveTo(x, y) // Moves the starting point of a new path to the (x, y) coordinates.
    gCtx.lineTo(130, 330) // Connects the last point in the current path to the specified (x, y) coordinates with a straight line.
    gCtx.lineTo(50, 400)
    /* 
    Causes the point of the pen to move back to the start of the current path.
     It tries to draw a straight line from the current point to the start.
    */
    // gCtx.lineTo(x, y)
    gCtx.closePath()
    gCtx.strokeStyle = 'blue' // Color or style to use for the lines around shapes. Default #000 (black).
    gCtx.stroke() // Strokes the current paths with the current stroke style.
    gCtx.fillStyle = 'purple' // Color or style to use inside shapes. Default #000 (black).
    gCtx.fill() // Fills the current paths with the current fill style.
}

function drawRect(x, y) {
    // First way - drawing a rect by specifying a patch using the .rect() method,
    // and then filling it with the .fill() method and stroking it with the .stroke() method
    // gCtx.beginPath()
    // gCtx.rect(x, y, 120, 120)
    // gCtx.strokeStyle = 'black'
    // gCtx.stroke()
    // gCtx.fillStyle = 'orange'
    // gCtx.fill()

    // Second way - using the built in .fillRect() and .strokeRect() methods to directly
    // paint on the canvas, without using a path
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, 120, 120)
    gCtx.fillStyle = 'orange'
    gCtx.fillRect(x, y, 120, 120)
}

function drawArc(x, y) {
    gCtx.beginPath()
    // The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
    gCtx.arc(x, y, 70, 0, 2 * Math.PI) // Used to create a circle
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
    gCtx.fillStyle = 'blue'
    gCtx.fill()
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function clearCanvas() {
    // Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height)
    // to transparent black, erasing any previously drawn content.
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
}

function saveAndRestoreExample() {
    gCtx.font = '30px Arial'
    gCtx.strokeStyle = 'green'
    gCtx.strokeText('Saving the context', 10, 50)
    gCtx.save() // Saves the current drawing style state using a stack.
    gCtx.strokeStyle = 'black'
    gCtx.strokeText('Switching to something else', 10, 100)
    gCtx.save() // Saves the current drawing style state using a stack.
    gCtx.strokeStyle = 'red'
    gCtx.strokeText('Back to previous context', 10, 150)
    gCtx.restore() // Restores the drawing style state to the last element on the 'state stack' saved by save().
    gCtx.strokeText('Back to previous context', 10, 200)
    gCtx.restore() // Restores the drawing style state to the last element on the 'state stack' saved by save().
    gCtx.strokeText('Back to previous context', 10, 250)
}

function drawImg() {
    const elImg = document.querySelector('img')
    // Naive approach:
    // there is a risk that image is not loaded yet and nothing will be drawn on canvas
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height) // Draws the specified image
}

function drawImg2() {
    const img = new Image() // Create a new html img element
    img.src = 'img/04.jpg' // Send a network req to get that image, define the img src
    // When the image ready draw it on the canvas
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth
    // Unless needed, better keep height fixed.
    // gElCanvas.height = elContainer.offsetHeight
}

function setShape(shape) {
    gCurrShape = shape
}

function draw(ev) {
    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY
    const { offsetX, offsetY } = ev
    console.log(' offsetX, offsetY', offsetX, offsetY)

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'rect':
            drawRect(offsetX, offsetY)
            break
        case 'text':
            drawText('Hello', offsetX, offsetY)
            break
        case 'line':
            drawLine(offsetX, offsetY)
            break
    }
}

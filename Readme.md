# Drawing Board Application

## Overview

A browser-based drawing board built using **HTML, CSS, and JavaScript**. The application allows users to draw freehand sketches on an HTML Canvas using a pencil tool, erase drawings, change colors, adjust brush sizes, undo/redo actions, and clear the canvas.

This project was built to understand the fundamentals of:

* HTML Canvas API
* Event-driven programming
* State management in JavaScript
* Coordinate systems
* Undo/Redo implementation
* High-DPI canvas rendering
* DOM manipulation

---

# Features

### Drawing Tool

* Draw freehand lines on the canvas.
* Tracks mouse movement continuously.
* Stores all points of a stroke.

### Eraser Tool

* Simulates erasing by drawing with a white color.
* Uses the same drawing mechanism as the pencil.

### Color Picker

* Allows selection of custom drawing colors.
* Automatically switches back to the pencil tool after color selection.

### Brush Size Control

* Adjusts stroke width dynamically.
* Applies to both pencil and eraser.

### Undo Functionality

* Removes the most recent drawing path.
* Stores removed paths inside a redo stack.

### Redo Functionality

* Restores previously undone paths.

### Clear Canvas

* Removes all drawings.
* Clears undo and redo history.

### Retina / High DPI Support

* Uses `window.devicePixelRatio`.
* Prevents blurry drawings on high-resolution screens.

---

# Project Structure

```text
Drawing Board
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# Core Concepts Used

## 1. HTML Canvas

Canvas is an HTML element that provides a drawable area.

```html
<canvas id="drawing-area"></canvas>
```

JavaScript obtains a drawing context:

```javascript
const canvas = document.getElementById("drawing-area");
const ctx = canvas.getContext("2d");
```

The context (`ctx`) provides all drawing methods.

---

## 2. Canvas Setup

### Why Needed?

Canvas dimensions and CSS dimensions are different.

To avoid blurry drawings:

```javascript
const rect = canvas.getBoundingClientRect();
const dpi = window.devicePixelRatio;
```

Canvas internal resolution:

```javascript
canvas.width = rect.width * dpi;
canvas.height = rect.height * dpi;
```

Scale drawing coordinates:

```javascript
ctx.scale(dpi, dpi);
```

---

## 3. Mouse Events

Three events drive the drawing logic:

### mousedown

Starts a new path.

```javascript
canvas.addEventListener("mousedown", startDrawing);
```

---

### mousemove

Adds points while drawing.

```javascript
canvas.addEventListener("mousemove", draw);
```

---

### mouseup

Stops drawing.

```javascript
canvas.addEventListener("mouseup", stopDrawing);
```

---

# State Management

## Drawing State

```javascript
let drawing = false;
```

Determines whether the user is currently drawing.

---

## Tool State

```javascript
let currentTool = "pencil";
```

Tracks the selected tool.

Possible values:

```text
pencil
eraser
```

---

## Color State

```javascript
let currentColor = "#000000";
```

Stores the currently selected color.

---

## Brush Size State

```javascript
let brushSize = 5;
```

Stores stroke thickness.

---

# Path Data Structure

Every stroke is stored as an object:

```javascript
{
    color: "#000000",
    width: 5,
    points: [
        {x: 100, y: 120},
        {x: 105, y: 125},
        {x: 110, y: 130}
    ]
}
```

All paths are stored inside:

```javascript
let path = [];
```

This acts as the application's drawing history.

---

# Drawing Flow

### Step 1

User presses mouse.

```javascript
startDrawing()
```

Creates a new path.

---

### Step 2

User moves mouse.

```javascript
draw()
```

Adds coordinates into the current path.

---

### Step 3

Canvas redraws.

```javascript
redrawCanvas()
```

---

### Step 4

Every stored path is drawn again.

```javascript
path.forEach(drawPath);
```

---

# Coordinate Calculation

Mouse coordinates are converted into canvas coordinates.

```javascript
const rect = canvas.getBoundingClientRect();
```

Calculate:

```javascript
x = (mouseX - rect.left)
y = (mouseY - rect.top)
```

This ensures drawing occurs at the correct location.

---

# Undo / Redo Design

## Undo Stack

```javascript
path
```

Stores current drawings.

---

## Redo Stack

```javascript
redoStack
```

Stores removed drawings.

---

### Undo Operation

```javascript
redoStack.push(path.pop());
```

Move latest path to redo stack.

---

### Redo Operation

```javascript
path.push(redoStack.pop());
```

Move path back.

---

# Algorithms Used

## Drawing

Time Complexity:

```text
O(n)
```

Where n is the total number of points.

---

## Undo

```text
O(1)
```

Uses stack operations.

---

## Redo

```text
O(1)
```

Uses stack operations.

---

# Interview Discussion Points

If asked in a machine coding interview:

### Why store points?

To redraw the entire canvas whenever changes occur.

---

### Why redraw all paths?

Canvas does not remember previous drawings.
It is a bitmap surface.

---

### Why use stacks for Undo/Redo?

Undo and Redo naturally follow LIFO behavior.

---

### Why use devicePixelRatio?

To make drawings appear sharp on Retina displays.

---

### Why store color and width per path?

So every stroke preserves its original appearance.

---

# Future Improvements

* Touch support for mobile devices
* Shape tools (rectangle, circle, line)
* Download as PNG
* Save drawing to local storage
* Multiple layers
* Keyboard shortcuts
* Fill bucket tool
* Custom backgrounds
* Infinite canvas
* Collaborative drawing

---

# Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Canvas API

---

# Learning Outcomes

After completing this project, I understood:

* Canvas rendering
* Event handling
* Mouse coordinate systems
* State management
* Undo/Redo design patterns
* Stack-based operations
* High-DPI rendering
* DOM manipulation
* Machine coding interview implementation patterns

This project serves as a foundation for building more advanced drawing applications, whiteboards, and browser-based graphics tools.

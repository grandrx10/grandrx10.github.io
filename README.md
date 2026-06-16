# Signify
<img width="1872" height="884" alt="image" src="https://github.com/user-attachments/assets/bc4cdf3c-6a1a-44be-9c1e-8b9f24f7bab9" />

A browser-based **American Sign Language (ASL) recognition app**. Signify uses your webcam to read hand signs in real time, spells them out into a text box, and can read the result aloud with text-to-speech.

It runs entirely in the browser with no backend — the machine learning model runs client-side via [ml5.js](https://ml5js.org/) and the UI is drawn with [p5.js](https://p5js.org/).

> Hosted as a GitHub Pages site at `https://grandrx10.github.io`.

## What it does

1. Captures live video from your webcam.
2. Continuously classifies the current frame against a trained ASL image model.
3. When **Detect** is on, the recognized sign is appended to the text box — but only after you *hold* the sign steady for a configurable duration (so brief or transitional gestures aren't accidentally typed).
4. You can clear the text, read it aloud, adjust the hold duration, and switch color themes.

### Recognized signs

The model classifies the following 31 labels:

```
A–Z  •  SPACE  •  NOTHING  •  Hello  •  I love you  •  Thank you
```

## Usage

Because the app uses the webcam, it must be served over `http://localhost` or HTTPS (browsers block camera access on `file://`).

```bash
# from the project root, start any static server, e.g.:
npx serve .
# or
python -m http.server 8000
```

Then open the served URL (e.g. `http://localhost:8000`) and grant camera permission.

### Controls

| Control | Action |
| --- | --- |
| **Detect: On / Off** | Toggles whether recognized signs are written to the text box. |
| **Clear Text** | Empties the text box. |
| **Read Text** | Speaks the current text aloud using browser text-to-speech. |
| **+0.5 / −0.5** | Increases / decreases the *Sign Hold Duration* (how long a sign must be held before it's typed). Minimum stays above 0. |
| **Theme Select (Noir / Violet / Cyan)** | Switches the color scheme. |

## How it works

- **`index.html`** — Loads the CDN libraries (p5.js, p5.dom, ml5.js, socket.io, p5.speech) and all the local scripts, then hands off to p5.
- **`main.js`** — The p5 sketch. `preload()` loads the image classifier from `./data/model.json`; `setup()` starts the webcam capture and builds the UI; `draw()` renders the gradient background, mirrored video feed, text box, and buttons each frame. `classifyVideo()` / `gotResult()` form a continuous classification loop, storing the top prediction in `label`.
- **`text/text_detect.js`** (`Detect_Text`) — Debounce logic. It tracks the currently held sign and only emits it once it has been stable for `time_delay` seconds.
- **`text/text_box.js`** (`Text_Box`) — Accumulates emitted signs into a displayed string when detection is active.
- **`button/`** — A small UI toolkit built on a base `Button` class with `display()` / `mouse_update()` / `contains()`:
  - `clear_button.js`, `read_button.js`, `on_off_button.js` — the action buttons.
  - `increment.js` — adjusts the sign hold duration.
  - `color_picker.js` (`Theme_Select`) — applies a theme.
  - `label.js`, `title_label.js` — non-interactive text labels (the "Signify" title and theme heading).
- **`theme.js`** (`Theme`) — Holds the active palette (background gradient colors, button color, text color).
- **`model/script.py`** — A standalone Keras/TensorFlow reference script for running the exported model on a single image in Python (not used by the web app).

## The model

The classifier was trained with [Google Teachable Machine](https://teachablemachine.withgoogle.com/) (`@teachablemachine/image`, image size 224×224) and exported as a TensorFlow.js model.

```
data/
  model.json       # model topology
  weights.bin      # model weights
  metadata.json    # labels + Teachable Machine metadata
model_data/        # sample/reference images used while building the model
```

## Tech stack

- **[p5.js](https://p5js.org/)** + **p5.dom** — canvas rendering and UI loop.
- **[ml5.js](https://ml5js.org/)** — `imageClassifier` for in-browser inference and `flipImage` for the mirror effect.
- **[p5.speech](https://github.com/IDMNYU/p5.js-speech)** — text-to-speech for the *Read Text* button.
- **TensorFlow.js model** exported from Teachable Machine.

> `package.json` lists `cohere-ai` as a dependency, but it isn't referenced by the current client-side code.

## Project structure

```
.
├── index.html            # entry point, loads libs + scripts
├── main.js               # p5 sketch: video capture, classify loop, UI layout
├── theme.js              # Theme palette class
├── style.css             # (empty)
├── text/
│   ├── text_box.js       # accumulates recognized signs
│   └── text_detect.js    # hold-to-confirm debounce logic
├── button/               # UI button classes (Button base + subclasses)
├── data/                 # TensorFlow.js model (model.json, weights.bin, metadata.json)
├── model/script.py       # Python reference inference script
└── model_data/           # sample images from model training
```

## Limitations / notes

- Requires a webcam and a browser that supports `getUserMedia` and the Web Speech API.
- Recognition accuracy depends on lighting, framing, and how closely your signs match the training data.
- This is a prototype / learning project; there is no build step or test suite.

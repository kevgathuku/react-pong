import React from "react";

export default function Instructions() {
  return (
    <div className="instructions">
      <h2> How to Play</h2>
      <p>To move the right paddle, use the ⬆️ and ⬇️ arrow buttons</p>
      <p>
        To move the left paddle, use keys <kbd>A</kbd> and <kbd>Z</kbd> to move
        up and down respectively
      </p>
      <p>The first player to reach a score of 5 wins</p>
      <p>Enjoy the game!</p>

      <div style={{padding: '15px 0 '}}>
        <details>
          <summary> Caveats ⏸</summary>
          <p>
            This only supports playing from one browser at a time. i.e. for 2
            players to play the same game, they would have to be on the same
            computer using the same keyboard
          </p>
        </details>
      </div>
      <div>
        <details>
          <summary>Tech Stack 💻</summary>
          <ul>
            <li> React</li>
            <li> Redux</li>
            <li> Pixi.js</li>
            <li> Typescript</li>
            <li> Vercel</li>
          </ul>
        </details>
      </div>
    </div>
  );
}

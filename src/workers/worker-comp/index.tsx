import { useState } from "react";

export default function WorkerApp() {
  const [result, setResult] = useState(null);

  const handleClick = () => {
    const worker = new Worker(new URL("../example-worker", import.meta.url));

    worker.postMessage(1e8);

    worker.onmessage = (e) => {
      setResult(e.data);
      worker.terminate();
    };
  };

  return (
    <div>
      <button onClick={handleClick}>Start Heavy Task</button>
      <p>Result: {result}</p>
      <button className="cursor-pointer">click</button>
    </div>
  );
}

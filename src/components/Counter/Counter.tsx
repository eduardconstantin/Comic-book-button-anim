import style from "./Counter.module.css";

interface CounterProps {
  count: number;
}

function Counter({ count }: CounterProps) {
  return (
    <>
      <div className={style.counter}>Count - {count}</div>
    </>
  );
}

export default Counter;

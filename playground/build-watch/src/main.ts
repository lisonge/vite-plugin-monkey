import './b';

await fetch(`/`);

export default await fetch(`/`);

const fn = async () => {
  const r = await fetch(`/`);
  console.log(r);
};

await fn();

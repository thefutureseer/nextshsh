export default function MessageBoard({data}) {
  return <div>Heloo spirit</div>
};

export async function getServerSideProps() {
  //serch data from external api
  const res = await fetch("https://localhost:5000");
  const data = await res.json();
  //pass data to the page via props
  return {props: {data}}
};

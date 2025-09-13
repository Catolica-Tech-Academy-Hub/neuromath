import GameLoader from "@/_components/GameLoader";

export default function Home() {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Meu Jogo de Matemática com App Router!</h1>
      <GameLoader />
    </main>
  );
}

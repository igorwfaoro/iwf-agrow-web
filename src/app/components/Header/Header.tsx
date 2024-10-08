interface HeaderProps {}

export default async function Header({}: HeaderProps) {
  return (
    <header className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        Envie um Cartão de Aniversário Personalizado
      </h1>

      <h3 className="text-lg md:text-xl text-primary">
        Crie um cartão de Aniversário exclusivo com mensagem, tema e música. Preencha
        o formulário, personalize seu cartão e compartilhe com quem você ama!
      </h3>
    </header>
  );
}

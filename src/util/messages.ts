export const MESSAGES = {
  USER_WITH_EMAIL_ALREADY_EXISTS: 'Usuário com este e-mail já existe',
  INVALID_EMAIL_OR_PASSWORD: 'E-mail ou senha inválida',
  ALREADY_EXISTS: 'Já existe',
  FORBIDDEN: 'Acesso negado',
  NOT_FOUND: 'Não encontrado',
  UNAUTHORIZED: 'Não autorizado',
  FIELD_NOT_FOUND: 'Campo não encontrado',
  USER_NOT_FOUND: 'Usuário não encontrado',
  INVALID_USER: 'Usuário inválido',

  CLASS_VALIDATOR: {
    isEmail: '"$property" precisa ser um e-mail válido.',
    isNotEmpty: '"$property" não pode estar vazio.',
    minLength: '"$property" precisa ter no mínimo $constraint1 caracteres.',
    maxLength: '"$property" deve ter no máximo $constraint1 caracteres.',
    length:
      '"$property" precisa ter entre $constraint1 e $constraint2 caracteres.'
  }
};

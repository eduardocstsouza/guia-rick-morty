export interface InfoPaginacao {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RespostaPaginada<T> {
  info: InfoPaginacao;
  results: T[];
}

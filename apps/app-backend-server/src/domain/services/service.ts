export abstract class Service<TProps, TOutput> {
  abstract execute(props: TProps): Promise<TOutput>;
}

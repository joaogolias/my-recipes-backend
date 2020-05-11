export abstract class BaseUC<Input, Output> {
	public abstract async execute(input: Input): Promise<Output>
}
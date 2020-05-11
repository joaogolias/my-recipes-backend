import { validateOrReject } from "class-validator";
import { InvalidInputError } from "../../../utils/error/InvalidInputError";

export abstract class BaseUC<Input, Output> {
  public abstract async execute(input: Input): Promise<Output>;

  private generateDevMessage = (errors: any[]): string => {
    const constraints = errors.map((err: any) => err.constraints);
    let devMessage = constraints.reduce(
      (acc: string, curr: any, index: number, arr: any[]) => {
        let constraintsMessage = "";
        const keys = Object.keys(curr);
        for (let i = 0; i < keys.length; i++) {
          if (index === arr.length - 1 && i === keys.length - 1) {
            constraintsMessage += curr[keys[i]];
          } else {
            constraintsMessage += curr[keys[i]] + ", ";
          }
        }
        return acc + constraintsMessage;
      },
      "class-validator errors: "
    );
    return devMessage;
  };

  public performValidation = async (obj: any): Promise<void> => {
    try {
      await validateOrReject(obj);
    } catch (errors) {
      throw new InvalidInputError(this.generateDevMessage(errors));
    }
  };
}

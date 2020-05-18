import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Ingredient } from "./Ingredient";

@Entity()
export class Recipe {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne((type: any) => User, (user: User) => user.recipes)
  user!: User;

  @ManyToMany((type) => Ingredient)
  @JoinTable()
  ingredients!: Ingredient[];
}

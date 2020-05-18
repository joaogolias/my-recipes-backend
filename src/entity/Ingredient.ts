import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class Ingredient {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;
}

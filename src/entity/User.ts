import { Entity, PrimaryColumn, Column, OneToMany, Unique } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
@Unique(["name", "nickname", "email"])
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  @Column()
  email!: string;

  @OneToMany((type: any) => Recipe, (recipe: Recipe) => recipe.user)
  recipes!: Recipe[];
}

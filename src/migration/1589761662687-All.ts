import {MigrationInterface, QueryRunner} from "typeorm";

export class All1589761662687 implements MigrationInterface {
    name = 'All1589761662687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `password` `email` varchar(255) NOT NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_e724a932eee2b9d744456d4242` ON `user` (`name`, `nickname`, `email`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_e724a932eee2b9d744456d4242` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `email` `password` varchar(255) NOT NULL", undefined);
    }

}

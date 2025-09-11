import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { StudentModule } from "./modules/students/student.module";

@Module({
    imports: [
        DatabaseModule,
        StudentModule
    ],
})
export class AppModule {}
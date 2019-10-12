import { Module } from "@nestjs/common";
import { Connection } from "typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { MorganInterceptor, MorganModule } from "nest-morgan";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
import { ConfigModule } from "./config/config.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { SnippetsModule } from "./modules/snippets/snippets.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SnippetsModule,
    ConfigModule,
    MorganModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "public"),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeOrmConfig,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("combined"),
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

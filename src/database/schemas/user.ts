import { pgTable, serial, varchar, text, date, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";

// Enum para gênero
export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);

export const user = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    birth: date().notNull(),
    gender: genderEnum().notNull(),
    phone: varchar({ length: 20 }).notNull(),
    cpf: varchar({ length: 14 }).notNull().unique(),
    rg: varchar({ length: 20 }),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});
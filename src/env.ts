import { z } from "zod";

// Only for node projects
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional(),
  BASE_URL: z.string(),
  SUPPORT_EMAIL: z.string().email(),
});

const parsedResults = envSchema.safeParse({ ...process.env });

if (!parsedResults.success) {
  console.error(parsedResults);
  throw new Error("Invalid environment variables");
}

type EnvVarSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVarSchemaType {}
  }
}

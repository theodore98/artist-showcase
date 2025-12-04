interface EnvConfig {
  lastFmApiKey: string;
}

function validateEnv(): EnvConfig {
  const apiKey = import.meta.env.VITE_LAST_FM_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_LAST_FM_API_KEY is not defined in environment variables');
  }

  return {
    lastFmApiKey: apiKey,
  };
}

export const env = validateEnv();


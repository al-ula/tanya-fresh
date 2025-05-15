export const hashPassword = async (password: string): Promise<string> => {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // PBKDF2 parameters
  const iterations = 100000;
  const keyLength = 32; // 256 bits

  // Convert password to bytes
  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(password);

  // Generate key using PBKDF2
  const key = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: iterations,
      hash: "SHA-256",
    },
    key,
    keyLength * 8,
  );

  // Convert to base64 for storage
  const hashArray = Array.from(new Uint8Array(hash));
  const saltArray = Array.from(new Uint8Array(salt));
  const hashBase64 = btoa(String.fromCharCode(...hashArray));
  const saltBase64 = btoa(String.fromCharCode(...saltArray));

  // Return combined salt and hash
  return `${saltBase64}:${iterations}:${hashBase64}`;
};

// Function to verify password
export const verifyPassword = async (
  password: string,
  storedHash: string,
): Promise<boolean> => {
  const [saltBase64, iterations, hashBase64] = storedHash.split(":");

  const salt = Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0));
  const keyLength = 32;

  const encoder = new TextEncoder();
  const passwordBytes = encoder.encode(password);

  const key = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: parseInt(iterations),
      hash: "SHA-256",
    },
    key,
    keyLength * 8,
  );

  const newHashBase64 = btoa(
    String.fromCharCode(...new Uint8Array(hash)),
  );

  return hashBase64 === newHashBase64;
};
